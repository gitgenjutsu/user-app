import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex justify-center items-center">
        <Link href="/" className="text-white text-lg font-bold">
          GitHub Users App
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
