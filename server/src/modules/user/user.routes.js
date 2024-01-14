import { Router } from "express";
const router = Router();
import * as userController from "./user.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";

router
  .route("/")
  .post(errorHandling(userController.addUser))
  .get(errorHandling(userController.getAllUsers));

router
  .route("/:_id")
  .put(errorHandling(userController.updateUser))
  .delete(errorHandling(userController.deleteUser));

export default router;
