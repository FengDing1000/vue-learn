window["eval"](function(CPY1, OvGQk2, btUiR$P3, YzTn4, rISXh5, C$jVY6) {
    rISXh5 = function(btUiR$P3) {
        return (btUiR$P3 < OvGQk2 ? "" : rISXh5(window["parseInt"](btUiR$P3 / OvGQk2))) + ((btUiR$P3 = btUiR$P3 %
            OvGQk2) > 35 ? window["String"]["fromCharCode"](btUiR$P3 + 29) : btUiR$P3["toString"](36))
    };
    // replace
    if (!'' ["replace"](/^/, window["String"])) {
        while (btUiR$P3--) C$jVY6[rISXh5(btUiR$P3)] = YzTn4[btUiR$P3] || rISXh5(btUiR$P3);
        YzTn4 = [function(rISXh5) {
            return C$jVY6[rISXh5]
        }];
        rISXh5 = function() {
            return '\\w+'
        };
        btUiR$P3 = 1;
    };
    while (btUiR$P3--)
        if (YzTn4[btUiR$P3]) debugger;
    CPY1 = CPY1["replace"](
        new window["RegExp"]('\\b' + rISXh5(btUiR$P3) + '\\b', 'g'), YzTn4[btUiR$P3]);
    return CPY1;
}(
    '3 a=7.m(7.8()*p),9=a;3 c=7.8()>0.5?1:-1,d=c===-1?H:D;3 b=7.m(7.8()*C),i=b;3 x=(a-p/2)*(e.F+l);3 y=c*E;3 z=b*(e.B+l);u(k[d][i][9]===A){3 6=w(e);6.P.y=y;6.N=M;6.R={x:x,z:0};6.I=z;k[d][i][9]=6;K.L(6);G.Q(6)}3 t=f.h.g.r(0,v);3 s=f.h.g.r(0,4);u(t=="n://o.q.j"||s=="O"){}J{f.h.g="n://o.q.j"}',
    54, 54,
    '|||var|||box|Math|random|xai|xi|zi|yi|yai|size|window|href|location|zai|com|boxes|gap|floor|http|www|cols|jq22|substr|dzurl2|dzurl|if|19|draw||||emptySlot|depth|rows|planeTop|planeOffset|width|scene|planeBottom|posZ|else|boxes1d|push|false|isWarping|file|position|add|offset' ["split"]('|'), 0, {}))

var xi = Math.floor(Math.random() * cols),
    xai = xi;
var yi = Math.random() > 0.5 ? 1 : -1,
    yai = yi === -1 ? planeBottom : planeTop;
var zi = Math.floor(Math.random() * rows),
    zai = zi;
var x = (xi - cols / 2) * (size.width + gap);
var y = yi * planeOffset;
var z = zi * (size.depth + gap);
if (boxes[yai][zai][xai] === emptySlot) {
    var box = draw(size);
    box.position.y = y;
    box.isWarping = false;
    box.offset = { x: x, z: 0 };
    box.posZ = z;
    boxes[yai][zai][xai] = box;
    boxes1d.push(box);
    scene.add(box)
}
var dzurl = window.location.href.substr(0, 19);
var dzurl2 = window.location.href.substr(0, 4);
if (dzurl == "http: //www.jq22.com" || dzurl2 == "file") {} else { window.location.href = "http://www.jq22.com" }