import express from "express";
import { createRoom, getRoomDetails } from "../controllers/roomController";

const roomRouter = express.Router();

roomRouter.get("/get_room/:room_id", getRoomDetails);
roomRouter.post("/create_room", createRoom);

export default roomRouter;
