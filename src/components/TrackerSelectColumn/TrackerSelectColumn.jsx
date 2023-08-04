import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { moveProjectTask } from "@redux/projectsTrackerSlice";

import arrowDown from "assets/icons/arrows/selectArrow.png";

import './trackerSelectColumn.scss'

export const TrackerSelectColumn = ({columns, task, currentColumn}) => {
    const dispatch = useDispatch();
    const [openSelect, setOpenSelect] = useState(false)
    return(
        <div className='trackerSelectColumn' onClick={() => setOpenSelect(!openSelect)}>
            <p>Выберите колонку</p>
            <img className={openSelect ? 'open' : ''} src={arrowDown} alt='arrow' />
            {openSelect &&
                <div className='trackerSelectColumn__dropDown'>
                    {columns.map((column) => {
                        return <p key={column.id} onClick={() => {
                            dispatch(moveProjectTask({
                                startWrapperIndex: {index: currentColumn, task},
                                columnId: column.id
                            }))
                        }
                        }>{column.title}</p>
                    })
                    }
                </div>
            }
        </div>
    )
};

export default TrackerSelectColumn;

