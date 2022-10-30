export const backgroundColor = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(255, 159, 64, 0.4)',
  'rgba(255, 205, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(201, 203, 207, 0.4)',
];

export const borderColor = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
];

export const applyBackgroundColor = (objLength: number) => {
  let arrLength = backgroundColor.length;
  let colors: string[] = [];
  for (let i = 0; i <= objLength; i++) {
    colors.push(backgroundColor[i % arrLength]);
  }
  return colors;
};

export const applyBorderColor = (objLength: number) => {
  let arrLength = borderColor.length;
  let colors: string[] = [];
  for (let i = 0; i <= objLength; i++) {
    colors.push(borderColor[i % arrLength]);
  }
  return colors;
};
