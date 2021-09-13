import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";


export default function DashboardItem({id, name, qty, category,upc, updateState, isLow}){
    const [modalOpen , setModalOpen] = useState(false)
    
    function handleClick(){
        axios.delete(`/items/${id}`)
        updateState()
    }

    function toggleOpenEdit(){
        setModalOpen(prev => !prev)
    }


    return (
        <div className={`${isLow ? 'low-stock-item' : ''}`}>
            
        <h1>{name}</h1>
            <div>
                <h4>QTY: {qty}</h4>
                <p>Category: {category}</p>
                {upc ? <p>UPC: {upc}</p> : null}
                <button onClick={handleClick}>Delete</button>
                <button onClick={toggleOpenEdit}>Edit</button>
            </div>
            <EditItem isOpen={modalOpen} toggleOpenEdit={toggleOpenEdit} updateState={updateState} data={{id, name, qty, category, upc}} />
        </div>
    )
}