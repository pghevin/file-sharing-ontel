const { Schema, mongoose } = require("mongoose");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company_id: { ref: "company", type: Schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", () => {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
});

module.exports = mongoose.model("user", userSchema);
