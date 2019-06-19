import React, { Component } from 'react';
const styles = {
    footer: {
        textAlign:'center',
        color: '#ffffff'
    }
};

export default class footer extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className={'footer'} style={styles.footer}>
               this is footer
            </div>
        )
    }
}
