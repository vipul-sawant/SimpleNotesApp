import { config } from "dotenv";
const envData = config();

const mode = process.env.NODE_ENV;
console.log("Current Mode:", mode);

if (mode === "development") {
    
    console.log('server envData :',envData);
}

import app  from "./app.js";
import connectToDB  from "./db/index.js";
import ApiError from "./utils/ApiError.js";

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        if (process.env.NODE_ENV !== "test") {
            await connectToDB();
        }

        app.listen(port, () => {
            console.log(`✅ Server running on http://localhost:${port}`);
        });
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("❌ Database Error:", error.message);
        } else {
            console.error("❌ Unexpected Error:", error);
        }
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();