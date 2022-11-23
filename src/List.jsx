import React from "react";
// import { FaEdit, FaTrash } from 'react-icons/fa/';

const List = ({ items, removeItem, editItem }) => {
    return (
        <div className="groceryList">
            {
                items.map((item) => {
                    const { id, title } = item;
                    return (
                        <div className="individualItem" key={id}>
                            <p className="individualItemTITLE">{title}</p>
                            <div className="buttonContainer">
                                <button type="button" className="editButton" onClick={() => editItem(id)}> EDIT </button>
                                <button type="button" className="deleteButton" onClick={() => removeItem(id)}> DELETE </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default List;

// created by : Arup Mondal (@mondalcodehub)
// REACT SERIES - PROJECT 06 (2022)