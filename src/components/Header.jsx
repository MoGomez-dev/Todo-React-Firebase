import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaGithub } from "react-icons/fa";
import MyFont from '../fonts/Fanda_Sans.TTF'
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';


export const Header = ({unit, isAuth, setUnit, setColor, color}) => {
    const [name, setName] = useState("");
    const [timeUnit, setTimeUnit] = useState("24時間");

    useEffect(() => {
      // 名前を取得
        const getState = async () => {
          const data = await getDocs(collection(db, "state"));
          const state = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id})).filter((data) => data.id === auth.currentUser.uid));
          const setState = () => {
            setColor(state[0].color);
            setTimeUnit(state[0].timeUnit);
            setUnit(state[0].unit);
          }
          state[0] && setState();
          setName(auth.currentUser.displayName);
        }
        isAuth ? getState() : setName("Guest");
      },[])

    const setTimeFunction = (milliSeconds, time) => {
      setUnit(milliSeconds);
      setTimeUnit(time);
      const isAuthSetDocTime = async () => {
        await setDoc(doc(db, "state", auth.currentUser.uid), {
        unit: milliSeconds,
        timeUnit: time,
        color: color,
      })}
      isAuth && isAuthSetDocTime();
    }

    const handleUnit = () => {
      if(timeUnit === "24時間"){
        setTimeFunction(43200000, "12時間")
        return;
      }
      if(timeUnit === "12時間"){
        setTimeFunction(21600000, "6時間")
        return;
      }
      if(timeUnit === "6時間"){
        setTimeFunction(10800000, "3時間")
        return;
      }
      if(timeUnit === "3時間"){
        setTimeFunction(3600000, "1時間")
        return;
      }
      if(timeUnit === "1時間"){
        setTimeFunction(86400000, "24時間")
        return;
      }
    }
    
    const setColorFunction = (colorCode) => {
      setColor(colorCode);
      const isAuthSetDocColor = async () => {
        await setDoc(doc(db, "state", auth.currentUser.uid), {
        unit: unit,
        timeUnit: timeUnit,
        color: colorCode,
      })}
      isAuth && isAuthSetDocColor();
      
    }

    const handleColor = () => {
      if(color == "yellow"){
        setColorFunction("pink");
        return;
      }
      if(color == "pink"){
        setColorFunction("skyblue");
        return;
      }
      if(color == "skyblue"){
        setColorFunction("plum");
        return;
      }
      if(color == "plum"){
        setColorFunction("greenyellow");
        return;
      }
      if(color == "greenyellow"){
        setColorFunction("orange");
        return;
      }
      if(color == "orange"){
        setColorFunction("cyan");
        return;
      }
      if(color == "cyan"){
        setColorFunction("yellow");
        return;
      }
    }
  
  return (
    <HeaderContainer>
      <HeaderWrapper >
        <Link to='/' ><h1><span>M</span>otonari</h1></Link>
        
        <ul>
            <li>期限まで<TimeUnitButton onClick={handleUnit}>{timeUnit}</TimeUnitButton>を切ると<ColorButton color={color} onClick={handleColor}>{color}</ColorButton>で表示されます</li>
            <li><h6>{name}さん</h6></li>
            {isAuth ? 
            <li>
                <Link to='/logout' >Logout</Link>
            </li> :
            <li>
                <Link to='/login' >Login</Link>
            </li>}
            
            <li>
                <Link to='https://github.com/MoGomez-dev/Todo-React-Firebase' ><FaGithub /></Link>
            </li>
        </ul>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

const HeaderWrapper = styled.nav`
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        text-decoration: none;
    }

    h1 {
        font-size: 40px;
        font-weight: normal;
        color: #808080;
        font-family: 'Fanda', sans-serif;

        span {
        color: #57b399
        }
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;

      li {
      padding-right: 25px;
      font-size: 15px;
    
        a {
          color: #808080;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.2s; 
          font-size: 20px;
      
          &:hover {
            color: #313131;
          }
        }

        h6 {
          font-size: 20px;
        }
      }
    }
    @font-face {
      font-family: 'Fanda';
      src: url(${MyFont}) format('truetype');
    }
  `

const HeaderContainer = styled.header`
    height: 100px;
    width: 100%;
    background-color: #ffffff;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ColorButton = styled.button`
  background-color: ${(props) => props.color};
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid;
`
const TimeUnitButton = styled.button`
  background-color: white;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid;
`
