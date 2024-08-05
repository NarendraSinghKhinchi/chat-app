"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import {Login, Signup} from './index' ;
const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
  const handleLoginBtn = useCallback(()=>{
    setOpen(true);
  },[]);
  
  return (
    <header className="absolute top-0 z-20 flex bg-slate-300 items-center w-full px-4 sm:pt-2 md:pt-1 pb-1">
      <nav className="flex flex-1 justify-end items-center sm:text-lg md:text-lg gap-10">
        <CustomButton
          title="Sign In"
          btnType="button"
          textStyles="text-white"
          btnStyles="!px-6"
          handleClick={handleLoginBtn}
        />
        <Login open={open} setOpen={setOpen} setSignUpOpen={setSignUpOpen}/>
        <Signup open={signUpOpen} setOpen={setSignUpOpen} />
      </nav>
    </header>
  );
};

export default NavBar;
