import React from "react";
import { FaYoutube, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-gray-800 py-4'>
      <div className='flex justify-center space-x-4'>
        <a
          href='https://www.youtube.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaYoutube className='text-white text-2xl' />
        </a>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaFacebook className='text-white text-2xl' />
        </a>
        <a
          href='https://www.github.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className='text-white text-2xl' />
        </a>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram className='text-white text-2xl' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
