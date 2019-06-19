class parseTimer {
    constructor() {
    }

    /**
     * 智能时间转换
     * @param timestamp 需要转换的毫秒数
     * @returns {string} 转换后的字符串
     */
    static parseTime(timestamp) {
        let date = new Date(timestamp);
        let sendTime = date.getFullYear() + "年" +
            (date.getMonth() + 1) + "月" +
            date.getDate() + "日 " +
            date.getHours() + ":" +
            (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" + date.getMinutes());
        let nowDate = new Date();
        if (nowDate.getFullYear() === date.getFullYear() && nowDate.getMonth() === date.getMonth()) {
            if (nowDate.getDate() === date.getDate()) {
                sendTime = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" + date.getMinutes());
            } else if (nowDate.getDate() - 1 === date.getDate()) {
                sendTime = "昨天 " + date.getHours() + ":" + (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" + date.getMinutes());
            }
        }
        return sendTime;
    }

    /**
     * 距离当前时间一周内转换文字时间
     */
    static parseTimeToTip(timestamp) {
        let date = new Date(timestamp);
        //hh:mm
        let formatTime = date.getHours() + ":" + (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" + date.getMinutes());
        //MM/DD hh:mm
        let sendTime = (date.getMonth() + 1) + "/" + date.getDate() + "&nbsp;&nbsp;" + formatTime;

        let nowDate = new Date(),
            weekTime = 604800000, //七天时间戳
            oneDayTime = 24 * 60 * 60 * 1000, //一天时间戳
            todayFormat = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' 00:00'); //当天零点

        if (nowDate.getFullYear() !== date.getFullYear()) {
            sendTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        } else {
            if (nowDate.getMonth() === date.getMonth() && nowDate.getDate() === date.getDate()) {
                sendTime = formatTime;
            } else if (nowDate.getMonth() === date.getMonth() && nowDate.getDate() - 1 === date.getDate()) {
                sendTime = "昨天" + "&nbsp;&nbsp;" + formatTime;
            } else if (todayFormat.getTime() - date.getTime() <= weekTime) {
                let arr = ['日', '一', '二', '三', '四', '五', '六'];

                let lastWeek = () => {
                    let day = todayFormat.getDay();
                    let MondayTime = todayFormat - (day - 1) * oneDayTime;//显示周一时间

                    //大于七天前，小于本周一的为上周
                    return timestamp < MondayTime && timestamp > weekTime
                };

                let str = arr[date.getDay()] + "&nbsp;&nbsp;" + formatTime;
                sendTime = (lastWeek() ? '上周' : '周') + str
            }
        }
        return sendTime;
    }

    //获取时间戳距离现在的时间差
    static getNowDateDiffer(timestamp, type) {
        let nowTime = Date.now();
        let differ = nowTime - timestamp;
        if (type === "s") {
            differ = differ / 1000;
        } else if (type === "m") {
            differ = differ / 1000 / 60;
        } else if (type === "h") {
            differ = differ / 1000 / 60 / 60;
        } else if (type === "y") {
            differ = differ / 1000 / 60 / 60 / 24 / 365;
        } else {
            differ = null;
        }
        return differ;
    }

    /**
     * 根据开始时间结束时间获取一个智能的时长
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @returns {String} 时长
     * @example start getTimeDuration(0, 30000) , return "00:30"
     */
    static getTimeDuration(startTime, endTime) {
        let time = endTime - startTime;
        let unitSecond = 1000;
        let unitMinute = unitSecond * 60;
        let unitHour = unitMinute * 60;
        let unitDay = unitHour * 24;

        let day = parseInt((time / unitDay).toFixed(4));
        let hour = parseInt(time % unitDay / unitHour);
        let minute = parseInt(time % unitDay % unitHour / unitMinute);
        let second = parseInt(time % unitDay % unitHour % unitMinute / unitSecond);

        let ret = '';
        if (day > 0) {
            ret += (day < 10 ? '0' + day : day) + '天 ';
        }
        if (hour > 0) {
            ret += (hour < 10 ? '0' + hour : hour) + ':';
        }
        ret += (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
        return ret;
    }
}


module.exports = parseTimer;