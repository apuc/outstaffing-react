import React from "react"
import "./contentTitle.css"

export const ContentTitle = (props) => {
    return (
        <div>
                <div>
                    <div className="content__info-title">
                        <h2>{props.title}</h2>
                    </div>
                
                    <div className="content__description">
                        <h2>{props.description}</h2>
                    </div>
                
            </div>
        </div>
    )
}