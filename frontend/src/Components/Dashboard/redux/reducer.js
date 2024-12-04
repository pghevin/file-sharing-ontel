import * as types from "./actionTypes";

const initialState = {
  folder: {},
  folders: [],
  file: null,
  files: [],
  error: "",
  uploadProgress: null,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CREATE_FOLDER_ACTION:
      return {
        ...state,
        folder: action.payload,
      };

    case types.GET_FOLDERS_ACTION:
      return {
        ...state,
        folders: action.payload,
      };

    case types.GET_FILES_ACTION:
      return {
        ...state,
        files: action.payload,
      };

    case types.UPLOAD_FILE_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };

    case types.UPLOAD_FILE_ACTION:
      return {
        ...state,
        file: action.payload,
      };

    case types.CREATE_FOLDER_ACTION_FAIL:
    case types.GET_FILES_ACTION_FAIL:
    case types.GET_FOLDERS_ACTION_FAIL:
    case types.UPLOAD_FILE_ACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case types.RESET_ACTION:
      return initialState;

    default:
      return state;
  }
}
