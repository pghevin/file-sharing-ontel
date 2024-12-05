import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image"; // For image files
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // For PDF files
import DescriptionIcon from "@mui/icons-material/Description"; // For document files
import { useDropzone } from "react-dropzone"; // Importing react-dropzone for drag and drop functionality
import Sidebar from "../Sidebar/sidebar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../user-redux/selector";
import { dashboardSelector } from "./redux/selector";
import {
  createFolderAction,
  fileDownloadAction,
  getFilesAction,
  getFoldersAction,
  getUserFilesAction,
  saveFileAction,
  uploadFileAction,
} from "./redux/action";
import url from "../../api/apisList";

const Dashboard = ({ onLogout }) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isMobileSmall = useMediaQuery("(max-width: 479px)");

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { folders, files } = useSelector(dashboardSelector);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderHierarchy, setFolderHierarchy] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getUserFilesAction(user?._id));
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder = {
        folder_name: folderName,
        user_id: user?._id,
      };

      dispatch(createFolderAction(newFolder));
    }
    setFolderName("");
    setDialogOpen(false);
    handleMenuClose();
  };

  const handleOpenFolder = (folder) => {
    dispatch(getFilesAction(folder?._id));

    setCurrentFolder(folder);
    setFolderHierarchy((prev) => [folder]);
  };

  const handleViewFile = (file) => {
    // Trigger file download
    dispatch(fileDownloadAction(file?.user_id, file?.folder_id, file?.file_name));

    // If you want to directly download the file, you can use the `url` helper function:
    const fileUrl = url("getfile")(file?.user_id, file?.folder_id, file?.file_name);

    // Create an anchor tag to download the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file?.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // New function to handle file download
  const handleDownloadFile = (file) => {
    const fileUrl = url("getfile")(file?.user_id, file?.folder_id, file?.file_name);

    // Create an anchor tag to trigger file download
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = file?.file_name; // Set the filename for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  const handleBreadcrumbClick = (folder, index) => {
    dispatch(getUserFilesAction(user?._id));
    setCurrentFolder(folder || null);
    setFolderHierarchy(folderHierarchy.slice(0, index + 1));
  };

  const onDrop = (acceptedFiles) => {
    for (var i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const folder_id = currentFolder?._id;
      const user_id = user?._id;

      dispatch(uploadFileAction(file, folder_id, user_id));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*, .pdf, .docx, .txt, .xlsx",
  });

  // Function to get file thumbnail based on file type
  const getFileThumbnail = (file) => {
    const fileType = file?.file_name?.split(".").pop().toLowerCase();

    // Log the file type to debug
    console.log('File type:', fileType);

    if (fileType === "pdf") {
      return <PictureAsPdfIcon fontSize="large" sx={{ color: "#D32F2F" }} />; // Red color for PDF
    } else if (fileType === "docx" || fileType === "doc") {
      return <DescriptionIcon fontSize="large" sx={{ color: "#1976D2" }} />; // Blue color for Word documents
    } else if (fileType === "xlsx") {
      return <DescriptionIcon fontSize="large" sx={{ color: "#388E3C" }} />; // Green color for Excel files
    } else if (fileType === "jpg" || fileType === "jpeg" || fileType === "png" || fileType === "gif") {
      // If it's an image file, ensure the thumbnail exists
      return file.thumbnail ? (
        <img src={file.thumbnail} alt={file.file_name} style={{ maxHeight: "100%", maxWidth: "100%" }} />
      ) : (
        <ImageIcon fontSize="large" sx={{ color: "#757575" }} />
      );
    } else {
      return <ImageIcon fontSize="large" sx={{ color: "#757575" }} />; // Default icon for unknown file types
    }
  };



  return (
    <div style={{ height: "100vh" }}>
      <Sidebar onLogout={onLogout} />
      <div style={{ flex: 1, padding: "20px" }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb" mb={3}>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => handleBreadcrumbClick(null, -1)}
              style={{ cursor: "pointer" }}
            >
              File Manager
            </Link>
            {folderHierarchy.map((folder, index) => (
              <Link
                key={folder._id}
                underline="hover"
                color="inherit"
                onClick={() => handleBreadcrumbClick(folder, index)}
                style={{ cursor: "pointer" }}
              >
                {folder.folder_name}
              </Link>
            ))}
          </Breadcrumbs>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant={isMobile ? "body2" : "h5"} // Use 'body2' (small font size) on mobile, 'h5' on larger screens
              sx={{
                fontSize: isMobile ? "0.875rem" : "2rem", // Adjust font size directly
              }}
            >
              {currentFolder
                ? `Folder: ${currentFolder.folder_name}`
                : "File Manager"}
            </Typography>
            <Box>
              <Button
                sx={{
                  backgroundColor: "#244391",
                  fontSize: isMobileSmall ? "12px" : "14px", // Adjust font size for mobile
                }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleMenuClick}
              >
                New
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* Render Create Folder only if in the root directory */}
                {currentFolder === null && (
                  <MenuItem onClick={() => setDialogOpen(true)}>
                    <FolderIcon style={{ marginRight: "8px" }} />
                    Create Folder
                  </MenuItem>
                )}
                <MenuItem>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => onDrop(e.target.files)}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <FileUploadIcon style={{ marginRight: "8px" }} />

                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    Add File
                  </label>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider />

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #244391",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                <input {...getInputProps()} />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobileSmall ? "12px" : "14px", // Smaller font size on mobile
                  }}
                >
                  Drag and drop files here, or click to select files
                </Typography>
              </div>
            </Grid>

            {!currentFolder &&
              folders &&
              folders?.length > 0 &&
              folders?.map((folder) => (
                <Grid
                  item
                  xs={isMobile ? 6 : isTablet ? 3 : 2}
                  key={folder._id}
                >
                  <Card
                    onClick={() => handleOpenFolder(folder)}
                    style={{ cursor: "pointer", height: "100%" }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <FolderIcon
                        sx={{ fontSize: "100px", color: "#244391" }}
                      />
                      <Typography variant="body2" noWrap>
                        {folder.folder_name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

            {files &&
              files?.length > 0 &&
              files.map((file) => (
                <Grid item xs={isMobile ? 6 : isTablet ? 3 : 2} key={file._id}>
                  <Card
                    style={{ height: "100%", position: "relative" }}
                    onClick={() => handleViewFile(file)}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 1,
                          height: "100px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        {/* Here the getFileThumbnail function is used to get the appropriate thumbnail */}
                        {getFileThumbnail(file)}
                      </Box>
                      <Typography variant="body2" noWrap title={file.file_name} onClick={() => handleViewFile(file)}>
                        {file?.file_name?.slice(0, 15) + "..."}
                      </Typography>
                      <Typography variant="caption">
                        {moment(file?.uploadTime).format("MMMM Do YYYY")}
                      </Typography>
                      <IconButton
                        title="sdfj"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleDownloadFile(file)}
                      >
                        <FileDownloadIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

          </Grid>
        </Box>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Create Folder</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Folder Name"
              variant="outlined"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogOpen(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
