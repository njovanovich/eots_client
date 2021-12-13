import React from 'react';
import {AForm} from './AForm';
import axios from "axios";
import {setCookie, getCookie} from "./cookies";
let indexForTabs = 0;

class LoginForm extends AForm{
    componentDidMount(){
        this.setState({
            header: 'Login',
            id: 'LoginForm',
            inputs: [
                {
                    label: 'Email',
                    style: {display: 'none'},
                    errorMessage: 'Email is mandatory!',
                    regex: '(.+)',
                    value: '',
                    required: true,
                    element: React.createElement('input', {
                        tabIndex: indexForTabs++,
                        type: "text",
                        name: "email",
                        placeholder: 'citizen@gmail.com',
                        onChange: this.onChange,
                        onBlur: this.onChange
                    }, null)
                },
                {
                    label: 'Password',
                    style: {display: 'none'},
                    errorMessage: 'Password is mandatory and needs to be at least 8 characters with words and numbers',
                    regex: '(.{8,})',
                    value: '',
                    required: true,
                    element: React.createElement('input', {
                        tabIndex: indexForTabs++,
                        type: "password",
                        name: "password",
                        placeholder: 'Password',
                        onChange: this.onChange,
                        onBlur: this.onChange
                    }, null)
                }
            ]
        });
    }
    sendForm(data){
        const token = getCookie("csrf-token");
        let config = {
            headers: {
                'CSRF-Token': token
            }
        }
        axios.post(this.props.action,data,config)
            .then((response) => {
                if (response.data.success) {
                    this.setState({message: response.data.message});
                    setCookie("userId",response.data.userId,1);
                } else {
                    this.setState({message: response.data.errorMessage});
                    if (response.data.errorMessag == 'Bad CSRF Token'){
                        this.props.show(0);
                    }
                }
            })
            .catch((error) => {
                this.setState({message: 'Error posting form.'});
                console.log(error);
            });
    }
    render() {
        return (
            <form action={this.props.action} onSubmit={this.onSubmit} id={this.state.id} style={this.props.style}>
                <h1>{this.state.header}</h1>
                <div>{this.state.message}</div>
                * is required.
                <table>
                    <tbody>
                    {this.state.inputs.map((item, index) => (
                        <tr valign="top" key={index}>
                            <td>
                                {this.state.inputs[index].label}
                            </td>
                            <td>
                                <div>
                                    <span
                                        style={this.state.inputs[index].style}>{this.state.inputs[index].errorMessage}</span>
                                </div>
                                <div>
                                    {this.state.inputs[index].element}
                                    {this.state.inputs[index].required ? '*' : ''}
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
                <input type="button" value="Submit" onClick={this.onSubmit}/>
                <p>
                To register, <a name="loginFormHref" id="loginFormHref1" href="#" onClick={this.props.show}>click here</a>
                </p>
            </form>
        );
    }
}

export {LoginForm};