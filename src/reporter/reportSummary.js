const { rankObjEntries } = require("../settings/utils.js");

function reportSummary(jsonData, dataKey) {
  const matches = Object.entries(jsonData);

  matches.forEach(([match, data]) => {
    const rankingData = rankObjEntries(data[dataKey]);

    const tableHeader = `+--------------+------------+\n|        ${dataKey.toUpperCase()}        |\n+--------------+------------+\n`;
    const tableBody = rankingData.reduce((acc, record, i) => {
      const [label, count] = record;
      return `${acc}${i + 1}º ${label.padEnd(12)} | ${count
        .toString()
        .padStart(4)} ${dataKey === "kills" ? "points" : "occurrences"}\n`;
    }, "");
    const tableFooter = "+--------------+------------+";

    console.log(`===== Summary for ${match} =====
> Match ended with ${data.total_kills} kills in total.

${tableHeader}${tableBody}${tableFooter}\n`);
  });
}

module.exports = { reportSummary };
