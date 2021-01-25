import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

const DataTable = (props) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <MaterialTable
        columns={props.columns}
        data={props.data}
        title={props.title}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar usuario",
            onClick: (event, rowData) => props.selectedItem(rowData, "Edit"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar usuario",
            onClick: (event, rowData) => props.selectedItem(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            background: "#4094e2",
            color: "#000000",
            fontWeight: "700",
            border: "none",
            fontSize: "17px",
          },
          actionsCellStyle: {
            // background: "#96acc0",
            color: "#000000",
            borderBottom: "1px solid #96acc0",
          },
          cellStyle: { borderBottom: "1px solid #96acc0" },
        }}
        localization={{
          header: {
            actions: "ACCIONES",
          },
          toolbar: {
            searchPlaceholder: "Buscar",
            searchTooltip: "Buscar",
          },
          body: {
            emptyDataSourceMessage: "No hay registros que mostrar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
          },
          pagination: {
            labelRowsSelect: "registros",
            firstTooltip: "primera página",
            previousTooltip: "página anterior",
            labelRowsPerPage: "Total de registros",
            labelDisplayedRows:
              "{from} - {to} de {count} regsitros encontrados",
            nextTooltip: "página siguiente",
            lastTooltip: "última página",
          },
        }}
      />
    </Grid>
  );
};

export default DataTable;
