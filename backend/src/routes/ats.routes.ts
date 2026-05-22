// import express from "express";
import multer from "multer";
// import { analyzeResume } from "../controllers/ats.controller.js";

// const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

// router.post(
//     "/analyze",
//     upload.single("resume"),
//     analyzeResume
// );

// export default router;

import { Router } from "express";
import { analyzeResume } from "../controllers/ats.controller";

const router = Router();

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);

export default router;