import React from 'react';
// interface
import { IClientsPurchasesByProduct } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
} from '../../../../../../../../utils/chart';
// chart
import { Pie } from 'react-chartjs-2';

interface ClientsPurchasesByProductProps {
  clientsPurchasesByProduct: IClientsPurchasesByProduct[];
}

export default function ClientsPurchasesByProductChart({
  clientsPurchasesByProduct,
}: ClientsPurchasesByProductProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  let totalProd = clientsPurchasesByProduct.reduce(
    (accum, detail) => accum + parseFloat(detail.quantity.toString()),
    0
  );

  return (
    <Pie
      type="pie"
      data={{
        labels:
          clientsPurchasesByProduct.length === 0
            ? [translate('noClients')]
            : clientsPurchasesByProduct.map((row) => row.client),
        datasets: [
          {
            data:
              clientsPurchasesByProduct.length === 0
                ? [0]
                : clientsPurchasesByProduct.map((row) =>
                    ((row.quantity * 100) / totalProd).toFixed(2)
                  ),
            backgroundColor: applyBackgroundColor(
              clientsPurchasesByProduct.length
            ),
            borderColor: applyBorderColor(clientsPurchasesByProduct.length),
            borderWidth: 1,
          },
        ],
      }}
      height={350}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 12,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem: any, data: any) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.index];
              return `${currentValue} %`;
            },
            title: function (tooltipItem: any, data: any) {
              return data.labels[tooltipItem[0].index];
            },
          },
        },
      }}
    />
  );
}
