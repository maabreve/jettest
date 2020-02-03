import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import HomePage from "./home/HomePage";

import { logoutUser } from "../redux/actions/authActions";
import PageNotFound from "./PageNotFound";
import AuthPage from "./auth/AuthPage";
import Confirmation from "./auth/Confirmation";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { ProxyRoute } from "../routes";
import Auth from "../api/auth";
import { setCurrentUser } from "../redux/actions/authActions";

const App = ({
  currentUser,
  isAuthenticated,
  history,
  setCurrentUser,
  logoutUser,
  loading,
  ...props
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    Auth.onAuthStateChanged(handleAuthStateChanged);
    return () => {
      abortController.abort();
    };
  }, []);

  const handleAuthStateChanged = user => {
    console.log("user", user);
    if (user) {
      const {
        refreshToken,
        uid,
        displayName,
        photoURL,
        phoneNumber,
        isAnonymous,
        metadata
      } = user;

      setCurrentUser({
        refreshToken,
        uid,
        displayName,
        photoURL,
        phoneNumber,
        isAnonymous,
        metadata
      });
    } else {
      setCurrentUser({});
    }
  };

  return (
    <div className="container-fluid">
      <Header isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <ProxyRoute
            path="/auth/login"
            type="public"
            isAuthenticated={isAuthenticated}
            component={AuthPage}
          />
          <ProxyRoute
            path="/auth/register"
            type="public"
            isAuthenticated={isAuthenticated}
            component={AuthPage}
          />
          <ProxyRoute
            path="/auth/user/edit"
            type="private"
            isAuthenticated={isAuthenticated}
            component={AuthPage}
          />
          <Route path="/auth/confirmation" component={Confirmation} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const { currentUser, isAuthenticated } = state.authReducer;
  return {
    currentUser,
    isAuthenticated,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  setCurrentUser,
  logoutUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
