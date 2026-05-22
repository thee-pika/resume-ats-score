import skills from "./skills.js";

const calculateScore = (
    resumeText: string,
    jobDescription: string
) => {
    console.log("resumeText in score",resumeText );
    const resume = resumeText.toLowerCase();

    const jd = jobDescription.toLowerCase();

    // Find skills inside job description
    const jdSkills = skills.filter((skill) =>
        jd.includes(skill)
    );

    // Skills matched in resume
    const matchedSkills = jdSkills.filter((skill) =>
        resume.includes(skill)
    );

    // Missing skills
    const missingSkills = jdSkills.filter(
        (skill) => !resume.includes(skill)
    );

    // Score calculation
    let score = 0;

    if (jdSkills.length > 0) {
        score =
            (matchedSkills.length / jdSkills.length) *
            100;
    }

    // Resume Sections Check
    const sections = [
        "education",
        "experience",
        "skills",
        "projects",
    ];

    const foundSections = sections.filter(
        (section) => resume.includes(section)
    );

    // Add section bonus
    score += foundSections.length * 5;

    // Max score = 100
    if (score > 100) {
        score = 100;
    }

    // Suggestions
    const suggestions = [];

    if (missingSkills.length > 0) {
        suggestions.push(
            `Add missing skills: ${missingSkills.join(
                ", "
            )}`
        );
    }

    if (!resume.includes("projects")) {
        suggestions.push(
            "Add a Projects section"
        );
    }

    if (!resume.includes("skills")) {
        suggestions.push(
            "Add a Skills section"
        );
    }

    return {
        score: Math.round(score),
        matchedSkills,
        missingSkills,
        suggestions,
    };
};

export default calculateScore;
