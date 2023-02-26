const generateTeam = team => {

  const generateManager = manager => {
    return `
    <div class = "card">
      <div class="card-head">
        <h2>${manager.getName()}</h2>
        <h3>${manager.getRole()}</h3>
      </div>
      <div class="card-body">
        <ul class="info-list">
          <li class="id-num">ID: ${manager.getId()}</li>
          <li class="email">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
          <li class="off-num">Office Number: ${manager.getOfficeNum()}</li>
        </ul>
      </div>
    </div>
    `;
  };
  const generateEngineer = engineer => {
    return `
    <div class = "card">
        <div class="card-head">
          <h2>${engineer.getName()}</h2>
          <h3>${engineer.getRole()}</h3>
        </div>
        <div class="card-body">
          <ul class="info-list">
            <li class="id-num">ID: ${engineer.getId()}</li>
            <li class="email">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li class="github">Github: <a href="https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></li>
          </ul>
        </div>
      </div>
    `;
  };
  const generateIntern = intern => {
    return `
    <div class = "card">
      <div class="card-head">
        <h2>${intern.getName()}</h2>
        <h3>${intern.getRole()}</h3>
      </div>
      <div class="card-body">
        <ul class="info-list">
          <li class="id-num">ID: ${intern.getId()}</li>
          <li class="email">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
          <li class="school">School: ${intern.getSchool()}</li>
        </ul>
      </div>
    </div>
    `;
  };


  const html = [];
  html.push(
    team.filter(employee => employee.getRole() === "Manager")
    .map(manager =>  generateManager(manager))
  );
  html.push(
    team.filter(employee => employee.getRole() === "Engineer")
    .map(engineer =>  generateEngineer(engineer))
    .join("")
  );
  html.push(
    team.filter(employee => employee.getRole() === "Intern")
    .map(intern =>  generateIntern(intern))
    .join("")
  );

  return html.join("");
};

module.exports = team => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Team</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>My Team</h1>
  </header>
  <main class="container">
    ${generateTeam(team)}
  </main>
</body>
</html>
  `;
};

