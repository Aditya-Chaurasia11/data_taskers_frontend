import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactInfo from "./components/ContactInfo";
import MessageList from "./components/MessageList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:id" element={<ContactInfo />} />
        <Route path="/messages" element={<MessageList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
