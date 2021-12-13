import {AForm} from "./AForm";
import React from "react";
import axios from "axios";

class UploadFile extends AForm{
    componentDidMount(){
        this.setState({
            id: 'UploadFile',
            inputs: [
                {
                    label: 'File',
                    errorMessage: 'File is mandatory',
                    required: true,
                    element: React.createElement('input', {
                        tabIndex: 0,
                        id: 'fleZip',
                        type: "file",
                        name: "file"
                    }, null)
                }
            ]
        });
    }
    onSubmit(e){
        const formData = new FormData();
        const file = document.querySelector('#fleZip');
        formData.append("file", file.files[0]);
        axios.post(this.props.action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        e.preventDefault();
        return true;
    }
}

export {UploadFile};