import React from 'react';
// interface
import { IProductsByInvoice } from '../../../../../../../../api/statistic.services';
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
  productsByInvoice: IProductsByInvoice[];
}

export default function ProductsByInvoiceChart({
  productsByInvoice,
}: DateInputsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('amountOfSales');

  return (
    <Bar
      type="bar"
      data={{
        labels: productsByInvoice.map((row) => row.product),
        datasets: [
          {
            label: label,
            data: productsByInvoice.map((row) => row.invoices),
            backgroundColor: applyBackgroundColor(productsByInvoice.length),
            borderColor: applyBorderColor(productsByInvoice.length),
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
