const { Schema, mongoose } = require("mongoose");

const userActivitySchema = Schema(
  {
    user_id: { ref: "user", type: Schema.Types.ObjectId, required: true },
    login_date: { type: String, required: true },
    logout_date: { type: String },
    ip_address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_activity", userActivitySchema);
