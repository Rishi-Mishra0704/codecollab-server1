import { Request, Response } from "express";
import { RoomModel } from "../models/room";
import { IProject, projectModel } from "../models/project";

// Create a new project
const createProject = async (req: Request, res: Response) => {
  try {
    // Extract project details from the request body
    const { name, fileSystem, roomId } = req.body;

    // Validate the required fields
    if (!name || !fileSystem || !roomId) {
      return res
        .status(400)
        .json({ error: "Name and fileSystem and roomID are required fields." });
    }

    // Create a new project instance
    const newProject: IProject = new projectModel({
      name,
      fileSystem,
      roomId,
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Update the room's projects field
    const room = await RoomModel.findByIdAndUpdate(
      roomId,
      { $push: { projects: savedProject._id } },
      { new: true }
    );

    // Return the saved project as a response
    return res.status(201).json(savedProject);
  } catch (error) {
    // Handle any errors that occurred during project creation
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createProject;
