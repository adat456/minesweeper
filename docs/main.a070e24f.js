parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"uIMb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.widthInput=exports.validationErrMsgs=exports.startCustomizedButton=exports.startClassicButton=exports.secondDisplay=exports.returnButtons=exports.restartButtons=exports.nextLevelButton=exports.minuteDisplay=exports.minesInput=exports.mainMenu=exports.levelInfo=exports.lengthInput=exports.hourDisplay=exports.game=exports.flaggedMinesInfo=exports.endGameDialog=exports.elapsedTime=exports.dialogRestartButton=exports.dialogMessage=exports.customizationForm=exports.board=void 0;var e=exports.mainMenu=document.getElementById("main-menu"),t=exports.game=document.getElementById("game"),o=exports.board=document.getElementById("board"),s=exports.startClassicButton=document.getElementById("start-classic"),n=exports.startCustomizedButton=document.getElementById("start-customized"),r=exports.restartButtons=Array.from(document.getElementsByClassName("restart")),m=exports.dialogRestartButton=document.querySelector("#end-game .restart"),d=exports.returnButtons=Array.from(document.getElementsByClassName("return")),a=exports.nextLevelButton=document.getElementById("next-level"),l=exports.customizationForm=document.querySelector("form"),u=exports.validationErrMsgs=document.getElementById("validation-err-msgs"),p=exports.widthInput=document.getElementById("width"),i=exports.lengthInput=document.getElementById("length"),x=exports.minesInput=document.getElementById("mines"),g=exports.hourDisplay=document.getElementById("hour"),c=exports.minuteDisplay=document.getElementById("minute"),B=exports.secondDisplay=document.getElementById("second"),y=exports.levelInfo=document.getElementById("level"),I=exports.flaggedMinesInfo=document.getElementById("flagged-mines"),E=exports.endGameDialog=document.getElementById("end-game"),v=exports.dialogMessage=document.getElementById("end-game-msg"),f=exports.elapsedTime=document.getElementById("elapsed-time");
},{}],"qpgg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./main");function e(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,i=function(){};return{s:i,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw o}}}}function r(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,s(n.key),n)}}function u(t,e,r){return e&&o(t.prototype,e),r&&o(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(t){var e=c(t,"string");return"symbol"==a(e)?e:e+""}function c(t,e){if("object"!=a(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}var f,l,d,h,y,m,v,b,p,w,g,k,A,S,M=function(t,e,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?a.call(t,r):a?a.value=r:e.set(t,r),r},j=function(t,e,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)},T=function(){return u(function t(e,r,n){i(this,t),f.add(this),l.set(this,0),d.set(this,0),h.set(this,0),y.set(this,!1),m.set(this,[]),v.set(this,0),M(this,l,e,"f"),M(this,d,r,"f"),M(this,h,n,"f")},[{key:"getLength",value:function(){return j(this,d,"f")}},{key:"getWidth",value:function(){return j(this,l,"f")}},{key:"getNumMines",value:function(){return j(this,h,"f")}},{key:"getMineCoords",value:function(){return j(this,m,"f")}},{key:"getFlaggedMines",value:function(){return j(this,v,"f")}},{key:"getHandleMouseDownFunction",value:function(){return j(this,f,"m",S).bind(this)}}])}();l=new WeakMap,d=new WeakMap,h=new WeakMap,y=new WeakMap,m=new WeakMap,v=new WeakMap,f=new WeakSet,b=function(t){return Math.floor(Math.random()*t)},p=function(t,e){for(var r=this,n=[],a=function(){for(var a=-1,o=-1;n.some(function(t){return t[0]==a&&t[1]==o})||-1==a&&-1==o||a==t&&o==e;)a=j(r,f,"m",b).call(r,j(r,d,"f")),o=j(r,f,"m",b).call(r,j(r,l,"f"));n[i]=[a,o]},i=0;i<j(this,h,"f");i++)a();M(this,m,n,"f")},w=function(){var t,r=e(j(this,m,"f"));try{for(r.s();!(t=r.n()).done;){var n=t.value,a=document.querySelector("[data-x = '".concat(n[0],"'][data-y = '").concat(n[1],"']"));a.setAttribute("data-type","mine"),a.innerHTML="B"}}catch(i){r.e(i)}finally{r.f()}},g=function(t,e){for(var r=[],n=t-1;n<=t+1;n++)if(!(n<0||n>j(this,d,"f")-1))for(var a=e-1;a<=e+1;a++)if(!(a<0||a>j(this,l,"f")-1||n==t&&a==e)){var i=document.querySelector("[data-x = '".concat(n,"'][data-y = '").concat(a,"']"));"unchecked"===(null==i?void 0:i.getAttribute("data-status"))&&r.push(i)}return r},k=function(){return Array.from(document.querySelectorAll("[data-type = 'notmine']")).every(function(t){return"checked"===t.getAttribute("data-status")})},A=function r(n,a){var i=document.querySelector("[data-x = '".concat(n,"'][data-y = '").concat(a,"']"));i.setAttribute("data-status","checked");var o,u=j(this,f,"m",g).call(this,n,a),s=0,c=e(u);try{for(c.s();!(o=c.n()).done;){"mine"===o.value.getAttribute("data-type")&&s++}}catch(h){c.e(h)}finally{c.f()}if(s>0)i.innerHTML=String(s),i.setAttribute("data-num-adj-mines",String(s));else for(var l=0;l<u.length;l++){var d=u[l];"unchecked"===d.getAttribute("data-status")&&j(this,f,"m",r).call(this,Number(d.getAttribute("data-x")),Number(d.getAttribute("data-y")))}j(this,f,"m",k).call(this)&&(0,t.setOutcome)("win")},S=function(e,r,n){var a,i;e.preventDefault(),!1===j(this,y,"f")&&(M(this,y,!0,"f"),j(this,f,"m",p).call(this,r,n),j(this,f,"m",w).call(this),(0,t.startTimer)());var o=document.querySelector("[data-x = '".concat(r,"'][data-y = '").concat(n,"']"));if(2===e.button)switch(null==o?void 0:o.getAttribute("data-status")){case"unchecked":o.setAttribute("data-status","flag"),j(this,m,"f").some(function(t){return t[0]===r&&t[1]===n})&&(M(this,v,(a=j(this,v,"f"),++a),"f"),(0,t.updateInfo)());break;case"flag":o.setAttribute("data-status","question"),j(this,m,"f").some(function(t){return t[0]===r&&t[1]===n})&&(M(this,v,(i=j(this,v,"f"),--i),"f"),(0,t.updateInfo)());break;case"question":o.setAttribute("data-status","unchecked")}else if(0===e.button){if("unchecked"!==(null==o?void 0:o.getAttribute("data-status")))return;"mine"===(null==o?void 0:o.getAttribute("data-type"))?(0,t.setOutcome)("lose"):j(this,f,"m",A).call(this,r,n)}};var x=exports.default=T;
},{"./main":"epB2"}],"Mwuz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./elements");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,a(o.key),o)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function a(e){var n=i(e,"string");return"symbol"==t(n)?n:n+""}function i(e,n){if("object"!=t(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,n||"default");if("object"!=t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}var l=exports.default=function(){return r(function e(){n(this,e)},null,[{key:"renderInitialBoard",value:function(t,n,o){for(var r=function(t){var r=document.createElement("div");r.classList.add("row");for(var a=function(e){var n=document.createElement("button");n.setAttribute("data-x",String(t)),n.setAttribute("data-y",String(e)),n.setAttribute("data-status","unchecked"),n.setAttribute("data-type","notmine"),n.addEventListener("mousedown",function(n){return o(n,t,e)}),r.appendChild(n)},i=0;i<n;i++)a(i);e.board.appendChild(r)},a=0;a<t;a++)r(a)}},{key:"renderInfo",value:function(t,n){e.flaggedMinesInfo.textContent="Flagged mines: ".concat(n,"/").concat(t)}},{key:"showAllMines",value:function(){for(var e=0,t=Array.from(document.querySelectorAll("[data-type = 'mine']"));e<t.length;e++){t[e].setAttribute("data-status","bomb-reveal")}}},{key:"clearBoardAndInfo",value:function(){e.board.innerHTML="",e.flaggedMinesInfo.textContent=""}},{key:"renderEndGameDialog",value:function(t,n,o,r){e.dialogMessage.textContent="lose"===n?"You exploded...":!1===r?"You survived!":"You made it through all the levels. Congrats!",e.elapsedTime.textContent="Elapsed time: ".concat(o),r?e.dialogRestartButton.classList.add("hidden"):e.dialogRestartButton.textContent="customized"===t?"Replay":"win"===n?"Next level":"Replay level",e.endGameDialog.showModal()}},{key:"resetEndGameDialog",value:function(){e.dialogMessage.textContent="",e.elapsedTime.textContent="",e.dialogRestartButton.classList.remove("hidden"),e.dialogRestartButton.textContent="",e.endGameDialog.close()}}])}();
},{"./elements":"uIMb"}],"UnlX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./elements");function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,o(n.key),n)}}function i(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function o(t){var r=a(t,"string");return"symbol"==e(r)?r:r+""}function a(t,r){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,r||"default");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}var s,c,f,u,l,h,m,p,y=function(t,e,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)},v=function(t,e,r,n,i){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?i.call(t,r):i?i.value=r:e.set(t,r),r},w=function(){return i(function t(){r(this,t),s.add(this),c.set(this,0),f.set(this,0),u.set(this,0),l.set(this,void 0)},[{key:"start",value:function(){var t=this;this.reset(),v(this,l,setInterval(function(){return y(t,s,"m",h).call(t)},1e3),"f")}},{key:"pause",value:function(){clearInterval(y(this,l,"f"))}},{key:"reset",value:function(){clearInterval(y(this,l,"f")),v(this,c,0,"f"),v(this,f,0,"f"),v(this,u,0,"f"),y(this,s,"m",p).call(this)}},{key:"getTimeString",value:function(){return"".concat(y(this,c,"f")>0?"".concat(Number(y(this,c,"f"))," hour").concat(y(this,c,"f")>1?"s":"",", "):"").concat(y(this,f,"f")>0?"".concat(Number(y(this,f,"f"))," minute").concat(y(this,f,"f")>1?"s":"",", "):"").concat(y(this,u,"f")>0?"".concat(Number(y(this,u,"f"))," second").concat(y(this,u,"f")>1?"s":""):"")}}])}();c=new WeakMap,f=new WeakMap,u=new WeakMap,l=new WeakMap,s=new WeakSet,h=function(){var t,e;60==v(this,u,y(this,u,"f")+1,"f")&&(v(this,u,0,"f"),v(this,f,(t=y(this,f,"f"),++t),"f")),60==y(this,f,"f")&&(v(this,f,0,"f"),v(this,c,(e=y(this,c,"f"),++e),"f")),y(this,s,"m",p).call(this)},m=function(t){return t>=10?String(t):"0".concat(t)},p=function(){t.hourDisplay.textContent=y(this,s,"m",m).call(this,y(this,c,"f")),t.minuteDisplay.textContent=y(this,s,"m",m).call(this,y(this,f,"f")),t.secondDisplay.textContent=y(this,s,"m",m).call(this,y(this,u,"f"))};var b=exports.default=w;
},{"./elements":"uIMb"}],"epB2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setOutcome=I,exports.startTimer=b,exports.updateInfo=E;var e=require("./elements"),t=i(require("./Board")),n=i(require("./BoardUI")),r=i(require("./Timer"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=l(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){u=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(u)throw a}}}}function l(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("contextmenu",function(e){return e.preventDefault()},!1);var u=[{width:10,length:10,mines:10,level:"Easy #1"},{width:9,length:9,mines:9,level:"Easy #2"},{width:8,length:8,mines:10,level:"Easy #3"},{width:16,length:16,mines:40,level:"Intermediate #1"},{width:15,length:15,mines:40,level:"Intermediate #2"},{width:14,length:14,mines:40,level:"Intermediate #3"},{width:16,length:30,mines:99,level:"Expert"}],s=!1,d=null,c="classic",f=0,m=new r.default,h=0,v=0,g=0;function p(e,t,n){var r=[];return(e<=0||e>30)&&r.push("Width must be between 1 and 30 cells."),(t<=0||t>30)&&r.push("Length must be between 1 and 30 cells."),(n<=0||n>=e*t)&&r.push("Number of mines must be greater than 0 and less than the total number of cells."),0===r.length&&(h=e,v=t,g=n),r}function w(){e.validationErrMsgs.innerHTML=""}function y(t){var n,r=a(t);try{for(r.s();!(n=r.n()).done;){var i=n.value,l=document.createElement("p");l.textContent=i,e.validationErrMsgs.appendChild(l)}}catch(o){r.e(o)}finally{r.f()}}function b(){m.start()}function E(){d&&n.default.renderInfo(d.getNumMines(),d.getFlaggedMines())}function I(e){m.pause(),n.default.showAllMines(),"classic"===c&&"win"===e&&f++,"classic"===c&&f>u.length?n.default.renderEndGameDialog(c,e,m.getTimeString(),!0):n.default.renderEndGameDialog(c,e,m.getTimeString(),!1)}function L(){m.reset(),n.default.clearBoardAndInfo(),s?(e.mainMenu.classList.add("hidden"),e.game.classList.remove("hidden"),d&&(n.default.renderInitialBoard(d.getLength(),d.getWidth(),d.getHandleMouseDownFunction()),e.levelInfo.textContent="classic"===c?"Level: ".concat(u[f].level):"",E())):(e.mainMenu.classList.remove("hidden"),e.game.classList.add("hidden"))}e.startClassicButton.addEventListener("click",function(){c="classic";var e=u[f];d=new t.default(e.width,e.length,e.mines),s=!0,L()}),e.startCustomizedButton.addEventListener("click",function(){w();var n=p(Number(e.widthInput.value),Number(e.lengthInput.value),Number(e.minesInput.value));n.length>0?y(n):(c="customized",null===e.customizationForm||void 0===e.customizationForm||e.customizationForm.reset(),d=new t.default(h,v,g),s=!0,L())}),e.restartButtons.forEach(function(n){return n.addEventListener("click",function(){if("classic"===c){var n=u[f];d=new t.default(n.width,n.length,n.mines)}"customized"===c&&(d=new t.default(h,v,g)),e.endGameDialog.close(),L()})}),e.returnButtons.forEach(function(e){return e.addEventListener("click",function(){"classic"===c&&(f=0),n.default.resetEndGameDialog(),s=!1,L()})}),L();
},{"./elements":"uIMb","./Board":"qpgg","./BoardUI":"Mwuz","./Timer":"UnlX"}]},{},["epB2"], null)
//# sourceMappingURL=/main.a070e24f.js.map