import { construct_dialog_map } from "../../lib/util";

describe('finalDraftToFountain tests with unknown paratypes', () => {
  test('sanity', () => {
    expect(construct_dialog_map([])).toBe(3);                 
  });
}
)