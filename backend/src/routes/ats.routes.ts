
import multer from "multer";
import { Router } from "express";
import { analyzeResume } from "../controllers/ats.controller";
const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);

export default router;