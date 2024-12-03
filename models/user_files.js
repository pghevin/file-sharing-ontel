const { Schema, mongoose } = require("mongoose");

const userFilesSchema = Schema(
  {
    user_id: { ref: "user", type: Schema.Types.ObjectId, required: true },
    file_name: { type: String, required: true },
    file_type: { type: String, required: true },
    file_size: { type: String, required: true },
    uploaded_s3: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_files", userFilesSchema);
