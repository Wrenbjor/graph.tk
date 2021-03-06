/*

    Copyright © Anthony 2010
    
    <http://graph.tk/>
    <http://github.com/aantthony/graph.tk/>
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
*/



/*if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());


*/




var f=[];

var graph=(function(){

var iphone=/Mobile/.test(navigator.userAgent);
var canvas,ctx;
var ptd;            //Point Display
var con;
var proto;          //li prototype

var colorss = "#f08,#8f0,#80f,#f08,#880,#088,#808,#0ff,#f80,#f0f,#04f,#0a0,#f00,#07c".split(",");
var colors_in_use = new Array(0);
function col(n) {
    return colorss[n % (colorss.length)];
}


var kinput="span";  //span for mathquill, input for form input
if (window.parent.length||iphone) {
    kinput="input";
}




function getlatexpart(match, submatch)
{
  if(submatch == ",")
    return "";
  if(latexchars[submatch] !== undefined)
    return latexchars[submatch];
  return submatch;
}




function track(event) {
    if (window.pageTracker) {
        setTimeout(function () {
            pageTracker._trackEvent("Graph", event)
        }, 20)
    }
};


function safeeval(z) {
	//use safeeval instead of eval()
    var naughty = "eval,document,window,location,cookie,alert,comfirm,prompt,this,parent,child,xml,xmlhttp,clip,draw,getfunction,get2dfunction,extrafunc,calcnextframe,nextframe,canvas".split(",");
    for (var nau_g = 0; nau_g < naughty.length; nau_g++) {
        if (z.indexOf(naughty[nau_g]) != -1) {
            throw ("Unsafe Code: " + naughty[nau_g])
        }
    }
    return eval(z);
}



var randfuncs = "x^2~f'(x)-1~2e^-x~2x+3~{λ:λ=3}~e^(-λ*x)~(0.5,0.5)~∑[1...∞,sin(nx)/n]~m:H_2SO_4~|x^2-4|+2~1/x~x^-2~x!~lnx~∑[1,infinity,(x^n)/n!]~sinx~e^x:[−2,2]~tan(x)~(x+2)(x-3)^2~diff(0,2,2x)~(x-2)^2~∑[1,∞,sin((2n−1)x)/(2n−1)]~~∏[1,5,(x-n)]~∑[0,5,n]~x^x~gamma(x)~(x!)/(3!-x)~x%3~(x>3)?2x:-3~fact(x)~phi/x~(x>=0)?m_e*G/(r_e+100000x)^2:undefined~g[0]'(2x)~g[0](x)+1~sqrt(x)".split("~");

if(kinput=="span"){
randfuncs = "x^2    f'\\left(x\\right)-1    2e^{-x}    2x+3    \\lambda=3    e^{-\\lambda*x}    \\left(0.5,0.5\\right)    \\sum_{n=1}^{\\infinity}\\frac{\\sin\\left(nx\\right)}n    \\prod_{1}^{4}x-n    m:H_2SO_4    \\left|x^2-4\\right|+2    \\frac1x    x^{-2}    x!    \\ln x    \\sum_{n=1}^{\\infinity}\\frac{x^n}{n}    \\sin x    e^x:\\left[−2,2\\right]    \\tan\\left(x\\right)    \\left(x+2\\right)\\left(x-3\\right)^2    diff\\left(0,2,2x\\right)    \\left(x-2\\right)^2    \\sum_{n=1}^{\\infinity}\\frac{\\sin\\left(\\left(2n−1\\right)x\\right)}{2n−1}    \\prod_{n=1}^5\\left(x-n\\right)    \\sum_{n=0}^5n    x^x    \\Gamma\\left(x\\right)    \\frac{x!}{3!-x}    x%3    \\left(x>3\\right)?2x:-3    \\fact\\left(x\\right)    \\frac\\phi x    \\left(x>=0\\right)?m_e*G/\\left(r_e+100000x\\right)^2:undefined    g\\left[0\\right]'\\left(2x\\right)    g\\left[0\\right]\\left(x\\right)+1    \\sqrt x".split("    "); //four spaces
}

var randfunc_index = 0;

//Not actually random.
function randfunc() {
    return randfuncs[(randfunc_index++) % randfuncs.length];
}









var width, height, draw;

function resize(){

    width=window.innerWidth  || document.body.clientWidth;
    height=window.innerHeight|| document.body.clientHeight || 120;
    
    canvas.width = width;
    canvas.height = height;
    ctx && draw();
}
//Mouse coordinates
var mx = 400;
var my = 300;

//Last mouse coordinates
var lmx=mx;
var lmy=my;

var drag;

var scalex = 1;
var scaley = scalex; //this always holds
var panx = 0;
var pany = 0;


//Visible region on screen
var boundleft = -10;
var boundright = 10;
var boundtop = 10;
var boundbottom = -10;


//Location of canvas on screen. While dragging this changes.
var cx = 0;
var cy = 0;


function draw(){
    e = Math.E;//they can be accidentially changed
    pi = Math.PI;
    
    if (!ctx) {
        return;
    }
    ctx.lineCap = "butt";
    
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    
    //try{
    
    ctx.translate(panx,pany);
    ctx.scale(scalex*0.8, scaley*0.8);
    // It is 0.8 deliberately to see the bleed/cutoff.
    
    boundleft = (-panx) / scalex;
    boundright = (width - panx) / scalex;
    boundbottom = -(height - pany) / scaley;
    boundtop = pany / scaley;
    
    
    
    var gridsize = pow(2, 6 - Math.round(log(scalex) / log(2)));
    var overleft = gridsize * ~~ (boundleft / gridsize) - gridsize;
    var overright = gridsize * ~~ (boundright / gridsize) + gridsize;
    var overtop = gridsize * ~~ (boundtop / gridsize) + gridsize;
    var overbottom = gridsize * ~~ (boundbottom / gridsize) - gridsize;
    
    //Draw grid lines
    
    ctx.lineWidth=2/scalex;
    ctx.beginPath();
    ctx.move(overleft,0);
    ctx.line(overright,0);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.move(0,overbottom);
    ctx.line(0,overtop);
    ctx.stroke();
    
    
    ctx.strokeStyle = "#888";
    
    ctx.lineWidth = 0.1 / scalex;
    for (var x = overleft; x <= overright; x += gridsize / 4) {
        ctx.beginPath();
        ctx.move(x, overbottom);
        ctx.line(x, overtop);
        ctx.stroke();
    }
    for (var y = overbottom; y <= overtop; y += gridsize / 4) {
        ctx.beginPath();
        ctx.move(overleft, y);
        ctx.line(overright, y);
        ctx.stroke();
    }



    ctx.lineWidth = 0.4 / scalex;
    
    for (var x = overleft; x <= overright; x += gridsize) {
        ctx.beginPath();
        ctx.move(x, overbottom);
        ctx.line(x, overtop);
        ctx.stroke();
    }
    
    for (var y = overbottom; y <= overtop; y += gridsize) {
        ctx.beginPath();
        ctx.move(overleft, y);
        ctx.line(overright, y);
        ctx.stroke();
    }
    
    ctx.beginPath();
        ctx.move(0,0);
        ctx.line(100,100);
        ctx.stroke();

    
    //}catch(ex){}
    
    ctx.restore();


}











function newfunc(funcval) {
    var newone = proto.cloneNode(true);
    var inputbox=document.createElement(kinput);
    var inputbox_container=newone.getElementsByClassName("matheditor")[0];
    inputbox_container.appendChild(inputbox);
    
    
    if(kinput=="span"){
        inputbox.appendChild(document.createTextNode(funcval || randfunc()));
        $(inputbox).mathquill('editable');
    }else {
        inputbox.value=funcval || randfunc();
        inputbox.onkeydown=inputbox.onkeyup=function(){this.onchange()};
        
    }
    g.push(function (x) {
        return 0;
    });
    var currentnodeslength = flist.childNodes.length;
    inputbox.onchange = function(){getf(undefined,currentnodeslength);};
    //getf(inputbox, flist.childNodes.length, true);
    if (newone.getElementsByClassName) {
        var bs = newone.getElementsByClassName("b");
        colors_in_use.push(colorss.pop());
        if (bs.length > 0) {
            bs[0].style.background = colors_in_use[flist.childNodes.length];
        }
    }
    flist.appendChild(newone);
    if(kinput=="span"){
        $(inputbox).mathquill("redraw");
        if(!funcval){
            $(inputbox).trigger({ type: "keydown", ctrlKey: true, which: 65 });
        }
    }else{
        inputbox.onchange();
    }
    if (loaded) {
        
        inputbox.focus();
        //inputbox.select();
        save();
        draw();
    }
}

function delfunc() {
    if (flist.childNodes.length > 1) {
        g.pop();
        flist.removeChild(flist.lastChild);
        flist.lastChild.getElementsByClassName("matheditor")[0].getElementsByTagName(kinput)[0].focus();
        save();
    }
}

function delfunc(delete_button_node){
    this_node=delete_button_node.parentNode;
    index=0;

    other_node=flist.firstChild;
    while(other_node!=null){
        if(other_node==this_node){
            break;
            index++;
        }
        other_node=other_node.nextSibling;
    }
    
    g.splice(index,1);

    colorss.push(colors_in_use.splice(index,1)[0]);
    
    flist.removeChild(this_node);
    save();
};



var drawwhiledrag_c=0;
function mousedown(e) {
    lmx=mx=e.x || e.pageX;
    lmy=my=e.y || e.pageY;
    drag = true;
    canvas.style.cursor = "url(grabbing.gif), grabbing";
    if (!iphone && !drawwhiledrag_c) {
        setTimeout(drawwhiledrag, 1000);
        drawwhiledrag_c++;
    }
};

function mousemove(e) {
    e = e || window.event;
    if (e.x !== undefined) {
        mx = e.x;
        my = e.y;
    } else {
        mx = e.pageX;
        my = e.pageY;
    }
    if(drag){
        cx += mx - lmx;
        cy += my - lmy;
        canvas.style.left = cx + "px";
        canvas.style.top = cy + "px";
    }
    lmx = mx;
    lmy = my;
};
var scaleconst = 0.001;
if (/AppleWebKit\/[\d]+\.[\d]+\+/.test(navigator.userAgent)) {
    scaleconst = 0.01;
}
if (/Firefox/.test(navigator.userAgent)) {
    scaleconst = 0.01;
}
if (/Opera/.test(navigator.userAgent)) {
    scaleconst = 0.03
}
if (!/Mac OS X/.test(navigator.userAgent)) {
    scaleconst = 0.1
}

function mousewheel(e){


    //scale = exp( log(scale) +delta   )    (base 2);
    //      = scale * 2^delta
    scalex*=Math.pow(2,e.wheelDeltaX*scaleconst);
    scaley*=Math.pow(2,e.wheelDeltaY*scaleconst);
    draw();

}
function perform_translation(){
    panx+=cx;
    pany+=cy;
    cx=cy=0;
    canvas.style.left = cx + "px";
    canvas.style.top = cy + "px";
}

function drawwhiledrag() {
    if (drag) {
        perform_translation();
        draw();
        setTimeout(drawwhiledrag, 1000);
    }else{
        drawwhiledrag_c--;
    }
}










function lame_browser(){
    alert("Lame browser!");
}
var graph={
    "version":"GIT_VERSION",
    "add":function(latex){
        track('New');
    },
    "showcon":function(){
        con.style.display=con.style.display=="block" ? "none":"block";
    },
    "delete":function(delete_button_none){
        delfunc(delete_button_none);
    },
    "screenshot":function(){
        window.location = canvas.toDataURL("image/png");
    },
    "init":function (){
    
    
        var fullscreen=window.parent.length?false:true;
    
        if (window.location.hash != "") {
            //index.html#y=x^2+2
            window.shouldload = false;
            if (window.location.hash[2] == "=") {
                window.jsonfunc = window.location.hash.substring(3);
            }else{
                window.jsondata = unescape(window.location.hash.substring(6));
            }
        }
        (new Image()).src="grabbing.gif";
        canvas=document.createElement("canvas");
        if(fullscreen){
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        
        }
        document.body.appendChild(canvas);
        if(canvas.getContext){
            ctx=canvas.getContext("2d");
        }else{
            //attempt to load explorercanvas...
            
            
            //if it fails
            lame_browser();
        }
        
        canvas.style.background="white";
        canvas.style.cursor = "default";
        canvas.style.position="fixed";
        ptd=document.createElement("div");
        ptd.id="ptd";
        ptd.setAttribute("class","monospace");
        ptd.appendChild(document.createTextNode("(0,0)"));
        document.body.appendChild(ptd);
        con=document.createElement("div");
        con.id="con";
        con.setAttribute("class","overlay");
        con.style.display="none";
        con.innerHTML="<div id=\"logt\" class=\"monospace\"><div>graph.tk v1.2 (<a href=\"https://github.com/aantthony/graph.tk/commit/"+graph.version+"\">"+graph.version+"</a>) &copy; 2010 Anthony<br /><br />License: <a href=\"http://www.gnu.org/licenses/lgpl.html\" title=\"GNU Lesser General Public License\" target=\"_blank\">GNU LGPL</a><br />Source code: <a href=\"http://github.com/aantthony/graph.tk\" target=\"_blank\">graph.tk on GitHub</a><br /><div style=\"font-family:sans-serif;font-size:x-small\">This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.<br /><br>Notes:<br>Sometimes x^n will not be x to the power of n, but x XOR n, which is the normal javascript meaning. I have made modifications that allow some easier equations. A dot after the expression means it was evaluated in a non-javascript-standard way. Use size() to change size.<br></div><br>Some cool things to type:<br> Fe, m:H_2O, g(0), g[1](0), en[26], M[26], symbol[26]</div></div><br><input type=\"text\" id=\"conin\" \">";
        document.body.appendChild(con);
        
        var conin=document.getElementById("conin");
        conin.onkeydown=function(event){
            if(event.which==13){
                alert(conin.value);
            }
            if(event.which==38){
                conin.value=last;
            }
        };
        
        var funcs=document.createElement("div");
        funcs.setAttribute("class","overlay");
        funcs.id="funcs";
        funcs.innerHTML="<ul><li id=\"prototype\"><div class=\"b\" style=\"background:#07c\"></div><span class=\"matheditor\"></span><span class=\"delete\" onmouseup=\"graph.delete(this);\"></span></li></ul><input type=\"button\" value=\"+\" onclick=\"graph.add()\"><a href=\"javascript:void(graph.showcon())\">Console</a><a href=\"javascript:void(tdiff())\">Diff Eq</a><a href=\"javascript:void(graph.screenshot())\">Screenshot</a><small id=\"nosave\"></small><div style=\"float:right\"><a href=\"http://graph.tk/about\" target=\"_blank\"><input type=\"button\" value=\"Info\" /></a>";
        document.body.appendChild(funcs);
        
        proto = document.getElementById("prototype").cloneNode(true);
        proto.removeAttribute("id");
        
        
        window.onresize=resize;
        canvas.onmousedown=mousedown;
        document.body.addEventListener("mouseup",function(){drag=false;perform_translation();canvas.style.cursor = "default";draw()},false);
        document.body.addEventListener("mousemove",mousemove,false);
               window.addEventListener("mousewheel",mousewheel,false);
        
        $("#h3").remove();
        ctx.move=function(px,py,pz){
    if (!isNaN(py)) {
        if (py > boundtop*4) {
            ctx.moveTo(px, -boundtop*4);
            return;
        } else if (py < boundbottom*4) {
            ctx.moveTo(px, -boundbottom*4);
            return;
        }
        ctx.moveTo(px, -py);
    }
    
        };
        ctx.line=function(px,py,pz){
    if (!isNaN(py)) {
        if (py > boundtop *4) {
            ctx.lineTo(px, -boundtop *4);
            return;
        } else if (py < boundbottom *4) {
            ctx.lineTo(px, -boundbottom*4);
            return;
        }
        ctx.lineTo(px, -py);
    }
    
        };
        resize();
    }
};


    return graph;
})();
graph.init();