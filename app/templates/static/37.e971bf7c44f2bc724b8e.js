(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{119:function(e,t,i){"use strict";var n=i(120),s=i(121);function a(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(e&&e instanceof Element))throw new Error("Node argument is required");return this.node=e,this.options=Object.assign({},i.options||{}),this.__subBehaviors=[],this.__isEnabled=!1,this.__children=i.children,this.customMethodNames.forEach((function(e){t[e]=t[e].bind(t)})),this}a.prototype=Object.freeze({init:function(){for(var e=new RegExp("^data-"+this.name+"-(.*)","i"),t=0;t<this.node.attributes.length;t++){var i=this.node.attributes[t],n=e.exec(i.nodeName);null!=n&&n.length>=2&&(this.options[n[1]]&&console.warn("Ignoring ".concat(n[1]," option, as it already exists on the ").concat(name," behavior. Please choose another name.")),this.options[n[1]]=i.value)}null!=this.lifecycle.init&&this.lifecycle.init.call(this),null!=this.lifecycle.resized&&(this.__resizedBind=this.__resized.bind(this),window.addEventListener("resized",this.__resizedBind)),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&(this.__mediaQueryUpdatedBind=this.__mediaQueryUpdated.bind(this),window.addEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind)),this.options.media?this.__toggleEnabled():this.enable()},destroy:function(){!0===this.__isEnabled&&this.disable(),null!=this.lifecycle.destroy&&this.lifecycle.destroy.call(this),this.__subBehaviors.forEach((function(e){e.destroy()})),null!=this.lifecycle.resized&&window.removeEventListener("resized",this.__resizedBind),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&window.removeEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind),Object(s.a)(this)},getChild:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return null==t&&(t=this.node),null!=this.__children&&null!=this.__children[e]?this.__children[e]:t[i?"querySelectorAll":"querySelector"]("[data-"+this.name.toLowerCase()+"-"+e.toLowerCase()+"]")},getChildren:function(e,t){return this.getChild(e,t,!0)},isEnabled:function(){return this.__isEnabled},enable:function(){this.__isEnabled=!0,null!=this.lifecycle.enabled&&this.lifecycle.enabled.call(this)},disable:function(){this.__isEnabled=!1,null!=this.lifecycle.disabled&&this.lifecycle.disabled.call(this)},addSubBehavior:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new e(t,i);return n.behaviorName=this.name,n.init(),this.__subBehaviors.push(n),n},__toggleEnabled:function(){var e=Object(n.a)(this.options.media);e&&!this.__isEnabled?this.enable():!e&&this.__isEnabled&&this.disable()},__mediaQueryUpdated:function(){null!=this.lifecycle.mediaQueryUpdated&&this.lifecycle.mediaQueryUpdated.call(this),this.options.media&&this.__toggleEnabled()},__resized:function(){null!=this.lifecycle.resized&&this.lifecycle.resized.call(this)}});t.a=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];a.apply(this,t)},s=[],r={name:{get:function(){return this.behaviorName}},behaviorName:{value:e,writable:!0},lifecycle:{value:i},customMethodNames:{value:s}},o=Object.keys(t);return o.forEach((function(e){s.push(e),r[e]={value:t[e],writable:!0}})),n.prototype=Object.create(a.prototype,r),n}},120:function(e,t,i){"use strict";var n=i(13);t.a=function(e){if(!e)return console.error("You need to pass a breakpoint name!"),!1;let t=new RegExp("\\+$|\\-$"),i=["xsmall","small","medium","large","xlarge","xxlarge"];window.A17&&window.A17.breakpoints&&(Array.isArray(window.A17.breakpoints)?i=window.A17.breakpoints:console.warn("A17.breakpoints should be an array. Using defaults."));let s=Object(n.a)(),a=i.indexOf(s),r=t.exec(e),o=!!r&&r[0],l=r?e.slice(0,-1):e,d=i.indexOf(l);return d<0?(console.warn("Unrecognized breakpoint. Supported breakpoints are: "+i.join(", ")),!1):"+"===o&&a>=d||"-"===o&&a<=d||!o&&e===s}},121:function(e,t,i){"use strict";t.a=function(e){for(var t in e)e.hasOwnProperty(t)&&delete e[t]}},123:function(e,t,i){"use strict";function n(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return r}));var a=function(e,t,i,n){window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:e,eventCategory:t,eventAction:i,eventLabel:n})},r=function(e,t){window.dataLayer=window.dataLayer||[],window.dataLayer.push(function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(Object(i),!0).forEach((function(t){s(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({event:e},t))}},96:function(e,t,i){"use strict";i.r(t);var n=i(119),s=i(123),a=Object(n.a)("track",{handleClick:function(){this.options.data?Object(s.b)(this.options.event,JSON.parse(this.options.data)):Object(s.a)(this.options.event,this.options.eventcategory,this.options.eventaction,this.options.eventlabel)}},{init:function(){this.options.automatic?this.handleClick():this.node.addEventListener("click",this.handleClick)},destroy:function(){this.node.removeEventListener("click",this.handleClick)}});t.default=a}}]);
//# sourceMappingURL=37.e971bf7c44f2bc724b8e.js.map