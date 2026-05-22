import mammoth from "mammoth";
import PDFParser from "pdf2json";

const extractText = async (
    file: Express.Multer.File
): Promise<string> => {

    // DOCX
    if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

        const result =
            await mammoth.extractRawText({
                buffer: file.buffer,
            });

        return result.value;
    }

    // PDF
    if (file.mimetype === "application/pdf") {

        return new Promise(
            (resolve, reject) => {

                const pdfParser =
                    new PDFParser();

                pdfParser.on(
                    "pdfParser_dataError",
                    (err) => reject(err)
                );

                pdfParser.on(
                    "pdfParser_dataReady",
                    (pdfData) => {

                        let text = "";

                        for (
                            const page of pdfData.Pages
                        ) {

                            for (
                                const item of page.Texts
                            ) {

                                for (
                                    const textItem of item.R
                                ) {

                                    text +=
                                        decodeURIComponent(
                                            textItem.T
                                        ) + " ";
                                }
                            }
                        }

                        resolve(text);
                    }
                );

                pdfParser.parseBuffer(
                    file.buffer
                );
            }
        );
    }

    throw new Error(
        "Unsupported file type"
    );
};

export default extractText;