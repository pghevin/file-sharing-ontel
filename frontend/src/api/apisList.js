function url(api) {
  const API_SERVICE = import.meta.env.VITE_API_URL;

  switch (api) {
    case "login":
      return `${API_SERVICE}/api/user/login`;

    default:
      return API_SERVICE;
  }
}

export default url;
