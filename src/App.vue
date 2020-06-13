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
        <input type="file" class="hidden" />
      </label>
    </div>
    <div class="flex mx-10 my-6">
      <div class="w-1/2">
        <DialogEditor :tokens="tokens" @save="onSave" @show_scene="onShowScene"/>
      </div>
      <div class="w-1/2">
        <FountainViewer :tokens="displayTokens" />
      </div>
    </div>
  </div>
</template>

<script>
import FountainViewer from "./components/FountainViewer.vue";
import DialogEditor from "./components/DialogEditor.vue";
import { apply_dialog_changes, get_scene_tokens } from "./lib/util";

const tokens = [
  {
    type: "scene_heading",
    text: "EXT. BRICK'S PATIO - DAY",
    scene_number: undefined
  },
  {
    type: "action",
    text:
      "A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something."
  },
  {
    type: "action",
    text:
      "The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers."
  },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "STEEL" },
  { type: "dialogue", text: "Beer's ready!" },
  { type: "dialogue_end" },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "BRICK" },
  { type: "dialogue", text: "Are they cold?" },
  { type: "dialogue_end" },
  { type: "action", text: "Steel sits.  They laugh at the dumb joke." },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "STEEL" },
  { type: "parenthetical", text: "(beer raised)" },
  { type: "dialogue", text: "To retirement." },
  { type: "dialogue_end" },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "BRICK" },
  { type: "dialogue", text: "To retirement." },
  { type: "dialogue_end" },
  { type: "action", text: "They drink long and well from the beers." },
  {
    type: "action",
    text: "And then there's a long beat.\n \nThe men look at each other."
  },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "STEEL" },
  { type: "dialogue", text: "Screw retirement." },
  { type: "dialogue_end" },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "BRICK" },
  { type: "dialogue", text: "Screw retirement." },
  { type: "dialogue_end" },
  { type: "transition", text: "SMASH CUT TO:" },
  {
    type: "scene_heading",
    text: "INT. TRAILER HOME - DAY",
    scene_number: undefined
  },
  {
    type: "action",
    text:
      "This is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  "
  },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "STEEL" },
  { type: "parenthetical", text: "(in Vietnamese, subtitled)" },
  {
    type: "dialogue",
    text: "*Did you know Brick and Steel are retired?*"
  },
  { type: "dialogue_end" },
  { type: "dialogue_begin", dual: undefined },
  { type: "character", text: "BRICK" },
  { type: "dialogue", text: "Then let's retire them.\n_Permanently_." },
  { type: "dialogue_end" },
  {
    type: "action",
    text: "Jack begins to argue vociferously in Vietnamese\n"
  }
];

export default {
  name: "App",
  data: function() {
    return { tokens: tokens, displayTokens: [], displayScene: 0 };
  },
  methods: {
    onSave(dialog_map) {       
      this.tokens = apply_dialog_changes(tokens, dialog_map);
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