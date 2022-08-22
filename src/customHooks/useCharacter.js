import { useState, useEffect } from "react";

const useCharacters = (url) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch(url);
      const characters = await response.json();
      setCharacters(characters.results);
    }
    fetchCharacters();
  }, [url]);
  return characters;
};

export default useCharacters;
