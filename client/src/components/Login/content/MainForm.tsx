import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
// interface
import { LoginForm } from "../../../api/auth.services";
// children components
import HelpGrid from "./Form/HelpGrid";
import ProfileInput from "./Form/ProfileInput";
import UsernameInput from "./Form/UsernameInput";
import PasswordInput from "./Form/PasswordInput";
import RememberCheck from "./Form/RememberCheck";
import SubmitButton from "./Form/SubmitButton";

const PROFILE = "coki";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function MainForm(): JSX.Element {
  const classes = useStyles();

  const initialState: LoginForm = {
    profile: PROFILE,
    username: "",
    password: "",
  };

  const [form, setForm] = useState<LoginForm>(initialState);

  const [remember, setRemember] = useState(false);

  const [error, setError] = useState(false);

  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (error) {
      setForm({
        ...form,
        password: "",
      });
    }
  }, [error]);

  return (
    <FormControl
      component="fieldset"
      error={error}
      className={classes.formControl}
    >
      {/* <ProfileInput
        form={form}
        setForm={setForm}
        setError={setError}
        setHelperText={setHelperText}
      /> */}
      <UsernameInput
        form={form}
        setForm={setForm}
        setError={setError}
        setHelperText={setHelperText}
      />
      <PasswordInput
        form={form}
        setForm={setForm}
        setError={setError}
        setHelperText={setHelperText}
      />
      <RememberCheck remember={remember} setRemember={setRemember} />

      <FormHelperText>
        <Typography>{helperText}</Typography>
      </FormHelperText>

      <SubmitButton
        form={form}
        remember={remember}
        setError={setError}
        setHelperText={setHelperText}
      />

      <HelpGrid />
    </FormControl>
  );
}
