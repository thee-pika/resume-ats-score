import express from "express";
import cors from "cors";
import router from "./routes/ats.routes";


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.use("/api/ats", router);

const PORT = 5000;

app.get("/health", (req, res) => {
    res.send("your website is healthy :)")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

