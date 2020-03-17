var socket;

var At = 0.06;
var p = { x: 200, y: 200, s: 50, sp: 2, Q: false, Qac: 5, Qc: 0 };
var Q = { x: -100, y: -100, s: 20, sx: 0, sy: 0, sp: 7, kx: 0, ky: 0, r: 300 };
var ep = { x: 0, y: 0 };
var eQ = { x:0, y: 0 };

function setup() {
  socket = io.connect ('http://localhost:3000');
  socket.on ('pl', plF);

  createCanvas (800, 600);
}

function plF (data) {
    ep.x = data.x;
    ep.y = data.y;
    eQ.x = data.qx;
    eQ.y = data.qy;
}

function keyPressed () {
    if (keyCode === 81 && p.Qc === 0) {
        p.Q = true;
        Q.kx = Q.x = p.x;
        Q.ky = Q.y = p.y;
        Q.sx = (mouseX - p.x) / (dist (mouseX, mouseY, p.x, p.y)) * Q.sp;
        Q.sy = (mouseY - p.y) / (dist (mouseX, mouseY, p.x, p.y)) * Q.sp;
        p.Qc = p.Qac;
	}
}

var tX = p.x, tY = p.y;
function move () {
    if (mouseIsPressed) {
        tX = mouseX;
        tY = mouseY;
	}
    if (dist (tX, tY, p.x, p.y) > 1) {
        p.x += (tX - p.x) / (dist (tX, tY, p.x, p.y)) * p.sp;
        p.y += (tY - p.y) / (dist (tX, tY, p.x, p.y)) * p.sp;
    }
}

function skills() {

    p.Qc -= At;
    if (p.Qc < 0) { p.Qc = 0; }  

    if (p.Q) {
        fill (30, 30, 50);
        circle (Q.x, Q.y, Q.s);
        Q.x += Q.sx;
        Q.y += Q.sy;  
        if (dist (Q.kx, Q.ky, Q.x, Q.y) > Q.r) {
            p.Q = false; 
            Q.x = -100;
            Q.y = -100;
		}
	}

} 

function eskills () {
    fill (50, 50, 70);
    circle (eQ.x, eQ.y, Q.s);
} 

var pdata = { x: 0, y: 0, qx: 0, qy: 0 };
function draw () {
    background (200);

    fill (0);
    circle (p.x, p.y, p.s);
    fill (100, 120, 80);
    circle (ep.x, ep.y, p.s);

    move ();
    skills ();

    eskills ();

    pdata.x = p.x;
    pdata.y = p.y;
    pdata.qx = Q.x;
    pdata.qy = Q.y;

    socket.emit ('pl', pdata);
}


