import React, { Children } from "react"
import "./bookkeepingTemplete.css"
import { Breadcrumps } from "../Breadcrumps/Breadcrumps"
import { Sidebar } from "../Sidebar/Sidebar"

export const BookkeepingTemplete = ({ showBreadcrumps, nameBreeadcrumps, children }) => {
    return(
    <div className="size">
        <div className="title">
            <h1>Аутстаффинг <span>онлайн-бухгалтерия</span></h1>
        </div>
            {showBreadcrumps && <Breadcrumps  nameBreeadcrumps={nameBreeadcrumps}/>}
            <div className="main-content">
                <Sidebar />
                <div className="">
                    {children}
                </div>
            </div>
    </div>
    )
}

