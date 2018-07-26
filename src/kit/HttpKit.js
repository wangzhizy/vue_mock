/**
 * 普通Ajax的完整访问过程
 */
import { BASEURL } from "../config/ApiConfig"
import { isEmpty } from "./EmptyKit"

/**************************
 *  get方式提交ajax
 *
 readyState值对照
 0: 请求未初始化
 1: 服务器连接已建立
 2: 请求已接收
 3: 请求处理中
 4: 请求已完成，且响应已就绪
 * @date    2016/02/29
 * 根据相应的浏览器创建不同的xmlHttp对象
 * @write   zss
 * @return  XMLHttpRequest 对象
 ****************************/
export function ajax_get(url, params, successFun, errorFun) {
    if (url.indexOf("http") == -1) {
        url = (!isEmpty(localStorage.baseUrl) ? localStorage.baseUrl : BASEURL) + url
    }
    var xmlHttp
    xmlHttp = GetXmlHttpObject();
    if (url.indexOf("?") == -1) {
        url = url + "?" + getParams(params, true)
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            parseResult(xmlHttp.status, xmlHttp.responseText, successFun, errorFun);
        }
    };
    xmlHttp.open("GET", url, true)//定义请求的参数
    xmlHttp.send()//发送请求
}


/**************************
 *  post方式提交ajax
 *
 readyState值对照
 0: 请求未初始化
 1: 服务器连接已建立
 2: 请求已接收
 3: 请求处理中
 4: 请求已完成，且响应已就绪
 * @date    2016/02/29
 * 根据相应的浏览器创建不同的xmlHttp对象
 * @write   zss
 * @return  XMLHttpRequest 对象
 ****************************/
export function ajax_post(url, params, successFun, errorFun) {
    if (url.indexOf("http") == -1) {
        url = (!isEmpty(localStorage.baseUrl) ? localStorage.baseUrl : BASEURL) + url
    }
    //获取 XMLHttpRequest 对象
    var xmlHttp = GetXmlHttpObject();
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            parseResult(xmlHttp.status, xmlHttp.responseText, successFun, errorFun);
        }
    };
    xmlHttp.send(getParams(params, false));
}

/**
 * 封装参数
 * @param params
 */
function getParams(params, isGet) {
    if (params == undefined) {
        params = {}
    }
    if (!isEmpty(localStorage.token)) {
        params.token = localStorage.token
    }
    var paramString = "sid=" + Math.random()
    for (var key in params) {
        paramString += "&" + key + "=" + params[key]
    }
    // if (isGet) {
    // return encodeURIComponent(paramString)
    // } else {
    return paramString
    // }
}

/**
 * 解析返回数据
 * @param status
 * @param resultData
 * @param successFun
 * @param errorFun
 * @returns {string}
 */
function parseResult(status, resultData, successFun, errorFun) {
    if (status != 200) {
        errorFun(-1, "网络不给力!")
        return "";
    }
    try {
        resultData = JSON.parse(resultData)
    } catch (err) {
        successFun(resultData);
        return "";
    }
    if (resultData.code != 200) {
        errorFun(resultData.code, resultData.message)
        return "";
    }
    successFun(resultData.data);
}


/**************************
 * 此函数的作用是解决为不同浏览器创建不同的 XMLHTTP 对象的问题
 *
 * @param   xmlHttp     XMLHttpRequest()对象
 * @date    2016/02/29
 * 根据相应的浏览器创建不同的xmlHttp对象
 * @write   zss
 * @return  XMLHttpRequest 对象
 ****************************/
function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // for Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // for Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}
