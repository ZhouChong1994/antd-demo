import React, { Component } from 'react';
import {Input, Icon, Button} from 'antd';
import { Select } from 'antd';
import Ajax from '../../webRequest/ajax';

const Option = Select.Option;
const Search = Input.Search;

const type = {
    Chinese: 'zh-CN',
    English: 'en-US',
    Cantonese: 'zh-HK',
    Japanese: 'ja-JP',
    Korean: 'ko-KR'
};

export default class speech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: type.Chinese,
            rate: 1,
            visible: false,
            ipInfo: 'https://ipinfo.io/json?callback=',
            ipAddress: ''
        };
    }

    onSearch(val) {
        console.log(val);
        this.speak(val);
    }

    onselect(val) {
        this.setState({language: val}, () => {
           console.log( this.state.language);
        });
    }

    onRate(rate) {
        this.setState({rate}, () => {
            console.log( this.state.rate);
        });
    }

    speak(text) {
        let ssu = new window.SpeechSynthesisUtterance();
        ssu.text = text;
        ssu.lang = this.state.language;
        ssu.rate = this.state.rate;
        ssu.onstart = (event) => {
            console.log('start');
            this.setState({visible: true}, () => {
            });
        };
        ssu.onend = (event) => {
            console.log('end');
            this.setState({visible: false}, () => {
            });
        };
        ssu.onerror= (event) => {
            console.log('error');
        };
        return window.speechSynthesis.speak(ssu);
    }

    isVisible() {
        return this.state.visible ? <Icon style={style.sound}  type="sound" theme="twoTone"/> :'';
    }

    onClick() {
        Ajax.get(this.state.ipInfo, (data) =>{
            console.log(data)
        })
        /*Ajax.getJsonp(this.state.ipInfo, (data) => {
            if(data) {
                let ret = data.ip + '   ' + data.city
                this.setState({ipAddress: data.ip}, () => {
                });
            }
        })*/
    }

    render() {
        return (
            <div className={'speech-content'} style={style.content}>
                <div className={'speech-box'} style={style.box}>
                    { this.isVisible()}
                    <Select defaultValue={'1'} style={style.rateselect} onChange={(val) => this.onRate(val)}>
                        <Option value={'0.5'}>0.5x</Option>
                        <Option value={'1'}>1x</Option>
                        <Option value={'3'}>4x</Option>
                    </Select>

                    <Select defaultValue={type.Chinese} style={style.select} onChange={(val) => this.onselect(val)}>
                        <Option value={type.Chinese}>中文</Option>
                        <Option value={type.English}>英文</Option>
                        <Option value={type.Japanese}>日语</Option>
                        <Option value={type.Korean}>韩语</Option>
                        <Option value={type.Cantonese} >粤语</Option>
                    </Select>

                    <Search
                        placeholder="请输入关键字"
                        onSearch={(value) => this.onSearch(value)}
                        enterButton={"文字转语音"}
                        style={style.input}
                    />

                    <div className={'query-address'} style={style.query}>
                        <Button type="primary" onClick={() =>{this.onClick()}}>查询IP</Button>
                        <Input placeholder="ipConfig" style={{marginTop: '20px'}} value={this.state.ipAddress}/>
                    </div>
                </div>
            </div>
        )
    }
}


const style = {
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    box: {
        width: '100%',
        height: '50px',
        position: 'relative',
        top: '190px',
        // marginTop: '150px'
    },
    rateselect: {
        width:'80px',
        position: 'absolute',
        left: '80px',
        zIndex:'999'
    },
    select: {
        width:'120px',
        position: 'absolute',
        left: '160px',
        zIndex:'999'
    },
    input: {
        height: '32px',
        paddingLeft: '280px',
    },
    sound: {
        position: 'absolute',
        left: '50px',
        top: '9px'
    },
    query: {
        marginTop: ' 50px',
        padding: '80px',
    }
};