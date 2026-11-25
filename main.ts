// Fortune Cookie for the Liquidated Trader
// make.fun competition: u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c
//
// The program writes a single fortune-cookie line to /output/entry.txt:
// at most 20 words, 1-160 characters, plain text, one line.
//
// The fortune is assembled from three parts so the voice stays oracular
// and the punchline lands last:
//   1. the promise - the classic cookie opening
//   2. the turn    - the fortune shrinks and gets wiser
//   3. the sting   - the trader's loss, named by what is gone

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_WORDS = 20;
const MAX_CHARS = 160;

// The promise: a real fortune cookie opens with a great fortune ahead.
const PROMISE = "A great fortune awaits you";

// The turn: the fortune is not great in the way the trader hoped.
const TURN = "smaller, wiser";

// The sting: what the liquidation took - the leverage itself.
const STING = "and no longer leveraged";

// Join the parts with the cookie's own punctuation: a colon after the
// promise, a comma inside the turn, so the whole line reads in one breath.
function buildFortune(): string {
  return `${PROMISE}: ${TURN}, ${STING}.`;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

// The gate refuses anything over 20 words or 160 characters, so check
// both here and fail loudly instead of shipping an invalid entry.
function validate(text: string): void {
  if (text.trim().length === 0) throw new Error("fortune is empty");
  if (text.length > MAX_CHARS) {
    throw new Error(`fortune is ${text.length} chars, over the ${MAX_CHARS} cap`);
  }
  const words = wordCount(text);
  if (words > MAX_WORDS) {
    throw new Error(`fortune is ${words} words, over the ${MAX_WORDS} cap`);
  }
  if (text.includes("\n")) throw new Error("fortune must be a single line");
}

function main(): void {
  const fortune = buildFortune();
  validate(fortune);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, fortune, "utf8");
  console.log(fortune);
}

main();
