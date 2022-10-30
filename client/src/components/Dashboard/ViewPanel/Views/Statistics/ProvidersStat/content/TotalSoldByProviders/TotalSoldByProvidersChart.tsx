import React from 'react';
// interface
import { ITotalSoldByProviders } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
} from '../../../../../../../../utils/chart';
// chart
import { Bar } from 'react-chartjs-2';

interface TotalSoldByProvidersProps {
  totalSoldByProviders: ITotalSoldByProviders[];
}

export default function TotalSoldByProvidersChart({
  totalSoldByProviders,
}: TotalSoldByProvidersProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('quantityOfSoldProducts');

  return (
    <Bar
      type="bar"
      data={{
        labels: totalSoldByProviders.map((row) => row.provider),
        datasets: [
          {
            label: label,
            data: totalSoldByProviders.map((row) => row.quantity),
            backgroundColor: applyBackgroundColor(totalSoldByProviders.length),
            borderColor: applyBorderColor(totalSoldByProviders.length),
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
      }}
    />
  );
}
