const { Schema, mongoose } = require("mongoose");

const userFolders = Schema(
  {
    folder_name: { type: String, required: true },
    user_id: { ref: "user", type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("folders", userFolders);
