import React from 'react';
import {AForm} from './AForm';

let indexForTabs = 0;

class RegisterForm extends AForm{
    componentDidMount(){
        this.setState({
            header: 'Register',
            inputs: [
                {
                    label: 'Email',
                    style: {display: 'none'},
                    errorMessage: 'Email is mandatory!',
                    regex: '(.+)',
                    value: '',
                    required: true,
                    element: React.createElement('input', {
                        tabindex: indexForTabs++,
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
                        tabindex: indexForTabs++,
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
                        tabindex: indexForTabs++,
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
        super.onSubmit(e);
        // check password vs password2
        let state = this.state;
        if (this.state.inputs[1].value != this.state.inputs[2].value) {
            state.inputs[1].errorMessage = "Passwords do not match";
            state.inputs[2].errorMessage = "Passwords do not match";
            state.inputs[1].style = {display: 'block', color: 'red'};
            state.inputs[2].style = {display: 'block', color: 'red'};
            this.setState(state);
        }

    }
}

export {RegisterForm};