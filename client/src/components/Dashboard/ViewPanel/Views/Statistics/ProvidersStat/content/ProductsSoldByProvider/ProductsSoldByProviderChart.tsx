import React from 'react';
// interface
import { IProductsSoldByProvider } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
} from '../../../../../../../../utils/chart';
// chart
import { Pie } from 'react-chartjs-2';

interface ProductsSoldByProviderProps {
  productsSoldByProvider: IProductsSoldByProvider[];
}

export default function ProductsSoldByProviderChart({
  productsSoldByProvider,
}: ProductsSoldByProviderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  let totalProd = productsSoldByProvider.reduce(
    (accum, detail) => accum + parseFloat(detail.quantity.toString()),
    0
  );

  return (
    <Pie
      type="pie"
      data={{
        labels:
          productsSoldByProvider.length === 0
            ? [translate('noProducts')]
            : productsSoldByProvider.map((row) => row.product),
        datasets: [
          {
            data:
              productsSoldByProvider.length === 0
                ? [0]
                : productsSoldByProvider.map((row) =>
                    ((row.quantity * 100) / totalProd).toFixed(2)
                  ),
            backgroundColor: applyBackgroundColor(
              productsSoldByProvider.length
            ),
            borderColor: applyBorderColor(productsSoldByProvider.length),
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
