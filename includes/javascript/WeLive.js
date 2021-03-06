function $(id) {
    return typeof id == "string" ? document.getElementById(id) : id
}
function isUndefined(variable) {
    return typeof variable == 'undefined' ? true : false
}
//有新消息
function flashTitle() {
    clearInterval(tttt);
    flashtitle_step = 1;
    tttt = setInterval(function() {
        if (flashtitle_step == 1) {
            document.title = '【' + newmsg + '】' + pagetitle;
            flashtitle_step = 2
        } else {
            document.title = '【　　　】' + pagetitle;
            flashtitle_step = 1
        }
    }, 200)
}
function stopFlashTitle() {
    if (flashtitle_step != 0) {
        flashtitle_step = 0;
        clearInterval(tttt);
        document.title = pagetitle
    }
}
//获取时间
function getLocalTime() {
    var date = new Date();

    function addZeros(value, len) {
        var i;
        value = "" + value;
        if (value.length < len) {
            for (i = 0; i < (len - value.length); i++) value = "0" + value
        }
        return value
    }
    return addZeros(date.getHours(), 2) + ':' + addZeros(date.getMinutes(), 2) + ':' + addZeros(date.getSeconds(), 2)
}
function _attachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if (obj.addEventListener) {
        obj.addEventListener(evt, func, false)
    } else if (eventobj.attachEvent) {
        obj.attachEvent('on' + evt, func)
    }
}
function timer_start() {
    if (seconds >= 59) {
        seconds = 0;
        minutes += 1
    } else {
        seconds += 1
    }
    if (minutes >= 60) {
        minutes = 0;
        hours += 1
    }
    displaytime();
    setTimeout('timer_start()', 1000)
}
//显示在线时间
function displaytime() {
    var sec_display, mins_display, hours_display;
    if (seconds < 10) {
        sec_display = "0" + seconds
    } else {
        sec_display = seconds
    }
    if (minutes < 10) {
        mins_display = "0" + minutes
    } else {
        mins_display = minutes
    }
    if (hours < 10) {
        if (hours > 0) {
            hours_display = "0" + hours + ":"
        } else {
            hours_display = ""
        }
    } else {
        hours_display = hours + ":"
    }
    $("timer").innerHTML = hours_display + mins_display + ":" + sec_display
}
function chClassname(obj, newClassName) {
    var oldClassName = obj.className;
    obj.className = 'tools_' + newClassName + '_hover';
    obj.onmouseout = function() {
        this.className = oldClassName
    }
}
function chSoundTitle(obj) {
    if (allow_sound == 1) {
        obj.title = soundoff
    } else {
        obj.title = soundon
    }
}
//初始化
function initObj() {
    eHistory = $('history');
    eSmile = $('smile');
    eColor = $('color');
    eMessage = $('message');
    eSounder = $('sounder');
    eColors = $('colors');
    eTools_color = $('tools_color');
    eSmilies = $('smilies');
    eTools_smile = $('tools_smile');
    eStatus_ok = $('status_ok');
    eStatus_err = $('status_err');
    eStatus_err2 = $('status_err2');
    eMyCrighter = $("c*o*p*y*r*i*g*h*t".replace(/\*/ig, ""));
    var re1 = eval("/" + "W*e*L*i*v*e*".replace(/\*/ig, "") + "/ig");
    var re2 = eval("/" + "w*e*e*n*t*e*c*h".replace(/\*/ig, "") + "/ig");
    //if (!eMyCrighter || !eMyCrighter.innerHTML.match(re1) || !eMyCrighter.innerHTML.match(re2)) jx = null
}
function setFocus() {
    eMessage.focus()
}
//聊天窗口切换字体声音
function toggleTools(tool) {
    var obj = $('tools_' + tool);
    if (tool == 'sound') {
        if (allow_sound == 1) {
            allow_sound = 0;
            obj.className = "tools_sound_off"
        } else {
            allow_sound = 1;
            obj.className = "tools_sound_on"
        }
    } else if (tool == 'bold') {
        if (ajaxB == '1') {
            ajaxB = '0';
            obj.className = "tools_bold_off";
            eMessage.style.fontWeight = "normal"
        } else {
            ajaxB = '1';
            obj.className = "tools_bold_on";
            eMessage.style.fontWeight = "bold"
        }
    } else if (tool == 'italic') {
        if (ajaxI == '1') {
            ajaxI = '0';
            obj.className = "tools_italic_off";
            eMessage.style.fontStyle = "normal"
        } else {
            ajaxI = '1';
            obj.className = "tools_italic_on";
            eMessage.style.fontStyle = "italic"
        }
    } else if (tool == 'underline') {
        if (ajaxU == '1') {
            ajaxU = '0';
            obj.className = "tools_underline_off";
            eMessage.style.textDecoration = "none"
        } else {
            ajaxU = '1';
            obj.className = "tools_underline_on";
            eMessage.style.textDecoration = "underline"
        }
    }
    obj.onmouseout = null;
    setFocus()
}
function ResetInput() {
    eMessage.value = '';
    eMessage.focus()
}
function showColors(delay) {
    clearTimeout(tt);
    setFocus();
    eTools_color.className = 'tools_color_hover';
    tt = setTimeout(function() {
        eSmilies.style.display = 'none';
        eColors.style.display = 'block';
        eColors.onmouseover = function() {
            clearTimeout(tt)
        };
        eColors.onmouseout = function() {
            clearTimeout(tt);
            tt = setTimeout(function() {
                eColors.style.display = 'none';
                if (ajaxC == "0") {
                    eTools_color.className = 'tools_color_off'
                } else {
                    eTools_color.className = 'tools_color_on'
                }
            }, 200)
        }
    }, (delay || delay == 0) ? delay : 300);
    eTools_color.onmouseout = function() {
        clearTimeout(tt);
        tt = setTimeout(function() {
            eColors.style.display = 'none';
            if (ajaxC == "0") {
                eTools_color.className = 'tools_color_off'
            } else {
                eTools_color.className = 'tools_color_on'
            }
        }, 280)
    }
}
function insertColors(code) {
    eMessage.style.color = "#" + code;
    ajaxC = code;
    setFocus()
}
function showSmilies(delay) {
    clearTimeout(ttt);
    setFocus();
    eTools_smile.className = 'tools_smile_hover';
    ttt = setTimeout(function() {
        eColors.style.display = 'none';
        eSmilies.style.display = 'block';
        eSmilies.onmouseover = function() {
            clearTimeout(ttt)
        };
        eSmilies.onmouseout = function() {
            clearTimeout(ttt);
            ttt = setTimeout(function() {
                eSmilies.style.display = 'none';
                eTools_smile.className = 'tools_smile_off'
            }, 200)
        }
    }, (delay || delay == 0) ? delay : 300);
    eTools_smile.onmouseout = function() {
        clearTimeout(ttt);
        ttt = setTimeout(function() {
            eSmilies.style.display = 'none';
            eTools_smile.className = 'tools_smile_off'
        }, 280)
    }
}
//插入表情
function insertSmilies(code) {
    var obj = eMessage;
    var selection = document.selection;
    setFocus();
    code += ' ';
    if (!isUndefined(obj.selectionStart)) {
        var opn = obj.selectionStart + 0;
        obj.value = obj.value.substr(0, obj.selectionStart) + code + obj.value.substr(obj.selectionEnd)
    } else if (selection && selection.createRange) {
        var sel = selection.createRange();
        sel.text = code;
        sel.moveStart('character', -code.length)
    } else {
        obj.value += code
    }
}
//enter输入
function ctrlEnter(event) {
    stopFlashTitle();
    if (isUndefined(event)) event = window.event;
    if (event.keyCode == 13) {
        sending()
    }
    return false
}
function setStatus(status) {
    if (sys_status == status) return;
    sys_status = status;
    if (status == 0) {
        eStatus_ok.style.display = "none";
        eStatus_err.style.display = "block";
        eStatus_err2.style.display = "none"
    } else if (status == 1) {
        eStatus_ok.style.display = "block";
        eStatus_err.style.display = "none";
        eStatus_err2.style.display = "none"
    } else {
        eStatus_ok.style.display = "none";
        eStatus_err.style.display = "none";
        eStatus_err2.style.display = "block"
    }
}
//ajax发送消息
function ajax(url, callback, updating, loading, format, method) {

    clearTimeout(response_tout);
    lock = 1;
    if (!method) method = "POST";
    if (!loading) loading = "loading";
    if (!callback) callback = welive_output;
    url += (url.indexOf("?") + 1) ? "&" : "?";
    url += "ajax_last=" + ajax_last + "&" + ajaxpending;
    //console.log(url);
    jx.bind({
        "url": url,
        "onSuccess": callback,
        "onError": function(status) {
            setStatus(0);
            lock = 0;
            waiting()
        },
        "format": format,
        "method": method,
        "update": updating,
        "loading": loading
    });
    return false
}
function donothing() {
    lock = 0;
    waiting()
}
//自动下线
function autoOffline() {
    clearTimeout(ttttt);
    ttttt = setTimeout(function() {
        setOffline();
        kickout = 1;
        welive_output(ajax_last + '||||||0|||' + er_autooffline + ' <a href="javascript:;" onclick="setOnline();return false;"><span class=greenb>' + doonline + '</span></a>|||0|||000|||0')
    }, offline_time * 60000)
}
function setOffline() {
    if (kickout == 1) return;
    ajax("guest.php?act=offline", donothing)
}
//上线
function setOnline() {
    kickout = 0;
    lock = 0;
    ajax("guest.php?act=online");
    autoOffline()
}
//等待服务器回答
function waiting() {
    if (kickout == 1 || lock == 1) return;
    clearTimeout(response_tout);
    response_tout = setTimeout('welive()', refresh_time * 1000)
}
function welive() {
    if (kickout == 1 || lock == 1) return;
    ajax("waiting.php")
}
//发送信息
function sending() {
    if (sys_status == 0 || sys_status == 2 || is_online == 0 || is_banned == 1 || kickout == 1) return;
    if (lock == 0) {
        var ajaxLine = eMessage.value.replace(/(^\s+)|\s+$/g, "").replace(/\^\^\^|\|\|\|/g, "");
        if (ajaxLine.length > 0) {
            ajaxLine = ajaxLine.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/\+/g, '%2B').replace(/\r\n|\n|\r/g, "<br>");
            var url = "waiting.php?act=sending&ajaxline=" + ajaxLine + "&ajaxbiu=" + ajaxB + ajaxI + ajaxU + "&ajaxcolor=" + ajaxC;
            ajax(url);
            autoOffline()
        }
        eMessage.value = ""
    }
    setFocus()
}
//对话框弹出信息
function welive_output(data) {
    lock = 0;
    waiting();
    if (data === 0) {
        setStatus(0);
        return
    }
    setStatus(1);
    var newdata = data;
    newdata = newdata.split('||||||');
    ajax_last = newdata[0];
    newdata = newdata[1];
    if (newdata == 2) {
        setStatus(2);
        return
    }
    if (newdata.match(/kickout\^\^\^/i)) {
        kickout = 1;
        newdata = newdata.replace(/kickout\^\^\^/ig, '0|||' + er_kickout + '|||0|||000|||0^^^')
    }
    if (newdata.match(/offline\^\^\^/i)) {
        if (is_online == 1) {
            is_online = 0;
            newdata = newdata.replace(/offline\^\^\^/ig, '0|||' + username + er_useroffline + '|||0|||000|||0^^^')
        } else {
            return
        }
    } else if (is_online == 0) {
        is_online = 1;
        newdata = '0|||' + username + reonline + '|||1|||000|||0^^^' + newdata
    }
    if (newdata.match(/banned\^\^\^/i)) {
        if (is_banned == 0) {
            is_banned = 1;
            newdata = newdata.replace(/banned\^\^\^/ig, '0|||' + er_banned + '|||0|||000|||0^^^')
        } else {
            newdata = newdata.replace(/banned\^\^\^/ig, '')
        }
    } else if (is_banned == 1) {
        is_banned = 0;
        newdata = '0|||' + unbanned + '|||1|||000|||0^^^' + newdata
    }
    if (newdata.length > 18) {
        var aline, time, sender, msg, stype, content, ctype, biu, color, style;
        var lines = newdata.split('^^^');
        newdata = "";
        var do_flashTitle = true;
        for (var i = 0; i < lines.length; i++) {
            aline = lines[i].split('|||');
            if (aline[1]) {
                time = "<span class=time>" + getLocalTime() + "</span>";
                stype = aline[0];
                content = format_output(aline[1]);
                ctype = aline[2];
                biu = aline[3];
                color = aline[4];
                style = '';
                if (color != 0) style = "color:#" + color + ";";
                if (biu.match(/1\d\d/i)) style += "font-weight:bold;";
                if (biu.match(/\d1\d/i)) style += "font-style:italic;";
                if (biu.match(/\d\d1/i)) style += "text-decoration:underline;";
                if (ctype == 2) {
                    msg = "<span style=\"" + style + "\">" + content + "</span>"
                } else {
                    msg = content
                }
                if (stype == 0) {
                    if (ctype == 0) {
                        msg = '<div class="msg e"><div class="msg_b e_bg"><div class="ico"></div><div class="msg_i">' + msg + '</div></div></div>'
                    } else {
                        msg = '<div class="msg i"><div class="msg_b i_bg"><div class="ico"></div><div class="msg_i">' + msg + '</div></div></div>'
                    }
                } else if (stype == 1) {
                    msg = '<div class="msg o"><div class="pip"></div><div class="msg_b o_bg"><div class="msg_i">' + msg + '</div></div><div class="msg_t">' + time + '</div></div>'
                } else if (stype == 2) {
                    msg = '<div class="msg g"><div class="pip"></div><div class="msg_b g_bg"><div class="msg_i">' + msg + '</div></div><div class="msg_t">' + time + '</div></div>';
                    do_flashTitle = false
                }
                newdata = newdata + msg + '<div class="clear"></div>'
            }
        }
        eHistory.innerHTML = eHistory.innerHTML + newdata;
        if (allow_sound == 1 && do_flashTitle) {
            eSounder.innerHTML = sound
        }
        if (do_flashTitle) flashTitle();
        eHistory.scrollTop = eHistory.scrollHeight;
        window.focus();
        setFocus()
    }
}
function format_output(data) {
    data = data.replace(/((href=\"|\')?(((https?|ftp):\/\/)|www\.)([\w\-]+\.)+[\w\.\/=\?%\-&~\':+!#]*)/ig, function($1) {
        return getURL($1)
    });
    data = data.replace(/([\-\.\w]+@[\.\-\w]+(\.\w+)+)/ig, '<a href="mailto:$1" target="_blank">$1</a>');
    data = data.replace(/\[:(\d*):\]/g, '<img src="' + t_url + 'smilies/$1.gif">');
    return data
}
function getURL(url) {
    if (url.substr(0, 5).toLowerCase() == 'href=') return url;
    var urllink = '<a href="' + (url.substr(0, 4).toLowerCase() == 'www.' ? 'http://' + url : url) + '" target="_blank" title="' + url + '">';
    if (url.length > 60) {
        url = url.substr(0, 30) + ' ... ' + url.substr(url.length - 18)
    }
    urllink += url + '</a>';
    return urllink
}
_attachEvent(document, 'mousedown', stopFlashTitle);