import React from 'react'
import { useState, useEffect } from "react";
import { Col, Row, Container} from "react-bootstrap";
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { useHistory, useNavigate } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import { Alert } from 'react-alert'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logo from '../assets/Logo.png';
import { ReactSession } from 'react-client-session';
import { upload } from '../api/subject';
import NavBar from '../components/NavBar/navbar';

const column = {
    display: 'flex',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '2%',
    marginRight: '5%',
  };

const button = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const table = {
    display: "flex", 
    height: "50vh", 
    overflow: "scroll", 
    marginLeft: "1%", 
    marginRight: "1%",
    width: "85vw",
};

const mobileTable = {
    display: "flex", 
    height: "400px", 
    width: "340px",
    scrollBehaviour: "smooth",
    overflow: "scroll", 
};


const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
    marginTop: '20px',
    marginLeft: '-40px',
	width: '1px',
	height: '1px'
};

const DataLoad = () => {    
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});
    const [errors, setErrors] = useState(["Error en la línea 12", "Error en la línea 64"]);
    const [error, setError] = useState(false);

    const [file, setFile] = useState(undefined);
    const [selectedFileDropdown, setSelectedFileDropdown] = useState("Aulas");

    const email = ReactSession.get("email");

    const handleUpload = (event) => {
        const selectedFile = event.target.files[0];
        //read excel file
        setFile(selectedFile)
        readFile(selectedFile)        
        .then((readedData) => {            
            setInitialData(readedData)
            console.log(readedData)
            })
        .catch((error) => console.error(error));
    };

    async function save() {
        const result = generateObjects(currentSheet);
        var baseUrl = "http://localhost:8080/mock"
        var formData = new FormData();

        formData.append("file", file);        
        console.log("form");
        console.log(formData)
        /*if (selectedFileDropdown == "Aulas") {
            baseUrl = "http://localhost:8080/aulas/uploadAula"
        } else {
            baseUrl = "http://localhost:8080/asignaturas/upload"
        }*/
        await upload(formData)
           .then(response => {
               if (!response.data) {
                   alert("Se ha producido un error, inténtelo de nuevo.")
               } else {
                    alert("Archivo subido con éxito.")
               }                           
            }).catch(error =>{
               alert("Se ha producido un error, inténtelo de nuevo.")
            });        
    };

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let isMobile = (width <= 768);
    return (
        <div className="container-fluid">
        <NavBar/>
        <div class="row" style={column}>
                <div style={{justifyContent: "flex-start"}}>
                    <h1>Carga de datos</h1>
                </div>
                <pre> </pre>
                <div class="row">
                <input
                    type='file'
                    accept='.xlsx'
                    onChange={handleUpload}
                />                    
                </div>
                <div style={!isMobile ? table : mobileTable}>
                    <ReactExcel
                        initialData={initialData}
                        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
                        activeSheetClassName='active-sheet'
                        reactExcelClassName='react-excel'
                    />
                </div>
                { error ? <label style={{color: "red", display: "flex", justifyContent: 'center', alignItems: 'center'}}>Se ha producido un error al cargar los datos. Inténtelo de nuevo</label> : null }
                <p>&nbsp;</p>
                <div style={!isMobile ? button : { display: "flex", justifyContent: 'center', alignItems: 'center',}}>  
                    <button onClick={save} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '10px', height: '40px', width: '120px', fontSize:'15px' }}> Importar </button>
                </div>
            </div>
        </div>

    )
}

export default DataLoad