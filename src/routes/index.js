import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import BountBoard from "../components/BountBoard";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:boardID" component={BountBoard} />
      </div>
    </Router>
  );
};

export default AppRouter;
