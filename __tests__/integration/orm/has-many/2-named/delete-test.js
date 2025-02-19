import Helper, { states } from "./_helper";

describe("Integration | ORM | Has Many | Named | delete", () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  states.forEach(state => {
    test(`deleting children updates the parent's foreign key for a ${state}`, () => {
      let [user, blogPosts] = helper[state]();

      if (blogPosts && blogPosts.length) {
        blogPosts.forEach(p => p.destroy());
        user.reload();
      }

      expect(user.blogPosts).toHaveLength(0);
      expect(user.blogPostIds).toHaveLength(0);
    });
  });
});
