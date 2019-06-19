import React, {Component} from 'react';
import {Calendar} from 'antd';

export default class calendarCpt extends Component {
    constructor(props) {
        super();

    }

    onSelect(value) {
        console.log(value);
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    };

    render() {
        return (
            <div style={{minWidth: 500, border: '1px solid #d9d9d9', borderRadius: 4, margin: '30px 50px'}}>
                <Calendar  onSelect={() => {this.onSelect()}} onPanelChange={this.onPanelChange}/>
            </div>
        )
    }
}
