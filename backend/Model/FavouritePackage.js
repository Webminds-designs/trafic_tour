import mongoose from "mongoose";

const { Schema, model } = mongoose;

const FavoritePackageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("FavoritePackage", FavoritePackageSchema);
