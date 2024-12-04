const {
  saveFile,
  userFiles,
  uploadFile,
  createFolder,
  getFolders,
  getFile,
} = require("../services/filesService");
const multer = require("multer");

const router = require("express").Router();

const upload = multer({ dest: "uploads/temp/" }); // Temporary storage for chunks

router.get("/list/:folder_id", userFiles);
router.post("/save", saveFile);
router.get("/folders/:user_id", getFolders);
router.post("/create_folder", createFolder);
router.post("/upload", upload.single("fileChunk"), uploadFile);
router.get("/file/:user_id/:folder_id/:file_name", getFile);

module.exports = router;
