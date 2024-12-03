const userFilesModel = require("../models/user_files");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "temp/" }); // Temporary storage for chunks

exports.userFiles = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    let files;
    files = await userFilesModel
      .find({ user_id })
      .select("file_name file_type file_size uploaded_s3 user_id")
      .lean();

    const filesObj = {
      files,
    };

    return res.status(200).json({
      error: false,
      message: "Fetched successful",
      data: filesObj,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const { user_id, file_name, file_type, file_size, uploaded_s3 } = req.body;

    console.log(user_id, file_name, file_type, file_size, uploaded_s3);
    const file = await userFilesModel.create({
      user_id,
      file_name,
      file_type,
      file_size,
      uploaded_s3,
    });
    if (file) {
      return res.status(201).json({
        error: false,
        message: "File Saved",
        data: file,
      });
    } else {
      return res
        .status(500)
        .json({ error: true, message: "Ops!, Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { fileName, chunkIndex, totalChunks } = req.body;
    const fileChunk = req.file; // Uploaded chunk from multer

    if (!fileChunk) {
      return res
        .status(400)
        .json({ error: true, message: "File chunk is missing" });
    }

    const tempDir = "uploads/temp";
    const uploadDir = "uploads";

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const tempFilePath = path.join(tempDir, `${fileName}.part${chunkIndex}`);

    // Save the current chunk to the temp directory
    fs.renameSync(fileChunk.path, tempFilePath);

    console.log(
      `Received chunk ${chunkIndex + 1}/${totalChunks} for ${fileName}`
    );

    if (parseInt(chunkIndex) === parseInt(totalChunks) - 1) {
      // If all chunks are uploaded, combine them
      const finalFilePath = path.join(uploadDir, fileName);

      const writeStream = fs.createWriteStream(finalFilePath);

      for (let i = 0; i < totalChunks; i++) {
        const chunkPath = path.join(tempDir, `${fileName}.part${i}`);
        if (fs.existsSync(chunkPath)) {
          const chunkData = fs.readFileSync(chunkPath);
          writeStream.write(chunkData);
          fs.unlinkSync(chunkPath); // Delete the temp chunk
        } else {
          return res
            .status(500)
            .json({ error: true, message: `Chunk ${i} is missing` });
        }
      }

      writeStream.end();

      console.log(`File ${fileName} uploaded successfully`);

      return res.status(201).json({
        error: false,
        message: "File uploaded and combined successfully",
        data: { filePath: finalFilePath },
      });
    } else {
      return res.status(200).json({
        error: false,
        message: `Chunk ${chunkIndex + 1} uploaded successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
