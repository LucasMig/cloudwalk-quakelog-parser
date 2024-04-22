import { rankObjEntries } from "../settings/utils.js";

export function reportDeathCauses(jsonData) {
  const matches = Object.entries(jsonData);

  matches.forEach(([match, data]) => {
    const deathCauseRanking = rankObjEntries(data.kills_by_means);

    const tableHeader = `+-----------------+---------------+\n|           Death causes          |\n+-----------------+---------------+\n`;
    const tableBody = deathCauseRanking.reduce((acc, record, i) => {
      const [cause, count] = record;
      return `${acc}${i + 1}º ${cause.padEnd(18)} | ${count
        .toString()
        .padStart(4)} occurrences\n`;
    }, "");
    const tableFooter = "+-----------------+---------------+";

    console.log(`===== Death summary for ${match} =====\n
> Match ended with ${data.total_kills} kills in total.
    
${tableHeader}${tableBody}${tableFooter}\n`);
  });
}
