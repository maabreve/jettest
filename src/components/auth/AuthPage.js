import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  loginUser,
  logoutUser,
  registerNewUser,
  updateProfile
} from "../../redux/actions/authActions";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = ({
  currentUser,
  loginUser,
  logoutUser,
  registerNewUser,
  updateProfile,
  loading,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const redirectTo = props.location.search.slice(1);

  return (
    <>
      {window.location.href.includes("login") ? (
        <LoginForm
          loginUser={handleLogin}
          loading={loading}
          errorMessage={errorMessage}
        ></LoginForm>
      ) : window.location.href.includes("register") ||
        window.location.href.includes("user/edit") ? (
        <RegisterForm
          currentUser={currentUser}
          handleSave={handleSave}
          loading={loading}
          errorMessage={errorMessageRegister}
        ></RegisterForm>
      ) : (
        <div></div>
      )}
    </>
  );

  async function handleSave(name, phoneNumber, email, password) {
    if (Object.entries(currentUser).length > 0) {
      updateProfile(name, phoneNumber)
        .then(a => {
          toast.success("Your account has been updated successfully!");
        })
        .catch(e => {
          setErrorMessageRegister(e.message);
          throw e;
        });

      return;
    }

    registerNewUser(name, phoneNumber, email, password)
      .then(a => {
        toast.success("Your account has been registered successfully!");
        props.history.replace("/");
      })
      .catch(e => {
        setErrorMessageRegister(e.message);
        throw e;
      });
  }

  async function handleLogin(creds) {
    loginUser({ user: creds.email, password: creds.password })
      .then(a => {
        props.history.replace(redirectTo !== "" ? redirectTo : "/");
      })
      .catch(e => {
        setErrorMessage(e.message);
        throw e;
      });
  }
};

AuthPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  registerNewUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    currentUser: state.authReducer.currentUser,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loginUser,
  logoutUser,
  registerNewUser,
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
