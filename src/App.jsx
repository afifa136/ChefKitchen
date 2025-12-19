import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstcompact from "./component/Firstcompact";
import Secondcompact from "./component/Secondcompact";
import Offers from "./component/Offers";
import Favorate from "./component/Favorate";
import Mail from "./component/Mail";
import Notification from "./component/Notification";



const App = () => {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstcompact />} />
        <Route path="/menu" element={<Secondcompact />} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/likes" element={<Favorate/>} />
        <Route path="/profile" element={<Mail/>} />
        <Route path="/notifications" element={<Notification/>} />
      </Routes>
    </Router>
  );
};

export default App;
