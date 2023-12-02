import * as fs from "fs";

const tablOrigin: string[] = fs
  .readFileSync("./2023/day2/input.txt", "utf-8")
  .split("\n")
  .map((value) => value.split(":")[1]);

//create class with a letter symbolising color and a number of appearances
class Color {
  color: string;
  number: number;
  constructor(number: number, color: string) {
    this.color = color;
    this.number = number;
  }
  printer(): void {
    console.log(this.color, this.number);
  }
}

const number_per_color_per_gamesets_per_line: Color[][][] = tablOrigin.map(
  (value) =>
    value.split(";").map((value) =>
      value.split(",").map((value) => {
        value = value.trim();
        let color_score = new Color(
          parseInt(value.split(" ")[0]),
          value.split(" ")[1]
        );
        //color_score.printer();
        return color_score;
      })
    )
);

// Part 1

function check_color_appearance(
  limits: number[],
  number_per_color_per_gamesets_per_line: Color[][][]
): number {
  let result: number = 0;
  number_per_color_per_gamesets_per_line.map((value, gameId) => {
    let game_possible: boolean = true;
    value.map((value) => {
      let sub_game_possible: any = true;
      value.map((value) => {
        switch (value.color) {
          case "red":
            if (value.number > limits[0]) {
              sub_game_possible = false;
            }
            break;
          case "green":
            if (value.number > limits[1]) {
              sub_game_possible = false;
            }
            break;
          case "blue":
            if (value.number > limits[2]) {
              sub_game_possible = false;
            }
            break;
          default:
            break;
        }
      });
      if (sub_game_possible == false) {
        game_possible = false;
      }
    });
    if (game_possible == true) {
      result += gameId + 1;
    }
  });
  return result;
}

console.log(
  check_color_appearance([12, 13, 14], number_per_color_per_gamesets_per_line)
);

// Part 2

function totalGameScore(
  number_per_color_per_gamesets_per_line: Color[][][]
): number {
  let result: number = 0;
  number_per_color_per_gamesets_per_line.map((value) => {
    let game_min_red: number = 0;
    let game_min_green: number = 0;
    let game_min_blue: number = 0;
    value.map((value) => {
      value.map((value) => {
        switch (value.color) {
          case "red":
            if (value.number > game_min_red) {
              game_min_red = value.number;
            }
            break;
          case "green":
            if (value.number > game_min_green) {
              game_min_green = value.number;
            }
            break;
          case "blue":
            if (value.number > game_min_blue) {
              game_min_blue = value.number;
            }
            break;
          default:
            break;
        }
      });
    });
    let game_score: number = game_min_red * game_min_green * game_min_blue;
    result += game_score;
  });
  return result;
}

console.log(totalGameScore(number_per_color_per_gamesets_per_line));
