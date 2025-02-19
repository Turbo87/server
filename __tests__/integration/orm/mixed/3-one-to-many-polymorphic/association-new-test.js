import Helper, { states } from "./_helper";

describe("Integration | ORM | Mixed | One To Many Polymorphic | association #new", () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  /*
    The model can make a new unsaved belongs-to association, for all states
  */

  states.forEach(state => {
    test(`a ${state} can build a new associated parent`, () => {
      let [user] = helper[state]();
      let initialCount = user.things.models.length;

      let post = user.newThing("post", { title: "Lorem ipsum" });

      expect(!post.id).toBeTruthy();
      expect(user.things.models).toHaveLength(initialCount + 1);

      post.save();

      expect(post.attrs).toEqual({
        id: post.id,
        title: "Lorem ipsum",
        userId: user.id
      });
      expect(user.things.models).toHaveLength(initialCount + 1);
      expect(user.things.includes(post)).toBeTruthy();
      expect(
        user.thingIds.find(obj => {
          return obj.id === post.id && obj.type === "post";
        })
      ).toBeTruthy();
    });
  });
});
