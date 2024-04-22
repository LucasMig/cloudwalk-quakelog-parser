# Quake Log Parser

This is a simple parser for Quake 3 Arena logs. It reads a log file and produces a JSON file grouping all the matches and their data.

## How to run

First, clone the repository and navigate to the project folder:

```bash
git clone https://github.com/LucasMig/cloudwalk-quakelog-parser.git
cd cloudwalk-quakelog-parser
```

To run the parser, you need to have Node.js installed. Then, you can simply run the entry point file:

```bash
node main.js
```

The parser will read the log file located at `./public/games.log` and will output the JSON file at `./public/parsedMatches.json`.

It will also print two types of reports to the console: a general match report with players ranked by score, and a death cause report with the number of deaths caused by each reason.

## How to test

To run the tests, you will need to install Jest, since the suites were wrote with it.

You can install it with npm and run the tests right away with the following commands:

```bash
npm install
npm run test
```

## Why this project?

This project was created as a challenge for a job application. It was a great opportunity to practice my skills with Node.js and Jest, and to learn more about the Quake 3 Arena log format.

The objectives were:

1. Create a parser that reads the log file, group game data of each match and collect kill data;
2. Create a script that prints a report of grouped information for each match;
3. Additionally, generate a report of deaths grouped by cause for each match.

I hope you enjoy the project! Feel free to reach out if you have any questions or suggestions.
