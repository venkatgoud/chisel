<template>
  <div id="app" class="w-full">
    <h1 class="mx-auto w-20 mt-1 tracking-widest font-bold font-sans">CHISEL</h1>
    <h2 class="mx-auto w-64 my-2">Polish character dialogs at one place</h2>
    <div class="flex items-center justify-center pb-2">
      <label
        class="w-64 flex flex-col items-center px-2 py-3 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-600 hover:text-white"
      >
        <svg
          class="w-6 h-4"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>
        <span class="mt-1 text-base leading-normal">Load screenplay</span>
        <input type="file" class="hidden" name="inputfile" ref="inputFiles" @change="onFileChange" />
      </label>
    </div>
    <div v-show="isFileLoaded" class="flex mx-10 my-6">
      <div class="w-1/2">
        <DialogEditor :tokens="tokens" @save="onSave" @show_scene="onShowScene" />
      </div>
      <div class="w-1/2">
        <FountainViewer :tokens="displayTokens" @download="download" />
      </div>
    </div>
  </div>
</template>

<script>
import FountainViewer from "./components/FountainViewer.vue";
import DialogEditor from "./components/DialogEditor.vue";
import { apply_dialog_changes, get_scene_tokens } from "./lib/util";
import { parse } from "fountain-parser";
import { saveAs } from "file-saver";

export default {
  name: "App",
  data: function() {
    return {
      fileName: "No file chosen",
      isFileLoaded: false,
      fountain: "",
      tokens: [],
      displayTokens: [],
      displayScene: 0
    };
  },
  methods: {
    download: function() {
      let content = "";
      let prevToken = "";
      this.tokens.forEach(token => {
        switch (token.type) {
          case "scene_heading":
          case "action":
          case "transition":
            content = content + "\n" + token.text + "\n";
            break;
          case "character":
          case "dialogue":
          case "parenthetical":
            content += token.text + "\n";
            break;
          case "dialogue_begin":
            if (
              prevToken !== "scene_heading" ||
              prevToken !== "action" ||
              prevToken !== "dialogue_end"
            )
              content += "\n";
            break;
          default:
            break;
        }
        prevToken = token.type;
      });
      var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, this.fileName);
    },
    onFileChange: function() {
      if (this.$refs.inputFiles.files.length > 0) {
        const file = this.$refs.inputFiles.files[0];
        this.fileName = file.name;
        var fileReader = new FileReader();
        const _instance = this;
        fileReader.onload = function(evt) {
          _instance.isFileLoaded = true;
          _instance.fountain = evt.target.result;

          parse(_instance.fountain, output => {
            _instance.tokens = output.tokens;
            _instance.displayTokens = output.tokens;
          });
        };
        fileReader.readAsText(file);
      }
    },
    onSave(dialog_map) {
      this.tokens = apply_dialog_changes(this.tokens, dialog_map);
      this.onShowScene(this.displayScene);
    },
    onShowScene(scene) {
      this.displayScene = scene;
      this.displayTokens = get_scene_tokens(this.tokens, scene);
    }
  },
  components: {
    FountainViewer,
    DialogEditor
  }
};
</script>