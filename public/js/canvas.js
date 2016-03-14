/**
 * Created by hansneil on 14/3/16.
 */
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

+(function(){
    function lineAnimate(event, coords, target) {

        function setLine() {
            for (var i = 0; i < lines.length; i++) {
                lines[i].x += lines[i].xvelocity;
                lines[i].y += lines[i].yvelocity;

                if (lines[i].startX > lines[i].endX && lines[i].x <= lines[i].endX ||
                    lines[i].startX < lines[i].endX && lines[i].x >= lines[i].endX ||
                    lines[i].startY > lines[i].endY && lines[i].y <= lines[i].endY ||
                    lines[i].startY < lines[i].endY && lines[i].y >= lines[i].endY) {
                    lines[i].xvelocity = 0;
                    lines[i].yvelocity = 0;
                } else {
                    line[i].setAttribute('x2', lines[i].x);
                    line[i].setAttribute('y2', lines[i].y);
                }
            }
        }

        function removeLine() {
            for (var i = 0; i < lines.length; i++) {
                line[i].style.visibility = "hidden";
            }
        }

        function visibleLine() {
            for (var i = 0; i < lines.length; i++) {
                line[i].style.visibility = "visible";
            }
        }

        function gameLoop() {
            requestAnimFrame(gameLoop);
            setLine();
        }

        function getCenterLines() {
            for (var i = 0; i < length - 1; i++) {
                var tempX, tempY, tempSpeedX, tempSpeedY;
                var tempLine = {};
                tempX = tempArr[i].x;
                tempY = tempArr[i].y;
                tempSpeedX = (tempX - startX) / 100;
                tempSpeedY = (tempY - startY) / 100;
                tempLine = {x: startX, y: startY, startX: startX, startY: startY,
                    endX: tempX, endY: tempY, xvelocity: tempSpeedX, yvelocity: tempSpeedY};
                lines.push(tempLine);
            }
        }

        function getSideLines() {
            for (var i = 0; i < length -2; i++) {
                var sideX, sideY, sideEndX, sideEndY, sideSpeedX, sideSpeedY;
                var sideLine = {};
                sideX = tempArr[i].x;
                sideY = tempArr[i].y;
                sideEndX = tempArr[i+1].x;
                sideEndY = tempArr[i+1].y;
                sideSpeedX = (sideEndX - sideX) / 100;
                sideSpeedY = (sideEndY - sideY) / 100;
                sideLine = {x: sideX, y: sideY, startX: sideX, startY: sideY,
                    endX: sideEndX, endY: sideEndY, xvelocity: sideSpeedX, yvelocity: sideSpeedY};
                lines.push(sideLine);
            }
        }

        var length = coords.length;
        var tempArr = coords.slice(0, length-1);
        var line = (target || event.currentTarget).getElementsByTagName('line');
        var startX = coords[length-1].x;
        var startY = coords[length-1].y;
        var lines = [];

        getCenterLines();
        getSideLines();

        switch (event.type) {
            case "mouseover":
                visibleLine();
                gameLoop();
                break;
            case "mouseleave":
                removeLine();
                break;
            case "click":
                visibleLine();
                gameLoop();
                break;
            default:
                break;
        }


    }

    var SvgCoords = function(id, tagName) {
        this.svg = document.getElementById(id);
        this.circles = (this.svg).getElementsByTagName(tagName);
    };
    SvgCoords.prototype.getCircleCoord =  function(circles) {
        var tempCoords = [];
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getAttribute('r') == '5' || circles[i].getAttribute('r') == '7') {
                tempCoords.push({
                    x: Number(circles[i].getAttribute('cx')),
                    y: Number(circles[i].getAttribute('cy'))
                });
            }
        }
        return tempCoords;
    };

    var svgGroup = [
        { id: 'skill', tag: 'circle', svgObj: {}, coords: {} },
        { id: 'info',  tag: 'circle', svgObj: {}, coords: {} },
        { id: 'contact',  tag: 'circle', svgObj: {}, coords: {} },
        { id: 'programs',  tag: 'circle', svgObj: {}, coords: {} },
    ];

    for (var i = 0; i < svgGroup.length; i++) {
        svgGroup[i].svgObj = new SvgCoords(svgGroup[i].id, svgGroup[i].tag);
        svgGroup[i].coords = (svgGroup[i].svgObj).getCircleCoord((svgGroup[i].svgObj).circles);
        (function(i){
            ((svgGroup[i].svgObj).svg).addEventListener('mouseover', function(event){
                lineAnimate(event, svgGroup[i].coords);
            });
            ((svgGroup[i].svgObj).svg).addEventListener('mouseleave', function(event){
                lineAnimate(event, svgGroup[i].coords, (svgGroup[i].svgObj).svg);
            });
        })(i);
    }

    var img = document.getElementById('my-photo');
    img.addEventListener('click', function(event){
        for (var i = 0; i < svgGroup.length; i++) {
            lineAnimate(event, svgGroup[i].coords, (svgGroup[i].svgObj).svg);
        }
    })
})();

+(function(){
    var canvas = document.getElementById('point-canvas');
    function pointApp(){
        console.log('aaa');
        var context = canvas.getContext('2d');
        var cx = 0, cy = 0;
        var width = canvas.width, height = canvas.height, radius = 0;
        for (var i = 0; i < 100; i++) {
            cx = Math.random() * (width - 150) / 2;
            cy = Math.random() * height;
            radius = Math.random() * 2;
            context.fillStyle = 'rgba(255, 255, 255, .8)';
            context.beginPath();
            context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
        for (var i = 0; i < 100; i++) {
            cx = Math.random() * width / 2 + width / 2 + 50;
            cy = Math.random() * height;
            radius = Math.random() * 2;
            context.fillStyle = 'rgba(255, 255, 255, .8)';
            context.beginPath();
            context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
    }
    window.addEventListener('load', function(){
        pointApp();
    });
    window.addEventListener('mousemove', function(event){
        console.log(canvas.width);
        var x = event.clientX;
        var angle;
        if (x < canvas.width / 2) {
            angle = Math.floor((canvas.width / 2 - x) / 30);
        } else {
            angle = Math.floor((x - canvas.width / 2) / 30);
        }
        canvas.style.transform = "rotateY(" + angle + "deg)";
    })
})();