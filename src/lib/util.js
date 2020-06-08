// takes token array from fountain parser and returns a Map 
// key: character value: array of dialog_info  
export function construct_dialog_map(tokens) {

  let dialog_map = new Map();
  if (tokens.length === 0) return dialog_map;

  let character = "";
  let scene_index = -1;

  tokens.reduce(function name(acc, token, index) {
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