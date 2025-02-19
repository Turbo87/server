import { Server, Model, Factory } from "@miragejs/server";

describe("Integration | Database", () => {
  let server;
  beforeEach(() => {
    server = new Server({
      environment: "development",
      scenarios: {
        default() {}
      },
      models: {
        author: Model
      },
      factories: {
        author: Factory
      },
      fixtures: {
        authors: [{ id: 1, name: "Zelda" }]
      }
    });
  });

  afterEach(function() {
    server.shutdown();
  });

  test(`[regression] When loaded, fixture files correctly update the database's autoincrement id`, () => {
    server.loadFixtures();

    server.schema.authors.create({});

    let { authors } = server.db;
    expect(authors).toHaveLength(2);
    expect(authors.map(a => a.id)).toEqual(["1", "2"]);
  });
});
