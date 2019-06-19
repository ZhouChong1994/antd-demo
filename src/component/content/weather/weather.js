import React, {Component} from 'react'
import {Select} from 'antd'
import cityList from './cityList'
import sunshine from '../../../img/sunshine.png';
import ParseTimer from 'base-parse-timer';
const Option = Select.Option;


export default class weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            default: cityList[0],
            wea: null, //天气
            curTem: null,//实时温度
            maxTem: null,//最高温
            minTem: null,//最低温
            week: null,//星期
            wind: [], //风向
            windSpeed: null, //风速
            wImg: sunshine,
            url: "https://www.tianqiapi.com/api/",
            level:null,
            updateTime: null,
        };
         this.Ajax = window.Root.WebRequest;
    }
    request(name, cid) {
        let action;
        if(cid) {
            action = this.state.url + '?version=v1&cityid=' + cid + '&city=' + name;
        }else {
            action = this.state.url + '?version=v1&city=' + name;
        }

        this.Ajax.get(action, (ret) => {
            console.log(ret);
            let updateTime = ret.updateTime;
            let data = ret.data;
            let today = data[0];
            this.setState({
                wea: today.wea,
                curTem: today.tem,
                maxTem: today.tem1,
                minTem: today.tem2,
                week: today.week,
                wind: today.win,
                windSpeed: today.win_speed,
                level: today.air_level,
                updateTime,
            }, () => {
            })
        })
    }
    componentDidMount() {
        console.log('componentDidMount');
        let cname = this.state.default.city;
        let cid = this.state.default.cid;
        this.request(cname, cid);
    }

    loadList(list) {
        return list.map((val, index) => {
            return (<Option key={index} value={val.city} data-id={val.cid}>{val.city}</Option>)
        });
    }

    onchange(val) {
        this.request(val);
    }

    replace() {
        return window.Root.parseTimer.parseTimeToTip(new Date().getTime());
    }

    render() {
        let state = this.state;
        return (
            <div className={'weather-content'} style={style.content}>
                <div className={'weather-box'} style={style.box}>
                    <Select defaultValue={state.default.city} data-id={state.default.cid} style={style.rateselect}
                            onChange={(val) => this.onchange(val)}>
                        {this.loadList(cityList)}
                    </Select>
                    {this.replace()}
                </div>
                <div className={'weather-container'} style={style.container}>
                    <div className={'today-weather'} style={style.today}>
                        <div className={'w-icon'} style={style.iconBox}>
                            <img src={state.wImg} style={style.wIcon} alt="天气"/>
                        </div>
                        <div className={'w-info'} style={style.wInfo}>
                            <div className={'w-name'} style={style.cell}>{state.wea}</div>
                            <div className={'w-tem'} style={style.cell}>{state.curTem}</div>
                            <div className={'w-wind'} style={style.cell}>风向：{state.wind[0]}</div>
                            <div className={'w-windSpeed'} style={style.cell}>风速：{state.windSpeed}</div>
                            <div className={'w-level'} style={style.cell}>污染指数：{state.level}</div>
                        </div>
                    </div>
                    <div className={'future-weather'}>

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
    },
    box: {
        width: '100%',
        height: '90px',
        marginTop: '90px'
    },
    rateselect: {
        width: '150px',
        margin: '30px',
        zIndex: '999'
    },
    container: {
        width: '100%',
        height: 'auto',
    },
    today: {
        width: '800px',
        height: '200px',
        backgroundColor: '#ffffff',
        margin: '0 auto',
    },
    iconBox: {
        height: '100%',
        width: '200px',
        float: 'left',
    },
    wIcon: {
        height: '100px',
        width: '100px',
        margin: '50px',
    },
    wInfo: {
        height: '100%',
        width: '600px',
        float: 'right',
    },
    cell: {
        height: '40px',
        fontSize: '14px',
        color: '#292c33',
        lineHeight: '40px',
    },

};