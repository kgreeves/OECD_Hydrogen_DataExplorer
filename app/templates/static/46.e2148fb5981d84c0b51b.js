(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{119:function(e,t,i){"use strict";var n=i(120),o=i(121);function s(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(e&&e instanceof Element))throw new Error("Node argument is required");return this.node=e,this.options=Object.assign({},i.options||{}),this.__subBehaviors=[],this.__isEnabled=!1,this.__children=i.children,this.customMethodNames.forEach((function(e){t[e]=t[e].bind(t)})),this}s.prototype=Object.freeze({init:function(){for(var e=new RegExp("^data-"+this.name+"-(.*)","i"),t=0;t<this.node.attributes.length;t++){var i=this.node.attributes[t],n=e.exec(i.nodeName);null!=n&&n.length>=2&&(this.options[n[1]]&&console.warn("Ignoring ".concat(n[1]," option, as it already exists on the ").concat(name," behavior. Please choose another name.")),this.options[n[1]]=i.value)}null!=this.lifecycle.init&&this.lifecycle.init.call(this),null!=this.lifecycle.resized&&(this.__resizedBind=this.__resized.bind(this),window.addEventListener("resized",this.__resizedBind)),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&(this.__mediaQueryUpdatedBind=this.__mediaQueryUpdated.bind(this),window.addEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind)),this.options.media?this.__toggleEnabled():this.enable()},destroy:function(){!0===this.__isEnabled&&this.disable(),null!=this.lifecycle.destroy&&this.lifecycle.destroy.call(this),this.__subBehaviors.forEach((function(e){e.destroy()})),null!=this.lifecycle.resized&&window.removeEventListener("resized",this.__resizedBind),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&window.removeEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind),Object(o.a)(this)},getChild:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return null==t&&(t=this.node),null!=this.__children&&null!=this.__children[e]?this.__children[e]:t[i?"querySelectorAll":"querySelector"]("[data-"+this.name.toLowerCase()+"-"+e.toLowerCase()+"]")},getChildren:function(e,t){return this.getChild(e,t,!0)},isEnabled:function(){return this.__isEnabled},enable:function(){this.__isEnabled=!0,null!=this.lifecycle.enabled&&this.lifecycle.enabled.call(this)},disable:function(){this.__isEnabled=!1,null!=this.lifecycle.disabled&&this.lifecycle.disabled.call(this)},addSubBehavior:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new e(t,i);return n.behaviorName=this.name,n.init(),this.__subBehaviors.push(n),n},__toggleEnabled:function(){var e=Object(n.a)(this.options.media);e&&!this.__isEnabled?this.enable():!e&&this.__isEnabled&&this.disable()},__mediaQueryUpdated:function(){null!=this.lifecycle.mediaQueryUpdated&&this.lifecycle.mediaQueryUpdated.call(this),this.options.media&&this.__toggleEnabled()},__resized:function(){null!=this.lifecycle.resized&&this.lifecycle.resized.call(this)}});t.a=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];s.apply(this,t)},o=[],a={name:{get:function(){return this.behaviorName}},behaviorName:{value:e,writable:!0},lifecycle:{value:i},customMethodNames:{value:o}},l=Object.keys(t);return l.forEach((function(e){o.push(e),a[e]={value:t[e],writable:!0}})),n.prototype=Object.create(s.prototype,a),n}},120:function(e,t,i){"use strict";var n=i(13);t.a=function(e){if(!e)return console.error("You need to pass a breakpoint name!"),!1;let t=new RegExp("\\+$|\\-$"),i=["xsmall","small","medium","large","xlarge","xxlarge"];window.A17&&window.A17.breakpoints&&(Array.isArray(window.A17.breakpoints)?i=window.A17.breakpoints:console.warn("A17.breakpoints should be an array. Using defaults."));let o=Object(n.a)(),s=i.indexOf(o),a=t.exec(e),l=!!a&&a[0],r=a?e.slice(0,-1):e,d=i.indexOf(r);return d<0?(console.warn("Unrecognized breakpoint. Supported breakpoints are: "+i.join(", ")),!1):"+"===l&&s>=d||"-"===l&&s<=d||!l&&e===o}},121:function(e,t,i){"use strict";t.a=function(e){for(var t in e)e.hasOwnProperty(t)&&delete e[t]}},55:function(e,t,i){"use strict";i.r(t);var n=i(119),o=Object(n.a)("copy",{success:function(){var e=this;this.ready=!1,this.node.textContent=this.options.success,setTimeout((function(){e.ready=!0,e.node.textContent=e.options.default}),2500)},copyTextToClipboard:function(e){var t=this;if(!this.ready)return!1;if(navigator.clipboard&&"Promise"in window&&"https:"==window.location.protocol)navigator.clipboard.writeText(e).then((function(){t.success()}),(function(e){console.error("Could not copy text: ",e)}));else{var i=document.createElement("textarea");i.style.position="fixed",i.style.top=0,i.style.left=0,i.style.width="2em",i.style.height="2em",i.style.padding=0,i.style.border="none",i.style.outline="none",i.style.boxShadow="none",i.style.background="transparent",i.textContent=e,document.body.appendChild(i);var n=document.getSelection(),o=document.createRange();o.selectNode(i),n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")?this.success():console.log("Could not copy text")}catch(e){console.log("Could not copy text")}document.body.removeChild(i)}},handleClick:function(e){e.preventDefault(),e.stopPropagation(),this.copyTextToClipboard(this.node.previousElementSibling.textContent)}},{init:function(){this.ready=!0,this.node.addEventListener("click",this.handleClick)},destroy:function(){this.node.removeEventListener("click",this.handleClick)}});t.default=o}}]);
//# sourceMappingURL=46.e2148fb5981d84c0b51b.js.map