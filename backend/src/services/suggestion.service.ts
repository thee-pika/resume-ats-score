type GenerateSuggestionsInput = {
    missingKeywords: string[];
    score: number;
};

export const generateSuggestions = ({
    missingKeywords,
    score,
}: GenerateSuggestionsInput): string[] => {

    const suggestions: string[] = [];

  
    if (score < 40) {

        suggestions.push(
            "Your resume has a low ATS match rate. Tailor your resume more closely to the job description."
        );

        suggestions.push(
            "Include more relevant technical skills, tools, and keywords mentioned in the job posting."
        );
    }

    if (score >= 40 && score < 70) {

        suggestions.push(
            "Your resume partially matches the job description. Improve keyword alignment for better ATS performance."
        );

        suggestions.push(
            "Use the same terminology and skill names used in the job description instead of synonyms."
        );
    }


    if (score >= 70) {

        suggestions.push(
            "Great ATS score. Your resume aligns well with the job description."
        );

        suggestions.push(
            "Focus on improving impact by adding measurable achievements and results."
        );
    }


    if (missingKeywords.length > 0) {

        const topMissingKeywords =
            missingKeywords
                .slice(0, 10)
                .join(", ");

        suggestions.push(
            `Consider adding these missing keywords if they reflect your experience: ${topMissingKeywords}.`
        );
    }


    if (missingKeywords.length > 10) {

        suggestions.push(
            "There is a significant keyword gap between your resume and the job description."
        );

        suggestions.push(
            "Rewrite your professional summary and experience sections to better match the role requirements."
        );
    }


    suggestions.push(
        "Use a simple single-column resume layout for better ATS readability."
    );

    suggestions.push(
        "Avoid using tables, icons, text boxes, or complex graphics in your resume."
    );

    suggestions.push(
        "Use standard section headings like Skills, Experience, Projects, and Education."
    );

    suggestions.push(
        "Keep your resume concise and focused on relevant experience."
    );

    return suggestions;
};