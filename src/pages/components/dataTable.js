import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

const DataTable = (props) => {
  if (props.dataTree === "menu") {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div>
          <MaterialTable
            style={{
              background: "rgba(255,255,255,0.2)",
              width: "100%",
              borderRadius: "10px",
            }}
            columns={props.columns}
            data={props.data}
            title={props.title}
            actions={[
              {
                icon: "info",
                tooltip: "Ver a detalle",
                onClick: (event, rowData) =>
                  props.selectedItem(rowData, "Detail"),
              },
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) =>
                  props.selectedItem(rowData, "Edit"),
              },
            ]}
            parentChildData={(row, rows) =>
              rows.find((a) => a.MnuId === row.MnuJerqMen)
            }
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                background: "#4094e2",
                color: "#000000",
                fontWeight: "700",
                border: "none",
                fontSize: "14px",
                textAlign: "center",
                padding: "10px 5px",
              },
              actionsCellStyle: {
                // background: "#96acc0",
                color: "#000000",
                borderBottom: "1px solid #96acc0",
                background: "white",
              },
              cellStyle: {
                borderBottom: "1px solid #96acc0",
                fontSize: "12px",
                textAlign: "center",
                padding: "5px 25px",
                background: "white",
              },
              // fixedColumns: {
              //   left: 1,
              //   right: 1,
              // },

              exportButton: true,
              exportCsv: (columns, data) => {
                alert(
                  "You should develop a code to export " + data.length + " rows"
                );
              },
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
        </div>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={{}}>
          <MaterialTable
            style={{
              background: "rgba(255,255,255,0.2)",
              width: "100%",
              borderRadius: "10px",
            }}
            columns={props.columns}
            data={props.data}
            title={props.title}
            actions={[
              {
                icon: "info",
                tooltip: "Ver a detalle",
                onClick: (event, rowData) =>
                  props.selectedItem(rowData, "Detail"),
              },
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) =>
                  props.selectedItem(rowData, "Edit"),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                background: "#4094e2",
                color: "#000000",
                fontWeight: "700",
                border: "none",
                fontSize: "14px",
                textAlign: "center",
                padding: "10px 5px",
              },
              actionsCellStyle: {
                // background: "#96acc0",
                color: "#000000",
                borderBottom: "1px solid #96acc0",
                background: "white",
              },
              cellStyle: {
                borderBottom: "1px solid #96acc0",
                fontSize: "12px",
                textAlign: "center",
                padding: "5px 25px",
                background: "white",
              },
              // fixedColumns: {
              //   left: 1,
              //   right: 1,
              // },

              exportButton: true,
              exportCsv: (columns, data) => {
                alert(
                  "You should develop a code to export " + data.length + " rows"
                );
              },
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
        </div>
      </Grid>
    );
  }
};

export default DataTable;
