import Helper, { states } from "./_helper";

describe("Integration | ORM | Has Many | Named Reflexive | delete", () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  states.forEach(state => {
    test(`deleting children updates the parent's foreign key for a ${state}`, () => {
      let [tag, labels] = helper[state]();

      if (labels && labels.length) {
        labels.forEach(t => t.destroy());
        tag.reload();
      }

      expect(tag.labels).toHaveLength(0);
      expect(tag.labelIds).toHaveLength(0);
    });
  });
});
