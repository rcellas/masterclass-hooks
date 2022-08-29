import React, { useState, useReducer, useMemo, useRef, useCallback } from "react";
import Search from "./Search";
import useCharacter from "../customHooks/useCharacter";

const initalState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character";
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

function Characters() {
  // al quitar el useEffect también quitamos esta lógica
  // const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initalState);
  const [search, setSearch] = useState("");
  const searchInput = useRef();

  const characters = useCharacter(API);

  // explicacion useEffect
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((response) => response.json())
  //     .then((data) => setCharacters(data.results));
  // }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // primer search
  // const handleSearch = (e) => {
  //   // obtención de un valor
  //   setSearch(e.target.value);
  // };

  // segundo search
  // const handleSearch = () => {
  //   console.log(searchInput.current);
  //   setSearch(searchInput.current.value);
  // };

  // tercer search
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
    // useCallback requiere un segundo elemento a escuchar
  }, []);

  // prueba sin memo

  // const filteredUsers = characters.filter((user) => {
  //   // con el includes se busca si el valor del input se encuentra en el nombre del usuario
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(()=>
    characters.filter((user) => {
      // con el includes se busca si el valor del input se encuentra en el nombre del usuario
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    // escucha esto
    [characters, search]
  )

  return (
    <div className="Characters card">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      {/* search 1 */}
      {/* <div>
        {/* ponemos un onChange para que haga el llamado y envie los valores de nuestra función y setearlos  */}
        {/* al añadir el ref lo que hara es que el valor del value estará dentro de un valor que nos regresa directamente useRef,
            en este caso esta dentro de current que nos ayudará a buscar el valor
        */}
       {/* <input type="text" value={search} ref={searchInput} onChange={handleSearch} />
      </div> */}

      {/* Asignamos los valores que necesita para funcionar */}
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>


      {/* primer caso */}
      {/* {characters.map((character) => {
        return (
          <div key={character.id}>
            <img src={character.image} className="card-img-top" alt={character.name} />
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
              <p className="card-text">{character.status}</p>
              <p className="card-text">Genero: {character.gender}</p>
              <p className="card-text">Especie: {character.species}</p>
              <p className="card-text">Localización: {character.location.name}</p>
            </div>
            <button onClick={()=>handleClick(character)}>Agregar a favorito</button>
          </div>
        );
      })} */}

      {/* con memo */}
      {filteredUsers.map((character) => {
        return (
          <div key={character.id}>
            {/* <img
              src={character.image}
              className="card-img-top"
              alt={character.name}
            /> */}
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
              <p className="card-text">{character.status}</p>
              <p className="card-text">Genero: {character.gender}</p>
              <p className="card-text">Especie: {character.species}</p>
              <p className="card-text">
                Localización: {character.location.name}
              </p>
            </div>
            <button onClick={() => handleClick(character)}>
              Agregar a favorito
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Characters;
