const { parseMatchData } = require("./parseMatchData.js");

// Mock functions (replace with actual implementations if needed)
jest.mock("./processKillEvent.js", () => ({
  processKillEvent: jest.fn((matchData, killData) => {
    const { killer, victim, means } = killData;
    const updatedMatchData = { ...matchData };

    if (killer === "<world>") {
      updatedMatchData.kills[victim] =
        (updatedMatchData.kills[victim] || 0) - 1;
      updatedMatchData.world_kills = (updatedMatchData.world_kills || 0) + 1;
    } else if (killer !== victim) {
      updatedMatchData.kills[killer] =
        (updatedMatchData.kills[killer] || 0) + 1;
    }

    updatedMatchData.kills_by_means[means] =
      (updatedMatchData.kills_by_means[means] || 0) + 1;

    updatedMatchData.total_kills = (updatedMatchData.total_kills || 0) + 1;
    return updatedMatchData;
  }),
}));

const mockLines = [
  "InitGame:",
  "ClientUserinfoChanged: 2 n\\Dono da Bola\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0",
  "ClientUserinfoChanged: 3 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0",
  "Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET",
  "ShutdownGame:",
];

test("parseMatchData should parse a single match with kills", () => {
  const matches = JSON.stringify(parseMatchData(mockLines));

  expect(matches).toEqual(
    JSON.stringify({
      game_1: {
        total_kills: 1,
        players: ["Dono da Bola", "Isgalamido"],
        kills: { Isgalamido: 1 },
        world_kills: 0,
        kills_by_means: { MOD_ROCKET: 1 },
      },
    })
  );
});

test("parseMatchData should handle empty matches", () => {
  const emptyLines = ["InitGame:", "ShutdownGame:"];
  const matches = JSON.stringify(parseMatchData(emptyLines));

  expect(matches).toEqual(
    JSON.stringify({
      game_1: {
        total_kills: 0,
        players: [],
        kills: {},
        world_kills: 0,
        kills_by_means: {},
      },
    })
  );
});

test("parseMatchData should handle multiple matches", () => {
  const extraMatchLines = [
    "InitGame:",
    "ClientUserinfoChanged: 1 n\\Zeh\\t\\0\\model\\sarge/default\\hmodel\\sarge/default\\g_redteam\\\\g_blueteam\\\\c1\\1\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0",
    "Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT",
    "ShutdownGame:",
  ];

  const allLines = [...mockLines, ...extraMatchLines];

  const matches = JSON.stringify(parseMatchData(allLines));

  expect(matches).toEqual(
    JSON.stringify({
      game_1: {
        total_kills: 1,
        players: ["Dono da Bola", "Isgalamido"],
        kills: { Isgalamido: 1 },
        world_kills: 0,
        kills_by_means: { MOD_ROCKET: 1 },
      },
      game_2: {
        total_kills: 1,
        players: ["Zeh"],
        kills: { Zeh: -1 },
        world_kills: 1,
        kills_by_means: { MOD_TRIGGER_HURT: 1 },
      },
    })
  );
});
