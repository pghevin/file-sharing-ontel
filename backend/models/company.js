const { Schema, mongoose } = require("mongoose");

const companySchema = Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true },
  },
  { timestamps: true }
);

companySchema.pre("save", () => {
  if (this.domain) {
    this.domain = this.domain.toLowerCase();
  }
});

module.exports = mongoose.model("company", companySchema);
