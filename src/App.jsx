import React, { useEffect } from 'react'
import { useState } from 'react'
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  /*
  const properties, useState
  */
  const [name, setName] = useState('');
  // const [list, setList] = useState([]);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  /*
    if name is empty then display alert 
    if(!name) or if(name==='') then (workon) Alert
    if name is present and isEditing is true then (dealwith) edit
    else : show alert and new item in the list . setList(newItem)
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('working..');
    if (!name) {
      showAlert(true, 'danger', 'please enter something');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name }
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Item Modified')

    } else {
      showAlert(true, 'success', 'Item Added')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('');
    }
  }

  /*
    Alert function (show alert while nothing pressent,after adding items, after clearing item,after clearing all items)
  */
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed succesfully');
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    const particularItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(particularItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  /*
  JSX compmonents breakdown
  (p1)
    mainContainer
      groceryForm
      h2(main heading)
        formControl
        input
        button
  (p2)
     groceryListContainer(or list item container)
     List ( groceryList ):component
      individualItem
        individualItemTITLE
        buttonContainer
          editButton
          deleteButton
  (p3)
     button(clear list button)
  */
  return (
    <>
      <div className="mainContainer">
        <div className="groceryForm" >
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h1 className='mainHeading'>YOUR GROCERY LIST</h1>
          <div className="formControl">
            <input type="text" className='groceryText' placeholder='write down your item here' value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" className='submitButton' onClick={handleSubmit} >
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </div>

        {list.length > 0 && (
          <div className="groceryListContainer">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className="clsButton">
              <button className="clearButton" onClick={clearList}>CLEAR ALL ITEMS</button>

            </div>
          </div>
        )
        }
        {/* <p>@mondalcodehub</p> */}
      </div>
    </>
  )
}

export default App

/*  Created by : Arup Mondal (@mondalcodehub)
    REACT SERIES - PROJECT 06 (2022) */