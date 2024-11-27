import axios from 'axios';  // Importar axios

export function getseriesById(idNeg, idAlmac,idSer,idUbi) {
  return new Promise((resolve, reject) => {
    // Constuir la URL con el ID
    const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE + 'api/v1/ubicaciones/' 
      + idNeg + '/almacen/' + idAlmac + '/series/' + idSer + '/ubicaciones/' + idUbi}`;

    console.log("URL de la solicitud:", apiUrl);

    axios.get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (!data.success) {
          console.error("Error en la petición <<ubicacionesById - Services>>", data);
          reject(data);
        } else {
          console.log("Series obtenido:", data.data);
          resolve(data.data); // Devolver los datos del inventario
        }
      })
      .catch((error) => {
        console.error("Error al obtener series:", error);
        reject(error);
      });
  });
}
 