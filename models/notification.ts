import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["SALE", "LOW_STOCK", "INVENTORY"],
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>(
    "Notification",
    NotificationSchema
  );

export default Notification;