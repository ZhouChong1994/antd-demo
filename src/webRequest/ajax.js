import $ from 'jquery'
import axios from 'axios';
import {message} from 'antd';

const ajax = {
    get: (action, callback) => {
        $.get(action, callback)
    },
    send: (action, data, fn, rejectFn) => {
        $.ajax({
            url: action,
            type: 'post',
            data: data,
            success: (result) => {
                fn(result)
            },
            error: (err) => {
                rejectFn(err)
            }
        })
    },

    axios: (action, fn) => {
        axios.get(action).then(res => fn(res.data)).catch(err => {})
    },

    fetch: (url, success, error) => {
        window.fetch(url)
            .then(response => {
                let contentType = response.headers.get('content-type');
                let result;
                if (contentType.includes('application/json')) {
                    result = response.json();
                } else if (contentType.includes('text/html')) {
                    result = response.text();
                } else {
                    console.log(contentType);
                }
                if (response.ok) {
                    return result
                } else {
                    return Promise.reject({
                        status: response.status,
                        text: response.statusText
                    })
                }
            })
            .then(data => success(data))
            .catch(error => message.error('error is', error.text));
    },

    /**
     * 发送文件
     * @param action {String} - 接口地址
     * @param file {{name: {String}, value: {HTMLElement|Blob}} 需要发送的文件
     * @param data {Object} 需要发送的其它数据
     * @param callback {Function} 数据回调
     */
    sendFile: (action, file, data, callback) => {
        if (window.FormData) {
            let formData = new FormData();

            for (let item in data) {
                formData.append(item, data[item]);
            }

            if (file.value instanceof HTMLElement) {
                let f = file.value.files[0];
                formData.append(file.name, f, f.name);
            }
            else if (file.value instanceof Blob) {
                formData.append(file.name, file.value, file.value.name);
            }

            let xhr = new XMLHttpRequest();
            xhr.open("post", this.domain + action, true);
            xhr.send(formData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let rd;
                    try {
                        rd = JSON.parse(xhr.responseText);
                    } catch (e) {
                        rd = xhr.responseText;
                    }
                    callback(false, rd);
                }
                else {
                    callback({
                        status: xhr.status
                    });
                }
            };
        }
    },

    getJsonp: (url, callback) => {
        let funName = 'Callback_' + Date.now();
        let oScript = document.createElement("script");
        oScript.src = url + funName;
        document.body.appendChild(oScript);

        window[funName] = function (data) {
            delete window[funName];
            callback(data);
            document.body.removeChild(oScript);
        };
    }
};
export default ajax