import React from 'react';
import './App.css';
import { NavPage, SheetPage } from './component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = () => (
  <div className="bg-gray-100 min-h-screen h-full w-screen p-4">
    <div className="h-100 w-9/12 my-auto mx-auto flex items-center justify-center align-center font-sans">
      <NavPage />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sheet/:filename">
          <SheetPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
