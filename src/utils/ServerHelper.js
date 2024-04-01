const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body, auth) => {
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
export const makeAuthenticatedPUTRequest = async (route, body, auth) => {
  const response = await fetch(backendUrl + route, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
export const makeAuthenticatedDELETERequest = async (route,auth) => {
  const response = await fetch(backendUrl + route, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route, auth) => {
  const response = await fetch(backendUrl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

// const getToken = () => {
//     const accessToken = document.cookie.replace(
//         /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
//         "$1"
//     );
//     return accessToken;
// };
