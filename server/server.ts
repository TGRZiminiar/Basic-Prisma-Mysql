import express, {Application} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

let PORT = process.env.PORT || 5000;

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", require("./routes/author.route"));

app.listen(PORT, () => {
    console.log("Listening On Port " + PORT);   

})

