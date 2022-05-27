import React, { useEffect, useState } from "react";
import { ContentTitle } from "../ContentTitle/ContentTitle"
import { ContentButton } from "../ContentButton/ContentButton"
import { BookkeepingFormField } from "../BookkeepingFormField/BookkeepingFormField"
import { BookkepingSelect } from '../BookkepingSelect/BookkepingSelect';
import { BookkepingInput } from '../BookkepingInput/BookkepingInput';
import { fetchGet } from '../../../../server/server'
import { Link } from "react-router-dom"

export const ContractContent = () => {

    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [templatedFields, setTemplatedFields] = useState([])
    
    useEffect(() => {
        fetchGet({
          link: `${process.env.REACT_APP_API_URL}/api/document/get-document-list`,
        }).then((res) => {
            setTemplates(res)
        })
      }, [])

      useEffect(() => {
        if (selectedTemplate === undefined) {
            return
        }
        fetchGet({
            link: `${process.env.REACT_APP_API_URL}/api/document/get-document?document_id=${selectedTemplate}`,
          })
          .then((res) => {
            setTemplatedFields(res[0].templateDocumentFields)
          })
      }, [selectedTemplate])

    return (
        <div>
            <div className="content__info">
            <ContentTitle  title="Создание договора" description="# Описание" />
            <div className="content__info-main">
                

                <form className='contract'>
                    <div className="contract__create">
                        <div className="contract__title">Создание договора №</div>
                        <input type="text" className="contract__number" placeholder="#" />
                        <span>от</span>
                        <input type="date" className="contract__date" />
                    </div>
                    <BookkeepingFormField title="Шаблон документа"
                        Component={BookkepingSelect} 
                        innerComponentProps={{
                            onSelect: setSelectedTemplate,
                            textField: "title",
                            options: templates,
                            defaultIndexSelected: 0,
                        }}
                        action={{
                            text: "Добавить свой шаблон",
                            method: () => {}
                        }}
                    />
                    
                    {templatedFields.map((field, index ) => 
                            <BookkeepingFormField title={field.field.title} key={index}
                            Component={BookkepingInput}
                            innerComponentProps={{
                                placeholder: "Введите данные",
                            }}
                        />
                        )}

                    <div className="content__btn-list">
                        <ContentButton styles={{ width: "290px",
                        height: "75px",
                        boxShadow: "6px 5px 20px rgba(182, 75, 62, 0.21)",
                        borderRadius: "38px",
                        backgroundColor: "#b64b3e",
                        border: "none",
                        color: "#ffffff",
                        }}>Сохранить</ContentButton>
                        <Link to="/documents" className="link-act-button">
                            <div className='act-Button'>
                                <ContentButton styles={{color: "#282828",
                                marginLeft: "40px",
                                background: "none",
                                border: "none"
                                }}>Отменить</ContentButton>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
} 