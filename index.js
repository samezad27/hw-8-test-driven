const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const employees = [];

// const

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
  console.log("hello");
  inquirer
    .prompt([
      {
        type: "list",
        name: "position",
        message: "What position is this employee?",
        choices: ["Manager", "Intern", "Engineer"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the employee?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the email of the employee?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the id of the employee?",
      },
    ])
    .then(({ position, email, id, name }) => {
      switch (position) {
        case "Manager":
          //ask about office number
          inquirer
            .prompt([
              {
                type: "input",
                name: "officeNumber",
                message: "What is the office number?",
              },
            ])
            .then(({ officeNumber }) => {
              employees.push(new Manager(name, id, email, officeNumber));

              another();
            });
          break;

        case "Intern":
          //ask about school
          break;

        case "Engineer":
          //ask about github
          inquirer
          .prompt([
            {
              type: "input",
              name: "github",
              message: "What is your github?",
            },
          ])
          .then(({ github }) => {
            employees.push(new Engineer(name, id, email, github));

            another();
          });
        break;

        default:
      }
    });
}

function another() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "more",
        message: "Create another?",
      },
    ])
    .then(({ more }) => {
      if (more) newEmployee();
      else renderHTMLFile();
    });
}

function renderHTMLFile() {
  fs.writeFileSync(
    "./index.html",
    `
    


    <ul>
    

        ${employees.map(
          (employee) => `
            <li>${employee.getRole()}</li>
            
        `
        )}

        ${employees.map(
          (employee) => `
            <li>${employee.getName()}</li>
        `
        )}

        
        ${employees.filter((employee)=>employee.getRole() === "Engineer").map(
          (employee) => `
        <li>${employee.getGithub()}</li>
        `

      )}
        
    </ul>
    `
  );
}

newEmployee();
