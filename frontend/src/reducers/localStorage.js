const localStorageData = {
  TOKEN: "token",
  STATE: "state",
};

export const saveToken = (token) =>
  localStorage.setItem(localStorageData.TOKEN, token);
export const getToken = () =>
  localStorage.getItem(localStorageData.TOKEN) || null;
export const deleteToken = () =>
  localStorage.removeItem(localStorageData.TOKEN);

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageData.STATE);
    if (serializedState === null) {
      return undefined;
    }
    // return JSON.parse(serializedState);
    const parsedState = JSON.parse(serializedState);
    // Exclude the appManagement state
    const { appManagement, companiesManagement, ...restState } = parsedState;
    return restState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const persistState = async (state) => {
  try {
    const { appManagement, companiesManagement, ...restState } = state;
    localStorage.setItem(localStorageData.STATE, JSON.stringify(restState));
  } catch (e) {
    console.warn(e);
  }
};

export const deleteState = () =>
  localStorage.removeItem(localStorageData.STATE);
