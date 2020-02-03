import React, { useState, useEffect } from "react";
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
import MaskedInput from "react-text-mask";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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

function RegisterForm({
  classes,
  currentUser,
  loading,
  handleSave,
  errorMessage
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmit] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (Object.entries(currentUser).length > 0) {
      setName(currentUser.displayName);
      setPhoneNumber(currentUser.phoneNumber);
    }

    return () => {
      abortController.abort();
    };
  }, [currentUser]);

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {!Object.entries(currentUser).length > 0 ? (
          <Typography component="h1" variant="h5">
            Register Account
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
        )}
        <span className="error-block error-text">{errorMessage}</span>
        <form
          className={classes.form}
          onSubmit={e => e.preventDefault() && false}
        >
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name ?? ""}
              onChange={e => setName(e.target.value)}
            />
            {submitted && !name && (
              <div className="error-text">Name is required</div>
            )}
            {submitted && name && !Validator.name(name) && (
              <div className="error-text">Name must have at least 6 digits</div>
            )}
          </FormControl>

          {/* <FormControl margin="normal" fullWidth>
            <MaskedInput
              mask={[
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/
              ]}
              className="form-control masked-text-input MuiInputBase-input MuiInput-input"
              placeholder="Phone number"
              guide={false}
              id="my-input-id"
              onBlur={() => {}}
              value={phoneNumber ?? ""}
              onChange={e => setPhoneNumber(e.target.value)}
            />

            {submitted && !phoneNumber && (
              <div className="error-text">PhoneNumber is required</div>
            )}
            {submitted &&
              phoneNumber &&
              !Validator.phoneNumber(phoneNumber) && (
                <div className="error-text">
                  phoneNumber must have at least 10 digits
                </div>
              )}
          </FormControl> */}
          {!Object.entries(currentUser).length > 0 ? (
            <>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  disabled={Object.entries(currentUser).length > 0}
                  autoComplete="off"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {submitted && !email && (
                  <div className="error-text">Email is required</div>
                )}
                {submitted && email && !Validator.email(email) && (
                  <div className="error-text">Invalid email</div>
                )}
              </FormControl>

              <FormControl margin="normal" fullWidth>
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
                  <div className="error-text">Password is required</div>
                )}
                {submitted && password && !Validator.password(password) && (
                  <div className="error-text">
                    Password must have at least 6 digits
                  </div>
                )}
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="passwordConfirmation">
                  Password Confirmation
                </InputLabel>
                <Input
                  name="passwordConfirmation"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="off"
                  value={passwordConfirmation}
                  onChange={e => setpasswordConfirmation(e.target.value)}
                />
                {submitted && !passwordConfirmation && (
                  <div className="error-text">
                    Password confirmation is required
                  </div>
                )}
                {submitted &&
                  passwordConfirmation &&
                  password !== passwordConfirmation && (
                    <div className="error-text">Passwords do not match</div>
                  )}
              </FormControl>
            </>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onRegister}
            disabled={loading}
            className={classes.submit}
          >
            {loading ? "Saving..." : "Save"}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/auth/login"
            className={classes.submit}
          >
            Go back to Login
          </Button>
        </form>
      </Paper>
    </main>
  );

  function formIsValid() {
    return !Object.entries(currentUser).length > 0
      ? Validator.name(name) &&
          Validator.email(email) &&
          Validator.password(password) &&
          // Validator.phoneNumber(phoneNumber) &&
          password === passwordConfirmation
      : Validator.name(name); // && Validator.phoneNumber(phoneNumber);
  }

  function onRegister() {
    try {
      setSubmit(true);
      if (formIsValid()) {
        handleSave(name, phoneNumber, email, password).catch(e => alert(e));
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

RegisterForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(RegisterForm));
