import { Request, Response } from "express";
import { IRoom, RoomModel } from "../models/room";
import { IProject, projectModel } from "../models/project";
// Create a new room
const createRoom = async (req: Request, res: Response) => {
  try {
    // Extract room details from the request body
    const { host, roomName, members, projects } = req.body;

    // Validate the required fields
    if (!host || !roomName) {
      return res.status(400).json({ error: "Some fields are missing" });
    }

    // Create a new room instance
    const newRoom: IRoom = new RoomModel({
      host,
      roomName,
      members,
      projects,
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();

    // Return the saved room as a response
    return res.status(201).json(savedRoom);
  } catch (error) {
    // Handle any errors that occurred during room creation
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRoomDetails = async (req: Request, res: Response) => {
  try {
    // Extract room ID from the request parameters
    const roomId: string = req.params.roomId;

    // Fetch room details from the database
    const roomDetails: IRoom | null = await RoomModel.findById(roomId)
      .populate("host", "username email") // Populate host details
      .populate("members", "username email") // Populate members details
      .populate({
        path: "projects",
        populate: {
          path: "fileSystem",
        },
      })
      .exec();

    // Check if the room exists
    if (!roomDetails) {
      return res.status(404).json({ error: "Room not found." });
    }

    // Return the room details as a response
    return res.status(200).json(roomDetails);
  } catch (error) {
    // Handle any errors that occurred during the process
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createRoom, getRoomDetails };
