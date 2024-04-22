const { reportSummary } = require("./reportSummary");
const { rankObjEntries } = require("../settings/utils");

const mockJsonData = {
  game_1: {
    total_kills: 3,
    players: ["Alice", "Bob", "Charlie"],
    kills: { Alice: 2, Bob: 1 },
    world_kills: 0,
    kills_by_means: { MOD_ROCKET: 2, MOD_SHOTGUN: 1 },
  },
  game_2: {
    total_kills: 1,
    players: ["David", "Eve"],
    kills: { David: 1 },
    world_kills: 0,
    kills_by_means: { MOD_RAILGUN: 1 },
  },
};

test("should print a summary report for each match in the data", () => {
  const consoleSpy = jest.spyOn(console, "log"); // Spy on console.log

  reportSummary(mockJsonData, "kills");

  expect(consoleSpy).toHaveBeenCalledTimes(2); // Expect 2 calls for 2 games
});

test("should correctly rank the data specified by datakey", () => {
  const rankingData = rankObjEntries(mockJsonData.game_1.kills);
  expect(rankingData).toEqual([
    ["Alice", 2],
    ["Bob", 1],
  ]);
});
