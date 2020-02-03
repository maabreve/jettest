import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Validator from "../../helpers/Validator";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing()
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

const LoginForm = ({ loginUser, errorMessage, ...props }) => {
  const { classes, loading } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmit] = useState(false);

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <span className="error-block error-text">{errorMessage}</span>
        <form
          className={classes.form}
          onSubmit={e => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {submitted && !email && (
              <div className="error-block">Email is required</div>
            )}
            {submitted && email && !Validator.email(email) && (
              <div className="error-block">Invalid email</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {submitted && !password && (
              <div className="error-block">Password is required</div>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/auth/register"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </Paper>
    </main>
  );

  async function handleLogin(e) {
    e.preventDefault();
    setSubmit(true);
    if (isFormValid(email, password)) {
      loginUser({ email: email, password: password });
    }
  }
};

const isFormValid = (email, password) => {
  return Validator.email(email) && Validator.password(password);
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(LoginForm));
