import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        jaz developement
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
