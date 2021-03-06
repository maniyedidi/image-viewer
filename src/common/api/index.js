const HOST_NAME = "https://graph.instagram.com/";

const getAccessToken = () => {
  return sessionStorage.getItem("access_token")
    ? sessionStorage.getItem("access_token")
    : "";
};

export const getAllMyMedia = () => {
  return fetch(
    `${HOST_NAME}me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token=${getAccessToken()}`
  ).then(res => res.json());
};

export const getCaptions = () => {
  return fetch(
    `${HOST_NAME}me/media?fields=id,caption&access_token=${getAccessToken()}`
  ).then(res => res.json());
};
