import React from 'react';
import axios from 'axios';
import {setCookie, getCookie} from "./cookies";

let indexForTabs = 0;

class AForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: 'AForm',
            message: '',
            inputs: [],
            header: '',
            valid: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            id: 'AForm',
            inputs: [
                {
                    label: 'Email',
                    style: {display: 'none'},
                    errorMessage: 'Email is mandatory',
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
                    errorMessage: 'Password is mandatory',
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
        const formData = new FormData(document.getElementById(this.state.id));
        let data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        this.sendForm(data);
        e.preventDefault();
        return validInput;
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
    onChange(e){
        const key = e.target.tabIndex;
        if (key !== undefined) {
            let state = this.state;
            const value = e.target.value;
            if (key < state.inputs.length) {
                state.inputs[key].value = value;
                this.setState(state);
                if (this.state.inputs[key].regex) {
                    const regex = this.state.inputs[key].regex;
                    const match = value.match(new RegExp(regex));
                    if (match) {
                        state.inputs[key].style = {display: 'none'};
                        this.setState(state);
                    } else {
                        state.inputs[key].style = {display: 'block', color: 'red'};
                        this.setState(state);
                    }
                }
            }
        }
    }
    render(){
        return (
            <form action={this.props.action} onSubmit={this.onSubmit} id={this.state.id} style={this.props.style}>
                <h1>{this.state.header}</h1>
                <div>{this.state.message}</div>
                * is required.
                <table><tbody>
                {this.state.inputs.map((item,index)=>(
                        <tr valign="top" key={index}>
                            <td align="left">
                                {this.state.inputs[index].label}
                            </td>
                            <td align="left">
                                <div align="left">
                                    <span style={this.state.inputs[index].style}>{this.state.inputs[index].errorMessage}</span>
                                </div>
                                <div align="left">
                                    {this.state.inputs[index].element}
                                    {this.state.inputs[index].required ? '*' : ''}
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody></table>
                <input type="button" value="Submit" onClick={this.onSubmit}/>
            </form>
        );
    }
}

export {AForm};