import { add, factorial } from './mathUtils';
import {Rainer} from './climb';

function main() {
  console.log(`2 + 3 = ${add(2, 3)}`);
  console.log(`5! = ${factorial(5)}`);

  let rainer = new Rainer("rainer", 14_000);
  let difficult = rainer.isDifficult() ? "very difficult" : "not difficult";
  console.log(`${rainer.name} is ${rainer.height} feet high and is ${difficult} to climb.`);
}

let person = {name: "bla"};
type Person = typeof person;
type PK = keyof Person;

console.log(typeof person);
console.log(typeof PK);

main();
