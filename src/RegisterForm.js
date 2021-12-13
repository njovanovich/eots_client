import React from 'react';
import {AForm} from './AForm';
import axios from "axios";

let indexForTabs = 0;

class RegisterForm extends AForm{
    componentDidMount(){
        this.setState({
            header: 'Register',
            id: 'RegisterForm',
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
                    errorMessage: 'Password is mandatory and needs to be at least 8 characters with words and numbers!',
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
                },
                {
                    label: 'Password (again)',
                    style: {display: 'none'},
                    errorMessage: 'Second password is mandatory and must match password!',
                    regex: '(.{8,})',
                    value: '',
                    required: true,
                    element: React.createElement('input', {
                        tabIndex: indexForTabs++,
                        type: "password",
                        name: "password2",
                        placeholder: 'Second password',
                        onChange: this.onChange,
                        onBlur: this.onChange
                    }, null)
                }
            ]
        });
    }
    onSubmit(e){
        let state = this.state;
        let validInput = true;
        for(let i=0;i<indexForTabs; i++){
            const input = this.state.inputs[i];
            if (input.required) {
                const regex = input.regex;
                const match = input.value.match(new RegExp(regex));
                if (match) {
                    state.inputs[i].style = {display: 'none'};
                    this.setState(state);
                } else {
                    state.inputs[i].style = {display: 'block', color: 'red'};
                    this.setState(state);
                }
                validInput &= (match.length > 0);
            }
        }
        // check password vs password2
        if (this.state.inputs[1].value !== this.state.inputs[2].value) {
            state.inputs[1].errorMessage = "Passwords do not match";
            state.inputs[2].errorMessage = "Passwords do not match";
            state.inputs[1].style = {display: 'block', color: 'red'};
            state.inputs[2].style = {display: 'block', color: 'red'};
            this.setState(state);
        } else {
            const formData = new FormData(document.getElementById(this.state.id));
            let data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            this.sendForm(data);
        }
        e.preventDefault();
        return validInput;
    }
}

export {RegisterForm};