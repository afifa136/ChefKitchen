import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstcompact from "./component/Firstcompact";
import Secondcompact from "./component/Secondcompact";



const App = () => {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstcompact />} />
        <Route path="/menu" element={<Secondcompact />} />
      </Routes>
    </Router>
  );
};

export default App;
