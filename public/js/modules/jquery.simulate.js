!function(e){e.fn.extend({simulate:function(t,n){return this.each(function(){var i=e.extend({},e.simulate.defaults,n||{});new e.simulate(this,t,i)})}}),e.simulate=function(e,t,n){this.target=e,this.options=n,/^drag$/.test(t)?this[t].apply(this,[this.target,n]):this.simulateEvent(e,t,n)},e.extend(e.simulate.prototype,{simulateEvent:function(e,t,n){var i=this.createEvent(t,n);return this.dispatchEvent(e,t,i,n),i},createEvent:function(e,t){return/^mouse(over|out|down|up|move)|(dbl)?click$/.test(e)?this.mouseEvent(e,t):/^key(up|down|press)$/.test(e)?this.keyboardEvent(e,t):void 0},mouseEvent:function(t,n){var i,o=e.extend({bubbles:!0,cancelable:"mousemove"!=t,view:window,detail:0,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:void 0},n);e(o.relatedTarget)[0];return e.isFunction(document.createEvent)?(i=document.createEvent("MouseEvents")).initMouseEvent(t,o.bubbles,o.cancelable,o.view,o.detail,o.screenX,o.screenY,o.clientX,o.clientY,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.button,o.relatedTarget||document.body.parentNode):document.createEventObject&&(i=document.createEventObject(),e.extend(i,o),i.button={0:1,1:4,2:2}[i.button]||i.button),i},keyboardEvent:function(t,n){var i,o=e.extend({bubbles:!0,cancelable:!0,view:window,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:0,charCode:0},n);if(e.isFunction(document.createEvent))try{(i=document.createEvent("KeyEvents")).initKeyEvent(t,o.bubbles,o.cancelable,o.view,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.keyCode,o.charCode)}catch(n){(i=document.createEvent("Events")).initEvent(t,o.bubbles,o.cancelable),e.extend(i,{view:o.view,ctrlKey:o.ctrlKey,altKey:o.altKey,shiftKey:o.shiftKey,metaKey:o.metaKey,keyCode:o.keyCode,charCode:o.charCode})}else document.createEventObject&&(i=document.createEventObject(),e.extend(i,o));return(e.browser.msie||e.browser.opera)&&(i.keyCode=o.charCode>0?o.charCode:o.keyCode,i.charCode=void 0),i},dispatchEvent:function(e,t,n){return e.dispatchEvent?e.dispatchEvent(n):e.fireEvent&&e.fireEvent("on"+t,n),n},drag:function(e){var t=this.findCenter(this.target),n=this.options,i=Math.floor(t.x),o=Math.floor(t.y),a=n.dx||0,c=n.dy||0,s=this.target,r={clientX:i,clientY:o};this.simulateEvent(s,"mousedown",r),r={clientX:i+1,clientY:o+1},this.simulateEvent(document,"mousemove",r),r={clientX:i+a,clientY:o+c},this.simulateEvent(document,"mousemove",r),this.simulateEvent(document,"mousemove",r),this.simulateEvent(s,"mouseup",r)},findCenter:function(t){var n=(t=e(this.target)).offset();return{x:n.left+t.outerWidth()/2,y:n.top+t.outerHeight()/2}}}),e.extend(e.simulate,{defaults:{speed:"sync"},VK_TAB:9,VK_ENTER:13,VK_ESC:27,VK_PGUP:33,VK_PGDN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40})}(jQuery);