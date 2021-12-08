import React from 'react';


let indexForTabs = 0;

class AForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            header: '',
            valid: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            inputs: [
                {
                    label: 'Email',
                    style: {display: 'none'},
                    errorMessage: 'Email is mandatory',
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
                    errorMessage: 'Password is mandatory',
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
                validInput &= match;
            }
        }
        return validInput;
    }
    onChange(e){
        const key = e.target.tabIndex;
        if (key !== undefined && e.target.value) {
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
            <form action={this.props.action} style={this.props.style}>
                <h1>{this.state.header}</h1>
                * is required.
                <table><tbody>
                {this.state.inputs.map((item,index)=>(
                        <tr valign="top">
                            <td>
                                {this.state.inputs[index].label}
                            </td>
                            <td>
                                <div>
                                    <span style={this.state.inputs[index].style}>{this.state.inputs[index].errorMessage}</span>
                                </div>
                                <div>
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