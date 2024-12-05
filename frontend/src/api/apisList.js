function url(api) {
  const API_SERVICE = import.meta.env.VITE_API_URL;

  switch (api) {
    case "login":
      return `${API_SERVICE}/api/user/login`;

    case "folder":
      return `${API_SERVICE}/api/file/create_folder`;

    case "file":
      return `${API_SERVICE}/api/file/save`;

    case "homefiles":
      return (user_id) => `${API_SERVICE}/api/file/home/${user_id}`;

    case "folders":
      return (user_id) => `${API_SERVICE}/api/file/folders/${user_id}`;

    case "files":
      return (folder_id) => `${API_SERVICE}/api/file/list/${folder_id}`;

    case "uploadfile":
      return `${API_SERVICE}/api/file/upload`;

    case "getfile":
      return (user_id, folder_id, file_name) =>
        `${API_SERVICE}/api/file/file/${user_id}/${
          folder_id || "home"
        }/${file_name}`;

    default:
      return API_SERVICE;
  }
}

export default url;
