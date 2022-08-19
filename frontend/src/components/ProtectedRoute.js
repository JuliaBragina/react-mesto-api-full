import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({componentMain: ComponentMain, componentHeader: ComponentHeader, componentFooter: ComponentFooter, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn 
              ? <>
                  <ComponentHeader {...props} />
                  <ComponentMain {...props} />
                  <ComponentFooter />
                </>
              : <Redirect to="/sign-in" />
      }
    </Route>
)}

export default ProtectedRoute;