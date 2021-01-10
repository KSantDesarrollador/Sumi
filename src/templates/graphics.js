import React from "react";
import { Bar } from "react-chartjs-2";
import "../assets/css/graphic.css";

const Graphics = (props) => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Compras por mes",
        fill: true,
        backgroundColor: "rgba(255,155,234,1)",
        borderColor: "rgba(95,155,234,1)",
        pointBorderColor: "rgba(95,155,234,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255,155,234,1)",
        pointHoverBorderColor: "rgba(95,155,234,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: [21, 34, 12, 5, 7.6, 33, 11, 8.9, 3.1, 1, 6, 0.32],
      },
    ],
  };
  return (
    <div className='containGraph'>
      <Bar data={data}></Bar>
    </div>
  );
};

export default Graphics;
