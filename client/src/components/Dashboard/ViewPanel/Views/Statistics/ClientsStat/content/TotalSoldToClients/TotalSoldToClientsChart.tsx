import React from 'react';
// interface
import { ITotalSoldToClients } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
} from '../../../../../../../../utils/chart';
// chart
import { Bar } from 'react-chartjs-2';

interface TotalSoldToClientsProps {
  totalSoldToClients: ITotalSoldToClients[];
}

export default function TotalSoldToClientsChart({
  totalSoldToClients,
}: TotalSoldToClientsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('totalSoldIn$');

  return (
    <Bar
      type="bar"
      data={{
        labels: totalSoldToClients.map((row) => row.client),
        datasets: [
          {
            label: label,
            data: totalSoldToClients.map((row) => row.total_sold),
            backgroundColor: applyBackgroundColor(totalSoldToClients.length),
            borderColor: applyBorderColor(totalSoldToClients.length),
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
            fontSize: 15,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem: any, data: any) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.index];
              return `$ ${currentValue}`;
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
