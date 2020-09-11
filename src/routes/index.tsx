import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "./routes.config";
const authed = () => {
  return localStorage.getItem("hasLogin");
};
const authPath = "/login";

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = () => {
  return (
    <Router>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {routes.map((route: any, i) => (
            <Route
              key={route.id || i}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                if (route.authentication && route.path !== authPath) {
                  if (authed()) {
                    return <route.component {...props} />;
                  }
                  if (!authed()) return <Redirect to="/login" />;
                }
                if (!route.authentication) {
                  if (route.path === authPath) {
                    if (authed()) return <Redirect to="/1" />;
                    if (!authed()) return <route.component {...props} />;
                  } else if (route.default) {
                    if (authed()) return <Redirect to="/1" />;
                    if (!authed()) return <Redirect to="/login" />;
                  } else {
                    return <route.component {...props} />;
                  }
                }
              }}
            />
          ))}
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default Routes;
