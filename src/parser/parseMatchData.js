const {
  extractKillData,
  extractPlayerName,
  newGame,
} = require("../settings/utils.js");
const { processKillEvent } = require("./processKillEvent.js");

function parseMatchData(lines) {
  const matches = {};
  let currentMatchData = null;
  let matchCount = 1;

  lines.forEach((line) => {
    if (line.includes("ClientUserinfoChanged:")) {
      const playerName = extractPlayerName(line);
      currentMatchData.players.push(playerName);
    }

    if (line.includes("Kill:")) {
      const killData = extractKillData(line);
      currentMatchData = processKillEvent(currentMatchData, killData);
    }

    if (
      line.includes("ShutdownGame:") ||
      (currentMatchData && line.includes("InitGame:"))
    ) {
      currentMatchData.players = [...new Set(currentMatchData.players)];
      matches[`game_${matchCount}`] = currentMatchData;
      matchCount++;
      currentMatchData = null;
    }

    if (!currentMatchData && line.includes("InitGame:")) {
      currentMatchData = newGame();
    }
  });

  return matches;
}

module.exports = { parseMatchData };
