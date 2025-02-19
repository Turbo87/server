import Helper, { states } from "./_helper";

describe("Integration | ORM | Has Many | Named Reflexive | association #create", () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  /*
    The model can create a has-many association, for all states
  */
  states.forEach(state => {
    test(`a ${state} can create an associated child`, () => {
      let [tag] = helper[state]();
      let initialCount = tag.labels.models.length;

      let orangeTag = tag.createLabel({ name: "Orange" });

      expect(orangeTag.id).toBeTruthy();
      expect(tag.labels.models).toHaveLength(initialCount + 1);
      expect(tag.labels.includes(orangeTag)).toBeTruthy();
      expect(tag.labelIds.indexOf(orangeTag.id) > -1).toBeTruthy();
      expect(tag.attrs.labelIds.indexOf(orangeTag.id) > -1).toBeTruthy();
      expect(orangeTag.labels.includes(tag)).toBeTruthy();
    });
  });
});
