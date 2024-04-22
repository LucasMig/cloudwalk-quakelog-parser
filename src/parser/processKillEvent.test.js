const { processKillEvent } = require("./processKillEvent.js");

test("processKillEvent should handle world kills", () => {
  const initialMatchData = {
    total_kills: 0,
    players: ["Isgalamido"],
    kills: {},
    world_kills: 0,
    kills_by_means: {},
  };
  const killData = {
    killer: "<world>",
    victim: "Isgalamido",
    means: "Suicide",
  };
  const expectedMatchData = JSON.stringify({
    total_kills: 1,
    players: ["Isgalamido"],
    kills: { Isgalamido: -1 },
    world_kills: 1,
    kills_by_means: {
      Suicide: 1,
    },
  });

  const processedData = JSON.stringify(
    processKillEvent(initialMatchData, killData)
  );
  expect(processedData).toEqual(expectedMatchData);
});

test("processKillEvent should handle player kills", () => {
  const initialMatchData = {
    total_kills: 0,
    players: ["Zeh", "Isgalamido"],
    kills: { Zeh: 1 },
    world_kills: 0,
    kills_by_means: {},
  };
  const killData = {
    killer: "Zeh",
    victim: "Isgalamido",
    means: "Rocket Launcher",
  };
  const expectedMatchData = JSON.stringify({
    total_kills: 1,
    players: ["Zeh", "Isgalamido"],
    kills: { Zeh: 2 },
    world_kills: 0,
    kills_by_means: { "Rocket Launcher": 1 },
  });

  const processedData = JSON.stringify(
    processKillEvent(initialMatchData, killData)
  );
  expect(processedData).toEqual(expectedMatchData);
});

test("processKillEvent should handle first kill for a player", () => {
  const initialMatchData = {
    total_kills: 0,
    players: ["Zeh", "Isgalamido"],
    kills: { Zeh: 1 },
    world_kills: 0,
    kills_by_means: {},
  };
  const killData = {
    killer: "Isgalamido",
    victim: "Zeh",
    means: "Rocket Launcher",
  };
  const expectedMatchData = JSON.stringify({
    total_kills: 1,
    players: ["Zeh", "Isgalamido"],
    kills: { Zeh: 1, Isgalamido: 1 },
    world_kills: 0,
    kills_by_means: { "Rocket Launcher": 1 },
  });

  const processedData = JSON.stringify(
    processKillEvent(initialMatchData, killData)
  );
  expect(processedData).toEqual(expectedMatchData);
});
