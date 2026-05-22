import { extractKeywords }
    from "./keyword.service";

import { calculateATSScore }
    from "./scoring.service";

import { generateSuggestions }
    from "./suggestion.service";

type AnalyzeInput = {
    resumeText: string;
    jobDescription: string;
};

export const analyzeResumeService = (
    data: AnalyzeInput
) => {
    console.log("im callws 2 ..........");
    console.log("data", data);

    const {
        resumeText,
        jobDescription,
    } = data;

    console.log("jobDescription ", jobDescription)
    console.log("resumeText ", resumeText)
    // Extract keywords
    const resumeKeywords =
        extractKeywords(resumeText);

    const jobKeywords =
        extractKeywords(jobDescription);

    // Calculate score
    const {
        score,
        matchedKeywords,
        missingKeywords,
    } = calculateATSScore(
        resumeKeywords,
        jobKeywords
    );

    // Suggestions
    const suggestions =
        generateSuggestions(
            { missingKeywords, score }
        );

    console.log(" score, matchedKeywords, missingKeywords, suggestions,", score,
        matchedKeywords,
        missingKeywords,
        suggestions,)
    return {
        score,
        matchedKeywords,
        missingKeywords,
        suggestions,
    };
};
