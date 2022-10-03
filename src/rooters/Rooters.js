import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";
import TestScreen from "../pages/TestScreen";

const Rooters = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/test" element={<TestScreen />} />
      </Routes>
    </Router>
  );
}

export default Rooters;