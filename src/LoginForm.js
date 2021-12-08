import React from 'react';
import {AForm} from './AForm';

let indexForTabs = 0;

class LoginForm extends AForm{
    componentDidMount(){
        this.setState({
            header: 'Login',
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
                    errorMessage: 'Password is mandatory and needs to be at least 8 characters with words and numbers',
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
                }
            ]
        });
    }
    render() {
        return (
            <form action={this.props.action} style={this.props.style}>
                <h1>{this.state.header}</h1>
                * is required.
                <table>
                    <tbody>
                    {this.state.inputs.map((item, index) => (
                        <tr valign="top">
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
                To register, <a tabIndex="1" href="#" onClick={this.props.show}>click here</a>
                </p>
            </form>
        );
    }
}

export {LoginForm};