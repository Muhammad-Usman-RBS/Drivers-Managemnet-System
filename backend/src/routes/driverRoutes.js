import express from "express";
import upload from "../config/multer.js";
import {
  getDriverById,
  createDriver,
  getAllDrivers,
  deleteDriverById,
  updateDriverById,
} from "../controller/driverController.js";

const router = express.Router();

const uploadFields = [
  { name: "driverPicture", maxCount: 1 },
  { name: "privateHireCard", maxCount: 1 },
  { name: "dvlaCard", maxCount: 1 },
  { name: "carPicture", maxCount: 1 },
  { name: "privateHireCarPaper", maxCount: 1 },
  { name: "driverPrivateHirePaper", maxCount: 1 },
  { name: "insurance", maxCount: 1 },
  { name: "motExpiry", maxCount: 1 },
  { name: "V5", maxCount: 1 },
];

router.post("/create-driver", upload.fields(uploadFields), createDriver);
router.get("/getAll-drivers", getAllDrivers);
router.get("/getDriverById/:id", getDriverById);
router.delete("/delete-drivers/:id", deleteDriverById);
router.put("/update-drivers/:id", upload.fields(uploadFields), updateDriverById);

export default router;
