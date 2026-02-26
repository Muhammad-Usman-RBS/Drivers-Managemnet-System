import multer from "multer";
import multerStorageCloudinary from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";

const CloudinaryStorage = multerStorageCloudinary;

const storage = new CloudinaryStorage({
  cloudinary: { v2: cloudinary },
  params: (_, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    cb(undefined, {
      folder: "driver_uploads",
      allowed_formats: ["jpeg", "pdf", "png", "jpg"],
      resource_type: "auto",
      type: "upload",
      public_id: `${uniqueSuffix}-${baseName}`,
    });
  },
});

const upload = multer({ storage });

export default upload;
