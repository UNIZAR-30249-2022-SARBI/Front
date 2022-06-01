import React, { Component } from 'react';
import { withLeaflet, useMapEvent } from "react-leaflet";
import * as WMS from "../../node_modules/leaflet.wms/dist/leaflet.wms.js";

function CustomWMSLayer(props) {
    const { url, options,layers } = props;
    const ctx = useMapEvent()
    const map = ctx.map;


    // Add WMS source/layers
    const source = WMS.source(
        url,
        options
    );

    for(let name of layers){
        source.getLayer(name).addTo(map)
    }

    return null;
}

export default CustomWMSLayer;