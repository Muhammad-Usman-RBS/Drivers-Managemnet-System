import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import driverRoutes from "./routes/driverRoutes.js";
import methodOverride from "method-override";

const app = express();

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use("/api/driver", driverRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
