const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  created: Date,
  participantIn: [String],// Storing only the ids of the events participating in.
})

const User = model("User", UserSchema);
module.exports = User
