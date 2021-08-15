import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Details from "./Pages/Details";

const Home = lazy(() => import('./Pages/Home'));

function App() {
  return (
    <>
      <Router>
        {/* <Toaster /> */}
        <Suspense
          fallback={<LoadingSpinner />}
        >
          <Navbar></Navbar>
          <div className="container mt-5 pt-5">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/shipments/:id">
                <Details />
              </Route>
            </Switch>
          </div>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
