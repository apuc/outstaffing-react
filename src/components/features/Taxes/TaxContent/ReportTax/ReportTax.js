import React from "react"
import './reportTax.css'

export const ReportTax =(props) => {
    return(
        <div>
            <div className="period-column__item">
                    <img className="period-item__img" src={props.img} alt='' />
                <div className="period-item__name">
                    {props.time} <br/> <span>{props.period}/12</span>
                </div>
            </div>
        </div>
    )
}

