import { parseMatchData } from "./parser/parseMatchData.js";
import fs from "fs";
import { reportMatchInfo } from "./reporter/reportMatchInfo.js";
import { reportDeathCauses } from "./reporter/reportDeathCauses.js";

const quakeLog = "../public/qgames.log";
const testLog = "../public/sample.log";

const outputPath = "../public/parsedMatches.json";

function readLogFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }

      const lines = data.split(/\r?\n/).filter((line) => line.trim());
      resolve(lines);
    });
  });
}

async function main(logPath) {
  try {
    const lines = await readLogFile(logPath);
    const matches = parseMatchData(lines);
    reportMatchInfo(matches);
    // reportDeathCauses(matches);
    const jsonData = JSON.stringify(matches, null, 2);
    fs.writeFileSync(outputPath, jsonData);
    console.log(`Parsed data saved to ${outputPath}`);
  } catch (error) {
    console.error("Error parsing match data:", error);
  }
}

main(testLog);
