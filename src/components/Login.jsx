import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const Login = ({ setIsAuth }) => {
    const navigate = useNavigate();
    const loginWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
          setIsAuth(true);
          localStorage.setItem("isAuth", true);
          navigate('/');
      });
    }

  return (
    <LoginWrapper>
        <p>ログインして始める</p>
        <button onClick={loginWithGoogle}>googleでログイン</button>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`