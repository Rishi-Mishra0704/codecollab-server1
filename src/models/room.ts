import mongoose, { Schema, Document, Types } from "mongoose";
import { IProject } from "./project";

interface IRoom extends Document {
  host: Types.ObjectId; // user creating the room
  members: Types.ObjectId[]; // users who joined the room
  projects: Types.ObjectId[]; // array of projects in the room
}

const roomSchema = new Schema<IRoom>({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});
const RoomModel = mongoose.model<IRoom>("Room", roomSchema);
export { RoomModel, IRoom };
