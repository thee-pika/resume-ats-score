import normalizeText
from "../utils/normalizeText";

import SKILLS
from "../constants/skills";

export const extractKeywords = (
    text: string
): Set<string> => {

    const normalizedText =
        normalizeText(text);

    const matchedSkills =
        SKILLS.filter((skill) =>
            normalizedText.includes(
                skill.toLowerCase()
            )
        );

    return new Set(matchedSkills);
};

