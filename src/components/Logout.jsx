import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import styled from "styled-components"

export const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
    const logout = () => {
      signOut(auth).then(() => {
        setIsAuth(false);
        localStorage.clear();
        navigate('/');
    });
  }

  return (
    <LogoutWrapper>
      <p>ログアウトする</p>
      <button onClick={logout}>ログアウト</button>
    </LogoutWrapper>
  )
}

const LogoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`