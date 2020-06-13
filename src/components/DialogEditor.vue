<template>
  <div class="px-2 mx-1">
    <div class="flex justify-between">
      <div>
        <select
          v-model="character"
          v-on:change="onCharacterSelection"
          class="bg-white border border-blue-400 text-blue-600 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="character"
        >
          <option disabled value>Choose character</option>
          <option v-for="c in Object.keys(dialog_map)" :key="c" :value="c">{{c}}</option>
        </select>
      </div>
      <div>
        <button
          v-show="dirty"
          v-on:click="save"
          class="border border-blue-400 hover:bg-blue-600 hover:text-white text-blue-600 py-2 px-4 rounded inline-flex items-center"
        >
          <span>Save Changes</span>
        </button>
      </div>
    </div>
    <div
      v-for="(scene_dialogs, scene) in char_dialogs"
      :key="scene"
      class="border-l-2 border-blue-400 px-4 my-4"
    >
      <div class="flex justify-end">
        <a
          href="#"
          v-on:click="showScene(scene)"
          class="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-blue-900 font-normal text-blue-600"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              class="text-gray-400 fill-current"
              d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v2h2V5H4zm0 4v2h2V9H4zm0 4v2h2v-2H4zm0 4v2h2v-2H4zM18 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
            />
            <path
              class="text-gray-700 fill-current"
              d="M9 5h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 8h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
            />
          </svg>
          <span class="ml-3">{{scene}}</span>
        </a>
      </div>
      <input
        v-for="dialog in scene_dialogs"
        :key="dialog.token_index"
        v-model="dialog.new_dialogue"
        v-on:input="dirty=true"
        class="appearance-none bg-transparent border-none w-full leading-normal focus:outline-none focus:shadow-xs my-1 py-2 px-4 block w-full"         
        type="text"
      />
    </div>
  </div>
</template>

<script>
import { construct_dialog_map } from "../lib/util";

export default {
  name: "DialogEditor",
  props: {
    tokens: Array
  },
  methods: {
    onCharacterSelection: function(event) {
      this.character = event.target.value;
      this.dialogs = this.dialog_map[this.character];
      this.char_dialogs = this.groupByScene();
    },
    groupByScene: function() {
      return this.dialogs.reduce(function(acc, current, index) {
        if (index === 0) {
          acc[current.scene_heading_index] = [current];
          return acc;
        }

        let scene_dialogs = acc[current.scene_heading_index] || [];
        scene_dialogs.push(current);
        acc[current.scene_heading_index] = scene_dialogs;

        return acc;
      }, Object.create(null));
    },
    save: function() {
      this.$emit("save", this.dialog_map);
      this.dirty = false;
    },
    showScene: function(scene) {
      this.$emit("show_scene", scene);
    }
  },
  data: function() {
    return { character: "", dialogs: [], char_dialogs: {}, dirty: false };
  },
  computed: {
    dialog_map: function() {
      return construct_dialog_map(this.tokens);
    }
  }
};
</script>