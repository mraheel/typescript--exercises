import inquirer from "inquirer";
import chalk from "chalk";
let again = false;
let score = 0;
console.log(chalk.bgYellowBright('Welcome to Guess a Number Game'));
async function guessRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const { numberinput } = await inquirer.prompt([
        {
            name: "numberinput",
            type: "input",
            message: chalk.bold("Guess the Number between 0 to 10: "),
            validate: function (input) {
                return isNaN(input) || (input < 0 || input > 10) ? "You enter an invalid number." : true;
            }
        }
    ]);
    if (numberinput == randomNumber) {
        score += 10;
        console.log(chalk.greenBright('Congrats you guess the right number.'));
    }
    else {
        if (score >= 5) {
            score -= 5;
        }
        console.log(chalk.red('Oppss number not matched.'));
    }
    const { retry } = await inquirer.prompt([
        {
            name: "retry",
            message: chalk.bold("Do you want to try it again?"),
            type: "confirm",
        }
    ]);
    again = retry;
    if (!again) {
        console.log(chalk.green(chalk.bold(`Your Score is ${score}`)));
    }
}
do {
    await guessRandomNumber();
} while (again);
