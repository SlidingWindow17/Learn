import { model, mongoose, Schema } from "mongoose";
const ObjectId = Schema.ObjectId;

const user = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
});

const todo = new Schema({
  user: ObjectId,
  title: String,
});

export const UserModel = mongoose.model("todo_users", user);
export const TodoModel = mongoose.model("todo_todos", todo);
