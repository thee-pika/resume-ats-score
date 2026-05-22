import skills from "./skills.js";

const calculateScore = (
    resumeText: string,
    jobDescription: string
) => {
    console.log("resumeText in score",resumeText );
    const resume = resumeText.toLowerCase();

    const jd = jobDescription.toLowerCase();

   
    const jdSkills = skills.filter((skill) =>
        jd.includes(skill)
    );


    const matchedSkills = jdSkills.filter((skill) =>
        resume.includes(skill)
    );
    const missingSkills = jdSkills.filter(
        (skill) => !resume.includes(skill)
    );

    
    let score = 0;

    if (jdSkills.length > 0) {
        score =
            (matchedSkills.length / jdSkills.length) *
            100;
    }


    const sections = [
        "education",
        "experience",
        "skills",
        "projects",
    ];

    const foundSections = sections.filter(
        (section) => resume.includes(section)
    );

  
    score += foundSections.length * 5;


    if (score > 100) {
        score = 100;
    }


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
