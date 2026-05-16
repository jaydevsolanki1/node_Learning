const express = require("express");
const app = express();

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

// 1️⃣ Basic GET
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// 2️⃣ Route with Params
// URL: /user/123
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// 3️⃣ Multiple Params
// URL: /user/123/book/atomic
app.get("/user/:id/book/:title", (req, res) => {
  res.send(req.params);
});
// { id: "123", title: "atomic" }});

// 4️⃣ Query Params
// URL: /search?name=jaydev&age=21
app.get("/search", (req, res) => {
  res.send(req.query);
});
// { name: "jaydev", age: "21" }});

// 5️⃣ POST Route (Body JSON)
// POST /login with body { "username": "jaydev", "password": "1234" }
app.post("/login", (req, res) => {
  res.send(req.body);
});

// 6️⃣ PUT Route (Update data)
// PUT /user/123 with body { "city": "Rajkot" }
app.put("/user/:id", (req, res) => {
  res.send({ userId: req.params.id, updatedData: req.body });
});

// 7️⃣ DELETE Route
// DELETE /user/123
app.delete("/user/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted`);
});

// 8️⃣ JSON Response
app.get("/json", (req, res) => {
  res.json({ name: "jaydev", skill: "Node.js" });
});

// 9️⃣ JSONP Response
// URL: /jsonp?callback=myFunc
app.get("/jsonp", (req, res) => {
  res.jsonp({ message: "Hello with JSONP" });
});

// 🔟 All Methods Route
app.all("/test", (req, res) => {
  res.send(`This works for all HTTP methods (GET, POST, PUT, DELETE, etc.)`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
