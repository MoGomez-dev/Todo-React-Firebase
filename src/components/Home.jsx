import React, { useState } from 'react'
import { Guest } from "./Guest";
import { User } from "./User";
import { Header } from './Header';

export const Home = ({ isAuth }) => {
  const [unit, setUnit] = useState(86400000);
  const [color, setColor] = useState("yellow");

    return (
      <div className='App'>
        <Header unit={unit} isAuth={isAuth} setUnit={setUnit} setColor={setColor} color={color} />
        {isAuth ? <User unit={unit} color={color} /> : <Guest unit={unit} color={color} />  }
      </div>
    );
}
