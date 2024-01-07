import mongoose, { Schema, Document } from "mongoose";

interface FileSystemNode {
  name: string;
  type: "file" | "folder";
  extension?: string;
  children?: FileSystemNode[];
}

interface IProject extends Document {
  name: string;
  fileSystem: FileSystemNode[];
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  fileSystem: { type: [Object], default: [] as FileSystemNode[] },
});

const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
