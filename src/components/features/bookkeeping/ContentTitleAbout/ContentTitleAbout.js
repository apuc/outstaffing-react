import React from "react";
import "./contentTitleAbout.css"

export const ContentTitleAbout = (props) => {
    return (
        <div>
            <div className="content__description-title">
                <h2>{props.descriptionTitle}</h2>
            </div>
        </div>
    )
}