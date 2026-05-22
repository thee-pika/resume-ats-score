

import { Request, Response } from "express";

import extractText
    from "../utils/extractText";

import {
    analyzeResumeService
} from "../services/ats.service";

export const analyzeResume = async (
    req: Request,
    res: Response
) => {

    try {
        const file = req.file;

        const {
            jobDescription
        } = req.body;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Resume file missing",
            });
        }


        const resumeText =
            await extractText(file);

            console.log("resumeText", resumeText);
               console.log("jobDescription", jobDescription);

        const result =
            analyzeResumeService({
                resumeText,
                jobDescription,
            });

        res.json({
            success: true,
            ...result,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Something went wrong",
        });
    }
};