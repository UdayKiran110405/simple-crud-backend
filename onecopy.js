const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory database
let users = [{ id: 0, name: "ali", email: "ali@gmail.com" },{id: 1, name: "ahmed", email: "ahmed@gmail.com"}];
let idCounter = 2;

//welcome page
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: idCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user by ID
app.patch("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
