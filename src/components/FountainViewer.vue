<template>
  <div class="px-2 mx-1">
    <div class="flex justify-start">
      <button
        class="border border-blue-400 hover:bg-blue-600 hover:text-white text-blue-600 py-2 px-4 rounded inline-flex items-center"
      >
        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
    </div>
    <div class="flex flex-col border-l-2 border-blue-400 px-4 my-4">
      <template v-for="(token, index) in tokens">
        <br :key="index" v-if="token.type === 'dialogue_begin'" />
        <p :key="index" v-else :class="cssClass(token)">{{token.text}}</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "FountainViewer",
  methods: {
    cssClass: function(token) {
      switch (token.type) {
        case "scene_heading":
          return "font-semibold underline mx-10";
        case "action":
          return "w-full my-1 mx-10";
        case "character":
          return "self-center leading-3";
        case "dialogue":
          return "self-center mx-20 leading-2";
        case "parenthetical":
          return "self-center mx-20 leading-3";
        case "transition":
          return "self-end";
        default:
          break;
      }
    }
  },
  props: {
    tokens: Array
  }
};
</script>