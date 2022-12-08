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
          //ask about github
          inquirer
            .prompt([
              {
                type: "input",
                name: "school",
                message: "What is your school?",
              },
            ])
            .then(({ school }) => {
              employees.push(new Intern(name, id, email, school));

              another();
            });
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

    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="index.css">
        <title>My Team</title>
    </head>
    

<div class=container>
    ${employees
      .map((employee) => {
        let roleStatement;
        switch (employee.getRole()) {
          case "Engineer":
            roleStatement = `Github: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a>`;
            break;
          case "Manager":
            roleStatement = `Office Number: ${employee.getOfficeNumber()}`;
            break;
          case "Intern":
            roleStatement = `School: ${employee.getSchool()}`;
            break;
        }
        return `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${employee.getName()}</h5>
            <p class="card-text">${employee.getRole()}</p>
            ${roleStatement}
            <p>Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></p> 
            <p>Employee ID: ${employee.getId()}<p>
        </div>
    </div>
        `;
      })
      .join(" ")}
        </div>
    </div>
    `
  );
}

newEmployee();
