(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{119:function(e,t,i){"use strict";var n=i(120),s=i(121);function a(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(e&&e instanceof Element))throw new Error("Node argument is required");return this.node=e,this.options=Object.assign({},i.options||{}),this.__subBehaviors=[],this.__isEnabled=!1,this.__children=i.children,this.customMethodNames.forEach((function(e){t[e]=t[e].bind(t)})),this}a.prototype=Object.freeze({init:function(){for(var e=new RegExp("^data-"+this.name+"-(.*)","i"),t=0;t<this.node.attributes.length;t++){var i=this.node.attributes[t],n=e.exec(i.nodeName);null!=n&&n.length>=2&&(this.options[n[1]]&&console.warn("Ignoring ".concat(n[1]," option, as it already exists on the ").concat(name," behavior. Please choose another name.")),this.options[n[1]]=i.value)}null!=this.lifecycle.init&&this.lifecycle.init.call(this),null!=this.lifecycle.resized&&(this.__resizedBind=this.__resized.bind(this),window.addEventListener("resized",this.__resizedBind)),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&(this.__mediaQueryUpdatedBind=this.__mediaQueryUpdated.bind(this),window.addEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind)),this.options.media?this.__toggleEnabled():this.enable()},destroy:function(){!0===this.__isEnabled&&this.disable(),null!=this.lifecycle.destroy&&this.lifecycle.destroy.call(this),this.__subBehaviors.forEach((function(e){e.destroy()})),null!=this.lifecycle.resized&&window.removeEventListener("resized",this.__resizedBind),(null!=this.lifecycle.mediaQueryUpdated||this.options.media)&&window.removeEventListener("mediaQueryUpdated",this.__mediaQueryUpdatedBind),Object(s.a)(this)},getChild:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return null==t&&(t=this.node),null!=this.__children&&null!=this.__children[e]?this.__children[e]:t[i?"querySelectorAll":"querySelector"]("[data-"+this.name.toLowerCase()+"-"+e.toLowerCase()+"]")},getChildren:function(e,t){return this.getChild(e,t,!0)},isEnabled:function(){return this.__isEnabled},enable:function(){this.__isEnabled=!0,null!=this.lifecycle.enabled&&this.lifecycle.enabled.call(this)},disable:function(){this.__isEnabled=!1,null!=this.lifecycle.disabled&&this.lifecycle.disabled.call(this)},addSubBehavior:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new e(t,i);return n.behaviorName=this.name,n.init(),this.__subBehaviors.push(n),n},__toggleEnabled:function(){var e=Object(n.a)(this.options.media);e&&!this.__isEnabled?this.enable():!e&&this.__isEnabled&&this.disable()},__mediaQueryUpdated:function(){null!=this.lifecycle.mediaQueryUpdated&&this.lifecycle.mediaQueryUpdated.call(this),this.options.media&&this.__toggleEnabled()},__resized:function(){null!=this.lifecycle.resized&&this.lifecycle.resized.call(this)}});t.a=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];a.apply(this,t)},s=[],o={name:{get:function(){return this.behaviorName}},behaviorName:{value:e,writable:!0},lifecycle:{value:i},customMethodNames:{value:s}},r=Object.keys(t);return r.forEach((function(e){s.push(e),o[e]={value:t[e],writable:!0}})),n.prototype=Object.create(a.prototype,o),n}},120:function(e,t,i){"use strict";var n=i(13);t.a=function(e){if(!e)return console.error("You need to pass a breakpoint name!"),!1;let t=new RegExp("\\+$|\\-$"),i=["xsmall","small","medium","large","xlarge","xxlarge"];window.A17&&window.A17.breakpoints&&(Array.isArray(window.A17.breakpoints)?i=window.A17.breakpoints:console.warn("A17.breakpoints should be an array. Using defaults."));let s=Object(n.a)(),a=i.indexOf(s),o=t.exec(e),r=!!o&&o[0],l=o?e.slice(0,-1):e,d=i.indexOf(l);return d<0?(console.warn("Unrecognized breakpoint. Supported breakpoints are: "+i.join(", ")),!1):"+"===r&&a>=d||"-"===r&&a<=d||!r&&e===s}},121:function(e,t,i){"use strict";t.a=function(e){for(var t in e)e.hasOwnProperty(t)&&delete e[t]}},72:function(e,t,i){"use strict";i.r(t);var n=i(119),s=i(16),a=Object(n.a)("nav",{handleFocus:function(e){var t=e.currentTarget.parentElement;this.openDropdown(t)},handleBlur:function(e){var t=e.currentTarget.parentElement;this.closeDropdown(t)},openDropdown:function(e){var t=this,i=this.hasOpened?0:this.timing;if(this.removeTimer(),e.classList.contains(this.activeKlass))return!1;this.timer=setTimeout((function(){t.$links.forEach((function(e){e.parentElement.classList.contains(t.activeKlass)&&(e.setAttribute("aria-expanded","false"),e.parentElement.classList.remove(t.activeKlass),t.hasOpened=!1)})),document.dispatchEvent(new CustomEvent("usernav:hide")),t.hasOpened=!0,t.htmlEl.classList.add(t.htmlKlass),e.classList.add(t.activeKlass),e.firstElementChild.setAttribute("aria-expanded","true");var i=e.clientWidth-16-16,n=e.offsetLeft+16;Object(s.a)({autoplay:!0,duration:t.timing,targets:t.$status,width:i,translateX:n,easing:"easeInOutSine"})}),i)},forceClose:function(){var e=this.node.querySelector("."+this.activeKlass);e&&this.closeDropdownDOM(e)},enableNav:function(){var e=this;this.$links.forEach((function(t){t.addEventListener("focus",e.handleFocus),t.addEventListener("blur",e.handleBlur),t.parentElement.addEventListener("mouseover",e.handleMouseover),t.parentElement.addEventListener("mouseleave",e.handleMouseout)})),this.active=!0},disableNav:function(){var e=this;this.$links.forEach((function(t){t.removeEventListener("focus",e.handleFocus),t.removeEventListener("blur",e.handleBlur),t.parentElement.removeEventListener("mouseover",e.handleMouseover),t.parentElement.removeEventListener("mouseleave",e.handleMouseout)})),this.active=!1},closeDropdown:function(e){var t=this;this.hasOpened?this.timer=setTimeout((function(){t.closeDropdownDOM(e)}),this.timing/2):this.closeDropdownDOM(e)},closeDropdownDOM:function(e){this.htmlEl.classList.remove(this.htmlKlass),e.classList.remove(this.activeKlass),e.firstElementChild.setAttribute("aria-expanded","false"),this.removeTimer(),this.hasOpened=!1},handleMouseover:function(e){var t=e.currentTarget;this.openDropdown(t)},handleMouseout:function(e){var t=e.currentTarget;this.closeDropdown(t),window.focus(),document.activeElement&&document.activeElement.blur()},removeTimer:function(){clearTimeout(this.timer)},contentUpdated:function(){this.active||this.enableNav()}},{init:function(){var e=this;this.htmlKlass="page-menu-opened",this.activeKlass="s-active",this.$links=this.getChildren("link"),this.$allHref=this.node.querySelectorAll(".g-nav__item a[aria-haspopup]"),this.$status=this.node.nextElementSibling,this.active=!1,this.htmlEl=document.documentElement,this.timer=null,this.timing=250,this.hasOpened=!1,this.$allHref.forEach((function(t){t.addEventListener("click",e.forceClose)})),this.enableNav(),document.addEventListener("nav:hide",this.forceClose,!1),document.addEventListener("content:updated",this.contentUpdated)},destroy:function(){this.active&&this.disableNav(),document.removeEventListener("nav:hide",this.forceClose,!1),document.removeEventListener("content:updated",this.contentUpdated)}});t.default=a}}]);
//# sourceMappingURL=59.2de2746931b5ca360b43.js.map