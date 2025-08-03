import React, { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import { PlusCircle } from 'react-feather';
import Addquizmodel from '../component/addquizmodel';

const QuizAdd = () => {
  
  return (
    <>
       
      
    <div className="flex w-screen h-screen ">
      

      <div className="flex-1 flex-col h-full overflow-y-auto ">
        <Addquizmodel />
      </div>
      </div>
    </>
  );
};

    
  
export default QuizAdd;
