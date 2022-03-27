import React from 'react';
import { ReactSession } from 'react-client-session';

class LocalStorage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: ""
        }

    this.setEmail = this.setEmail.bind(this);
    ReactSession.setStoreType("localStorage");
    }
}