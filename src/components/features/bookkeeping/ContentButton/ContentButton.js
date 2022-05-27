import React from "react";
import "./contentButton.css"

export const ContentButton = (props) => {
    return (
        <div>
            <button className="content-button" style={props.styles} >{props.children}</button>
        </div>
    )
}