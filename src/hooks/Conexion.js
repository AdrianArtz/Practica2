const URL = "https://fakerestapi.azurewebsites.net"

export const Libros = async () => {
    const datos = await (await fetch(URL + "/api/v1/Books", {
        method: "GET"
    })).json();
    console.log(datos);
    return datos;
}
export const GuardarLibro = async (data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const datos = await (await fetch(URL + "/api/v1/Books", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}
export const ModificarLibro = async (id, data) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${URL}/api/v1/Books/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
};
  
export const ObtenerDatos = async(nroFila)=>{
    const datos = await (await fetch(URL + "/api/v1/Books/" + nroFila, {
        method: "GET",
    })).json();
    return datos;
}