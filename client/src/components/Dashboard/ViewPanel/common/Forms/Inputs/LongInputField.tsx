import { ChangeEvent } from 'react';
// hooks
import { useIsMobile } from '../../../../../../hooks/useIsMobile';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() =>
  createStyles({
    mobile: {
      width: 210,
    },
    desktop: {
      width: 465,
    },
  })
);

interface LongInputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  InputProps?: {
    inputComponent: any;
    startAdornment?: JSX.Element;
  };
  maxLength?: number;
  select?: true;
  children?: JSX.Element[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function LongInputField({
  id,
  name,
  label,
  value,
  onChange,
  children,
  required,
  maxLength,
  ...other
}: LongInputFieldProps) {
  const classes = useStyles();

  const { isMobile } = useIsMobile();

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      required={required}
      onChange={onChange}
      className={isMobile ? classes.mobile : classes.desktop}
      autoComplete="off"
      inputProps={{
        maxLength: maxLength,
        autoComplete: 'new-password',
      }}
      {...other}
    >
      {children}
    </TextField>
  );
}
