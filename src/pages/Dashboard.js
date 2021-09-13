import React from "react";
import { useState, useEffect } from "react";
import { callBackend } from "../utils/callBackend";
import DashboardItem from "../components/DashboardItem";
import { CategoryContext } from "../context/CategoryContext";
import AddItem from '../components/AddItem'

export default function Dashboard(){
    const [alert, setAlert] = useState(false)

    const [data, setData] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    function renderItems(arr) {
        if(arr) {
            return arr.map(item => {
                if(item.qtyLow < item.qty){
                    return (
                        <DashboardItem 
                        key={item._id} 
                        isLow={false}
                        id={item._id}
                        name={item.name}
                        qty={item.qty}
                        category={item.category}
                        upc={item.upc}
                        updateState={updateState}
                        />
                    )
                }

            })
        }
    }

    function renderItemsLowStock(arr) {
        if(arr) {
            return arr.map(item => {
                if(item.qtyLow >= item.qty){
                    return (
                        <DashboardItem 
                        key={item._id} 
                        isLow={true}
                        id={item._id}
                        name={item.name}
                        qty={item.qty}
                        category={item.category}
                        upc={item.upc}
                        updateState={updateState}
                        />
                    )
                }

            })
        }
    }

    function handleClick(){
        setModalOpen(prev => !prev)
    }
  
    function updateState() {
        console.log('in update state')
        setAlert(last => !last)
    }
  useEffect(()=> {
    setTimeout(() => {
        callBackend('/dashboard')
        .then(res => setData(res.items))
        .catch(err => console.log(err))
    }, 200);
      

  }, [alert])

  const items = renderItems(data)
  const itemsLowStock = renderItemsLowStock(data)

    return (
        <div>
            <div className={`modal-container ${modalOpen ? 'modal-open' : ''}`}>
                <AddItem updateState={updateState} handleClick={handleClick}/>
            </div>

        <h1>(company name)'s Inventory</h1>
        <button onClick={handleClick}>Add Item</button>
        
        {itemsLowStock ? 
        <div className="low-stock"> 
            <h3>Low Stock!</h3>
            {itemsLowStock}
        </div>
        : ''}
        
        
        {items}
        </div>
    )
}