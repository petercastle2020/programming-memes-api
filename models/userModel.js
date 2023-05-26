const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, confirmPassword) {
  if (!email || !password || !confirmPassword) {
    throw Error("All field must be filled.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    const user = await this.create({ email: email, password: hash });
    return user;
  });
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email: email });

  if (!user) {
    throw Error("It doesn't exist on database.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
