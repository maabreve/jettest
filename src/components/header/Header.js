import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: "24px"
  }
}));

const Header = ({ isAuthenticated, logoutUser, history }) => {
  const classes = useStyles();
  const activeStyle = { color: "#c3c3c3" };
  const handleLogoClick = e => {
    e.preventDefault();
    console.log(history);
    history.push("/");
  };

  const handleLogout = e => {
    e.preventDefault();
    logoutUser();
  };

  return isAuthenticated ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>
            <a
              href="#"
              className="nav-link logo"
              onClick={e => handleLogoClick(e)}
            >
              Jetcake
            </a>
          </Typography>
          <NavLink
            className="nav-link"
            to="/auth/user/edit"
            activeStyle={activeStyle}
            exact
          >
            Edit Profile
          </NavLink>
          <NavLink
            className="nav-link"
            to="/logout"
            onClick={e => handleLogout(e)}
            activeStyle={activeStyle}
            exact
          >
            Signout
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>
            <a
              href="#"
              className="nav-link logo"
              onClick={e => handleLogoClick(e)}
            >
              Jetcake
            </a>
          </Typography>
          <NavLink
            className="nav-link"
            to="/auth/login"
            activeStyle={activeStyle}
            exact
          >
            Sigin
          </NavLink>
          <NavLink
            className="nav-link"
            to="/auth/register"
            activeStyle={activeStyle}
            exact
          >
            Register
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { isAuthenticated } = state.authReducer;
  return {
    isAuthenticated
  };
}

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
