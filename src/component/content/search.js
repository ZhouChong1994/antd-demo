import React from 'react'
import {Input, Timeline} from 'antd';
import logo from '../../img/baidu.png';

const Search = Input.Search;
const style = {
    searchContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    inputBox: {
        position: 'relative',
        top: '190px',
    },
    imgBox: {
        width: '270px',
        height: '129px',
        textAlign: 'center'
    },
    input: {
        height: '32px',
        paddingLeft: '280px',
    },
    timeLine: {
        position: 'relative',
        left: '50%',
        top: '20px',
    }
};

export default class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: "www.baidu.com/img/bd_logo1.png",
            data: []
        }
    }

    onSearch = (val) => {
        console.log(val);
        this.search(val, (data) => {
            console.log(data.s);
            let ret = data.s ? data.s : [];
            this.setState({data: ret}, () => {
            });
        })
    };
    onChange = (d) => {

    };
    search = (key, callback) => {
        let funName = 'Callback_' + Date.now();
        let oScript = document.createElement("script");
        oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + key + "&cb=" + funName;
        document.body.appendChild(oScript);

        window[funName] = function (data) {
            delete window[funName];
            callback(data);
            document.body.removeChild(oScript);
        };
    };

    handleResult(list) {
        return list.map((res, index) => {
            if (index < 10) {
                return (
                    <Timeline.Item>{res}</Timeline.Item>
                )
            }
        })
    }

    render() {
        return (
            <div className={'search-content'} style={style.searchContent}>
                <div className={'input-box'} style={style.inputBox}>
                    <div style={{textAlign: 'center'}}>
                        <img src={logo} alt="" style={style.imgBox}/>
                    </div>
                    <Search
                        placeholder="请输入关键字"
                        onSearch={this.onSearch}
                        onChange={this.onChange}
                        enterButton='百度一下'
                        style={style.input}
                    />
                    <Timeline style={style.timeLine}>
                        {this.handleResult(this.state.data)}
                    </Timeline>

                </div>
            </div>

        )
    }
}