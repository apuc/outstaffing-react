import React from "react";
import "./ContentAbout.css"

export const ContentAbout = (props) => {
    return (
        <div>
            <div className="content__about">
                    <p>{props.contentAbout}</p>
                </div>
        </div>
    )
}