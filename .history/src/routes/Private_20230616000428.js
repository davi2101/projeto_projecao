import React, { useState, useEffect, Link } from "react";

import { auth } from '../firebase/firebaseConnection'

import { onAuthStateChanged } from 'firebase/auth'

import { Navigate, useHistory  } from 'react-router-dom'


export default function Private ({ children }){
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {

        if(user){
          const userData = {
            uid: user.uid,
            email: user.email
          };
  
  
          localStorage.setItem('@detailuser', JSON.stringify(userData))
          setLoading(false)
          setSigned(true)
        }else{
          setLoading(false)
          setSigned(false)
        }
  
      })
    }
    
    checkLogin();

  }, [])

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    return history.push('/')
  
  }

  return children;
}