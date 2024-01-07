import mongoose, { Schema, Document, Types } from "mongoose";

interface FileSystemNode {
  name: string;
  type: "file" | "folder";
  extension?: string;
  children?: FileSystemNode[];
}

interface IProject extends Document {
  name: string;
  fileSystem: FileSystemNode[];
  roomId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  fileSystem: { type: [Object], default: [] as FileSystemNode[] },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
});

const projectModel = mongoose.model<IProject>("Project", projectSchema);

export { projectModel, IProject };
