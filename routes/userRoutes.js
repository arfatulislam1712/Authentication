// Express import 1
import express from 'express';
// Route Object Make  work 2 no
const router = express.Router();
import * as UsersController from "../app/controllers/UsersController.js";
import { VerifyToken } from '../app/middlewares/authMiddleware.js';




// Users

router.post("/Registration",UsersController.Registration);
router.get("/Login",UsersController.Login);
// Single User Profile Read
router.get("/SingleProfileRead",VerifyToken,UsersController.SingleProfileRead);

// All User Profile Read
router.get("/AllUserProfileRead",VerifyToken,UsersController.AllUserProfileRead);
// All User Profile Read
router.get("/SingleUserprofileupdate/:id",VerifyToken,UsersController.SingleUserprofileupdate);
router.delete("/DeleteSingleUser/:id",VerifyToken,UsersController.DeleteSingleUser);




// Router Export work 3 
export default router;
