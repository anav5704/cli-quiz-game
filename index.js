#!/usr/bin/env node

import chalk from "chalk"
import chalkAnimation from "chalk-animation"
import inquirer from "inquirer"
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;

// Helper funtion to create a 2.5s delay
const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms))

const welcome = async () => {
    // Shows an animated gradinet text
    const title = chalkAnimation.rainbow("How well do you know the boys?\n")

    await sleep()
    title.stop()

    // Displays instructions after the delay
    console.log(`
        ${chalk.bgBlue("How to play:")}
        All you have to do is select who said the quote!
        The fake friends will be filtered out ${chalk.bgRed("MUHAHAHAHA")}
    `)

}

const askName = async () => {
    // Takes in user input and assigns it to the global playerName variable
    const input = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default(){
            return 'Player'
        }
    })

    playerName = input.player_name
}

const askQ1 = async () => {
    const input = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Why do you want power? The only power in the temple is God.",
        choices: ["Anav", "Veer", "Rohan", "Jasveen"]
    })

    return handleAnswer(input.question_1 == "Veer")
}

const askQ2 = async () => {
    const input = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Eeveryone can make a choice, but not eveyone can make the right choice.",
        choices: ["Indeevar", "Jasveen", "Sunesh", "Danvil"]
    })

    return handleAnswer(input.question_1 == "Jasveen")
}

const askQ3 = async () => {
    const input = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "I didn't eat the nutella, I AM THE NUTELLA!",
        choices: ["Soni", "Danvil", "Rohan", "Mesake"]
    })

    return handleAnswer(input.question_1 == "Rohan")
}

const askQ4 = async () => {
    const input = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Deez nuts.",
        choices: ["Anav", "Veer", "Vetaia", "Danvil"]
    })

    return handleAnswer(input.question_1 == "Vetaia")
}

const askQ5 = async () => {
    const input = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Sab SKILLS mange!",
        choices: ["Sunesh", "Rudr", "Jasveen", "Anav"]
    })

    return handleAnswer(input.question_1 == "Anav")
}

const handleAnswer = async (isCorrect) => {
    // Takes in boolean as a parameter and either congratulates the player or kills the game
    const spinner = createSpinner("Checking your answer...").start()
    await sleep()

    if(isCorrect){
        spinner.success({text: chalk.bgBlue(`Nice work ${playerName}`)}) 
    }
    else {
        spinner.error({text: chalk.bgRed(`${playerName} is a fake friend`)}) 
        process.exit(1)
    }
}

const winner = async () => {
    // Displays winning message if player gets all the questions right
    console.clear()
    figlet("BRO IS A TRUE FRIEND", (err, data) => {
        console.log(gradient.rainbow.multiline(data))
    })
}

await welcome()
await askName()
await askQ1()
await askQ2()
await askQ3()
await askQ4()
await askQ5()
await winner()



