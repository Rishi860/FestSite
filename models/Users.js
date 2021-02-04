const { model, Schema } = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate");

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

// Adds User.paginate({})
// UserSchema.plugin(mongoosePaginate);

const User = model("User", UserSchema);
module.exports = User
