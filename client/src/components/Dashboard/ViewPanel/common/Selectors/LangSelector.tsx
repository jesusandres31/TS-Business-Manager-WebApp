import { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// global state
import { useLanguagesSelector } from '../../../../../features/extras/languagesSlice';
// context
import { useLanguage } from '../../../../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: 220,
      minWidth: 120,
    },
  })
);

interface LangSelectorProps {
  handleLanguageChange: (
    event: ChangeEvent<{
      value: unknown;
    }>
  ) => void;
  value: string;
  style?: React.CSSProperties | undefined;
}

export default function LangSelector({
  handleLanguageChange,
  value,
  style,
}: LangSelectorProps) {
  const classes = useStyles();

  const { languages } = useLanguagesSelector((state) => state.languages);

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('language');

  return (
    <FormControl
      //variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="lang-select-label" required>
        {label}
      </InputLabel>
      <Select
        style={style}
        labelId="lang-select-label"
        id="lang-select"
        margin="dense"
        value={value}
        onChange={handleLanguageChange}
        label={label}
      >
        {languages.map((language) => {
          return (
            <MenuItem value={language.id}>{translate(language.name)}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
