import React from 'react';
import {setCookie, getCookie, deleteCookie} from "./cookies";

class Logout extends React.Component{
    componentDidMount() {
        deleteCookie('userId');
        deleteCookie('crsf-token');
    }
    render(){
        return (
            <div>
                <h1>Logout</h1>
                <p>You are now logged out.</p>
            </div>
        );

    }
}

export {Logout};