#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
let again = true;
clear();
function welcomeMessage(message) {
    console.log(chalk.blue(figlet.textSync(message)));
}
async function getInputsFromUsers() {
    const answers = await inquirer.prompt([
        {
            name: "firstnumber",
            message: "Enter First Number:",
            type: "input",
            validate: function (input) {
                return isNaN(input) ? "You Enter an invalid number" : true;
            }
        },
        {
            name: "operator",
            message: "Enter an Operator:",
            type: "list",
            choices: ["+", "-", "/", "%", "*", "^"]
        },
        {
            name: "secondnumber",
            message: "Enter Second Number:",
            type: "input",
            validate: function (input) {
                return isNaN(input) ? "You Enter an invalid number" : true;
            }
        }
    ]);
    const firstnumber = Number(answers.firstnumber);
    const secondnumber = Number(answers.secondnumber);
    switch (answers.operator) {
        case "+":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber + secondnumber}`);
            break;
        case "-":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber - secondnumber}`);
            break;
        case "*":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber * secondnumber}`);
            break;
        case "/":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber / secondnumber}`);
            break;
        case "%":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber % secondnumber}`);
            break;
        case "^":
            console.log(`\x1b[32m%s\x1b[0m`, `Result = ${firstnumber ** secondnumber}`);
            break;
    }
    const { confirm } = await inquirer.prompt([
        {
            name: "confirm",
            message: "Do you want to retry again?",
            type: "confirm"
        }
    ]);
    again = confirm;
}
welcomeMessage("WELCOME TO Ra-Calculator");
do {
    await getInputsFromUsers();
} while (again);
