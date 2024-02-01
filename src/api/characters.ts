import { generateHash, generateTimestamp } from "../utils/hash";

export const getCharacters = async (search?: string) => {
  const ts = generateTimestamp();
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
  const hash = generateHash();

  const seachQuery = search ? `&nameStartsWith=${search}` : "";

  const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}${seachQuery}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Error fetching data: ", error));
};
