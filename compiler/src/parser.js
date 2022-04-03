const nearley = require("nearley");
const grammar = require("./grammer.js");
const fs = require("mz/fs");

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.error("No filename specified. Please provide a .daggr file.");
    process.exit(1);
  }

  const code = (await fs.readFile(filename)).toString();
  // Create a Parser object from our grammar.
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // Parse something!
  parser.feed(code);
  if (parser.results.length > 1) {
    console.error(
      "Multiple parsings found. Please fix the grammar.(Ambiguous)"
    );
    const result = parser.results[0];
    const output = JSON.stringify(result, null, " ");
    const outputFilename = filename.replace(/\.daggr$/, ".ast");
    await fs.writeFile(outputFilename, output);
    console.log(`Wrote ${outputFilename}`);
  } else if (parser.results.length === 1) {
    const result = parser.results[0];
    const output = JSON.stringify(result, null, " ");
    const outputFilename = filename.replace(/\.daggr$/, ".ast");
    await fs.writeFile(outputFilename, output);
    console.log(`Wrote ${outputFilename}`);
  } else {
    console.error("No parsing found. Please fix the grammar.");
  }

  // parser.results is an array of possible parsings.
  // console.log(JSON.stringify(parser.results)); // [[[[["foo"],"\n"]]]]
}

main().catch((err) => console.error(err.stack));
