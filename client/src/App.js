import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CustomRoutes from './components/routing/Routes';

///Redux
import store from "./store";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// If a token is present when the bundle loads, attach it
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Run once on mount: try to load the user using the token
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/*" element={<CustomRoutes />} />
      </Routes>
    </>
  );
};

export default App;
