import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISupplier extends Document {

  name: string;

  company: string;

  phone: string;

  email: string;

  address: string;

  city: string;

  paymentTerms: string;

  status: string;

}

const SupplierSchema = new Schema<ISupplier>(
  {

    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    paymentTerms: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
      ],
      default: "Active",
    },

  },
  {
    timestamps: true,
  }
);

const Supplier: Model<ISupplier> =
  mongoose.models.Supplier ||
  mongoose.model<ISupplier>(
    "Supplier",
    SupplierSchema
  );

export default Supplier;