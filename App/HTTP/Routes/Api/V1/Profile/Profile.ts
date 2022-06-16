import * as express from "express";
import ProfileController from "../../../../Controllers/Api/V1/Profile/Profile";
import container from "../../../../../Infrastructure/IocContainer/container";

const profileController = container.resolve(ProfileController);
const router = express.Router({mergeParams: true});

router.post("/profile", profileController.createProfile);
router.get(`/profile/all`, profileController.fetchAllProfiles);
router.put("/profile/:profileId", profileController.updateProfile);
router.get("/profile/:profileId", profileController.fetchProfileById);
router.delete("/profile/:profileId", profileController.removeProfile);

export default router;