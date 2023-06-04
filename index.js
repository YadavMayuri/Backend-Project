console.log("(hello world");

import express from "express";
import morgan from "morgan";


import router from "./routes/UserRoutes.js";
import mongoose from "mongoose";
const app = express();

app.use(morgan('dev')); // use() - middleware
app.use(express.json()); // data to parse
app.use('/api/v1', router);

mongoose.connect('mongodb+srv://mayuriyadav54:HGU1ZbJCNcqlTu0z@cluster0.s9gcceb.mongodb.net/BackendProject')
.then(()=> console.log("DB Connected"))
.catch((err) => console.log("DB Error =>", err));




app.listen(3000, () => console.log("Working on port 3000")); // port
