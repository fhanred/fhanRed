// HomePage.js
import React from 'react';
import MovementsCash from './MovementsCash';
import TaskPage from './TaskPage';
import Vouchers from './Vouchers';
import Worker from './Worker';



const HomePage = () => {
  return (
    <div>
     <MovementsCash/>
     <TaskPage/>
     <Vouchers/>
    <Worker/>    
    </div>
  );
};

export default HomePage;
