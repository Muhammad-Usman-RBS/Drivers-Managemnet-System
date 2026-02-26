import multer from "multer";
import multerStorageCloudinary from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";

const CloudinaryStorage = multerStorageCloudinary;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "driver_uploads",
    allowed_formats: ["jpeg", "pdf", "png", "jpg"],
    resource_type: "auto",
    type: "upload",
    public_id: (_, file) => {
      const uniqueSuffix = Date.now();
      let ext = path.extname(file.originalname);
      let baseName = path.basename(file.originalname, ext);
      ext = ext === ".pdf" ? ".pdf" : "";
      return `${uniqueSuffix}-${baseName}${ext}`;
    },
  },
});

const upload = multer({ storage });

export default upload;
