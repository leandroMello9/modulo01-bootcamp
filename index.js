const express = require("express");
const app = express();

app.use(express.json());
//req.params = /users/2
//req.query = /users/1?teste=1
//Resquet Body = {"name": "Leandro", "email" : "leandrogalaxys3mini"}
//CRUD - Create, Read, Update, Delete
const users = ["Diego", "Leandro", "Gilson"];
app.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo ${req.method}: URL ${req.url}`);
  next();
  console.timeEnd("Request");
});
//Midlewares
function checkUsersExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;
  return next();
}

app.get("/users", (req, res) => {
  return res.json(users);
});

app.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

app.post("/users", checkUsersExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

app.put("/users/:index", checkUserInArray, checkUsersExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json({ users });
});

app.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});
app.listen(8080, console.log("Rodando na porta 8080"));
