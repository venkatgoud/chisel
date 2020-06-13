// takes token array from fountain parser and returns a Map 
// key: character value: array of dialog_info  
export function construct_dialog_map(tokens) {

  let dialog_map = new Map();
  if (tokens.length === 0) return dialog_map;

  let character = "";
  let scene_index = -1;

  return tokens.reduce(function name(acc, token, index) {
    if (token.type === "scene_heading") {
      scene_index = index;
    }
    else if (token.type === "dialogue") {
      let dialog_info = {
        token_index: index,
        scene_heading_index: scene_index,
        current_dialogue: token.text,
        new_dialogue: token.text
      };
      let dialog_array = acc.get(character) || [];
      dialog_array.push(dialog_info);
      acc.set(character, dialog_array);
    }
    else if (token.type === "character") {
      character = token.text;
    }
    return acc;
  }, dialog_map);

}

// saves the dialog changes from dialog_map into tokens
// and returns new token array
export function apply_dialog_changes(tokens, dialog_map) {
  let output = JSON.parse(JSON.stringify(tokens)); 
  dialog_map.forEach(function (dialog_array) {
    dialog_array.forEach(function (dialog_info) {
      if (dialog_info.current_dialogue !== dialog_info.new_dialogue) {
        output[dialog_info.token_index].text = dialog_info.new_dialogue;
      }
    })
  });
  return output;
}

// Retrieves the tokens belonging to the scene at index
export function get_scene_tokens(tokens, index) {
  let rest = tokens.slice(index);

  const is_scene_heading = (token) => token.type === "scene_heading";

  let next_scene_index = 0;

  for (let i = 1; i < rest.length; i++) {
    const token = rest[i];
    if (is_scene_heading(token)) {       
      next_scene_index = i;
      break;
    }
  }   
  if (next_scene_index === 0) {
    return rest;
  }
  else {
    return rest.slice(0, next_scene_index);
  }

}