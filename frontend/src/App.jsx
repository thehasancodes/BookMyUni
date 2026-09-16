import React from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Navbar />

      <main className="flex-1">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
};

export default App;