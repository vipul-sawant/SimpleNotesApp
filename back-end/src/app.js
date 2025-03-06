import { config } from "dotenv";
const envData = config();
console.log('app envData :',envData);

import e, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors  from "cors";

const app = e();

const corsOptions = {
    origin:process.env.CORS_ORIGIN,
    credentials:true
};

const jsonOptions = {
    limit:"16kb"
};

const urlEncodedOptions = {
    extended:true,
    limit:"16kb"
};

app.use(cors(corsOptions));

app.use(json(jsonOptions));
app.use(urlencoded(urlEncodedOptions));
app.use(static_("public"));
app.use(cookieParser());

import AuthRoutes from "./routes/auth.routes.js";
import NoteRoutes from "./routes/note.routes.js";

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/notes', NoteRoutes);

export default app;