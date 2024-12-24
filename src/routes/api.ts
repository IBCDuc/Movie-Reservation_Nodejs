import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { MovieController } from "../app/controller/MovieController";
import { upload } from "../middleware/upload";
const router = express.Router();



router.get("/get-user", UserController.getUser);
router.get("/user/:id", UserController.getUserById);
router.get("/single-movie/:id", MovieController.getMovieBaseUrl)
router.post("/add-user", UserController.addUser)
router.post('/upload-avatar', upload.single('avatar'), UserController.uploadAvatar);
router.put(
    '/update-info/:id',
    upload.single('avatar'),
    UserController.updateUserInfo
);

export default router;
