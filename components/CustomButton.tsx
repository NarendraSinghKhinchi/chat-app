import React from 'react';
export interface btnProps {
  title:string;
  textStyles?:string;
  btnStyles?:string;
  btnType?: 'submit' | 'button';
  handleClick?: ()=>void ;
}
const CustomButton = ({ title, textStyles, btnStyles, btnType, handleClick, }: btnProps) => {
  return (
    <button
      className={`bg-blue-500  px-2 py-2 sm:px-3 rounded-full  ${btnStyles}`}
      type={btnType || 'button'}
      onClick={handleClick}
    >
      <span className={`text-white  ${textStyles}`}>{title}</span>
    </button>
  )
}

export default CustomButton;