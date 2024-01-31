import CryptoJS from "crypto-js";

export const generateTimestamp = () => {
  return new Date().getTime().toString();
};

export const generateHash = () => {
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_API_KEY;
  const ts = generateTimestamp();
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
};
