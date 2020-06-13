import { construct_dialog_map, apply_dialog_changes, get_scene_tokens } from "../../src/lib/util";

const tokens = [
  {
    type: 'scene_heading',
    text: "EXT. BRICK'S PATIO - DAY",
    scene_number: undefined
  },
  {
    type: 'action',
    text: 'A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.'
  },
  {
    type: 'action',
    text: 'The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.'
  },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'STEEL' },
  { type: 'dialogue', text: "Beer's ready!" },
  { type: 'dialogue_end' },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'BRICK' },
  { type: 'dialogue', text: 'Are they cold?' },
  { type: 'dialogue_end' },
  { type: 'action', text: 'Steel sits.  They laugh at the dumb joke.' },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'STEEL' },
  { type: 'parenthetical', text: '(beer raised)' },
  { type: 'dialogue', text: 'To retirement.' },
  { type: 'dialogue_end' },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'BRICK' },
  { type: 'dialogue', text: 'To retirement.' },
  { type: 'dialogue_end' },
  { type: 'action', text: 'They drink long and well from the beers.' },
  {
    type: 'action',
    text: "And then there's a long beat.\n \nThe men look at each other."
  },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'STEEL' },
  { type: 'dialogue', text: 'Screw retirement.' },
  { type: 'dialogue_end' },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'BRICK' },
  { type: 'dialogue', text: 'Screw retirement.' },
  { type: 'dialogue_end' },
  { type: 'transition', text: 'SMASH CUT TO:' },
  {
    type: 'scene_heading',
    text: 'INT. TRAILER HOME - DAY',
    scene_number: undefined
  },
  {
    type: 'action',
    text: 'This is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  '
  },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'STEEL' },
  { type: 'parenthetical', text: '(in Vietnamese, subtitled)' },
  {
    type: 'dialogue',
    text: '*Did you know Brick and Steel are retired?*'
  },
  { type: 'dialogue_end' },
  { type: 'dialogue_begin', dual: undefined },
  { type: 'character', text: 'BRICK' },
  { type: 'dialogue', text: "Then let's retire them.\n_Permanently_." },
  { type: 'dialogue_end' },
  {
    type: 'action',
    text: 'Jack begins to argue vociferously in Vietnamese\n'
  }
]

describe('construct_dialog_map tests', () => {
  test('sanity', () => {
    const expectedOutput = new Map();
    const steel = [{
      token_index: 5,
      scene_heading_index: 0,
      current_dialogue: "Beer's ready!",
      new_dialogue: "Beer's ready!"
    }, {
      token_index: 15,
      scene_heading_index: 0,
      current_dialogue: "To retirement.",
      new_dialogue: "To retirement."
    }, {
      token_index: 25,
      scene_heading_index: 0,
      current_dialogue: "Screw retirement.",
      new_dialogue: "Screw retirement."
    }, {
      token_index: 37,
      scene_heading_index: 32,
      current_dialogue: "*Did you know Brick and Steel are retired?*",
      new_dialogue: "*Did you know Brick and Steel are retired?*"
    }]

    const brick = [{
      token_index: 9,
      scene_heading_index: 0,
      current_dialogue: "Are they cold?",
      new_dialogue: "Are they cold?"
    }, {
      token_index: 19,
      scene_heading_index: 0,
      current_dialogue: "To retirement.",
      new_dialogue: "To retirement."
    }, {
      token_index: 29,
      scene_heading_index: 0,
      current_dialogue: "Screw retirement.",
      new_dialogue: "Screw retirement."
    },
    {
      token_index: 41,
      scene_heading_index: 32,
      current_dialogue: "Then let's retire them.\n_Permanently_.",
      new_dialogue: "Then let's retire them.\n_Permanently_."
    }
    ]


    expectedOutput.set("STEEL", steel);
    expectedOutput.set("BRICK", brick);
    expect(construct_dialog_map(tokens)).toEqual(expectedOutput);
  });
}
)

describe('apply_dialog_changes tests', () => {
  test('sanity', () => {
    const dialog_map = new Map();
    const steel = [{
      token_index: 5,
      scene_heading_index: 0,
      current_dialogue: "Beer's ready!",
      new_dialogue: "Beer's ready!"
    }, {
      token_index: 15,
      scene_heading_index: 0,
      current_dialogue: "To retirement.",
      new_dialogue: "To retirement."
    }, {
      token_index: 25,
      scene_heading_index: 0,
      current_dialogue: "Screw retirement.",
      new_dialogue: "Screw retirement."
    }, {
      token_index: 37,
      scene_heading_index: 32,
      current_dialogue: "*Did you know Brick and Steel are retired?*",
      new_dialogue: "You know they retired?"
    }]

    const brick = [{
      token_index: 9,
      scene_heading_index: 0,
      current_dialogue: "Are they cold?",
      new_dialogue: "Are they cold?"
    }, {
      token_index: 19,
      scene_heading_index: 0,
      current_dialogue: "To retirement.",
      new_dialogue: "To retirement."
    }, {
      token_index: 29,
      scene_heading_index: 0,
      current_dialogue: "Screw retirement.",
      new_dialogue: "Hello retirement."
    },
    {
      token_index: 41,
      scene_heading_index: 32,
      current_dialogue: "Then let's retire them.\n_Permanently_.",
      new_dialogue: "Then let's retire them.\n_Permanently_."
    }
    ]
    dialog_map.set("STEEL", steel);
    dialog_map.set("BRICK", brick);
    const expectedOutput = [
      {
        type: 'scene_heading',
        text: "EXT. BRICK'S PATIO - DAY",
        scene_number: undefined
      },
      {
        type: 'action',
        text: 'A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.'
      },
      {
        type: 'action',
        text: 'The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.'
      },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'STEEL' },
      { type: 'dialogue', text: "Beer's ready!" },
      { type: 'dialogue_end' },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'BRICK' },
      { type: 'dialogue', text: 'Are they cold?' },
      { type: 'dialogue_end' },
      { type: 'action', text: 'Steel sits.  They laugh at the dumb joke.' },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'STEEL' },
      { type: 'parenthetical', text: '(beer raised)' },
      { type: 'dialogue', text: 'To retirement.' },
      { type: 'dialogue_end' },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'BRICK' },
      { type: 'dialogue', text: 'To retirement.' },
      { type: 'dialogue_end' },
      { type: 'action', text: 'They drink long and well from the beers.' },
      {
        type: 'action',
        text: "And then there's a long beat.\n \nThe men look at each other."
      },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'STEEL' },
      { type: 'dialogue', text: 'Screw retirement.' },
      { type: 'dialogue_end' },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'BRICK' },
      { type: 'dialogue', text: 'Hello retirement.' },
      { type: 'dialogue_end' },
      { type: 'transition', text: 'SMASH CUT TO:' },
      {
        type: 'scene_heading',
        text: 'INT. TRAILER HOME - DAY',
        scene_number: undefined
      },
      {
        type: 'action',
        text: 'This is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  '
      },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'STEEL' },
      { type: 'parenthetical', text: '(in Vietnamese, subtitled)' },
      {
        type: 'dialogue',
        text: 'You know they retired?'
      },
      { type: 'dialogue_end' },
      { type: 'dialogue_begin', dual: undefined },
      { type: 'character', text: 'BRICK' },
      { type: 'dialogue', text: "Then let's retire them.\n_Permanently_." },
      { type: 'dialogue_end' },
      {
        type: 'action',
        text: 'Jack begins to argue vociferously in Vietnamese\n'
      }
    ]
    expect(apply_dialog_changes(tokens, dialog_map)).toEqual(expectedOutput);
  });
}
)

describe('get_scene_tokens', () => {
  test('sanity', () => {
    const expectedOutput = [{
      type: 'scene_heading',
      text: 'INT. TRAILER HOME - DAY',
      scene_number: undefined
    },
    {
      type: 'action',
      text: 'This is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  '
    },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'STEEL' },
    { type: 'parenthetical', text: '(in Vietnamese, subtitled)' },
    {
      type: 'dialogue',
      text: '*Did you know Brick and Steel are retired?*'
    },
    { type: 'dialogue_end' },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'BRICK' },
    { type: 'dialogue', text: "Then let's retire them.\n_Permanently_." },
    { type: 'dialogue_end' },
    {
      type: 'action',
      text: 'Jack begins to argue vociferously in Vietnamese\n'
    }]

    expect(get_scene_tokens(tokens, 32)).toEqual(expectedOutput);

  });

  test('first_scene', () => {
    const expectedOutput = [{
      type: 'scene_heading',
      text: "EXT. BRICK'S PATIO - DAY",
      scene_number: undefined
    },
    {
      type: 'action',
      text: 'A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.'
    },
    {
      type: 'action',
      text: 'The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.'
    },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'STEEL' },
    { type: 'dialogue', text: "Beer's ready!" },
    { type: 'dialogue_end' },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'BRICK' },
    { type: 'dialogue', text: 'Are they cold?' },
    { type: 'dialogue_end' },
    { type: 'action', text: 'Steel sits.  They laugh at the dumb joke.' },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'STEEL' },
    { type: 'parenthetical', text: '(beer raised)' },
    { type: 'dialogue', text: 'To retirement.' },
    { type: 'dialogue_end' },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'BRICK' },
    { type: 'dialogue', text: 'To retirement.' },
    { type: 'dialogue_end' },
    { type: 'action', text: 'They drink long and well from the beers.' },
    {
      type: 'action',
      text: "And then there's a long beat.\n \nThe men look at each other."
    },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'STEEL' },
    { type: 'dialogue', text: 'Screw retirement.' },
    { type: 'dialogue_end' },
    { type: 'dialogue_begin', dual: undefined },
    { type: 'character', text: 'BRICK' },
    { type: 'dialogue', text: 'Screw retirement.' },
    { type: 'dialogue_end' },
    { type: 'transition', text: 'SMASH CUT TO:' },
   ]

    expect(get_scene_tokens(tokens, 0)).toEqual(expectedOutput);

  });
});