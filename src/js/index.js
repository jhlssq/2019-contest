var div = document.getElementById('container');
var arr = []; //关卡地图状态
var now = [1]; //关卡图标状态
var x = 0; //人的位置
var flag = 0; //已经到达目的地的箱子个数
var a = 8; //地图行数
var b = 12; //地图列数
var m = 0; //box个数
var l = 0; //当前关卡


function start() {
    div.innerHTML = "";
    div.style.flexDirection = "row";
    div.style.justifyContent = "flex-start";
    div.style.alignItems = "flex-start";
    div.style.flexWrap = "wrap";
    for (i = 1; i < now.length + 1; i++) {
        div.innerHTML += "<div class='level' onclick='level(" + i + ")'>" + i + "</div>";
    }
    for (i; i < 15; i++) {
        div.innerHTML += "<div class='level' ><span class='glyphicon glyphicon-lock' aria-hidden='true'></span></div>";
    }
}

//绘制页面
function paint(arr) {
    var str = "";
    str += '<table>';
    for (var i = 0; i < a; i++) {
        str += '<tr>';
        for (j = 0; j < b; j++) {
            str += '<td></td>';
        }
        str += '</tr>';
    }
    str += '</table>';
    div.innerHTML = str;
    var td = document.getElementsByTagName('td');
    for (j = 0; j < arr.length; j++) {
        if (arr[j] == "wall") {
            td[j].innerHTML = "<i class='fa fa-stop fa-3x' aria-hidden='true'></i> ";
        } else if (arr[j] == "box") {
            td[j].innerHTML = "<i class='fa fa-square fa-3x' aria-hidden='true'></i>";
        } else if (arr[j] == "des") {
            td[j].style.backgroundColor = '#FF8C69';
        } else if (arr[j] == "person") {
            td[j].innerHTML = "<i class='fa fa-male fa-3x' aria-hidden='true'></i> ";
        }
    }
    onkeydown(event);
}

//键盘事件
var onkeydown = function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 38) {
        move(0);
    } else if (e && e.keyCode == 39) {
        move(1);
    } else if (e && e.keyCode == 40) {
        move(2);
    } else if (e && e.keyCode == 37) {
        move(3);
    }
}

//关卡
function level(n) {
    flag = 0;
    switch (n) {
        case 1:
            arr = ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall",
                "wall", "", "", "", "", "", "", "", "", "", "", "wall",
                "wall", "", "", "", "", "", "", "", "", "", "", "wall",
                "wall", "", "", "", "", "", "", "", "", "", "", "wall",
                "wall", "", "", "person", "", "box", "", "des", "", "", "", "wall",
                "wall", "", "", "", "", "", "", "", "", "", "", "wall",
                "wall", "", "", "", "", "", "", "", "", "", "", "wall",
                "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall",
            ];
            l = n;
            m = 1;
            x = 51;
            paint(arr);
            break;
        case 2:
            arr = ["", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall",
                "", "", "", "wall", "des", "", "", "", "", "des", "", "wall",
                "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "wall",
                "wall", "person", "", "", "", "box", "", "", "box", "", "", "wall",
                "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "wall",
                "", "", "", "wall", "", "", "", "", "", "", "", "wall",
                "", "", "", "wall", "", "", "", "", "", "", "", "wall",
                "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall",
            ];
            l = n;
            m = 2;
            x = 37;
            paint(arr);
            break;

        case 3:
            arr = ["wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "",
                "wall", "", "person", "", "wall", "", "", "", "", "", "", "",
                "wall", "", "box", "", "wall", "", "", "", "", "", "", "",
                "wall", "", "box", "", "wall", "wall", "", "", "", "wall", "wall", "wall",
                "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "des", "wall",
                "", "wall", "", "", "", "", "", "", "", "", "des", "wall",
                "", "wall", "", "", "", "", "", "", "", "", "", "wall",
                "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall",
            ];
            l = n;
            m = 2;
            x = 14;
            paint(arr);
            break;

        default:
            alert("恭喜通关所有关卡~请期待随后推出的新关卡");
    }
}

//通关界面
function win() {
    div.innerHTML = `<div class="jumbotron center-block">
  <h1>恭喜通关~</h1>
  <p><button class="btn btn-primary btn-lg" onclick='level(l)' >重玩</button></p>
   <p><button class="btn btn-primary btn-lg" onclick='start()'>选关</button></p>
    <p><button class="btn btn-primary btn-lg" onclick='level(l+1)'>下一关</button></p>
</div>`

}


//移动
function move(n) {
    td = document.getElementsByTagName('td');
    switch (n) {
        case 0:
            if (arr[x - b] == "box+des") {
                if (arr[x - 2 * b] == "") {
                    arr[x - 2 * b] = "box";
                    arr[x - b] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2 * b].innerHTML = td[x - b].innerHTML;
                    td[x - b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x -= b;
                    flag--;
                } else if (arr[x - 2 * b] == "des") {
                    arr[x - 2 * b] = "box";
                    arr[x - b] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2 * b].innerHTML = td[x - b].innerHTML;
                    td[x - b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x -= b;
                }
            } else if (arr[x - b] == "box") {
                if (arr[x - 2 * b] == "") {
                    arr[x - 2 * b] = "box";
                    arr[x - b] = (arr[x - b] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2 * b].innerHTML = td[x - b].innerHTML;
                    td[x - b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x -= b;
                } else if (arr[x - 2 * b] == "des") {
                    arr[x - 2 * b] = "box+des";
                    arr[x - b] = (arr[x - b] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2 * b].innerHTML = td[x - b].innerHTML;
                    td[x - b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x -= b;
                    flag++;
                    if (flag == m) {
                        now[l] = 1;
                        setTimeout(() => { win() }, 1000);
                    }
                }
            } else if (arr[x - b] == "") {
                arr[x - b] = "person";
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x - b].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x -= b;
            } else if (arr[x - b] == "des") {
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x - b].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x -= b;
            }
            break;
        case 1:
            if (arr[x + 1] == "box+des") {
                if (arr[x + 2] == "") {
                    arr[x + 2] = "box";
                    arr[x + 1] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2].innerHTML = td[x + 1].innerHTML;
                    td[x + 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x++;
                    flag--;
                } else if (arr[x + 2] == "des") {
                    arr[x + 2] = "box+des";
                    arr[x + 1] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2].innerHTML = td[x + 1].innerHTML;
                    td[x + 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x++;
                }
            } else if (arr[x + 1] == "box") {
                if (arr[x + 2] == "") {
                    arr[x + 2] = "box";
                    arr[x + 1] = (arr[x + 1] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2].innerHTML = td[x + 1].innerHTML;
                    td[x + 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x++;
                } else if (arr[x + 2] == "des") {
                    arr[x + 2] = "box+des";
                    arr[x + 1] = (arr[x + 1] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2].innerHTML = td[x + 1].innerHTML;
                    td[x + 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x++;
                    flag++;
                    if (flag == m) {
                        now[l] = 1;

                        setTimeout(() => { win() }, 500);
                    }
                }
            } else if (arr[x + 1] == "") {
                arr[x + 1] = "person";
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x + 1].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x++;
            } else if (arr[x + 1] == "des") {
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x + 1].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x++;
            }
            break;
        case 2:
            if (arr[x + b] == "box+des") {
                if (arr[x + 2 * b] == "") {
                    arr[x + 2 * b] = "box";
                    arr[x + b] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2 * b].innerHTML = td[x + b].innerHTML;
                    td[x + b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x += b;
                    flag--;
                } else if (arr[x + 2 * b] == "des") {
                    arr[x + 2 * b] = "box";
                    arr[x + b] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2 * b].innerHTML = td[x + b].innerHTML;
                    td[x + b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x += b;
                }
            } else if (arr[x + b] == "box") {
                if (arr[x + 2 * b] == "") {
                    arr[x + 2 * b] = "box";
                    arr[x + b] = (arr[x + b] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2 * b].innerHTML = td[x + b].innerHTML;
                    td[x + b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x += b;
                } else if (arr[x + 2 * b] == "des") {
                    arr[x + 2 * b] = "box+des";
                    arr[x + b] = (arr[x + b] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x + 2 * b].innerHTML = td[x + b].innerHTML;
                    td[x + b].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x += b;
                    flag++
                    if (flag == m) {
                        now[l] = 1;
                        setTimeout(() => { win() }, 1000);
                    }
                }
            } else if (arr[x + b] == "") {
                arr[x + b] = "person";
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x + b].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x += b;
            } else if (arr[x + b] == "des") {
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x + b].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x += b;
            }
            break;
        case 3:
            if (arr[x - 1] == "box+des") {
                if (arr[x - 2] == "") {
                    arr[x - 2] = "box";
                    arr[x - 1] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2].innerHTML = td[x - 1].innerHTML;
                    td[x - 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x--;
                    flag--;
                } else if (arr[x - 2] == "des") {
                    arr[x - 2] = "box";
                    arr[x - 1] = "des";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2].innerHTML = td[x - 1].innerHTML;
                    td[x - 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x--;
                }
            } else if (arr[x - 1] == "box") {
                if (arr[x - 2] == "") {
                    arr[x - 2] = "box";
                    arr[x - 1] = (arr[x - 1] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2].innerHTML = td[x - 1].innerHTML;
                    td[x - 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x--;
                } else if (arr[x - 2] == "des") {
                    arr[x - 2] = "box+dex";
                    arr[x - 1] = (arr[x - 1] == "box+des") ? "des" : "person";
                    arr[x] = (arr[x] == "des") ? "des" : "";
                    td[x - 2].innerHTML = td[x - 1].innerHTML;
                    td[x - 1].innerHTML = td[x].innerHTML;
                    td[x].innerHTML = null;
                    x--;
                    flag++;
                    if (flag == m) {
                        now[l] = 1;
                        setTimeout(() => { win() }, 1000);
                    }
                }
            } else if (arr[x - 1] == "") {
                arr[x - 1] = "person";
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x - 1].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x--;
            } else if (arr[x - 1] == "des") {
                arr[x] = (arr[x] == "des") ? "des" : "";
                td[x - 1].innerHTML = td[x].innerHTML;
                td[x].innerHTML = null;
                x--;
            }
            break;
    }
}