const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

const post = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

const put = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export { get, post, put };
