import { ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 210,
    },
  })
);

interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string | number;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  InputProps?: {
    inputComponent?: any;
    startAdornment?: JSX.Element;
    endAdornment?: JSX.Element;
  };
  maxLength?: number;
  select?: true;
  children?: JSX.Element[];
  error?: boolean;
  helperText?: string;
  type?: string;
  endAdornment?: JSX.Element;
  required?: boolean;
}

export default function InputField({
  id,
  name,
  label,
  value,
  disabled,
  onChange,
  children,
  required,
  maxLength,
  ...other
}: InputFieldProps) {
  const classes = useStyles();

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      required={required}
      disabled={disabled}
      onChange={onChange}
      className={classes.root}
      type="text"
      autoComplete="off"
      {...other}
      inputProps={{
        maxLength: maxLength,
        type: 'text',
        //autoComplete: 'off',
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off',
        },
      }}
    >
      {children}
    </TextField>
  );
}
