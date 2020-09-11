const API_URL = "https://vepply.herokuapp.com/v1";
const endpoint = "graphql";
const localStorageKey = "__bookshelf_token__";

export function client({ body, ...customConfig }: any = {}) {
  const token = window.localStorage.getItem(localStorageKey);
  const headers: any = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: "POST",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      logout();
      return;
    }
    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      return Promise.reject(data);
    }
  });
}
function logout() {
  window.localStorage.removeItem(localStorageKey);
}
