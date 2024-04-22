import { rankPlayersByKills } from "../settings/utils.js";

export function reportMatchInfo(jsonData) {
  const matches = Object.entries(jsonData);

  matches.forEach(([match, data]) => {
    const playerRanking = rankPlayersByKills(data.kills);

    const tableHeader = `+--------------+------------+\n|        Leaderboard        |\n+--------------+------------+\n`;
    const tableBody = playerRanking.reduce((acc, record, i) => {
      const [playerName, kills] = record;
      return `${acc}${i + 1}º ${playerName.padEnd(12)} | ${kills
        .toString()
        .padStart(4)} points\n`;
    }, "");
    const tableFooter = "+--------------+------------+";

    console.log(`===== Summary for ${match} =====\n
> Match ended with ${data.total_kills} kills in total.

${tableHeader}${tableBody}${tableFooter}

==============================`);
  });
}
