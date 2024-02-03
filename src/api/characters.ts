import { generateHash, generateTimestamp } from "../utils/hash";

interface GetCharactersProps {
  search?: string;
  offset?: number;
}

export const getCharacters = async ({ search, offset }: GetCharactersProps) => {
  const ts = generateTimestamp();
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
  const hash = generateHash();

  const seachQuery = search ? `&nameStartsWith=${search}` : "";
  const offsetQuery = offset ? `&offset=${offset}` : "";

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10${seachQuery}${offsetQuery}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Error fetching data: ", error));
};
