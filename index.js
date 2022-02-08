#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import Audic from "audic";
import { getPhoto } from "./api.js";
import link from "terminal-link";
import blessed from "blessed";
import contrib from "blessed-contrib";
import open from "open";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

let visitorName;

async function welcome() {
  const audic = new Audic("./retro-game-music.mp3");
  await audic.play();
  await getPhoto();

  const title = chalkAnimation.karaoke("Hello, this is Furkan!\n", 1);

  await sleep();
  title.stop();

  console.log(`
  I'm a software developer who loves front-end technologies. 
  Currently, I'm working for ${link(chalk.hex('#0870d8').bold('GE'), "https://www.ge.com")} and living in Istanbul, Turkey. 
  I try to build things on my ${link(chalk.greenBright('GitHub profile'), "https://github.com/ffcabbar")} that I have fun with it. 
  I love ${chalk.bold.yellow('JavaScript')} and ${chalk.bold.blue('TypeScript')}.
`);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "visitor_name",
    type: "input",
    message: "What is your name?",
  });
  visitorName = answer.visitor_name;
}

async function askContact() {
  const answer = await inquirer.prompt({
    name: "ask_contact",
    type: "list",
    message: `Hi ${visitorName}, Do you want to contact me?\n`,
    choices: ["😀 Yes, I want to", "😡 No!"],
  });

  if (answer.ask_contact === "😀 Yes, I want to") {
    console.log(`Great! 👾`);
  } else {
    console.log(`Okay, take care! 👋`);
    process.exit(0);
  }
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: `There you go ${visitorName} 🚀🚀🚀\n`,
    choices: [
      {
        name: chalk.green(
          `Check out my open-source projects on (${chalk.bold("GitHub")})`
        ),
        value: "https://github.com/ffcabbar",
      },
      {
        name: chalk.cyan(`Follow me on (${chalk.bold("Twitter")})`),
        value: "https://twitter.com/imloods",
      },
      {
        name: chalk.blue(`Connect with me on (${chalk.bold("LinkedIn")})`),
        value: "https://www.linkedin.com/in/ffcabbar",
      },
    ],
  });
  await open(answer.question_1);
}

async function question2() {
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: `Do you want to see something cool?\n`,
    choices: ["😀 Yes, I want to", "😡 No!"],
  });

  if (answer.question_2 === "😀 Yes, I want to") {
    drawMap();
  } else {
    console.log(`Okay, take care! 👋`);
    process.exit(0);
  }
}

async function drawMap() {
  const screen = blessed.screen({
    smartCSR: true,
  });
  const map = contrib.map({
    label: `The red one is my current location. Yellows are places I would love to see and explore. Press ESC or Q to exit.`,
  });
  screen.append(map);
  map.addMarker({ lon: "28.9784", lat: "41.0082", color: "yellow" });
  map.addMarker({ lon: "-100.0000", lat: "31.0000" });
  map.addMarker({ lon: "-118.2437", lat: "34.0522" });
  map.addMarker({ lon: "-74.0060", lat: "40.7128" });
  map.addMarker({ lon: "-21.8277", lat: "64.1282" });
  map.addMarker({ lon: "4.8951", lat: "52.3702" });
  map.addMarker({ lon: "139.8394", lat: "35.6528" });

  screen.render();
  screen.key(["escape", "q", "C-c"], () => {
    screen.destroy();
    goodbye();
  });
}

function goodbye() {
  console.clear();
  figlet(`Goodbye , ${visitorName} !\n Have a great day!`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");
    process.exit(0);
  });
}

console.clear();
await welcome();
await askName();
await askContact();
await question1();
await question2();
