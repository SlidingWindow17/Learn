import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "./db.js";
import "dotenv/config";
import { UserModel, TodoModel } from "./model.js";

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  res.send("Signup Success");
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (hashedPassword) {
    const token = jwt.sign({ email: user.email, obj_id: user._id }, JWT_SECRET);
    res.send(token);
  } else {
    res.send("Invalid username or password");
  }
});

app.post("/create-todo", async (req, res) => {
  const { token } = req.headers;
  const { title } = req.body;
  try {
    const check = jwt.verify(token, JWT_SECRET);
    if (check) {
      const userEmail = check.email;
      const userObjId = check.obj_id;

      await TodoModel.create({
        user: userObjId,
        title: title,
      });
      res.send("Todo added");
    }
  } catch (error) {
    res.send("Invalid token");
  }
});

app.get("/alldata", async (req, res) => {
  try {
    const { token } = req.headers;
    const check = jwt.verify(token, JWT_SECRET);
    if (check) {
      const userAllTodo = TodoModel.find({ user: check.obj_id });
      console.log(userAllTodo);
      res.send(check);
    }
  } catch (error) {
    res.send("Invalid Token");
  }
});

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`);
});

dbConnect();
