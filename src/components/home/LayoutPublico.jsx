import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LayoutPublico({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default LayoutPublico;
