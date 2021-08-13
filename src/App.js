import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Router>
        {/* <Toaster /> */}
        <Suspense 
        // fallback={<LoadingSpinner />}
        >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <PrivateRoute path="/dashboard/:panel">
              <Dashboard adminLoading={adminLoading} />
            </PrivateRoute> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
