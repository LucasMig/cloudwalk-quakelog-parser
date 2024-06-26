function newGame() {
  return {
    total_kills: 0,
    players: [],
    kills: {},
    world_kills: 0,
    kills_by_means: {},
  };
}

function extractKillData(line) {
  const killData = line.split(": ").pop().split(" killed ");
  // the line above leaves us with ["KILLER", "VICTIM by MEANS"]
  const killer = killData[0];
  const [victim, means] = killData[1].split(" by ");

  return { killer, victim, means };
}

function extractPlayerName(line) {
  const lineAfterColon = line.split(": ")[1];
  const playerNameMatch = lineAfterColon.match(/n\\(.*?)\\t/);

  return playerNameMatch ? playerNameMatch[1] : "";
}

function rankObjEntries(kills) {
  return Object.entries(kills).sort((a, b) => b[1] - a[1]);
}

module.exports = {
  newGame,
  extractKillData,
  extractPlayerName,
  rankObjEntries,
};
