import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} BookMyUni. All rights reserved.</p>

        <p>Discover shows. Book seats. Enjoy the experience.</p>
      </div>
    </footer>
  );
};

export default Footer;