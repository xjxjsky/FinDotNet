import React from "react";
import hero from "./hero.png";
import { Link } from "react-router-dom";

interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt-16 lg:w-full xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-4xl xl:max-w-5xl lg:text-left leading-tight">
           Financial & Telecomm data with your dream.
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Retrieving relevant Financial & Telcom Alarm information from my website without fear-mongering or fake news!
          </p>
          <p>欢迎来到ZTE Alarm 业务模块！<br/>
             This app is still under construction. It will take some time to be fully operational. Thank you.
          </p><br/>
          <div className="mx-auto lg:mx-0">
            <Link
              to="/search"
              className="py-5 px-10 text-2xl font-bold text-white bg-lightGreen rounded lg:py-4 hover:opacity-70"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
