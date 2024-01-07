import express from "express";
import createProject from "../controllers/projectController";

const projectRouter = express.Router();

projectRouter.post("/create_project", createProject);

export default projectRouter