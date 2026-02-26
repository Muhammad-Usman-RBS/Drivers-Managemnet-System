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

const createDriverUploadMiddleware = (req, res, next) => {
  upload.fields(uploadFields)(req, res, (error) => {
    if (error) {
      console.error("[create-driver][upload] Multer/Cloudinary error", {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });

      return res.status(500).json({
        error: "Upload failed",
        details: error.message,
      });
    }

    const uploadedFileKeys = Object.keys(req.files || {});
    console.log("[create-driver][upload] Upload middleware completed", {
      uploadedFileKeys,
      bodyKeys: Object.keys(req.body || {}),
    });
    next();
  });
};

router.post("/create-driver", createDriverUploadMiddleware, createDriver);
router.get("/getAll-drivers", getAllDrivers);
router.get("/getDriverById/:id", getDriverById);
router.delete("/delete-drivers/:id", deleteDriverById);
router.put("/update-drivers/:id", upload.fields(uploadFields), updateDriverById);

export default router;
