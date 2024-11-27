import React, { useEffect, useState } from "react";
import { getIsRowSelected, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, tableBodyClasses } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tabs, Tab } from "@mui/material";


// Inventarios
import AddInventoryModal from "../modals/AddInventoriesModal";
import UpdateInventoryModal from "../modals/UpdateInventoriesModal";
import DeleteInventoryModal from "../modals/DeleteInventoriesModal"; // Importar el modal de eliminación
import DetailsInventoryModal from "../modals/DetailsInventoryModal";

// Almacenes
import AddAlmacenesModal from "../modals/AddAlmacenesModal";
import UpdateAlmacenesModal from "../modals/UpdateAlmacenesModal";
import DeleteAlmacenesModal from "../modals/DeleteAlmacenesModal"; // Importar el modal
import DetailsAlmacenesModal from "../modals/DetailsAlmacenesModal";


// IServis
import AddIServisModal from "../modals/AddIServisModal";
import DeleteSeriesModal from "../modals/DeleteSeriesModal";
import DetailsSeriesModal from "../modals/DetailsSeriesModal";
import UpdateSeriesModal from "../modals/UpdateSeriesModal";


// Movimientos
import AddMovimientosModal from "../modals/AddMovimientosModal";
import DetailsMovimientosModal from "../modals/DetailsMovimientosModal";
import DeleteMoviminetosModal from "../modals/DeleteMoviminetosModal";
import UpdateMovimientosModal from "../modals/UpdateMovimientosModal";



import { getAllAlmacenes } from "../services/remote/get/GetAllAlmacenes";
import { getAllseries } from "../services/remote/get/GetAllServis";
import { getAllMovimientos } from "../services/remote/get/GetAllMovimientos";
import { getAllInventories } from "../services/remote/get/GetAllInventories";




const InventoriesColumns = [
  { accessorKey: "_id", header: "ID", size: 150 },
  { accessorKey: "Nombre", header: "Nombre", size: 150 },
  { accessorKey: "Direccion", header: "Dirección", size: 150 },
  { accessorKey: "Telefono", header: "Telefono", size: 150 },
  { accessorKey: "Email", header: "Email", size: 150 },
];

const AlamacenesColumns = [
  { accessorKey: "nombre", header: "Negocio", size: 150 },
  { accessorKey: "id_almacen", header: "Almacen", size: 150 },
  { accessorKey: "_id", header: "ID", size: 150 },
  { accessorKey: "cantidadActual", header: "cantidadActual", size: 150 },
  { accessorKey: "cantidadDisponible", header: "cantidadDisponible", size: 150 },
  { accessorKey: "cantidadApartada", header: "cantidadApartada", size: 150 },
  { accessorKey: "cantidadMerma", header: "cantidadMerma", size: 150 },
  { accessorKey: "stockMaximo", header: "stockMaximo", size: 150 },
  { accessorKey: "stockMinimo", header: "stockMinimo", size: 150 },
];


const SeriesColumns = [
  { accessorKey: "id_serie", header: "ID", size: 150 },
  { accessorKey: "nombre", header: "Nombre", size: 150 },
  { accessorKey: "numero_placa", header: "Placa", size: 150 },
  { accessorKey: "observacion", header: "Observacion", size: 150 },
  { accessorKey: "negocioId", header: "Negocio", size: 150 },
  { accessorKey: "negocioNombre", header: "Negocio nombre", size: 150 },
  { accessorKey: "almacen", header: "Almacen", size: 150 },
]

const MovimientosColumns = [
  { accessorKey: "movimientoId", header: "ID", size: 150 },
  { accessorKey: "almacenNombre", header: "Almacen", size: 150 },
  { accessorKey: "negocioNombre", header: "Negocio nombre", size: 150 },
  { accessorKey: "tipo", header: "Tipo mov.", size: 150 },
  { accessorKey: "cantidadAnterior", header: "Cant. anterior", size: 150 },
  { accessorKey: "cantidadMovimiento", header: "Cant. movimiento", size: 150 },
  { accessorKey: "cantidadActual", header: "Cant. actual", size: 150 },
  { accessorKey: "referencia", header: "Referencia", size: 150 },
]


const InventoriesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0); // 0 será la primera pestaña

  const [rowSelectionInventories, setRowSelectionInventories] = useState({});
  const [rowSelectionAlmacenes, setRowSelectionAlmacenes] = useState({});
  const [rowSelectionSeries, setRowSelectionSeries] = useState({});
  const [rowSelectionMovimientos, setRowSelectionMovimientos] = useState({});



  //Negocios
  const [inventoriesData, setInventoriesData] = useState([]);
  const [addInventoryShowModal, setAddInventoryShowModal] = useState(false);
  const [updateInventoryShowModal, setUpdateInventoryShowModal] = useState(false);
  const [deleteInventoryShowModal, setDeleteInventoryShowModal] = useState(false); // Estado para el modal de eliminación
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [detailsInventoryShowModal, setDetailsInventoryShowModal] = useState(false);





  //Almacenes
  const [addAlmacenesShowModal, setAddAlmacenesShowModal] = useState(false);
  const [selectedAlmacenes, setSelectedAlmacenes] = useState(null);
  const [updateAlmacenesShowModal, setUpdateAlmacenesShowModal] = useState(false);
  const [deleteAlmacenesShowModal, setDeleteAlmacenesShowModal] = useState(false);
  const [detailsAlmacenesShowModal, setDetailsAlmacenesShowModal] = useState(false);
  const [almacenesData, setAlmacenesData] = useState([]);




  //series
  const [deleteSeriesShowModal, setDeleteSeriesShowModal] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [seriesData, setSeriesData] = useState([]);
  const [addSeriesShowModal, setAddSeriesShowModal] = useState(false);
  const [detailsSeriesShowModal, setDetailsSeriesShowModal] = useState(false);
  const [updateSeriesShowModal, setUpdateSeriesShowModal] = useState(false);


  //Movimientos
  const [movimientosData, setMovimientosData] = useState([]);
  const [selectedMovimientos, setSelectedMovimientos] = useState(null);
  const [addMovimientosShowModal, setAddMovimientosShowModal] = useState(false);
  const [updateMovimientosShowModal, setUpdateMovimientosShowModal] = useState(false);
  const [deleteMovimientosShowModal, setDeleteMovimientosShowModal] = useState(false);
  const [detailsMovimientosShowModal, setDetailsMovimientosShowModal] = useState(false);
  





  const fetchData = async () => {
    try {

      /* esto es de inventarios */
      const allInventoriesData = await getAllInventories();
      const validatedData = allInventoriesData.map((item) => ({

        _id: item._id || "No disponible",
        Nombre: item.nombre || "No disponible",
        Telefono: item.contacto?.telefono || "No disponible",
        Email: item.contacto?.email || "No disponible",
        Direccion: "C.P.:" + item.direccion?.codigo_postal + ", Colonia: " + item.direccion?.colonia || "No disponible",
      }));
      setInventoriesData(validatedData);
      setLoadingTable(false);


      /* esto es de almacenes */
      const allAlmacenesData = await getAllAlmacenes();
      const validatedAlmacenesData = allAlmacenesData.map((item) => ({
        idNeg: item.id,
        id_almacen: item.almacen?.id_almacen || "No disponible",
        _id: item.almacen?._id || "No disponible",
        nombre: item.nombre || "No disponible",
        cantidadActual: item.almacen?.cantidadActual || "Sin cantidad",
        cantidadDisponible: item.almacen?.cantidadDisponible || "Sin disponible",
        cantidadApartada: item.almacen?.cantidadApartada || "Sin apartada",
        cantidadMerma: item.almacen?.cantidadMerma || "Sin merma",
        stockMaximo: item.almacen?.stockMaximo || "Sin stock",
        stockMinimo: item.almacen?.stockMinimo || "Sin stock",
        principal: item.almacen?.principal || "No disponible",
      }));
      setAlmacenesData(validatedAlmacenesData);
      setLoadingTable(false);



      const allServisData = await getAllseries();
      const validatedSeriesData = allServisData.map((item) => ({
        id_serie: item.serieId|| "No disponible",
        nombre: item.nombre || "No disponible",
        numero_placa: item.numeroPlaca || "No disponible",
        observacion: item.observacion || "No disponible",
        negocioId: item.negocioId || "No disponible",
        negocioNombre: item.negocioNombre || "No disponible",
        almacen: item.almacen || "No disponible",
        id_almacen: item.almacenId || "No disponible",
      }));
      setSeriesData(validatedSeriesData);
      setLoadingTable(false);



      console.log("Almacenes obtenidos:", validatedAlmacenesData);
      console.log(" series obtenidos:", validatedSeriesData);

      const allMoviminetosData = await getAllMovimientos();
      const validatedMovimientosData = allMoviminetosData.map((item) => ({
        negocioId: item.negocioId || "No disponible",
        negocioNombre: item.negocioNombre || "No disponible",
        id_almacen: item.almacenId|| "No disponible",
        almacenNombre: item.almacenNombre || "No disponible",
        movimientoId: item.movimientoId || "No disponible",
        tipo: item.tipo || "No disponible",
        cantidadAnterior: item.cantidadAnterior || "No disponible",
        cantidadMovimiento: item.cantidadMovimiento || "No disponible",
        cantidadActual: item.cantidadActual || "No disponible",
        referencia: item.referencia || "No disponible",
      }));
      setMovimientosData(validatedMovimientosData);
      setLoadingTable(false);

      console.log("Movimientos Obtenidos: " + allMoviminetosData);

      //  console.log("Almacenes obtenidos:", validatedAlmacenesData);




    } catch (error) {
      console.error("Error al obtener los inventarios:", error);
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <Box>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        sx={{
          marginBottom: 2,
          "& .MuiTabs-indicator": { backgroundColor: "#1976d2" }, // Color indicador
          "& .MuiTab-root": { color: "#FFFFFF", fontWeight: "bold" }, // Texto blanco
        }}
      >
        <Tab label="Negocios" />
        <Tab label="Almacenes" />
        <Tab label="Series" />
        <Tab label="Movimientos" />

      </Tabs>


      {/* Negocios------------------------------------------------------- */}
      {selectedTab === 0 && (
        <MaterialReactTable
          columns={InventoriesColumns}
          data={inventoriesData}
          state={{
            isLoading: loadingTable,
            rowSelection: rowSelectionInventories
          }}
          onRowSelectionChange={setRowSelectionInventories}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableRowSelection={true}

          renderTopToolbarCustomActions={() => (
            <Stack direction="row" sx={{ m: 1 }}>


              <Tooltip title="Agregar">
                <IconButton onClick={() => setAddInventoryShowModal(true)}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  onClick={() => {
                    const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);

                    if (selectedData.length !== 1) {
                      alert("Por favor, seleccione una sola fila para editar.");
                      return;
                    }

                    // Pasa solo el ID del inventario seleccionado al modal de actualización
                    setUpdateInventoryShowModal(true);
                    setSelectedInventory(selectedData[0]);  // Guardamos el inventario seleccionado
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);



                  // Pasa solo el ID del inventario seleccionado al modal de actualización
                  setDeleteInventoryShowModal(true);
                  setSelectedInventory(selectedData);  // Guardamos el inventario seleccionado
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Detalles">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);



                  // Pasa solo el ID del inventario seleccionado al modal de actualización
                  setDetailsInventoryShowModal(true);
                  setSelectedInventory(selectedData);  // Guardamos el inventario seleccionado
                }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
          muiTableBodyCellProps={{
            sx: {
              color: "#503685", // Texto en tonalidades moradas para las celdas de datos
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#6c47b8", // Texto blanco para los encabezados
              fontWeight: "bold", // Resaltar los encabezados
            },
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: "#fff", // Fondo oscuro para la tabla
            },
          }}
        />
      )}
      {/* fin Tabla de negocios ---------------------------------------*/}












      {/* Tabla de almacenes ---------------------------------------*/}

      {selectedTab === 1 && (
        <MaterialReactTable
          columns={AlamacenesColumns}
          data={almacenesData}
          state={{
            isLoading: loadingTable,
            rowSelection: rowSelectionAlmacenes,
          }}
          onRowSelectionChange={setRowSelectionAlmacenes}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableRowSelection={true}

          renderTopToolbarCustomActions={() => (


            <Stack direction="row" sx={{ m: 1 }}>



              <Tooltip title="Agregar">
                <IconButton onClick={() => {
                  setAddAlmacenesShowModal(true);
                }}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  onClick={() => {
                    const selectedData = Object.keys(rowSelectionAlmacenes).map((key) => almacenesData[key]);
                    if (selectedData.length !== 1) {
                      alert("Por favor, seleccione una sola fila para editar.");
                      return;
                    }
                    setUpdateAlmacenesShowModal(true);
                    setSelectedAlmacenes(selectedData[0]);  // Guardamos el inventario seleccionado

                    console.log("Datos seleccionados:", selectedData);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionAlmacenes).map((key) => almacenesData[key]);



                  // Pasa solo el ID del inventario seleccionado al modal de actualización
                  setDeleteAlmacenesShowModal(true);
                  setSelectedAlmacenes(selectedData);  // Guardamos el inventario seleccionado
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Detalles">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionAlmacenes).map((key) => almacenesData[key]);
                  if (selectedData.length == 0) {
                    alert("Por favor, seleccione al menos una fila.");
                    return;
                  }


                  // Pasa solo el ID del inventario seleccionado al modal de actualización
                  setDetailsAlmacenesShowModal(true);
                  setSelectedAlmacenes(selectedData);  // Guardamos el inventario seleccionado

                }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
          muiTableBodyCellProps={{
            sx: {
              color: "#503685", // Texto en tonalidades moradas para las celdas de datos
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#6c47b8", // Texto blanco para los encabezados
              fontWeight: "bold", // Resaltar los encabezados
            },
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: "#fff", // Fondo oscuro para la tabla
            },
          }}
        />
      )}
      {/* Fin Tabla de almacenes ---------------------------------------*/}








      {/* Tabla de series ---------------------------------------*/}
      {selectedTab === 2 && (
        <MaterialReactTable
          columns={SeriesColumns}
          data={seriesData}
          state={{
            isLoading: loadingTable,
            rowSelection: rowSelectionSeries,
          }}
          onRowSelectionChange={setRowSelectionSeries}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableRowSelection={true}

          renderTopToolbarCustomActions={() => (
            <Stack direction="row" sx={{ m: 1 }}>



              <Tooltip title="Agregar">
                <IconButton onClick={() => {
                  setAddSeriesShowModal(true);
                }}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  onClick={() => {
                    const selectedData = Object.keys(rowSelectionSeries).map((key) => seriesData[key]);
                    if (selectedData.length !== 1) {
                      alert("Por favor, seleccione una sola fila para editar.");
                      return;
                    }
                    setUpdateSeriesShowModal(true);
                    setSelectedSeries(selectedData[0]);  // Guardamos el serie seleccionado

                    console.log("Datos seleccionados:", selectedData);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionSeries).map((key) => seriesData[key]);



                  // Pasa solo el ID del serie seleccionado al modal de actualización
                  setDeleteSeriesShowModal(true);
                  setSelectedSeries(selectedData);  // Guardamos el serie seleccionado
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Detalles">
                <IconButton onClick={() => {
                  const selectedData = Object.keys(rowSelectionSeries).map((key) => seriesData[key]);

                  // Pasa solo el ID del serie seleccionado al modal de actualización\
                  console.log('selectedData boton', selectedData);
                  setDetailsSeriesShowModal(true);
                  setSelectedSeries(selectedData);  // Guardamos el serie seleccionado

                }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

            </Stack>
          )}
          muiTableBodyCellProps={{
            sx: {
              color: "#503685", // Texto en tonalidades moradas para las celdas de datos
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#6c47b8", // Texto blanco para los encabezados
              fontWeight: "bold", // Resaltar los encabezados
            },
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: "#fff", // Fondo oscuro para la tabla
            },
          }}
        />
      )}
      {/* Fin Tabla de series ---------------------------------------*/}









      {/* Tabla de movt ---------------------------------------*/}
      {selectedTab === 3 && (
        <MaterialReactTable
          columns={MovimientosColumns}
          data={movimientosData}
          state={{
            isLoading: loadingTable,
            rowSelection: rowSelectionMovimientos,
          }}
          onRowSelectionChange={setRowSelectionMovimientos}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableRowSelection={true}

          renderTopToolbarCustomActions={() => (
            <Stack direction="row" sx={{ m: 1 }}>



              <Tooltip title="Agregar">
                <IconButton onClick={() => {
                  setAddMovimientosShowModal(true);
                }}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  onClick={() => { 
                    const selectedData = Object.keys(rowSelectionMovimientos).map((key) => movimientosData[key]);
                    if (selectedData.length !== 1) {
                      alert("Por favor, seleccione una sola fila para editar.");
                      return;
                    }
                    setUpdateMovimientosShowModal(true);
                    setSelectedMovimientos(selectedData[0]);  // Guardamos el serie seleccionado

                    console.log("Datos seleccionados movimientos:", selectedData);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton onClick={() => { 
                   const selectedData = Object.keys(rowSelectionMovimientos).map((key) => movimientosData[key]);

                   // Pasa solo el ID del serie seleccionado al modal de actualización\
                   console.log('movimientos delete', selectedData);
                   setDeleteMovimientosShowModal(true);
                   setSelectedMovimientos(selectedData);  // Guardamos el serie seleccionado
 
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Detalles">
                <IconButton onClick={() => {
                    const selectedData = Object.keys(rowSelectionMovimientos).map((key) => movimientosData[key]);

                   
                    setDetailsMovimientosShowModal(true);
                    setSelectedMovimientos(selectedData);  // Guardamos el serie seleccionado
  

                 }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

            </Stack>

          )}
          muiTableBodyCellProps={{
            sx: {
              color: "#503685", // Texto en tonalidades moradas para las celdas de datos
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#6c47b8", // Texto blanco para los encabezados
              fontWeight: "bold", // Resaltar los encabezados
            },
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: "#fff", // Fondo oscuro para la tabla
            },
          }}
        />
      )}
      {/* Fin Tabla de movt ---------------------------------------*/}










      {/*tabla negocios ------------------------------------*/}

      {/* Modales */}
      <AddInventoryModal
        showAddModal={addInventoryShowModal}
        setShowAddModal={setAddInventoryShowModal}
        fetchData={fetchData}
        onClose={() => setAddInventoryShowModal(false)}
      />

      {<UpdateInventoryModal
        showUpdateModal={updateInventoryShowModal}
        setShowUpdateModal={setUpdateInventoryShowModal}
        selectedInventory={selectedInventory} // Pasa el inventario seleccionado
        fetchData={fetchData}
        onClose={() => setUpdateInventoryShowModal(false)}
      />}

      <DeleteInventoryModal
        showDeleteModal={deleteInventoryShowModal}
        setShowDeleteModal={setDeleteInventoryShowModal}
        fetchData={fetchData}
        selectInventory={selectedInventory}
        onClose={() => setDeleteInventoryShowModal(false)}
      />

      <DetailsInventoryModal
        showDetailsModal={detailsInventoryShowModal}
        setShowDetailsModal={setDetailsInventoryShowModal}
        inventories={inventoriesData}
        selectedInventory={selectedInventory} // Pasa el inventario seleccionado
        onClose={() => setDetailsInventoryShowModal(false)}
      />

      {/* Fin Modales de negocios------------------------------------- */}


      {/*tabla de Almacenes ------------------------------------*/}
      <AddAlmacenesModal
        showAddModal={addAlmacenesShowModal}
        setShowAddModal={setAddAlmacenesShowModal}
        fetchData={fetchData}
        onClose={() => setAddAlmacenesShowModal(false)}
      />

      <UpdateAlmacenesModal
        showUpdateModal={updateAlmacenesShowModal}
        setShowUpdateModal={setUpdateAlmacenesShowModal}
        selectedAlmacenes={selectedAlmacenes} // Pasa el inventario seleccionado
        fetchData={fetchData}
        onClose={() => setUpdateAlmacenesShowModal(false)}
      />

      <DeleteAlmacenesModal
        showDeleteModal={deleteAlmacenesShowModal}
        setShowDeleteModal={setDeleteAlmacenesShowModal}
        fetchData={fetchData}
        selectAlmacenes={selectedAlmacenes}
        onClose={() => setDeleteAlmacenesShowModal(false)}
      />
      <DetailsAlmacenesModal
        showDetailsModal={detailsAlmacenesShowModal}
        setShowDetailsModal={setDetailsAlmacenesShowModal}
        almacenes={almacenesData}
        selectedAlmacenes={selectedAlmacenes} // Pasa el inventario seleccionado
        onClose={() => setDetailsAlmacenesShowModal(false)}
      />








      {/*tabla de series ------------------------------------*/}
      <AddIServisModal
        showAddModal={addSeriesShowModal}
        setShowAddModal={setAddSeriesShowModal}
        fetchData={fetchData}
        onClose={() => setAddSeriesShowModal(false)}
      />

      <DeleteSeriesModal
        showDeleteModal={deleteSeriesShowModal}
        setShowDeleteModal={setDeleteSeriesShowModal}
        fetchData={fetchData}
        selectSeries={selectedSeries}
        onClose={() => setDeleteSeriesShowModal(false)}
      />


      <DetailsSeriesModal
        showDetailsModal={detailsSeriesShowModal}
        setShowDetailsModal={setDetailsSeriesShowModal}
        series={seriesData}
        selectedSeries={selectedSeries} // Pasa el inventario seleccionado
        onClose={() => setDetailsSeriesShowModal(false)}
      />

      <UpdateSeriesModal
        showUpdateModal={updateSeriesShowModal}
        setShowUpdateModal={setUpdateSeriesShowModal}
        selectedSeries={selectedSeries} // Pasa el inventario seleccionado
        fetchData={fetchData}
        onClose={() => setUpdateSeriesShowModal(false)}
      />








      {/*tabla de Movimientos ------------------------------------*/}
      <AddMovimientosModal
        showAddModal={addMovimientosShowModal}
        setShowAddModal={setAddMovimientosShowModal}
        fetchData={fetchData}
        onClose={() => setAddMovimientosShowModal(false)}
      />
      <DetailsMovimientosModal
        showDetailsModal={detailsMovimientosShowModal}
        setShowDetailsModal={setDetailsMovimientosShowModal}
        movimientos={movimientosData}
        selectedMovimientos={selectedMovimientos} // Pasa el inventario seleccionado
        onClose={() => setDetailsMovimientosShowModal(false)}
      />

      <DeleteMoviminetosModal
        showDeleteModal={deleteMovimientosShowModal}
        setShowDeleteModal={setDeleteMovimientosShowModal}
        fetchData={fetchData}
        selectedMoviminetos={selectedMovimientos} // Pasa el inventario seleccionado
        onClose={() => setDeleteMovimientosShowModal(false)}
      />

      <UpdateMovimientosModal
        showUpdateModal={updateMovimientosShowModal}
        setShowUpdateModal={setUpdateMovimientosShowModal}
        selectedMovimientos={selectedMovimientos} // Pasa el inventario seleccionado
        fetchData={fetchData}
        onClose={() => setUpdateMovimientosShowModal(false)}
      />


    </Box>



  );
};

export default InventoriesTable;