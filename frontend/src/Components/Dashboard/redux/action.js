import { get, post } from "../../../api";
import url from "../../../api/apisList";
import * as types from "./actionTypes";

export const createFolderAction = (data) => {
  const apiUrl = url("folder");

  return async (dispatch) => {
    try {
      const res = await post(apiUrl, data);
      let folder;
      const user_id = data?.user_id;

      if (res?.error) {
        dispatch({
          type: types.CREATE_FOLDER_ACTION_FAIL,
          payload: res?.message || "Something went wrong",
        });
        return;
      }

      if (res?.data) {
        folder = res?.data;
      }
      dispatch(getFoldersAction(user_id));
      dispatch({
        type: types.CREATE_FOLDER_ACTION,
        payload: folder,
      });
    } catch (err) {
      dispatch({
        type: types.CREATE_FOLDER_ACTION_FAIL,
        payload: err,
      });
    }
  };
};

export const getFoldersAction = (user_id) => {
  console.log(user_id);
  const apiUrl = url("folders")(user_id);

  return async (dispatch) => {
    try {
      const res = await get(apiUrl);
      let folders;

      if (res?.error) {
        dispatch({
          type: types.GET_FOLDERS_ACTION_FAIL,
          payload: res?.message || "Something went wrong",
        });
        return;
      }

      if (res?.data) {
        folders = res?.data?.folders;
      }
      dispatch({
        type: types.GET_FOLDERS_ACTION,
        payload: folders,
      });
    } catch (err) {
      dispatch({
        type: types.GET_FOLDERS_ACTION_FAIL,
        payload: err,
      });
    }
  };
};

export const getFilesAction = (folder_id) => {
  const apiUrl = url("files")(folder_id);

  return async (dispatch) => {
    try {
      const res = await get(apiUrl);
      let files;

      if (res?.error) {
        dispatch({
          type: types.GET_FILES_ACTION_FAIL,
          payload: res?.message || "Something went wrong",
        });
        return;
      }

      if (res?.data) {
        files = res?.data?.files;
      }
      dispatch({
        type: types.GET_FILES_ACTION,
        payload: files,
      });
    } catch (err) {
      dispatch({
        type: types.GET_FILES_ACTION_FAIL,
        payload: err,
      });
    }
  };
};

export const saveFileAction = (data) => {
  const apiUrl = url("file");

  return async (dispatch) => {
    try {
      const res = await post(apiUrl, data);
      let folder;

      if (res?.error) {
        dispatch({
          type: types.SAVE_FILE_ACTION_FAIL,
          payload: res?.message || "Something went wrong",
        });
        return;
      }

      if (res?.data) {
        folder = res?.data;
      }
      dispatch(getFilesAction(data?.folder_id));
      dispatch({
        type: types.SAVE_FILE_ACTION,
        payload: folder,
      });
    } catch (err) {
      dispatch({
        type: types.SAVE_FILE_ACTION_FAIL,
        payload: err,
      });
    }
  };
};

export const uploadFileAction = (file, folder_id, user_id) => {
  const apiUrl = url("uploadfile");

  return async (dispatch) => {
    try {
      const chunkSize = 5 * 1024 * 1024; // 5MB per chunk
      const totalChunks = Math.ceil(file.size / chunkSize);
      let uploadedChunks = 0;

      for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize);
        const formData = new FormData();

        formData.append("user_id", user_id);
        formData.append("folder_id", folder_id);
        formData.append("fileChunk", chunk);
        formData.append("fileName", file.name);
        formData.append("chunkIndex", Math.floor(start / chunkSize));
        formData.append("totalChunks", totalChunks);

        try {
          // Make the API call for the current chunk

          await fetch(apiUrl, {
            method: "POST",
            body: formData, // Use FormData directly here
            mode: "cors",
          });

          uploadedChunks++;
        } catch (error) {
          console.error("Error uploading chunk", error);

          dispatch({
            type: types.UPLOAD_FILE_ACTION_FAIL,
            payload: `Error uploading chunk ${
              Math.floor(start / chunkSize) + 1
            }`,
          });
          return { error: true, message: "Chunk upload failed" };
        }
      }

      // Dispatch success once all chunks are uploaded
      dispatch({
        type: types.UPLOAD_FILE_ACTION,
        payload: { file: file },
      });

      const data = {
        folder_id: folder_id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        uploaded_s3: false,
        user_id: user_id,
      };
      dispatch(saveFileAction(data));
    } catch (err) {
      dispatch({
        type: types.UPLOAD_FILE_ACTION_FAIL,
        payload: err.message || "Unexpected error occurred",
      });
      return { error: true, message: err.message };
    }
  };
};

export const fileDownloadAction = (user_id, folder_id, file_name) => {
  const apiUrl = url("getfile")(user_id, folder_id, file_name);
  return async (dispatch) => {
    try {
      const response = await get(apiUrl, {
        responseType: "blob", // Handle response as a blob (binary data)
      });


      if (response.data instanceof Blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response.data); // Create a URL for the blob
        link.download = fileName; // The filename for the downloaded file
        link.click(); // Trigger the download
      } else {
        throw new Error('Response is not a Blob');
      }

      dispatch({
        type: types.FILE_DOWNLOAD_ACTION,
      });
    } catch (err) {
      dispatch({
        type: types.FILE_DOWNLOAD_ACTION_FAIL,
        payload: err,
      });
    }
  };
};
