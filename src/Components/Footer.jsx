import React from "react";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="py-8 border-t-1" >
      <h1 className="flex flex-row items-center justify-center text-xl">All {<FaRegCopyright />} reserve</h1>
    </div>
  );
};

export default Footer;
