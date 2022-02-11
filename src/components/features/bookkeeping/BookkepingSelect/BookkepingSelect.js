import React, {useState} from "react";
import "./bookkepingSelect.css"


export const BookkepingSelect = (props) => {
    const handleChange = (e) => {
        props.onSelect(e.target.value) 
    }

    return (
        <div>
            <select className="bookkeping-select__selected" onChange={handleChange} >
                {props.options.map( (documentTypeItem, index)=> {
                    return (
                        <option className="bookkeping-select__options-item" key={index} value={documentTypeItem.id}>{documentTypeItem[props.textField]}</option>
                    )
                })}
            </select>
            
        </div>
    )
}