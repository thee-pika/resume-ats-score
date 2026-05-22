// import { Request, Response } from "express";

// import { analyzeResumeService }
// from "../services/ats.service";

// export const analyzeResume = (
//     req: Request,
//     res: Response
// ) => {
// console.log("im called ..............");
//     console.log(req.file);
//     console.log(req.body);

//     try {
//         const result =
//             analyzeResumeService(req.body);

//         res.json({
//             success: true,
//             ...result,
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message:
//                 "Something went wrong",
//         });
//     }
// };

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

        // Extract resume text
        const resumeText =
            await extractText(file);

            console.log("resumeText", resumeText);
               console.log("jobDescription", jobDescription);
        // Send extracted text
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