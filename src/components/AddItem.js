import React from "react";
import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import axios from 'axios'



export default function AddItem({ handleClick, updateState}){
    const [name, setName] = useState('')
    const [qty, setQty] = useState(0)
    const [qtyLow, setQtyLow] = useState(0)
    const [upc, setUpc] = useState('')
    const [category, setCategory] = useState('Wicks')

    const categories = useContext(CategoryContext)

    function handleName(e) {
        setName(e.target.value)
    }
    function handleNumber(e) {
        setQty(e.target.value)
    }
    function handleNumberLow(e) {
        setQtyLow(e.target.value)
    }
    function handleUpc(e) {
        setUpc(e.target.value)
    }
    function handleCategory(e) {
        setCategory(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name,
            qty,
            qtyLow,
            upc,
            category
        }
        setName('')
        setQty(0)
        setUpc('')
        setCategory('')
        updateState()
        const res = await axios.post('/items', data)
        
    }
    console.log(category)
    return (
        
     
            <div className="modal">
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
                        <label htmlFor="qtyLow">Low quantity threshold: </label>
                        <p>When quantity reaches this or below it will apear as low stock </p>
                        
                        <input 
                        id="qtyLow"
                        type="number" 
                        name="qtyLow"
                        value={qtyLow}
                        onChange={handleNumberLow}
                        placeholder="Low threshold"
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
                    onClick={handleClick} 
                    disabled={!name ? true : false}
                    >
                        Add
                    </button>
                </form>
            </div>

      
    )
}