import {ATable} from './ATable';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {IndexPage} from "./IndexPage";
import {AForm} from "./AForm";
import {RegisterForm} from './RegisterForm';
import {LoginForm} from "./LoginForm";
import {Logout} from "./Logout";
import {UploadFile} from "./UploadFile";
import {setCookie, getCookie} from "./cookies";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            renderElement: React.createElement(IndexPage,{
                key: 5,
                show: this.show
            }),
            elements: [
                {
                    name: 'Login',
                    needsLogin: false,
                    element: React.createElement(LoginForm,{
                        key: 0,
                        show: this.show,
                        action: (process.env.REACT_APP_BASE_URL + "/user/login")
                    })
                },
                {
                    name: 'Register',
                    needsLogin: false,
                    element: React.createElement(RegisterForm,{
                        key: 1,
                        show: this.show,
                        action: (process.env.REACT_APP_BASE_URL + "/user/register")
                    })
                },
                {
                    name: 'Table',
                    needsLogin: true,
                    element: React.createElement(ATable,{
                        key: 2,
                        show: this.show
                    })
                },
                {
                    name: 'Form',
                    needsLogin: true,
                    element: React.createElement(AForm, {
                        keys: 3,
                        show: this.show,
                        action: ""
                    })
                },
                {
                    name: 'Logout',
                    needsLogin: true,
                    element: React.createElement(Logout, {
                        keys: 4
                    })
                },
                {
                    name: 'IndexPage',
                    needsLogin: false,
                    element: React.createElement(IndexPage,{
                        key: 5,
                        show: this.show
                    })
                },
                {
                    name: 'UploadFile',
                    needsLogin: true,
                    element: React.createElement(UploadFile,{
                        key: 6,
                        show: this.show,
                        action: (process.env.REACT_APP_BASE_URL + "/process/upload")
                    })
                }
            ]}
        this.show = this.show.bind(this);
    }
    componentDidMount() {
        if (!getCookie("csrf-token")) {
            axios.get(process.env.REACT_APP_BASE_URL + '/user/csrf')
                .then((response) => {
                    if (response.data.csrf) {
                        setCookie("csrf-token",response.data.csrf,1);
                    }
                });
        }
    }
    show(e) {
        let state = this.state;
        let key = parseInt(e.target.id.replace(e.target.name,''));
        if (!this.state.elements[key].needsLogin || getCookie("userId")) {
            this.setState({
                renderElement: this.state.elements[key].element
            });
        } else {
            // go to login screen
            this.setState({
                renderElement: this.state.elements[0].element
            });
        }


    }
    render(){
        return (
            <div className="App" id="App">
                <table>
                    <tbody>
                        <tr valign="top"><td>
                            <h2>Main Menu</h2>
                            <ul>
                                <li><a name="href" id="href2" href="#" onClick={this.show}>Table</a></li>
                                <li><a name="href" id="href3" href="#" onClick={this.show}>Form</a></li>
                                <li><a name="href" id="href6" href="#" onClick={this.show}>Upload Files</a></li>
                                <li><a name="href" id="href0" href="#" onClick={this.show}>Login</a></li>
                                <li><a name="href" id="href1" href="#" onClick={this.show}>Register</a></li>
                                <li><a name="href" id="href4" href="#" onClick={this.show}>Logout</a></li>
                            </ul>
                        </td><td>
                            {this.state.renderElement}
                        </td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
