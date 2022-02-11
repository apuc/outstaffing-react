import React from "react";
import "./bookkeepingFormField.css"

export const BookkeepingFormField = ({ title, Component, innerComponentProps, action }) => {
    return (
        <div className="bookkeeping-form-field">
            <div className="bookkeeping-form-field__title">{title}</div>
            <div className="bookkeeping-form-field__input">{<Component {...innerComponentProps} />}</div>
            {action &&  <div className="bookkeeping-form-field__action" onClick={action.method}>{action.text}</div>}
        </div>
    )
}
