import React from 'react';
import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactSession } from 'react-client-session';
import { LayersControl, MapContainer, TileLayer, useMap, WMSTileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
//import CustomWMSLayer from './CustomWMSLayer';
import NavBar from '../components/NavBar/navbar';

const EINAMap = () => {
    return (
        <>
            <br />
            <br />
            <MapContainer center={[41.6836, -0.88605]} zoom={17.5} scrollWheelZoom={false} style={{ height: "450px", width: "80%" }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Plantas 0">
                        <WMSTileLayer name="a" url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta0" transparent={true} opacity="0.5" />

                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Plantas 1">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta1" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Plantas 2">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta2" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Plantas 3">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta3" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Planta 4 (solo Edif.ADA)">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta4" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Planta 5 (solo Edif.ADA)">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:planta5" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Planta Sótanos">
                        <WMSTileLayer url="http://35.180.169.8:8080/geoserver/proyecto/wms" format="image/png" layers="proyecto:sotano1" transparent={true} opacity="0.5" />
                    </LayersControl.Overlay>

                </LayersControl>
            </MapContainer>
        </>
    );
};

export default EINAMap;