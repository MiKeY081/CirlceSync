import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendar,
  FaPenFancy,
} from "react-icons/fa"; // Import font awesome icons
import { CgUserlane } from "react-icons/cg"; // Import font awesome icons
import { FormattedDate } from "../../assets/Functions/DateFunctions";

const About = ({ owner, joinedDate }) => {
  return (
    <div className='flex flex-col flex-start'>
      <div className='py-4 px-6 flex flex-col'>
        <h1 className='text-2xl font-semibold'>Intro</h1>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <CgUserlane className='mr-2' />
          {owner.name}
        </p>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <FaPenFancy className='mr-2' />
          {owner.slang}
        </p>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <FaEnvelope className='mr-2' />
          {owner.email}
        </p>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <FaUser className='mr-2' />
          {owner.address}
        </p>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <FaPhone className='mr-2' />
          {owner.phone}
        </p>
      </div>
      <div className='py-4 px-6'>
        <p className='text-gray-700 flex items-center'>
          <FaCalendar className='mr-2' />
          {"Joined At " + FormattedDate(joinedDate)}{" "}
        </p>
      </div>
    </div>
  );
};

export default About;
