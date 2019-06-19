import React, { Component } from 'react';
const styles = {
    header: {
        width: '100%',
        color: '#ffffff',
        textAlign:'center'
    }
};

export default class header extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className={'header'} style={styles.header}>
               react-antd Demo
            </div>
        )
    }
}
