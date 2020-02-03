import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProxyRoute = ({ component: Component, ...rest }) => {
  let path = "/";
  let renderComponent = true;
  let redirectTo = "";

  if (rest.type === "private") {
    renderComponent = rest.isAuthenticated;
    path = "/auth/login/";
    redirectTo = rest.location.pathname;
  } else if (rest.type === "public") {
    renderComponent = !rest.isAuthenticated;
    path = "/";
  }

  return (
    <Route
      {...rest}
      render={props =>
        renderComponent ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: path,
              search: redirectTo,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
