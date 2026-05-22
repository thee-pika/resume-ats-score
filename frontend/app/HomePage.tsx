"use client";

import { useState } from "react";

type ATSResponse = {
    success: boolean;
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
};

export default function HomePage() {

    const [file, setFile] = useState<File | null>(null);

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] =
        useState<ATSResponse | null>(null);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (!file) {
            alert("Please upload a resume");
            return;
        }

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("resume", file);

            formData.append(
                "jobDescription",
                jobDescription
            );

            const response = await fetch(
                "http://localhost:5000/api/ats/analyze",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            setResult(data);

        } catch (error) {

            console.error(error);

            alert("Something went wrong");
        } finally {

            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">
                    ATS Resume Checker
                </h1>

                <p className="text-zinc-400 mb-8">
                    Upload your resume and compare
                    it with the job description.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Upload Resume
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={(e) => {

                                if (
                                    e.target.files &&
                                    e.target.files[0]
                                ) {
                                    setFile(
                                        e.target.files[0]
                                    );
                                }
                            }}
                            className="w-full border border-zinc-700 rounded-lg p-3 bg-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Job Description
                        </label>

                        <textarea
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(
                                    e.target.value
                                )
                            }
                            rows={10}
                            placeholder="Paste job description..."
                            className="w-full border border-zinc-700 rounded-lg p-4 bg-zinc-900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Analyzing..."
                            : "Check ATS Score"}
                    </button>
                </form>

                {result && (
                    <div className="mt-10 border border-zinc-800 rounded-xl p-6 bg-zinc-950">

                        <h2 className="text-2xl font-bold mb-6">
                            ATS Result
                        </h2>

                        <div className="mb-6">
                            <p className="text-zinc-400 mb-2">
                                Score
                            </p>

                            <div className="w-full bg-zinc-800 rounded-full h-5 overflow-hidden">

                                <div
                                    className="bg-green-500 h-full"
                                    style={{
                                        width: `${result.score}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-2 text-xl font-bold">
                                {result.score}%
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-green-400">
                                    Matched Skills
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {result.matchedKeywords
                                        .length > 0 ? (
                                        result.matchedKeywords.map(
                                            (
                                                skill
                                            ) => (
                                                <span
                                                    key={
                                                        skill
                                                    }
                                                    className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p className="text-zinc-400">
                                            No matched
                                            skills
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-red-400">
                                    Missing Skills
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {result.missingKeywords
                                        .length > 0 ? (
                                        result.missingKeywords.map(
                                            (
                                                skill
                                            ) => (
                                                <span
                                                    key={
                                                        skill
                                                    }
                                                    className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p className="text-zinc-400">
                                            No missing
                                            skills
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">

                            <h3 className="text-lg font-semibold mb-3">
                                Suggestions
                            </h3>

                            <ul className="space-y-2">

                                {result.suggestions.map(
                                    (
                                        suggestion,
                                        index
                                    ) => (
                                        <li
                                            key={index}
                                            className="bg-zinc-900 border border-zinc-800 rounded-lg p-3"
                                        >
                                            {
                                                suggestion
                                            }
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

