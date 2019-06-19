import React, { Component } from 'react';
import { Alert } from 'antd';


export default class page extends Component{
    constructor(props) {
        super();
        this.state = {
            msg: '这是正文列表'
        }
    }

    render() {
        console.log(this.props);
        return(
            <div style={{padding: '100px 0', margin: '30px 50px'}}>
                <Alert message={this.state.msg} type="success" />
            </div>

        )
    }
}
