import React, {useState} from "react";
import { backendImg } from "@utils/helper";
import close from "assets/icons/closeProjectPersons.svg";

import {apiRequest} from "@api/request";

const FileTracker = ({ file, setDeletedTask, taskId }) => {
    const [openImg, setOpenImg] = useState(false)
    function deleteFile(file) {
        apiRequest("/file/detach", {
            method: "DELETE",
            data: {
                file_id: file.id,
                entity_type: 2,
                entity_id: taskId,
                status: 0,
            },
        }).then(() => {
            setDeletedTask(file);
        });
    }

    return (
        <div className={openImg ? "taskFile ImgOpened" : "taskFile"} key={file.id}
             onClick={() =>
             {if(openImg) setOpenImg(!openImg)}}
        >
            <img
                className="imgFile"
                src={backendImg(file.file?.url)}
                alt="img"
                onClick={() =>
                {if(!openImg) setOpenImg(!openImg)}}
            />
            {!openImg &&
                <div
                    className="deleteFile"
                    onClick={() => deleteFile(file)}
                >
                    <img src={close} alt="delete" />
                </div>
            }
        </div>
    );
};

export default FileTracker;
