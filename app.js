const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

function validateInput (input) {
    if (input !== "") {
        return true;
    } else {
        return "Please enter input!";
    }
}

function validateID (input) {
    if (input !== "") {
        if (/^\d+$/.test(input)) {
            return true;
        } else {
            return "Invalid ID (must be a number)!";
        }
    } else {
        return "Please enter input!";
    }
}

function validateEmail (input) {
    if (input !== "") {
        if (/^[A-Za-z0-9_\.]+@[A-Za-z0-9]+\.[A-Za-z]+$/i.test(input)) {
            return true;
        } else {
            return "Invalid email address (must follow the format address@email.com)!";
        }
    } else {
        return "Please enter input!";
    }
}

const addManager = async (answers) => {
    try {
        const {name, id, email, officeNumber} = answers;
        const manager = new Manager(name, id, email, officeNumber);
        const generated = await fillTemplate(manager);      
        await writeFileAsync("./templates/generated.html", generated, "utf8");    
    } catch (error) {
        console.log(error);
    }
}

const addIntern = async (answers) => {
    try {
        const {name, id, email, school} = answers;
        const intern = new Intern(name, id, email, school);  
        const generated = await fillTemplate(intern);      
        await appendFileAsync("./templates/generated.html", generated, "utf8");    
    } catch (error) {
        console.log(error);
    }
}

const addEngineer = async (answers) => {
    try {
        const {name, id, email, github} = answers;
        const engineer = new Engineer(name, id, email, github);        
        const generated = await fillTemplate(engineer);      
        await appendFileAsync("./templates/generated.html", generated, "utf8"); 
    } catch (error) {
        console.log(error);
    }   
}

const fillTemplate = async (employee) => {
    try {
        const template = await readFileAsync(
            `./templates/${employee.getRole().toLowerCase()}.html`,
            "utf8");
        return eval("`" + template + "`");
    } catch (error) {
        console.log(error);
    }
}

const writeRoster = async () => {
    try {
        await promptUser();
        const indexHTML = await readFileAsync(
            "./templates/index.html", "utf8");
        const indexHTMLArr = indexHTML.split("*"); 
        const generated = await readFileAsync(
        "./templates/generated.html", "utf8");
        await writeFileAsync("./output/team.html",
            indexHTMLArr[0] + generated + indexHTMLArr[1],
            "utf-8");
    } catch (error) {
        console.log(error);
    }
}

const promptUser = async () => {
    const questions = [
        {
            type: "list",
            name: "title",
            message: "What type of employee are you adding?",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            message: "Please enter employee's name:",
            name: "name",
            validate: validateInput
        },
        {
            type: "input",
            message: "Please enter employee's ID:",
            name: "id",
            validate: validateID
        },
        {
            type: "input",
            message: "Please enter employee's email address:",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "Please enter employee's GitHub:",
            name: "github",
            validate: validateInput,
            when: answers => answers.title === "Engineer"
        },
        {
            type: "input",
            message: "Please enter employee's school:",
            name: "school",
            validate: validateInput,
            when: answers => answers.title === "Intern"
        },
        {
            type: "confirm",
            message: "\nAdd another employee to your team?",
            name: "another",
            default: false
        }
    ];

    try {
        const {another, title, ...answers} = await inquirer.prompt(questions);
        if (title === "Intern") {
            await addIntern(answers);
        } else {
            await addEngineer(answers);
        }
        return another ? promptUser() : null;
    } catch (error) {
        console.log(error);
    }
}

inquirer.prompt([
    {
        type: "input",
        message: "Please enter the team manager's name:",
        name: "name",
        validate: validateInput
    },
    {
        type: "input",
        message: "Please enter the manager's ID:",
        name: "id",
        validate: validateID
    },
    {
        type: "input",
        message: "Please enter the manager's email address:",
        name: "email",
        validate: validateEmail
    },
    {
        type: "input",
        message: "Please enter the manager's office number:",
        name: "officeNumber",
        validate: validateInput
    }
]).then(answers => {
    addManager(answers);
    console.log("\nAdd employees to the team:")
    writeRoster();
}).catch(error => {
    if (error) {
        console.log(error);
    }
});
