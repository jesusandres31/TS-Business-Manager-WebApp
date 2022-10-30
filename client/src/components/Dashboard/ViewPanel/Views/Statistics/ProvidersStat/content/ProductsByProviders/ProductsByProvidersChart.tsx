import React from 'react';
// interface
import { IProductsByProviders } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
} from '../../../../../../../../utils/chart';
// chart
import { Bar } from 'react-chartjs-2';

interface DateInputsProps {
  productsByProviders: IProductsByProviders[];
}

export default function ProductsByProvidersChart({
  productsByProviders,
}: DateInputsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('numberOfProducts');

  return (
    <Bar
      type="bar"
      data={{
        labels: productsByProviders.map((row) => row.provider),
        datasets: [
          {
            label: label,
            data: productsByProviders.map((row) => row.products),
            backgroundColor: applyBackgroundColor(productsByProviders.length),
            borderColor: applyBorderColor(productsByProviders.length),
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
