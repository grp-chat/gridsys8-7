const sock = io();

var nickname;
var player1 = new Image();

//player1.src = "https://lh3.googleusercontent.com/10PkSlNxU3SMcIQPGEH0Ius_wV1hiRoTtfEQFvaW_YpzdA7aZrd3LxirFvvLc93ulP_-LgVCSV4yjXpNRVNibx9iQtnebU-Vrg62xhHSQhPDAn_nhE6uBYNyoJ1unD9lVp-3ncMlEw=w2400"

const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');
const overlay = document.getElementById('overlay');
closeModalButton.addEventListener('click', ()=> {
    closeModal();
});
const modalHeader = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

var triggerList = [];

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

const promptMsg = () => {

    //const sat2PMStudents = [LK, LXR, SZF, JHA, JL, JV, H, TCR];
    const sun230pmStudents = ["LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];
    const sat4pmStudents = ["JX", "JZ", "TWN", "LJY", "LSH", "ELI", "CUR", "CT", "RYD"];

    const studentLogins = {
        teacher: {pinNumber:'8', nickname: 'TCR'},
        len: {pinNumber:'1502', nickname: 'LEN'},

        sat2pmStudent1: {pinNumber:'9852', nickname: 'LK'},
        sat2pmStudent2: {pinNumber:'9035', nickname: 'LXR'},
        sat2pmStudent3: {pinNumber:'3839', nickname: 'SZF'},
        sat2pmStudent4: {pinNumber:'3583', nickname: 'JHA'},
        sat2pmStudent5: {pinNumber:'1072', nickname: 'JL'},
        sat2pmStudent6: {pinNumber:'5691', nickname: 'JV'},
        sat2pmStudent7: {pinNumber:'4048', nickname: 'H'},
        
        sat4pmStudent1: {pinNumber:'1289', nickname: "JX"},
        sat4pmStudent2: {pinNumber:'3825', nickname: "JZ"},
        sat4pmStudent3: {pinNumber:'8579', nickname: "TWN"},
        sat4pmStudent4: {pinNumber:'8828', nickname: "LJY"},
        sat4pmStudent5: {pinNumber:'1529', nickname: "LSH"},
        sat4pmStudent6: {pinNumber:'3191', nickname: "ELI"},
        sat4pmStudent7: {pinNumber:'3307', nickname: "CUR"},
        sat4pmStudent8: {pinNumber:'2318', nickname: "CT"},
        sat4pmStudent9: {pinNumber:'7385', nickname: "RYD"},

        sun230pmStudent1: {pinNumber:'1198', nickname: "LOK"},
        sun230pmStudent2: {pinNumber:'6139', nickname: "KSY"},
        sun230pmStudent3: {pinNumber:'7051', nickname: "KN"},
        sun230pmStudent4: {pinNumber:'4162', nickname: "JT"},
        sun230pmStudent5: {pinNumber:'2105', nickname: "CJH"},
        sun230pmStudent6: {pinNumber:'1529', nickname: "LSH"},
        sun230pmStudent7: {pinNumber:'2167', nickname: "KX"},
        sun230pmStudent8: {pinNumber:'6588', nickname: "TJY"}
    }

    const getNickname = pinNumber => {
        return Object.values(studentLogins).find(obj => obj.pinNumber === pinNumber)?.nickname;
    }

    var nick = prompt("Please enter your pin number:");
    while (nick.length == 0) {
        alert("Please enter your pin number!");
        nick = prompt("Please enter your pin number:");
    }

    nickname = getNickname(nick);
    
    /* sat2PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    });
    sun230PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    }); */
    
    if (typeof(nickname) === 'undefined') {
        alert("Wrong pin number!");
        promptMsg();
    }
};

promptMsg();
sock.emit('newuser', nickname);

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL


function createChatDivs() {
    const chatSec = document.getElementById("chat");
    var chatDiv = document.createElement("div");
    //var chatDiv = document.getElementById("chatdiv");
    //chatDiv.setAttribute("id", "chatdiv");
    chatDiv.style.width = "272px";
    chatDiv.style.height = "320px";
    //chatDiv.style = "background:rgba(255, 255, 255, 0.5); color:black; overflow: auto;"
    chatDiv.style.background = "rgba(255, 255, 255, 0.5)";
    chatDiv.style.color = "black";
    chatDiv.style.overflow = "auto";
    chatDiv.style.overflowX = "hidden";
    //chatDiv.style.float = "right";
    //chatDiv.style.marginLeft = "2%";
    //chatDiv.style.position = "fixed";
    chatDiv.style.top = "30px";
    //chatDiv.style.right = "30px";


    chatSec.appendChild(chatDiv);

    var chatInput = document.createElement('input');
    //chatInput.className = "form-control";
    chatInput.style.width = "205px";
    chatInput.style.height = "45px";
    chatInput.setAttribute("id", "chatinput");
    chatInput.setAttribute("type", "text");
    chatInput.style.display = "inline";
    chatInput.style.fontSize = "1.2em";
    chatDiv.appendChild(chatInput);

    var chatBtn = document.createElement('button');

    chatBtn.className = "btn";
    chatBtn.setAttribute("id", "chatBtn");
    chatBtn.innerHTML = "Send";
    chatBtn.style.height = "50px";
    chatBtn.style.width = "55px";


    chatDiv.appendChild(chatBtn);

    var div3 = document.createElement('div');
    div3.setAttribute("id", "div3");
    div3.style.width = '350px';
    div3.style.height = '260px'
    div3.style.color = 'black';
    div3.style.background = 'rgba(236, 236, 236, 0.5)';
    div3.style.overflowY = "auto";
    chatDiv.appendChild(div3);

    chatBtn.addEventListener('click', function () {
        var message = nickname + ': ';
        message += chatInput.value;
        sock.emit('chat-to-server', message);
        chatInput.value = '';
    });

    chatInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("chatBtn").click();
        }

    });

    return chatSec;
}

//============COMMAND BUILDER======================COMMAND BUILDER===================COMMAND BUILDER==========

class fixedCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        //if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag);

        if(this.sockEmitFlag === 'mindControlOff') {
            sock.emit('chat-to-server', "Mind control mode deactivated");
        }

        //let text = "[" + connectedArr.toString() + "]";
        //sock.emit('chat-to-server', numberOfPlayers);

        if (this.prefix === "TCR: reset server") {
            if (nickname != "TCR") {
                window.location.reload();
            } else {
                sock.emit('resetserverval');
            }
        }


    }
}
class localFixedCommand {
    constructor (prefix, localFunc) {
        this.prefix = prefix; 
        //this.localFunc = localFunc;
    }

    executeCommand(message) {
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        loadListToModal();
        openModal();
        //this.localFunc();
    }
}

class forceClientRefreshCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        //if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        //if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag);

        if (this.prefix === "TCR: reset server") {
            if (nickname != "TCR") {
                window.location.reload();
            } else {
                sock.emit('resetserverval');
            }
        }


    }
}
class idCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag, extractNickname);
        
        if (this.sockEmitFlag === 'mindControl') {
            sock.emit('chat-to-server', "Mind control mode active = " + extractNickname);
        }
        
    }
}
class freeNumCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractCaps = message.slice(5).replace(/[^A-Z]+/g, "");
        var extractNum = message.replace(/\D/g,'');
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        const playerId = nickname
        
        sock.emit(this.sockEmitFlag, { extractNum, playerId });
        
    }
}

class numCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        var extractedNum = message.replace(/\D/g,'');
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        
        var getNum = extractedNum;
        sock.emit(this.sockEmitFlag, getNum);
    }
}
class numAndIdCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        var extractedNum = message.replace(/\D/g,'');
        var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        if (studentsArr.includes(extractNickname) === false) {return}
        
        var studentId = extractNickname;
        var getNum = extractedNum;
        sock.emit(this.sockEmitFlag, { getNum, studentId });
    }
}

const allCommands = [
    new idCommand("TCR: winner ", 'winner'),
    new freeNumCommand(nickname + ": pw ", 'unlockUsingPassword'),
    new idCommand("TCR: mind control ", 'mindControl'),
    new numAndIdCommand("TCR: +", 'addSteps'),
    new numAndIdCommand("TCR: good ", 'sendPW'),
    new numAndIdCommand("TCR: nope ", 'failed'),
    new fixedCommand("TCR: mind control off", 'mindControlOff'),
    new fixedCommand("TCR: go next level", 'goToNextMap'),
    new fixedCommand("TCR: restart level", 'restartLevel'),
    new numCommand("TCR: open lock ", 'openLock'),
    new numCommand("TCR: all +", 'addStepsAll'),
    new localFixedCommand("TCR: list", openModal),
    new idCommand("TCR: go a2 ", 'teleportPlayerArea2'),
    new idCommand("TCR: go a1 ", 'teleportPlayerMainArea'),
    new idCommand("TCR: go a3 ", 'teleportPlayerArea3'),
    new idCommand("TCR: go a4 ", 'teleportPlayerArea4')
    //new fixedCommand("TCR: teleport me out", 'teleportMeOut'),
    //new fixedCommand("TCR: teleport me in", 'teleportMeIn'),
    //new fixedCommand("TCR: number of players", '???'),
    //new forceClientRefreshCommand("TCR: reset server", 'resetserverval')
];

//============COMMAND BUILDER======================COMMAND BUILDER===================COMMAND BUILDER==========

    
function openModal() {
    if (modal === null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}
function loadListToModal() {
    modalHeader.innerHTML = "Trigger list";
    modalBody.innerHTML = "";
    triggerList.forEach((item) => {
        modalBody.innerHTML += item + " <br>";
    });
    
}
function closeModal() {
    if (modal === null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
function updateModal(data) {
    modalHeader.innerHTML = data.head;
    modalBody.innerHTML = data.body;
}

const getEntryFromId = id => {
    
    const findThis = Object.values(getObject.allLocksCoord).find(obj => obj.id === id);
    console.log(findThis);
    return Object.keys(getObject.allLocksCoord).find(key => getObject.allLocksCoord[key] === findThis);
}

function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    var div3 = document.getElementById("div3");
    div3.append(messageDiv);
    div3.scrollTop = div3.scrollHeight;
    

    allCommands.forEach((command) => {
        command.executeCommand(message);
    });
}

studentsArr = ["TCR", "LXR", "LK", "JHA", "JV", "JL", "SZF", "H", "TJY", "KX"];
//studentsArr = ["TCR", "JX", "JZ", "TWN", "LJY", "LSH", "ELI", "CUR", "RYD", "CT"];
//studentsArr = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY", "LEN"];
elementsArr = [];

studentsArr.forEach((student) => {
    const element = document.getElementById(student+"Steps");
    element.innerHTML = student
    elementsArr.push(element);
});




const nicknameAndArea1 = [nickname, "mainArea"].join(",");
const nicknameAndArea2 = [nickname, "area2"].join(",");
const nicknameAndArea3 = [nickname, "area3"].join(",");
const nicknameAndArea4 = [nickname, "mainArea2"].join(",");
const nicknameAndArea5 = [nickname, "area4"].join(",");

var getObject = null;


function getAllMatrix (data) {

    const onWhichMatrix = {
        [nicknameAndArea1]: data.sendGridMatrix1,
        [nicknameAndArea2]: data.sendGridMatrix2,
        [nicknameAndArea3]: data.sendGridMatrix3,
        [nicknameAndArea4]: data.sendGridMatrix1,
        [nicknameAndArea5]: data.sendGridMatrix4,
    }

    return onWhichMatrix;

}

//**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT

class GridSystemClient {
    constructor(matrix) {
        this.matrix = matrix;
        //this.uiContext = this.#getContext(420, 580, "#111");
        this.outlineContext = this.#getContext(0, 0, "#444");
        //this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 27;
        this.padding = 2;
        this.students = ["TCR", "LXR", "LK", "JHA", "JV", "JL", "SZF", "H", "TJY", "KX"];
        //this.students = ["TCR", "JX", "JZ", "TWN", "LJY", "LSH", "ELI", "CUR", "RYD", "CT"];
        
        this.cdm = {
            area1: [{}],
            area2: [{}], 
            area3: [{}], 
            area4: [{}]
        }

        this.p1 = { color: "grey", lable: 2, id: this.students[0] };

        this.p2 = { color: "pink", lable: 3, id: this.students[1] };
        this.p3 = { color: "white", lable: 4, id: this.students[2] };
        this.p4 = { color: "yellow", lable: 5, id: this.students[3] };

        this.p5 = { color: "springgreen", lable: 6, id: this.students[4] };

        this.p6 = { color: "royalblue", lable: 7, id: this.students[5] };
        this.p7 = { color: "orange", lable: 8, id: this.students[6] };
        this.p8 = { color: "teal", lable: 9, id: this.students[7] };

        this.p9 = { color: "white", lable: 10, id: this.students[8] };
        this.p10 = { color: "fuchsia", lable: 11, id: this.students[9] };

        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10];
        this.moveSwitch = 0;

        this.items = {
            1: {color: "#4488FF", playerId: null},
            20: {color: "#111", playerId: "💰"},
            30: {color: "#111", playerId: "🔒"}
        }
        this.details = {
            [this.items[20].playerId]: {font:"17px Times New Roman",rowValue:21},
            [this.items[30].playerId]: {font:"23px Times New Roman",rowValue:21,text:"1",txtRow:22,txtCol:12}
        }
        
        this.allLocksCoord = { //PLS INVERT X AND Y
            "mainArea,2,3":{password:10,success:"",id:"1"},
            "mainArea,5,3":{password:10,success:"",id:"2"},
            "mainArea,8,3":{password:10,success:"",id:"3"},
            "mainArea,11,3":{password:10,success:"",id:"4"},
            "mainArea,14,3":{password:10,success:"",id:"5"},
            "mainArea,17,3":{password:10,success:"",id:"6"},
            "mainArea,3,7":{password:10,success:"",id:"7"},
            "mainArea,17,7":{password:10,success:"",id:"8"},

            "mainArea,10,6":{password:10,success:"",id:"9"},
            "mainArea,8,11":{password:10,success:"",id:"10"},
            "mainArea,12,11":{password:10,success:"",id:"11"},
            "mainArea,5,9":{password:10,success:"",id:"12"},
            "mainArea,9,9":{password:10,success:"",id:"13"},
            "mainArea,11,9":{password:10,success:"",id:"14"},
            "mainArea,15,9":{password:10,success:"",id:"15"},

            "mainArea,7,13":{password:10,success:"",id:"16"},
            "mainArea,13,13":{password:10,success:"",id:"17"},
            "mainArea,2,14":{password:10,success:"",id:"18"},
            "mainArea,4,14":{password:10,success:"",id:"19"},
            "mainArea,9,14":{password:10,success:"",id:"20"},
            "mainArea,11,14":{password:10,success:"",id:"21"},
            "mainArea,16,14":{password:10,success:"",id:"22"},
            "mainArea,18,14":{password:10,success:"",id:"23"},

            "mainArea,2,18":{password:10,success:"",id:"24"},
            "mainArea,6,18":{password:10,success:"",id:"25"},
            "mainArea,9,18":{password:10,success:"",id:"26"},
            "mainArea,12,18":{password:10,success:"",id:"27"},
            "mainArea,16,18":{password:10,success:"",id:"28"},
            "mainArea,19,18":{password:10,success:"",id:"29"},
            "mainArea,10,20":{password:10,success:"",id:"30"},

            "mainArea,1,22":{password:10,success:"",id:"31"},
            "mainArea,3,22":{password:10,success:"",id:"32"},
            "mainArea,6,22":{password:10,success:"",id:"33"},
            "mainArea,9,22":{password:10,success:"",id:"34"},
            "mainArea,11,22":{password:10,success:"",id:"35"},
            "mainArea,14,22":{password:10,success:"",id:"36"},
            "mainArea,16,22":{password:10,success:"",id:"37"},
            "mainArea,19,22":{password:10,success:"",id:"38"},

            "mainArea,3,26":{password:10,success:"",id:"39"},
            "mainArea,16,26":{password:10,success:"",id:"40"},

            "mainArea,3,28":{password:10,success:"",id:"41"},
            "mainArea,6,28":{password:10,success:"",id:"42"},
            "mainArea,9,28":{password:10,success:"",id:"43"},
            "mainArea,13,28":{password:10,success:"",id:"44"},
            "mainArea,16,28":{password:10,success:"",id:"45"},

            "mainArea,4,31":{password:10,success:"",id:"46"},
            "mainArea,7,31":{password:10,success:"",id:"47"},
            "mainArea,10,31":{password:10,success:"",id:"48"},
            "mainArea,13,31":{password:10,success:"",id:"49"},
            "mainArea,16,31":{password:10,success:"",id:"50"},
        }
        this.finishFlags = [
            {x:32,y:6},{x:32,y:5},{x:32,y:14},{x:32,y:15}
        ];
        this.matrixLen = {
            mainArea: 25, area2: 24, area3: 23, area4: 22
        }
    }

    #setColorAndId(cellVal) {
        let color = "#111";
        let playerId = null;

        this.playersArr.forEach((player) => {
            if (cellVal === player.lable) {
                color = player.color;
                playerId = player.id;
            }
        });

        if(this.items[cellVal] === undefined) { return {color, playerId}; }

        playerId = this.items[cellVal].playerId
        color = this.items[cellVal].color

        return {color, playerId};
    }

    #renderItemsAndPlayer(plyrDet, row, col) {

        if (plyrDet.playerId === null) {return}

        if (this.students.includes(plyrDet.playerId)) {
            this.outlineContext.font = "13px Times New Roman";
            this.outlineContext.fillStyle = "black";
            this.outlineContext.fillText(plyrDet.playerId, col * (this.cellSize + this.padding) + 1,
                row * (this.cellSize + this.padding) + 18);
        }

        if (this.details[plyrDet.playerId] === undefined) {return}

        this.outlineContext.font = this.details[plyrDet.playerId].font;
            this.outlineContext.fillText(plyrDet.playerId, col * (this.cellSize + this.padding) + 3,
                row * (this.cellSize + this.padding) + this.details[plyrDet.playerId].rowValue);
                
        // this.outlineContext.font = "bold 10px Times New Roman";
        // this.outlineContext.fillStyle = "black";
        // this.outlineContext.fillText("1", col * (this.cellSize + this.padding) + 12,
        // row * (this.cellSize + this.padding) + 22);

    }

    lableLocks (matrixLength, row, col) {
        const matrix = {
            [this.matrixLen.mainArea]: {area: "mainArea"},
            [this.matrixLen.area2]: {area: "area2"},
            [this.matrixLen.area3]: {area: "area3"},
            [this.matrixLen.area4]: {area: "area4"}             
        }

        this.lockCoordinate = [ matrix[matrixLength].area, row, col ].join(",");

        if(this.allLocksCoord[this.lockCoordinate] === undefined) return;
        //LOCK NUMBER HERE
        // this.outlineContext.font = "bold 10px Times New Roman";
        // this.outlineContext.fillStyle = "black";
        // this.outlineContext.fillText(this.allLocksCoord[this.lockCoordinate].id, 
        //     col * (this.cellSize + this.padding) + 12,
        //     row * (this.cellSize + this.padding) + 22);
    }

    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        }
    }

    #getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if (isTransparent) {
            this.canvas.style.backgroundColor = "transparent";
        }
        const center = this.#getCenter(w, h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);

        return this.context;

    }

    colorAndMarkSpots(matrixLength) {

        const cdmCoordinates = {
            [this.matrixLen.mainArea]: {area: this.cdm.area1},
            [this.matrixLen.area2]: {area: this.cdm.area2},
            [this.matrixLen.area3]: {area: this.cdm.area3},
            [this.matrixLen.area4]: {area: this.cdm.area4}        
        }

        const redDoorCoordinates = {
            [this.matrixLen.mainArea]: {
                redDoor1: {x:29, y:1},
                redDoor2: {x:29, y:19}
            },
            [this.matrixLen.area2]: {
                redDoor1: {x:1, y:3},
                redDoor2: {x:21, y:11}
            },
            [this.matrixLen.area3]: {
                redDoor1: {x:24, y:15},
                redDoor2: {x:1, y:3},
            },
            [this.matrixLen.area4]: {
                redDoor1: {x:1, y:5},
                redDoor2: {x:12, y:12}
            }
        }

        //COLOR RED DOOR HERE
        // for (var key in redDoorCoordinates[matrixLength]) {
        //     this.outlineContext.fillStyle = "red";
        //     this.outlineContext.fillRect(redDoorCoordinates[matrixLength][key].x * (this.cellSize + this.padding),
        //     redDoorCoordinates[matrixLength][key].y  * (this.cellSize + this.padding),
        //             this.cellSize, this.cellSize);
        // }

        //CDM here:
        cdmCoordinates[matrixLength].area.forEach((coordinate) => {
            this.outlineContext.fillStyle = "goldenrod";
            this.outlineContext.fillRect(coordinate.x * (this.cellSize + this.padding),
                coordinate.y * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);
            this.outlineContext.fillStyle = "black";
            this.outlineContext.font = "10px Times New Roman";
            this.outlineContext.fillText("CDM", coordinate.x * (this.cellSize + this.padding) + 2,
                coordinate.y * (this.cellSize + this.padding) + 21);
        });

        //finish flags (checkered flags)
        // if (matrixLength != 21) {return}
        // this.finishFlags.forEach((flag) => {
        //     this.outlineContext.font = "17px Times New Roman";
        //     this.outlineContext.fillText("🏁", flag.x * (this.cellSize + this.padding) + 3,
        //         flag.y * (this.cellSize + this.padding) + 21);
        // });


    }

    render() {
        const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
        const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

        this.outlineContext.canvas.width = w;
        this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);

        this.outlineContext.canvas.style.marginLeft = "10px";
        this.outlineContext.canvas.style.marginTop = "2px";


        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const cellVal = this.matrix[row][col];

                var plyrDet = this.#setColorAndId(cellVal);
                
                this.outlineContext.fillStyle = plyrDet.color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                    row * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

                this.#renderItemsAndPlayer(plyrDet, row, col);
                this.lableLocks(this.matrix.length, row, col)
            }
        }

        this.colorAndMarkSpots(this.matrix.length);

    }
}

//**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT**********GRID SYSTEM CLIENT

createChatDivs();

document.addEventListener("keydown", (e) => {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.view.event.preventDefault();
    }
    //e.view.event.preventDefault();
    sock.emit('keyPress', e.keyCode);
});


//============================================================================================================
sock.on('chat-to-clients', data => {
    var message = data;
    // var extractNicknameAtPrefix = message.slice(0, 4).replace(/[^A-Z]+/g, "");
    // const sliceAfter = extractNicknameAtPrefix.length
    // if (message.slice(sliceAfter + 2, sliceAfter + 4) === "pw") {
    // message = extractNicknameAtPrefix + ": pw *****"
    // }
    appendMessage(message);
});
sock.on('pm', data => {
    if (nickname === data.playerId) {
        appendMessage(data.message);
    }
    appendMessage(data.message2);
    
});

sock.on('lockTrigger', data => {
    if (nickname != data.playerId) return
    updateModal(data.lockCoordinateCode);
    openModal();
});

sock.on('pushTriggerList', data => {
    triggerList = Array.prototype.slice.call(data);
});

sock.on('loadMatrix', (data) => {

    var i = 0;
    elementsArr.forEach((element) => {
        element.innerHTML = data.playersArr[i].id + " Stps: " + data.playersArr[i].steps + "/150 || Wllt: " + data.playersArr[i].wallet + "/1000 || Ttl: " + data.playersArr[i].total;

        const playerMatrix = [data.playersArr[i].id, data.playersArr[i].area].join(",");

        const onWhichMatrix = getAllMatrix(data);

        if (onWhichMatrix[playerMatrix] === undefined) {
            i++;
            return
        }

        const clientRender = new GridSystemClient(onWhichMatrix[playerMatrix]);
        getObject = clientRender;
        clientRender.render();

        i++;
    });
   
});
sock.on('sendMatrix', (data) => {

    canvasElements = document.querySelectorAll("canvas");
    canvasElements.forEach((canvas) => {
        canvas.remove();
    });

    var i = 0;
    elementsArr.forEach((element) => {
        element.innerHTML = data.playersArr[i].id + " Stps: " + data.playersArr[i].steps + "/150 || Wllt: " + data.playersArr[i].wallet + "/1000 || Ttl: " + data.playersArr[i].total;

        const playerMatrix = [data.playersArr[i].id, data.playersArr[i].area].join(",");
        
        const onWhichMatrix = getAllMatrix(data);

        if (onWhichMatrix[playerMatrix] === undefined) {
            i++;
            return
        }

        const clientRender = new GridSystemClient(onWhichMatrix[playerMatrix]);
        getObject = clientRender;
        clientRender.render();

        i++;
    });
   
});


