import {ATable} from './ATable';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {AForm} from "./AForm";
import {RegisterForm} from './RegisterForm';
import {LoginForm} from "./LoginForm";
import fs from 'fs';
import ini from 'ini';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: ini.parse(fs.readFileSync('./app.ini', 'utf-8')),
            isLoggedIn: false,
            elements: [
                {name: 'Login', needsLogin: false, style: {display: 'block'}},
                {name: 'Register', needsLogin: false, style: {display: 'none'}},
                {name: 'Table', needsLogin: true, style: {display: 'none'}},
                {name: 'Form', needsLogin: true, style: {display: 'none'}}
            ]}
        this.show = this.show.bind(this);
    }
    show(e) {
        let state = this.state;
        let key = e.target.tabIndex;
        state.elements.map((item,index,array)=>(
            key === index ? state.elements[index].style = {display: 'block'} : state.elements[index].style = {display: 'none'}
        ));
        this.setState(state);
    }
    render(){
        return (
            <div className="App" id="App">
                <table>
                    <tbody>
                        <tr valign="top"><td>
                            <h2>Main Menu</h2>
                            <ul>
                                <li><a key="2" tabIndex="2" href="#" onClick={this.show}>Table</a></li>
                                <li><a key="3" tabIndex="3" href="#" onClick={this.show}>Form</a></li>
                                <li><a key="0" tabIndex="0" href="#" onClick={this.show}>Login</a></li>
                                <li><a key="1" tabIndex="1" href="#" onClick={this.show}>Register</a></li>
                            </ul>
                        </td><td>
                            <LoginForm key="0" show={this.show} style={this.state.elements[0].style}/>
                            <RegisterForm
                                key="1"
                                action="{this.state.config.URL.baseUrl}/user/register"
                                style={this.state.elements[1].style}
                            />
                            <ATable key="2" style={this.state.elements[2].style}/>
                            <AForm key="3" action="" style={this.state.elements[3].style}/>
                        </td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
