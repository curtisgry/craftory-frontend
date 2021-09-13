import React from "react";
import { useState, useEffect } from "react";
import { callBackend } from "../utils/callBackend";

export default function About(){

    const [data, setData] = useState(null)

  
  useEffect(()=> {
    callBackend('/about')
    .then(res => setData(res.title))
    .catch(err => console.log(err))
  }, [])
    return (
        <h1>{data}</h1>
    )
}