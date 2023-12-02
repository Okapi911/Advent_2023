import * as fs from "fs";

const tablOrigin: string[] = fs
  .readFileSync("./2023/day1/input1.txt", "utf-8")
  .split("\n");

let set_of_numbers = new Set();
let written_num = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
written_num.map((value) => {
  set_of_numbers.add(value);
});

function searchInt(line: string[], written_number = false): string[] {
  let value_first_number: string | undefined = undefined;
  let value_last_number: string | undefined = undefined;
  let int_base10: string = "0123456789";
  line.map((value, index) => {
    if (int_base10.includes(value)) {
      if (value_first_number === undefined) {
        value_first_number = value;
      }
      value_last_number = value;
    }
    if (written_number) {
      for (let i: number = 2; i < 5; i++) {
        if (set_of_numbers.has(line.slice(index, index + i + 1).join(""))) {
          if (value_first_number === undefined) {
            value_first_number = line.slice(index, index + i + 1).join("");
          }
          value_last_number = line.slice(index, index + i + 1).join("");
          break;
        }
      }
    }
  });
  if (value_first_number === undefined) {
    value_first_number = "0";
  }
  if (value_last_number === undefined) {
    value_last_number = "0";
  }
  return [value_first_number, value_last_number];
}

// Part 1

let part1_result: number = 0;

tablOrigin.map((value, index) => {
  const value_array: string[] = value.split("");
  const first_and_last = searchInt(value_array);
  const first_number: string = first_and_last[0];
  const last_number: string = first_and_last[1];
  /*console.log(first_number, last_number);*/
  part1_result += parseInt(first_number + last_number);
});

console.log(part1_result);

//Part 2

let part2_result: number = 0;

let dico_to_int: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

tablOrigin.map((value, index) => {
  const value_array: string[] = value.split("");
  const first_and_last = searchInt(value_array, true);
  const first_number: string = first_and_last[0];
  const last_number: string = first_and_last[1];
  part2_result += toInt(first_number) * 10 + toInt(last_number);
});

function toInt(number_weirdly_formatted: string): number {
  if (!isNaN(parseInt(number_weirdly_formatted))) {
    return parseInt(number_weirdly_formatted);
  } else {
    return dico_to_int[number_weirdly_formatted];
  }
}

console.log(part2_result);
