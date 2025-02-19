import Helper, { states } from "./_helper";

describe("Integration | ORM | Belongs To | Named Reflexive | association #new", () => {
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

      let ganon = user.newBestFriend({ name: "Ganon" });

      expect(!ganon.id).toBeTruthy();
      expect(user.bestFriend).toEqual(ganon);
      expect(user.bestFriendId).toBeNil();

      user.save();

      expect(ganon.id).toBeTruthy();
      expect(user.bestFriendId).toEqual(ganon.id);
    });
  });
});
