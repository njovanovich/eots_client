import React from 'react';
import axios from 'axios';

class ARow extends  React.Component{
    render(){
        return (
            <tr>
                {Object.values(this.props.row).map((rowItem)=>(<td>{rowItem}</td>))}
            </tr>
        );
    }
}

class ATable extends React.Component{
    constructor(orops) {
        super(orops);
        this.state = {
            rows: [],
            pages: 0,
            currentPage: 1
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    componentDidMount() {
        this.download(1);
    }
    download(currentPage){
        let table = this;
        const pageSize = 10;
        axios.get('https://www.googleapis.com/books/v1/volumes?q=abc&startIndex='+(currentPage*pageSize))
            .then(function (response) {
                // handle success
                const pages = Math.ceil(response.data.totalItems / pageSize);
                let rows = [];
                if (response.data.items) {
                    response.data.items.map(item => (rows.push([
                        item.volumeInfo.title,
                        item.volumeInfo.subtitle,
                        item.volumeInfo.authors? item.volumeInfo.authors.join() : ''
                    ])));
                    table.setState({
                        rows: rows,
                        pages: pages,
                        currentPage: currentPage
                    });
                } else {
                    table.setState({
                        rows: [['No data!']]
                    });
                }

            })
            .catch(function (error) {
                // handle error
                table.setState({
                    rows: [['Error collecting data!!']]
                });
            });
    }
    onSelectChange(e){
        this.setState({
            currentPage: e.target.value
        });
        this.download(e.target.value);
    }
    render(){
        let pageOptions = [];
        for(let i=0; i < this.state.pages; i++){
            pageOptions.push(i+1);
        }
        return (
            <div style={this.props.style}>
                <table>
                    <tbody>
                    {this.state.rows.map((row, index)=>(<ARow key={index} row={row}/>))}
                    </tbody>
                </table>
                <div>Pages:
                    <select value={this.state.currentPage} onChange={this.onSelectChange}>
                        {pageOptions.map(i=>(<option key={i} value={i}>{i}</option>))}
                    </select>
                    of {this.state.pages}</div>
            </div>
        );
    }
}

export {ATable};