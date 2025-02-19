import Helper, { states } from "./_helper";

describe("Integration | ORM | Belongs To | One-way Polymorphic | delete", () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  states.forEach(state => {
    test(`deleting the parent updates the child's foreign key for a ${state}`, () => {
      let [comment, post] = helper[state]();

      if (post) {
        post.destroy();
        comment.reload();
      }

      expect(comment.commentableId).toBeNil();
      expect(comment.post).toBeNil();
    });
  });
});
