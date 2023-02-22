const fs = require("fs")
const Engineer =require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");

const fillTemplate = require("./src/template.js");
const distDir = path.resolve(__dirname, "dist");
const distPath = path.join(distDir, "team.html");

const teamMembers = [];
const idArray = [];
// Let user know how to run application
console.log(
  `Team generator is active... \n To reset the team.html use "npm run reset".`
);
//display app menu with prompts for input to be generated into team.html
function appMenu() {
  //create manager card
  function createManager() {
    console.log(`Start building your team`);
    inquirer.prompt([
      {
        type:"input",
        name: "managerName",
        message: "What is the manager's name?",
        validate: (result) =>{
          if (result !== " "){
            return true;
          } else {
            return "Please enter Manager's name";
          }
        },
      },
      {
        type:"input",
        name: "managerId",
        message: "What is the manager's id number?",
        validate: (result) =>{
          const pass = result.match(/[^0-9]\D/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid Id number";
          }
        },
      },
      {
        type:"input",
        name: "managerEmail",
        message: "What is the manager's email address?",
        validate: (result) =>{
          const pass = result.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type:"input",
        name: "managerOfficeNum",
        message: "What is the manager's office number?",
        validate: (result) =>{
          const pass = result.match(/[^0-9]\D/)
          if (pass){
            return true;
          } else {
            return "Please enter a valid office number";
          }
        },
      },
    ])
    .then((result) => {
      const manager = new Manager(
        result.managerName,
        result.managerId,
        result.managerEmail,
        result.managerOfficeNum
        );
        teamMembers.push(manager);
        idArray.push(result.managerId);
        createTeam();
      }
    );
  }

  function createTeam(){
    inquirer.prompt([
      {
        type: "list",
        name: "memberRole",
        message: "What is the role of the team member you want to add next?",
        choices: [
          "Engineer",
          "Intern",
          "That's all for now!"
        ],
      },
    ])

    // options for next role to create
    .then((userChoice) => {
      switch (userChoice.memberRole){
        case "Engineer": addEngineer();
          break;
        case "Intern": addIntern();
          break;
          default: buildTeam();
      }
    }) ;
  }

  function addEngineer(){
    inquirer.prompt([
      {
        type:"input",
        name: "engineerName",
        message: "What is the engineer's name?",
        validate: (result) =>{
          if (result !== " "){
            return true;
          } else {
            return "Please enter engineer's name";
          }
        },
      },
      {
        type:"input",
        name: "engineerId",
        message: "What is the engineer's id number?",
        validate: (result) =>{
          const pass = result.match(/[^0-9]\D/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid Id number";
          }
        },
      },
      {
        type:"input",
        name: "engineerEmail",
        message: "What is the engineer's email address?",
        validate: (result) =>{
          const pass = result.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type:"input",
        name: "engineerGithub",
        message: "What is the engineer's Github username?",
        validate: (result) =>{
          if (result === " "){
            return "Please enter a valid github Username";
          } else {
            return true;
          }
        },
      },
    ])
    .then((result) => {
      const engineer = new Engineer(
        result.engineerName,
        result.engineerId,
        result.engineerEmail,
        result.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(result.engineerId);
        createTeam();
      }
    );

  }

  function addIntern(){
    inquirer.prompt([
      {
        type:"input",
        name: "internName",
        message: "What is the intern's name?",
        validate: (result) =>{
          if (result !== " "){
            return true;
          } else {
            return "Please enter intern's name";
          }
        },
      },
      {
        type:"input",
        name: "internId",
        message: "What is the intern's id number?",
        validate: (result) =>{
          const pass = result.match(/[^0-9]\D/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid Id number";
          }
        },
      },
      {
        type:"input",
        name: "internEmail",
        message: "What is the intern's email address?",
        validate: (result) =>{
          const pass = result.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          if (pass){
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type:"input",
        name: "internGithub",
        message: "What is the intern's Github username?",
        validate: (result) =>{
          if (result === " "){
            return "Please enter a valid github Username";
          } else {
            return true;
          }
        },
      },
    ])
    .then((result) => {
      const intern = new Intern(
        result.internName,
        result.internId,
        result.internEmail,
        result.internGithub
        );
        teamMembers.push(intern);
        idArray.push(result.internId);
        createTeam();
      }
    );
  }
// Check to make sure the distDir exists and create one if not then write content to distDir
  function buildTeam(){
    if(!fs.existsSync(distDir)){
      fs.mkdirSync(distDir);
    }
    fs.writeFileSync(distPath,fillTemplate(teamMembers),"utf-8");
  }

  createManager();
}

appMenu();
