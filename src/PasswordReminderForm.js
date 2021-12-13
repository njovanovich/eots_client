import React from 'react';
import {AForm} from './AForm';

let indexForTabs = 0;

class PasswordReminderForm extends AForm{
    componentDidMount(){
        this.setState({
            header: 'Password Retrieval',
            id: 'PasswordReminderForm',
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
                }
            ]
        });
    }
    render() {
        return (
            <form action={this.props.action} id={this.state.id} style={this.props.style}>
                <h1>{this.state.header}</h1>
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
            </form>
        );
    }
}

export {LoginForm};