#!/usr/bin/env node

// import nanospinner from "nanospinner";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

console.clear();

let again = true;
let uid: number;
let current_balance: number;
let login : boolean = false;

type Statement = {
    amount: number;
    type: string;
}
let statement: Statement[] = [];

type user = {
    id: number;
    accountno: string;
    pin: number;
    accountholder: string;
    balance: number;
}

let users:user[] = [
    {
        id:0,
        accountno: "002021",
        pin: 1111,
        accountholder: 'Raheel',
        balance: 2000.00
    },{
        id:1,
        accountno: "002022",
        pin: 1112,
        accountholder: 'Sharjeel',
        balance: 1200.00
    }
];



// const welcomeMessage = async () =>  {
//     console.log('1');
//     let myPromise = new Promise(function (resolver) {
//         const spinner = nanospinner.createSpinner().start({ text: 'Initializing ATM', color: 'magenta' });
//         setTimeout(() => {
//             spinner.success();
//             resolver("ATM MACHINE");
//         }, 2000);
//     });

//     myPromise.then((value) => {
//         console.log(chalk.magentaBright(figlet.textSync("ATM MACHINE")));
//     });
// }



const inquire = async () => {

    const answers =  await inquirer.prompt([
        // {
        //     name: "accountnumber",
        //     message: "Please type your account number.:",
        //     type: "input",
        //     validate: function (input){    
        //         return isNaN(input)?  "You Enter an invalid number" : true;
        //     }
        // },
        {
            name: "pin",
            message: "Please type your PIN.",
            type: "input",
            validate: function (input){    
                return isNaN(input)?  "You Enter an invalid number" : true;
            }
        }
    ]);

  
    // let given_accountno = String(answers.accountnumber);
    let given_pin = Number(answers.pin);
   
    users.forEach((u, index)=>{
        // if (u.accountno === given_accountno && u.pin === given_pin) {
        if (u.pin === given_pin) {

            if(!current_balance){
                current_balance  = u.balance;   
            }
            
            login = true;
            uid = index;
            return false;
        }
    })

   if(login){
        
        // let account_holder: string = loginuser['accountholder'];
        // const spinner = nanospinner.createSpinner().start({ text: 'Getting Information...', color: 'magenta' });
        // setTimeout(() => {
        //     spinner.success();
            console.log(chalk.bgGreenBright(`Welcome MR. ${users[uid].accountholder}`));
          await  accounttype();
        // }, 2000);

   }else{
        console.log( chalk.bgRed('You entered an invalid account number or pin.'));
        await retry();
   }

}

type Actions = {
    option : "Balance Enquiry" | "Fast Cash" | "Cash Withdrawal" | "Fund Transfer" | "Mini Statement" | "Exit";
}

type AccountTypes = {
    accounttype : "Current" | "Saving" | "Default" | "Exit";
}

async function accounttype() {
    const types: AccountTypes =  await inquirer.prompt([
        {
            name: "accounttype",
            message: "Please Select Your Account Type: ",
            type: "list",
            choices: ["Current", "Saving", "Default", "Exit"]
        }
    ]);
    
    
    switch(types.accounttype){
      
       case "Current":
       case "Saving":
       case "Default":
            // const spinner = nanospinner.createSpinner().start({ text: 'Getting Account Information...', color: 'magenta' });
            // setTimeout(() => {
            //     spinner.success();
              await option();
            // }, 2000);
            break;
        case "Exit":
            await retry();
            break;
        default:
           break;
    }
}

async function option() {
    const actions:Actions =  await inquirer.prompt([
        {
            name: "option",
            message: "Please select from the options below",
            type: "list",
            choices: ["Balance Enquiry", "Fast Cash", "Cash Withdrawal", "Fund Transfer", "Mini Statement", "Exit"]
        }
    ]);
    
    
    switch(actions.option){
       case "Balance Enquiry":
            // const spinner = nanospinner.createSpinner().start({ text: 'Getting Information...', color: 'magenta' });
            // setTimeout(() => {
            //     spinner.success();
                console.log(chalk.bgGreenBright(`Your current balance is ${users[uid].balance}`));
            // }, 2000);
            break;

        case "Cash Withdrawal":

            const {withdrawal} =  await inquirer.prompt([
                {
                    name: "withdrawal",
                    message: "Please Enter Amount: ",
                    type: "input",
                    validate: function (input){    
                        return isNaN(input)?  "You Enter An Invalid Amount" : true;
                    }
                }
            ]);

            if(Number(withdrawal) > Number(users[uid].balance)){
                console.log(chalk.bgRedBright(`Insufficient Balance`));
            }else{
                users[uid].balance -= withdrawal;
                statement = [{
                    amount: withdrawal,
                    type: 'debit'
                }, ...statement];
            }
            break;
        case "Fast Cash":
            const {amountwithdrawal} = await inquirer.prompt([
                {
                    name: "amountwithdrawal",
                    message: "Please Select Amount: ",
                    type: "list",
                    choices: ["500", "1000", "5000", "10000", "Exit"]
                }
            ]);
            
            let currentbalance = users[uid].balance;

            if(Number(amountwithdrawal) > Number(currentbalance)){
                console.log(chalk.bgRedBright(`Insufficient Balance`));
            }else{
                
                switch (amountwithdrawal){
                    case "500":
                        users[uid].balance -= 500;

                        statement = [{
                            amount: 500,
                            type: 'debit'
                        }, ...statement];
                        
                        break;
                    case "1000":
                        users[uid].balance -= 1000;
                        statement = [{
                            amount: 1000,
                            type: 'debit'
                        }, ...statement] 
                        break;
                    case "5000":
                        users[uid].balance -= 5000;
                        statement.push({
                            amount: 5000,
                            type: 'debit'
                        });
                        break;
                    case "10000":
                        users[uid].balance -= 10000;
                        statement.push({
                            amount: 10000,
                            type: 'debit'
                        });
                        break;
                    case "Exit":
                        break;
                    default:
                        break;
                }

                // const spinner = nanospinner.createSpinner().start({ text: 'Processing Transaction', color: 'magenta' });
                // setTimeout(() => {
                //     spinner.success({text: 'Transaction successful'});
                    console.log(chalk.bgGreenBright(`Your Remaining Balance is: ${users[uid].balance}`));
                // }, 2000);
            }

            break;
        case "Fund Transfer":
            const {accountnumber, amount} =  await inquirer.prompt([
                {
                    name: "accountnumber",
                    message: "Please Enter Account Number: ",
                    type: "input",
                    validate: function (input){    
                        return isNaN(input)?  "You Enter An Invalid Account Number" : true;
                    }
                },{
                    name: "amount",
                    message: "Please Enter Amount: ",
                    type: "input",
                    validate: function (input){    
                        return isNaN(input)?  "You Enter An Invalid Amount" : true;
                    }
                }
            ]);

            if(Number(amount) > Number(users[uid].balance)){
                console.log(chalk.bgRedBright(`Insufficient Balance`));
            }else{
                users[uid].balance -= amount;
                statement = [{
                    amount: amount,
                    type: 'transfer'
                }, ...statement];
                break;
            }
            break;
        case "Mini Statement":
            let state_ment_balance: number = current_balance;
            console.log(`\nOpening Balance is ${current_balance}`);
            statement.reverse();
            statement.forEach((obj)=>{
                if(obj.type == "transfer"){
                    state_ment_balance -= obj.amount;
                    console.log(`Fund Transfer ${obj.amount} = ${state_ment_balance}`);
                }else if(obj.type == "debit"){
                    state_ment_balance -= obj.amount;
                    console.log(`Amount Debited ${obj.amount} = ${state_ment_balance}`);
                }else{
                    state_ment_balance += obj.amount;
                    console.log(`Amount Credited ${obj.amount} = ${state_ment_balance}`);
                }
            });
            console.log(`Closing Balance ${state_ment_balance}\n`);
        case "Exit":
            break;
    }
    // console.log(statement);
    await retry();
}


const retry = async () => {
    const {confirm} = await inquirer.prompt([
        {
            name: "confirm",
            message: "Do you want to make another transaction?",
            type: "confirm"
        }
    ]);
    again = confirm;
    if(!again){
        console.log(
            chalk.bgBlue(`Thank You`)
         )
    }
   
}


// const spinner = nanospinner.createSpinner().start({ text: 'Initializing ATM', color: 'magenta' });
// setTimeout( () => {
//     spinner.success();
//     console.log(chalk.magentaBright(figlet.textSync("ATM MACHINE")));
// }, 2000);
console.log(chalk.magentaBright(figlet.textSync("Welcome")));

do{   
    await inquire();
 }while(again)