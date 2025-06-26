const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authType === "local"; //not required when using google
      },
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    authType: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //do not hash id authtype is google
  if (this.authType === "google") return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
