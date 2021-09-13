import React from "react";
import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import axios from 'axios'



export default function EditItem({ toggleOpenEdit, handleClick, updateState, data, isOpen}){
    const [name, setName] = useState(data.name)
    const [qty, setQty] = useState(data.qty)
    const [upc, setUpc] = useState(data.upc)
    const [category, setCategory] = useState(data.category)

    const categories = useContext(CategoryContext)

    function handleName(e) {
        setName(e.target.value)
    }
    function handleNumber(e) {
        setQty(e.target.value)
    }
    function handleUpc(e) {
        setUpc(e.target.value)
    }
    function handleCategory(e) {
        setCategory(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const update = {
            name,
            qty,
            upc,
            category
        }
        setName('')
        setQty(0)
        setUpc('')
        setCategory('')
        updateState()
        const res = await axios.put(`/items/${data.id}`, update)
        
    }

    return (
        
     
            <div className={`edit-modal ${isOpen ? 'edit-open' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Item Name: </label>
                        <input 
                        id="name"
                        type="text" 
                        name="name"
                        value={name}
                        onChange={handleName}
                        placeholder="Item Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="qty">Item QTY: </label>
                        <input 
                        id="qty"
                        type="number" 
                        name="qty"
                        value={qty}
                        onChange={handleNumber}
                        placeholder="Item QTY"
                        />
                    </div>
                    <div>
                        <label htmlFor="upc">Item UPC: </label>
                        <input 
                        id="upc"
                        type="texy" 
                        name="upc"
                        value={upc}
                        onChange={handleUpc}
                        placeholder="If Available"
                        />
                    </div>
                    <div>
                    <label htmlFor="category">Item Category: </label>
                    <select id="category" name="category" onChange={handleCategory}>
                        {categories.map(opt => {
                            return(
                                <option>{opt}</option>
                            )
                        })}
                    </select>
                    </div>
                    <button 
                    onClick={toggleOpenEdit} 
                    disabled={!name ? true : false}
                    >
                        Edit
                    </button>
                </form>
            </div>

      
    )
}