import { Router } from "express";
const router = Router();
import * as userController from "./auth.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";



router.post("/signup" ,errorHandling(userController.signUp))
router.post("/login" ,errorHandling(userController.logIn))
router.get("/" ,errorHandling(userController.handleAuth))

router.route("/:_id")
.put(errorHandling(userController.updateUser)) 
.delete(errorHandling(userController.deleteUser)) 

export default router;
