type ScoreResult = {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
};

export const calculateATSScore = (
    resumeKeywords: Set<string>,
    jobKeywords: Set<string>
): ScoreResult => {

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    for (const keyword of jobKeywords) {

        if (resumeKeywords.has(keyword)) {
            matchedKeywords.push(keyword);
        } else {
            missingKeywords.push(keyword);
        }
    }

    const score =
        jobKeywords.size > 0
            ? Math.round(
                  (matchedKeywords.length /
                      jobKeywords.size) *
                      100
              )
            : 0;

    return {
        score,
        matchedKeywords,
        missingKeywords,
    };
};

