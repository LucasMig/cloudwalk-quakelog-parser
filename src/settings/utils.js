export function newGame() {
  return {
    total_kills: 0,
    players: [],
    kills: {},
    world_kills: 0,
    kills_by_means: {},
  };
}

export function extractKillData(line) {
  const killData = line.split(": ").pop().split(" killed ");
  // the line above leaves us with ["KILLER", "VICTIM by MEANS"]
  const killer = killData[0];
  const [victim, means] = killData[1].split(" by ");

  return { killer, victim, means };
}

export function extractPlayerName(line) {
  const lineAfterColon = line.split(": ")[1];
  const playerNameMatch = lineAfterColon.match(/n\\(.*?)\\t/);

  return playerNameMatch ? playerNameMatch[1] : "";
}
