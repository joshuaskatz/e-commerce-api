import multer from "multer";
import GFS from "multer-gridfs-storage";

const storage = new GFS({
  url: process.env.DB_URI,
  options: { useUnifiedTopology: true },
  file: (_, __) => {
    return {
      bucketName: "products",
    };
  },
});

const fileFilter = (_: any, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});
