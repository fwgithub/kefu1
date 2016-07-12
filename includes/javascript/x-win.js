var userAgent = navigator.userAgent.toLowerCase();
var is_ie = window.ActiveXObject && userAgent.indexOf('msie') != -1 && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var MyWin = 0,
    CurrentId = 0;
var zIndex = 1000;

function openwin(id, title) {
    var o = $('win' + id);
    if (o) {
        MyWin.Show('win' + id, 'max');
        var eHistory = $("history_" + id);
        if (eHistory) eHistory.scrollTop = eHistory.scrollHeight
    } else {
        if (!MyWin) MyWin = new DialogWin();
        var winbody = x_win_content.replace(/guestid/ig, id);
        MyWin.Create(id, title, winbody)
    }
}
function DialogWin() {
    this.Create = function(id, title, wbody) {
        guest.push(id);
        guest["g" + id] = {
            'gid': id,
            'online': 1
        };
        var Winid = "win" + id;
        var w = 560;
        var h = 506;
        var strollleft = document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        var strolltop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var l = strollleft + (guest.length == 1 ? (document.documentElement.clientWidth - w) / 2 : parseInt(Math.random() * (document.documentElement.clientWidth - w) / 2));
        var t = strolltop + (guest.length == 1 ? (document.documentElement.clientHeight - h) / 2 : parseInt(Math.random() * (document.documentElement.clientHeight - h) / 2));
        var mywin = document.createElement("DIV");
        mywin.setAttribute("id", Winid);
        mywin.setAttribute("Min", 0);
        mywin.setAttribute("Minno", 0);
        mywin.className = "x-win";
        mywin.onmousedown = function() {
            MyWin.Show(Winid)
        };
        mywin.style.cssText = "width:" + w + "px;height:" + h + "px;left:0px;top:0px";
        mywin.style.zIndex = zIndex;
        mywin.style.display = 'none';
        document.body.appendChild(mywin);
        var mytitle = document.createElement("DIV");
        var mybody = document.createElement("DIV");
        var mybottom = document.createElement("DIV");
        mytitle.className = "x-title";
        mybody.className = "x-body";
        mybottom.className = "x-bottom";
        mywin.appendChild(mytitle);
        mywin.appendChild(mybody);
        mywin.appendChild(mybottom);
        var wintag = [mytitle, mytitle, mytitle, mybody, mybody, mybody, mybottom, mybottom, mybottom];
        for (var i = 0; i < 9; i++) {
            var temp = document.createElement("DIV");
            wintag[i].appendChild(temp);
            if (i == 0) {
                temp.className = "x-titleleft"
            } else if (i == 1) {
                temp.className = "x-titlemid";
                temp.style.cssText = "width:" + (w - 30) + "px;"
            } else if (i == 2) {
                temp.className = "x-titleright"
            } else if (i == 3) {
                temp.className = "x-bodyleft";
                temp.style.cssText = "height:" + (h - 45) + "px;"
            } else if (i == 4) {
                temp.className = "x-bodymid";
                temp.style.cssText = "height:" + (h - 47) + "px;width:" + (w - 32) + "px;"
            } else if (i == 5) {
                temp.className = "x-bodyright";
                temp.style.cssText = "height:" + (h - 45) + "px;"
            } else if (i == 6) {
                temp.className = "x-bottomleft"
            } else if (i == 7) {
                temp.className = "x-bottomid";
                temp.style.cssText = "width:" + (w - 30) + "px;"
            } else if (i == 8) {
                temp.className = "x-bottomright"
            }
            if (i != 4 && i != 2) temp.onmousedown = function(e) {
                MyWin.Move(Winid, e ? e : window.event)
            }
        }
        mytitle.childNodes[1].innerHTML = "<div class=\"x-user\"></div><div class=\"x-min\" id=\"min" + Winid + "\" onclick=\"MyWin.Min('" + Winid + "')\" title=\"最小化\" onMouseover=\"this.className = 'x-min2';\" onMouseout=\"this.className = 'x-min';\"></div><div class=\"x-max3\" id=\"max" + Winid + "\"></div><div class=\"x-close\" title=\"关闭窗口\" id=\"close" + Winid + "\" onclick=\"MyWin.Close('" + Winid + "')\" onMouseover=\"this.className = 'x-close2';\" onMouseout=\"this.className = 'x-close';\"></div>";
        this.Title(Winid, title + "&nbsp;");
        this.Body(Winid, wbody);
        this.Move_e(Winid, l, t)
    };
    this.Title = function(Id, title) {
        if (Id == null) return;
        var o = $(Id);
        if (!o) return;
        o.childNodes[0].childNodes[1].childNodes[0].innerHTML = title
    };
    this.Body = function(Id, wbody) {
        if (Id == null) return;
        var o = $(Id);
        if (!o) return;
        o.childNodes[1].childNodes[1].innerHTML = wbody
    };
    this.Show = function(Id, max) {
        if (Id == null) return;
        var o = $(Id);
        if (!o) return;
        o.style.display = 'block';
        o.style.zIndex = ++zIndex;
        o.childNodes[0].childNodes[1].childNodes[0].className = "x-usernow";
        var State = o.getAttribute("Min");
        if (max && State != 0) {
            this.Max(Id)
        }
        if (Id != CurrentId) {
            var old = $(CurrentId);
            if (old) old.childNodes[0].childNodes[1].childNodes[0].className = "x-user";
            CurrentId = Id
        }
        if (State == 0) {
            var gid = Id.replace(/win/ig, "");
            var eNews = $("new" + gid);
            if (eNews) {
                eNews.innerHTML = 0;
                eNews.style.cssText = ''
            }
            setFocus(gid)
        }
    };
    this.Move = function(Id, evt) {
        if (Id == null) return;
        var o = $(Id);
        if (!o) return;
        if (o.getAttribute("Min") != 0) return;
        evt = evt ? evt : window.event;
        var obj = evt.srcElement ? evt.srcElement : evt.target;
        if (obj.id == "min" + Id || obj.id == "max" + Id || obj.id == "close" + Id) return;
        var w = o.offsetWidth;
        var h = o.offsetHeight;
        var l = o.offsetLeft;
        var t = o.offsetTop;
        var div = document.createElement("DIV");
        document.body.appendChild(div);
        div.style.cssText = "filter:alpha(Opacity=10,style=0);opacity:0.2;width:" + w + "px;height:" + h + "px;top:" + t + "px;left:" + l + "px;position:absolute;background:#000;cursor:move;";
        div.setAttribute("id", Id + "temp");
        this.Move_r(Id, evt)
    };
    this.Move_r = function(Id, evt) {
        var o = $(Id + "temp");
        if (!o) return;
        o.style.zIndex = zIndex + 1;
        evt = evt ? evt : window.event;
        var relLeft = evt.clientX - o.offsetLeft;
        var relTop = evt.clientY - o.offsetTop;
        if (!window.captureEvents) {
            o.setCapture()
        } else {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }
        document.onmousemove = function(e) {
            if (!o) return;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            e = e ? e : window.event;
            if (e.clientX - relLeft <= 0) {
                o.style.left = 0 + "px"
            } else if (e.clientX - relLeft >= document.documentElement.clientWidth - o.offsetWidth - 2) {
                o.style.left = (document.documentElement.clientWidth - o.offsetWidth - 2) + "px"
            } else {
                o.style.left = e.clientX - relLeft + "px"
            }
            if (e.clientY - relTop <= 1) {
                o.style.top = 1 + "px"
            } else if (e.clientY - relTop >= document.documentElement.clientHeight - o.offsetHeight - 2) {
                o.style.top = (document.documentElement.clientHeight - o.offsetHeight - 2) + "px"
            } else {
                o.style.top = e.clientY - relTop + "px"
            }
        };
        document.onmouseup = function() {
            if (!o) return;
            if (!window.captureEvents) {
                o.releaseCapture()
            } else {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
            var l = o.offsetLeft;
            var t = o.offsetTop;
            MyWin.Move_e(Id, l, t);
            document.body.removeChild(o);
            o = null
        }
    };
    this.Move_e = function(Id, l, t) {
        var o = $(Id);
        if (!o) return;
        o.style.left = l + "px";
        o.style.top = t + "px"
    };
    this.Close = function(Id) {
        var o = $(Id);
        if (!o) return;
        var currentNo = parseInt(o.getAttribute("Minno"));
        var gid = Id.replace(/win/ig, "");
        if (guest['g' + gid]['online'] == 0) {
            guest['g' + gid] = null;
            var row = $('g' + gid);
            if (row) eWelive.removeChild(row);
            for (var k in guest) {
                if (guest[k] == gid) {
                    guest.splice(k, 1);
                    break
                }
            }
            document.body.removeChild(o);
            if (currentNo > 0) {
                sort_min(currentNo)
            }
        } else {
            o.style.display = 'none';
            if (currentNo > 0) {
                o.setAttribute("Minno", 0);
                sort_min(currentNo)
            }
        }
        var lastID = get_lastopen();
        if (lastID) MyWin.Show("win" + lastID)
    };
    this.Resize_e = function(Id, w, h) {
        if (Id == null) return;
        var o = $(Id);
        if (!o) return;
        o.style.height = h + "px";
        o.childNodes[1].childNodes[0].style.height = (h - 45) + "px";
        o.childNodes[1].childNodes[1].style.height = (h - 47) + "px";
        o.childNodes[1].childNodes[2].style.height = (h - 45) + "px";
        o.style.width = w + "px";
        o.childNodes[0].childNodes[1].style.width = (w - 30) + "px";
        o.childNodes[2].childNodes[1].style.width = (w - 30) + "px";
        o.childNodes[1].childNodes[1].style.width = (w - 32) + "px"
    };
    this.Min = function(Id) {
        var o = $(Id);
        if (!o) return;
        var State = o.getAttribute("Min");
        if (State != 0) return;
        var l = o.offsetLeft;
        var t = o.offsetTop;
        var t0 = document.documentElement.clientHeight - 76;
        var minnum = get_minnum();
        var l0 = (minnum <= 0) ? 0 : minnum * 170;
        this.Resize_e(Id, 180, 47);
        this.Move_e(Id, l0, t0);
        o.setAttribute("Min", l + "," + t);
        o.setAttribute("Minno", minnum + 1);
        var me = $('min' + Id);
        me.onmouseover = null;
        me.onmouseout = null;
        me.onclick = null;
        me.title = "";
        me.className = "x-min3";
        var max = $('max' + Id);
        if (max) {
            max.onmouseover = function() {
                this.className = 'x-max2'
            };
            max.onmouseout = function() {
                this.className = 'x-max'
            };
            max.onclick = function() {
                MyWin.Max(Id)
            };
            max.title = "恢复";
            max.className = "x-max"
        }
        var lastID = get_lastopen();
        if (lastID) MyWin.Show("win" + lastID)
    };
    this.Max = function(Id) {
        var o = $(Id);
        if (!o) return;
        var State = o.getAttribute("Min");
        if (State == 0) return;
        State = State.split(",");
        this.Move_e(Id, State[0], State[1]);
        this.Resize_e(Id, 560, 506);
        o.setAttribute("Min", 0);
        var currentNo = parseInt(o.getAttribute("Minno"));
        if (currentNo > 0) {
            o.setAttribute("Minno", 0);
            sort_min(currentNo)
        }
        var me = $('max' + Id);
        me.onmouseover = null;
        me.onmouseout = null;
        me.onclick = null;
        me.title = "";
        me.className = "x-max3";
        var min = $('min' + Id);
        if (min) {
            min.onmouseover = function() {
                this.className = 'x-min2'
            };
            min.onmouseout = function() {
                this.className = 'x-min'
            };
            min.onclick = function() {
                MyWin.Min(Id)
            };
            min.title = "最小化";
            min.className = "x-min"
        }
        var gid = Id.replace(/win/ig, "");
        var eNews = $("new" + gid);
        if (eNews) {
            eNews.innerHTML = 0;
            eNews.style.cssText = ''
        }
        setFocus(gid)
    }
}
function sort_min(currentNo) {
    for (var k in guest) {
        var Obj = $("win" + guest[k]);
        if (!Obj) continue;
        var aMinno = parseInt(Obj.getAttribute("Minno"));
        if (aMinno > 0 && aMinno > currentNo) {
            Obj.setAttribute("Minno", aMinno - 1);
            MyWin.Move_e("win" + guest[k], (aMinno - 2) * 170, Obj.offsetTop)
        }
    }
}
function sort_max() {
    var xId = 0,
        xIndex = 1000000000;
    for (var k in guest) {
        var o = $("win" + guest[k]);
        if (o && o.style.display != 'none' && o.getAttribute("Minno") == 0) {
            var ozIndex = parseInt(o.style.zIndex);
            if (ozIndex < xIndex) {
                xId = guest[k];
                xIndex = ozIndex
            }
        }
    }
    if (xId != 0) MyWin.Show("win" + xId)
}
function get_minnum() {
    var minnum = 0;
    for (var k in guest) {
        var Obj = $("win" + guest[k]);
        if (Obj) {
            var State = Obj.getAttribute("Minno");
            if (State != 0) minnum += 1
        }
    }
    return minnum
}
function get_lastopen() {
    var xId = 0,
        xIndex = 0;
    for (var k in guest) {
        var o = $("win" + guest[k]);
        if (o && o.style.display != 'none' && o.getAttribute("Minno") == 0) {
            var ozIndex = parseInt(o.style.zIndex);
            if (ozIndex > xIndex) {
                xId = guest[k];
                xIndex = ozIndex
            }
        }
    }
    return xId
}
function get_lastmin() {
    var xId = 0,
        xIndex = 0;
    for (var k in guest) {
        var o = $("win" + guest[k]);
        if (o && o.getAttribute("Minno") != 0) {
            var ozIndex = parseInt(o.style.zIndex);
            if (ozIndex > xIndex) {
                xId = guest[k];
                xIndex = ozIndex
            }
        }
    }
    return xId
}
function get_last() {
    var xId = 0,
        xIndex = 0;
    for (var k in guest) {
        var o = $("win" + guest[k]);
        if (o && o.style.display != 'none') {
            var ozIndex = parseInt(o.style.zIndex);
            if (ozIndex > xIndex) {
                xId = guest[k];
                xIndex = ozIndex
            }
        }
    }
    return xId
}
function resetKey(e) {
    stopFlashTitle();
    var e = e ? e : window.event;
    var actualCode = e.keyCode ? e.keyCode : e.charCode;
    if (e.ctrlKey && actualCode == 13) {        //enter
        sending()
    } else if (actualCode == 27) {              //esc
        var lastID = get_last();
        if (lastID) MyWin.Close("win" + lastID)
    } else if (e.ctrlKey && actualCode == 40) {         //down
        var lastID = get_lastopen();
        if (lastID) MyWin.Min("win" + lastID)
    } else if (e.ctrlKey && actualCode == 38) {         //up
        var lastID = get_lastmin();
        if (lastID) MyWin.Show("win" + lastID, 'max')
    } else if (e.ctrlKey && (actualCode == 37 || actualCode == 39)) {       //leftright
        sort_max()
    }
}
_attachEvent(document, 'keydown', resetKey);
_attachEvent(document, 'mousedown', stopFlashTitle);