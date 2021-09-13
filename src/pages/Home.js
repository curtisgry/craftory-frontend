import React from "react";
import { useState, useEffect } from "react";
import { callBackend } from "../utils/callBackend";

export default function Home(){
    const [data, setData] = useState(null)

  
  useEffect(()=> {
    callBackend('/home')
    .then(res => setData(res.title))
    .catch(err => console.log(err))
  }, [])
    return (
        <h1>{data}</h1>
    )
}