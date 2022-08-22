import React from "react";

function Search ({ search, searchInput, handleSearch }){
    return(
        <div>
        {/* ponemos un onChange para que haga el llamado y envie los valores de nuestra función y setearlos  */}
        {/* al añadir el ref lo que hara es que el valor del value estará dentro de un valor que nos regresa directamente useRef,
            en este caso esta dentro de current que nos ayudará a buscar el valor
        */}
        <input type="text" value={search} ref={searchInput} onChange={handleSearch} />
      </div>
    )
}

export default Search;