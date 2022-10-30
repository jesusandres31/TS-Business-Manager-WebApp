import React from 'react';
// interface
import { IClientsByInvoices } from '../../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// constants
import {
  applyBackgroundColor,
  applyBorderColor,
  backgroundColor,
} from '../../../../../../../../utils/chart';
// chart
import { Bar } from 'react-chartjs-2';

interface DateInputsProps {
  clientsByInvoices: IClientsByInvoices[];
}

export default function ClientsByInvoicesChart({
  clientsByInvoices,
}: DateInputsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('amountOfPurchases');

  return (
    <Bar
      type="bar"
      data={{
        labels: clientsByInvoices.map((row) => row.client),
        datasets: [
          {
            label: label,
            data: clientsByInvoices.map((row) => row.invoices),
            backgroundColor: applyBackgroundColor(clientsByInvoices.length),
            borderColor: applyBorderColor(clientsByInvoices.length),
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
