var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function c(t){t.parentNode.removeChild(t)}function l(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function s(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function h(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function p(t,n,e,r){null===e?t.style.removeProperty(n):t.style.setProperty(n,e,r?"important":"")}function v(t,n,e){t.classList[e?"add":"remove"](n)}let m;function y(t){m=t}const S=[],b=[],k=[],$=[],w=Promise.resolve();let C=!1;function O(t){k.push(t)}const T=new Set;let _=0;function A(){const t=m;do{for(;_<S.length;){const t=S[_];_++,y(t),j(t.$$)}for(y(null),S.length=0,_=0;b.length;)b.pop()();for(let t=0;t<k.length;t+=1){const n=k[t];T.has(n)||(T.add(n),n())}k.length=0}while(S.length);for(;$.length;)$.pop()();C=!1,T.clear(),y(t)}function j(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}const F=new Set;let R;function P(t,n){t&&t.i&&(F.delete(t),t.i(n))}function x(t,n,e,r){if(t&&t.o){if(F.has(t))return;F.add(t),R.c.push((()=>{F.delete(t),r&&(e&&t.d(1),r())})),t.o(n)}else r&&r()}function E(t){t&&t.c()}function K(t,e,i,u){const{fragment:a,on_mount:c,on_destroy:l,after_update:s}=t.$$;a&&a.m(e,i),u||O((()=>{const e=c.map(n).filter(o);l?l.push(...e):r(e),t.$$.on_mount=[]})),s.forEach(O)}function H(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function M(t,n){-1===t.$$.dirty[0]&&(S.push(t),C||(C=!0,w.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function N(n,o,i,u,a,l,s,f=[-1]){const d=m;y(n);const h=n.$$={fragment:null,ctx:null,props:l,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(d?d.$$.context:[])),callbacks:e(),dirty:f,skip_bound:!1,root:o.target||d.$$.root};s&&s(h.root);let g=!1;if(h.ctx=i?i(n,o.props||{},((t,e,...r)=>{const o=r.length?r[0]:e;return h.ctx&&a(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),g&&M(n,t)),e})):[],h.update(),g=!0,r(h.before_update),h.fragment=!!u&&u(h.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);h.fragment&&h.fragment.l(t),t.forEach(c)}else h.fragment&&h.fragment.c();o.intro&&P(n.$$.fragment),K(n,o.target,o.anchor,o.customElement),A()}y(d)}class V{$destroy(){H(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var L={},U={};!function(t){function n(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function e(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var r,o;Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.CardStringType=t.CardSuits=void 0,t.CardSuits=r,function(t){t[t.Hearts=0]="Hearts",t[t.Spades=1]="Spades",t[t.Diamonds=2]="Diamonds",t[t.Clubs=3]="Clubs"}(r||(t.CardSuits=r={})),t.CardStringType=o,function(t){t.Short="SHORT",t.Long="LONG",t.ShortEmoji="SHORT_EMOJI",t.ShortSuit="SHORT_SUIT",t.LongSuit="LONG_SUIT",t.EmojiSuit="EMOJI_SUIT",t.ShortValue="SHORT_VALUE",t.LongValue="LONG_VALUE"}(o||(t.CardStringType=o={}));var i=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),e(this,"num",void 0),this.num=n}var r,o,i;return r=t,o=[{key:"toString",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.StringType.Long;switch(n){case t.StringType.Short:return this.toString(t.StringType.ShortValue)+this.toString(t.StringType.ShortSuit);case t.StringType.ShortEmoji:return this.toString(t.StringType.ShortValue)+this.toString(t.StringType.EmojiSuit);case t.StringType.Long:return this.toString(t.StringType.LongValue)+" of "+this.toString(t.StringType.LongSuit);case t.StringType.ShortSuit:return t.shortSuits[this.suit];case t.StringType.LongSuit:return t.longSuits[this.suit];case t.StringType.EmojiSuit:return t.emojiSuits[this.suit];case t.StringType.ShortValue:return t.shortValues[13===this.value?0:this.value];case t.StringType.LongValue:return t.longValues[13===this.value?0:this.value]}throw new Error("Unsupported output type")}},{key:"suit",get:function(){return t.getSuit(this.num)}},{key:"value",get:function(){return t.getValue(this.num)}}],i=[{key:"fromJSON",value:function(n){return new t(n.num)}},{key:"getSuit",value:function(t){return Math.floor(t/13)%4}},{key:"getValue",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t%13||n?t%13:13}},{key:"compare",value:function(t,n){return n.value-t.value}}],o&&n(r.prototype,o),i&&n(r,i),t}();e(i,"Suits",r),e(i,"StringType",o),e(i,"emojiSuits",["♥","♠","♦","♣"]),e(i,"shortSuits",["h","s","d","c"]),e(i,"longSuits",["hearts","spades","diamonds","clubs"]),e(i,"shortValues",["A","2","3","4","5","6","7","8","9","T","J","Q","K"]),e(i,"longValues",["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"]);var u=i;t.default=u}(U);var q={},D={};Object.defineProperty(D,"__esModule",{value:!0}),D.uniqueFilter=D.shuffle=D.last=D.isSorted=D.getCombinations=D.arraySubtraction=void 0;D.arraySubtraction=function(t,n){return t.filter((function(t){return!n.includes(t)}))};var I=function t(n,e,r,o,i){if(o.length>=e)i.push(o);else for(var u=r;u<n.length;u++)t(n,e,u+1,o.concat(n[u]),i)};D.getCombinations=function(t,n){var e=[];return I(t,n,0,[],e),e};D.isSorted=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e?-1:1;try{return t.reduce((function(t,e){if(r*n(t,e)<=0)return e;throw new Error})),!0}catch(t){return!1}};D.last=function(t){return t[t.length-1]};D.shuffle=function(t){for(var n=t.length-1;n>0;n--){var e=Math.floor(Math.random()*(n+1)),r=[t[e],t[n]];t[n]=r[0],t[e]=r[1]}return t};D.uniqueFilter=function(t,n,e){return e.indexOf(t)===n},function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,e=(n=U)&&n.__esModule?n:{default:n},r=D;function o(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function u(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var c=function(){function t(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;i(this,t),a(this,"cards",void 0),this.cards=o(Array(52*r).keys()).map((function(t){return new e.default(t)})),n&&this.shuffle()}var n,c,l;return n=t,c=[{key:"shuffle",value:function(){(0,r.shuffle)(this.cards)}},{key:"isShuffled",value:function(){return!(0,r.isSorted)(this.cards,(function(t,n){return t.num-n.num}))}},{key:"pop",value:function(){return this.cards.pop()}},{key:"popN",value:function(t){for(var n,e=[],r=0;r<t&&(n=this.pop());r++)e.push(n);return e}},{key:"cardsRemaining",get:function(){return this.cards.length}}],l=[{key:"fromJSON",value:function(n){var r=n.cards,o=new t(!1,0);return o.cards=r.map((function(t){return e.default.fromJSON(t)})),o}}],c&&u(n.prototype,c),l&&u(n,l),t}(),l=c;t.default=l}(q);var J={},G={};Object.defineProperty(G,"__esModule",{value:!0}),G.uuid4=void 0;var B=function(t){var n;do{n=Math.random().toString(16).slice(2,t+2)}while(n.length<t&&t<=12);return n};function W(t,n,e){const r=t.slice();return r[12]=n[e],r}function Q(t){let n,e,r,o,i,l,p,m,y;return{c(){n=s("div"),e=s("div"),r=f(t[9]),o=d(),i=s("div"),l=f(t[8]),p=f("︎"),m=d(),y=s("div"),h(e,"class","rank"),h(i,"class","suit svelte-cfm94e"),h(n,"aria-hidden","true"),h(n,"class",t[12]+" label svelte-cfm94e"),h(y,"class","center svelte-cfm94e"),v(y,"face",t[6])},m(t,c){a(t,n,c),u(n,e),u(e,r),u(n,o),u(n,i),u(i,l),u(i,p),a(t,m,c),a(t,y,c)},p(t,n){512&n&&g(r,t[9]),256&n&&g(l,t[8]),64&n&&v(y,"face",t[6])},d(t){t&&c(n),t&&c(m),t&&c(y)}}}function z(n){let e,r,o=n[10],i=[];for(let t=0;t<o.length;t+=1)i[t]=Q(W(n,o,t));return{c(){e=s("div");for(let t=0;t<i.length;t+=1)i[t].c();h(e,"class",r="card "+n[7]+" svelte-cfm94e"),v(e,"bridge",n[0]),v(e,"fourColor",n[1]),v(e,"empty",n[5]),v(e,"hidden",n[4]),v(e,"shadow",n[2]),v(e,"visible",n[3])},m(t,n){a(t,e,n);for(let t=0;t<i.length;t+=1)i[t].m(e,null)},p(t,[n]){if(1856&n){let r;for(o=t[10],r=0;r<o.length;r+=1){const u=W(t,o,r);i[r]?i[r].p(u,n):(i[r]=Q(u),i[r].c(),i[r].m(e,null))}for(;r<i.length;r+=1)i[r].d(1);i.length=o.length}128&n&&r!==(r="card "+t[7]+" svelte-cfm94e")&&h(e,"class",r),129&n&&v(e,"bridge",t[0]),130&n&&v(e,"fourColor",t[1]),160&n&&v(e,"empty",t[5]),144&n&&v(e,"hidden",t[4]),132&n&&v(e,"shadow",t[2]),136&n&&v(e,"visible",t[3])},i:t,o:t,d(t){t&&c(e),l(i,t)}}}function X(t,n,e){let r,o,i,u,a,c,l,{bridge:s=!1}=n,{fourColor:f=!1}=n,{card:d=null}=n,{shadow:h=!1}=n;return t.$$set=t=>{"bridge"in t&&e(0,s=t.bridge),"fourColor"in t&&e(1,f=t.fourColor),"card"in t&&e(11,d=t.card),"shadow"in t&&e(2,h=t.shadow)},t.$$.update=()=>{2048&t.$$.dirty&&e(5,r=void 0===d),2052&t.$$.dirty&&e(4,o=null===d&&!h),52&t.$$.dirty&&e(3,i=!(r||o||h)),2056&t.$$.dirty&&e(9,u=i&&d.toString(L.Card.StringType.ShortValue).replace("T","10")),2056&t.$$.dirty&&e(8,a=i&&d.toString(L.Card.StringType.EmojiSuit)),2056&t.$$.dirty&&e(7,c=i&&d.toString(L.Card.StringType.LongSuit)),2056&t.$$.dirty&&e(6,l=i&&d.num%13>9)},[s,f,h,i,o,r,l,c,a,u,["top","bottom"],d]}G.uuid4=function(){var t=[8,4,4,4,12].map(B).join("-").split("");return t[14]="4",t[19]=(Math.floor(64*Math.random())%4+8).toString(16),t.join("")},function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.HandRank=void 0;var n,e,r=(n=U)&&n.__esModule?n:{default:n},o=G,i=D;function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}t.HandRank=e,function(t){t[t.High=0]="High",t[t.Pair=5]="Pair",t[t.TwoPairs=10]="TwoPairs",t[t.ThreeOfAKind=15]="ThreeOfAKind",t[t.Straight=20]="Straight",t[t.Flush=25]="Flush",t[t.FullHouse=30]="FullHouse",t[t.FourOfAKind=35]="FourOfAKind",t[t.StraightFlush=40]="StraightFlush",t[t.FiveOfAKind=45]="FiveOfAKind"}(e||(t.HandRank=e={}));var s=function(){function t(n,e,r){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,"uuid",void 0),l(this,"rank",void 0),l(this,"cards",void 0),this.rank=n,this.cards=e,this.uuid=r||(0,o.uuid4)()}var n,e,s;return n=t,e=[{key:"getCardsString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.default.StringType.Short;return this.cards.map((function(n){return n.toString(t)})).join(", ")}},{key:"toString",value:function(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.default.StringType.Short,o=r.default.StringType.LongValue,i=function(t){return n.cards[t].toString(o)},u=this.getCardsString(e);switch(this.rank){case t.Rank.FiveOfAKind:return"Five of a kind, ".concat(i(0),"s (").concat(u,")");case t.Rank.StraightFlush:return"Straigth flush, ".concat(i(0)," high (").concat(u,")");case t.Rank.FourOfAKind:return"Four of a kind, ".concat(i(0),"s (").concat(u,")");case t.Rank.FullHouse:return"Full house, ".concat(i(0),"s over ").concat(i(3),"s (").concat(u,")");case t.Rank.Flush:return"Flush, ".concat(i(0)," high (").concat(u,")");case t.Rank.Straight:return"Straigth, ".concat(i(0)," high (").concat(u,")");case t.Rank.ThreeOfAKind:return"Three of a kind, ".concat(i(0),"s (").concat(u,")");case t.Rank.TwoPairs:return"Two pairs, ".concat(i(0),"s and ").concat(i(2),"s (").concat(u,")");case t.Rank.Pair:return"Pair, ".concat(i(0),"s (").concat(u,")");case t.Rank.High:return"".concat(i(0).replace(/^\w/,(function(t){return t.toUpperCase()}))," high (").concat(u,")")}throw new Error("Unsupported rank value")}}],s=[{key:"fromJSON",value:function(n){var e=n.rank,o=n.cards,i=n.uuid;return new t(e,o.map(r.default.fromJSON),i)}},{key:"solve",value:function(n){var e,r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return(e=t.isNumOfAKind(5,n))?r=t.Rank.FiveOfAKind:(e=t.isStraightFlush(n,o))?r=t.Rank.StraightFlush:(e=t.isNumOfAKind(4,n))?r=t.Rank.FourOfAKind:(e=t.isFullHouse(n))?r=t.Rank.FullHouse:(e=t.isFlush(n,o))?r=t.Rank.Flush:(e=t.isStraight(n,o))?r=t.Rank.Straight:(e=t.isNumOfAKind(3,n))?r=t.Rank.ThreeOfAKind:(e=t.isTwoPairs(n))?r=t.Rank.TwoPairs:(e=t.isNumOfAKind(2,n))?r=t.Rank.Pair:(e=[],r=t.Rank.High),e=t.fillWithKickers(e,n),new t(r,e)}},{key:"solveHoldEm",value:function(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(0===r)return t.solve([].concat(a(n),a(e)));for(var o=(0,i.getCombinations)(n,n.length-r),u=(0,i.getCombinations)(e,Math.min(e.length,r)),c=[],l=0;l<o.length;l++)for(var s=0;s<u.length;s++)c.push(t.solve([].concat(a(o[l]),a(u[s]))));return t.max.apply(t,c)}},{key:"compare",value:function(t,n){var e;if(t.cards.length!==n.cards.length)throw new Error("Comparing hands with different number of cards");if(0!=(e=n.rank-t.rank))return e;for(var o=0;o<t.cards.length;o++)if(0!==(e=r.default.compare(t.cards[o],n.cards[o])))return e;return 0}},{key:"winners",value:function(){for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];var o=t.max.apply(t,e);return e.filter((function(n){return!t.compare(n,o)}))}},{key:"max",value:function(){for(var n=function(n,e){return t.compare(n,e)<0?n:e},e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return r.reduce((function(t,e){return n(t,e)}))}},{key:"fillWithKickers",value:function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return n=(0,i.arraySubtraction)(n,t).sort(r.default.compare),[].concat(a(t),a(n)).slice(0,e)}},{key:"getUniqueValues",value:function(t){return t.map((function(t){return t.value})).filter(i.uniqueFilter).sort((function(t,n){return n-t}))}},{key:"isNumOfAKind",value:function(n,e){for(var r,o=t.getUniqueValues(e),i=function(t){if((r=e.filter((function(n){return n.value==o[t]}))).length>=n)return{v:r}},a=0;a<o.length;a++){var c=i(a);if("object"===u(c))return c.v}return!1}},{key:"isNumOfAKindCombination",value:function(n,e){for(var r=[],o=0;o<n.length;o++){var u=t.isNumOfAKind(n[o],(0,i.arraySubtraction)(e,r));if(!1===u)return!1;r.push.apply(r,a(u))}return r}},{key:"isStraightFlush",value:function(n){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,r=[],o=function(o){if((r=n.filter((function(t){return t.suit===o}))).length<e)return"continue";var i=t.isStraight(r,e);return i?{v:i}:void 0},i=0;i<4;i++){var a=o(i);if("continue"!==a&&"object"===u(a))return a.v}return!1}},{key:"isFullHouse",value:function(n){return t.isNumOfAKindCombination([3,2],n)}},{key:"isFlush",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,e=function(e){var o=t.filter((function(t){return t.suit==e}));if(o.length>=n)return{v:o.sort(r.default.compare).slice(0,n)}},o=0;o<4;o++){var i=e(o);if("object"===u(i))return i.v}return!1}},{key:"isStraight",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,r=t.getUniqueValues(n);if(r.length<e)return!1;r.includes(13)&&r.push(0);for(var o=[r[0]],u=1;u<r.length&&o.length<e;u++)(0,i.last)(o)-r[u]==1?o.push(r[u]):o=[r[u]];return o.length==e&&o.map((function(t){return n.find((function(n){return n.value===(t||13)}))}))}},{key:"isTwoPairs",value:function(n){return t.isNumOfAKindCombination([2,2],n)}}],e&&c(n.prototype,e),s&&c(n,s),t}();l(s,"Rank",e);var f=s;t.default=f}(J),function(t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Card",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"Deck",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(t,"Hand",{enumerable:!0,get:function(){return r.default}});var n=o(U),e=o(q),r=o(J);function o(t){return t&&t.__esModule?t:{default:t}}}(L);class Y extends V{constructor(t){super(),N(this,t,X,z,i,{bridge:0,fourColor:1,card:11,shadow:2})}}function Z(t,n,e){const r=t.slice();return r[9]=n[e],r[11]=e,r}function tt(t){let n,e,r,o;return e=new Y({props:{shadow:!0}}),{c(){n=s("div"),E(e.$$.fragment),r=d(),h(n,"class","shadow-container svelte-1iypqrv"),p(n,"transform",t[7](t[11]/t[4]*t[1]))},m(t,i){a(t,n,i),K(e,n,null),u(n,r),o=!0},p(t,e){(!o||18&e)&&p(n,"transform",t[7](t[11]/t[4]*t[1]))},i(t){o||(P(e.$$.fragment,t),o=!0)},o(t){x(e.$$.fragment,t),o=!1},d(t){t&&c(n),H(e)}}}function nt(t){let n,e,i,f,g,p;e=new Y({props:{card:t[2],bridge:t[0],fourColor:t[3]}});let v=t[6],m=[];for(let n=0;n<v.length;n+=1)m[n]=tt(Z(t,v,n));const y=t=>x(m[t],1,1,(()=>{m[t]=null}));return{c(){n=s("div"),E(e.$$.fragment),i=d();for(let t=0;t<m.length;t+=1)m[t].c();h(n,"class","deck svelte-1iypqrv")},m(r,c){a(r,n,c),K(e,n,null),u(n,i);for(let t=0;t<m.length;t+=1)m[t].m(n,null);var l,s,d,h;f=!0,g||(s="click",d=function(){o(t[5])&&t[5].apply(this,arguments)},(l=n).addEventListener(s,d,h),p=()=>l.removeEventListener(s,d,h),g=!0)},p(o,[i]){t=o;const u={};if(4&i&&(u.card=t[2]),1&i&&(u.bridge=t[0]),8&i&&(u.fourColor=t[3]),e.$set(u),210&i){let e;for(v=t[6],e=0;e<v.length;e+=1){const r=Z(t,v,e);m[e]?(m[e].p(r,i),P(m[e],1)):(m[e]=tt(r),m[e].c(),P(m[e],1),m[e].m(n,null))}for(R={r:0,c:[],p:R},e=v.length;e<m.length;e+=1)y(e);R.r||r(R.c),R=R.p}},i(t){if(!f){P(e.$$.fragment,t);for(let t=0;t<v.length;t+=1)P(m[t]);f=!0}},o(t){x(e.$$.fragment,t),m=m.filter(Boolean);for(let t=0;t<m.length;t+=1)x(m[t]);f=!1},d(t){t&&c(n),H(e),l(m,t),g=!1,p()}}}function et(t,n,e){let r,{bridge:o=!1}=n,{numCards:i=52}=n,{numDecks:u=1}=n,{topCard:a=null}=n,{fourColor:c=!1}=n,{numShadows:l=10}=n,{onClick:s=(()=>{})}=n;return t.$$set=t=>{"bridge"in t&&e(0,o=t.bridge),"numCards"in t&&e(1,i=t.numCards),"numDecks"in t&&e(8,u=t.numDecks),"topCard"in t&&e(2,a=t.topCard),"fourColor"in t&&e(3,c=t.fourColor),"numShadows"in t&&e(4,l=t.numShadows),"onClick"in t&&e(5,s=t.onClick)},t.$$.update=()=>{20&t.$$.dirty&&e(6,r=void 0===a?[]:Array(l).fill("shadow"))},[o,i,a,c,l,s,r,function(t){return"translate("+.5*t/(52*u)+"em , "+1*t/(52*u)+"em)"},u]}class rt extends V{constructor(t){super(),N(this,t,et,nt,i,{bridge:0,numCards:1,numDecks:8,topCard:2,fourColor:3,numShadows:4,onClick:5})}}function ot(n){let e,r,o,i=(n[1]||n[0])&&function(n){let e;return{c(){e=s("span"),e.textContent=`Version: ${n[0]}  ${n[1]}`,h(e,"class","svelte-chrix9")},m(t,n){a(t,e,n)},p:t,d(t){t&&c(e)}}}(n);return{c(){e=s("footer"),r=s("a"),r.textContent="Source code",o=d(),i&&i.c(),h(r,"href","https://github.com/kangasta/pakka.git"),h(r,"target","_blank"),h(r,"class","svelte-chrix9"),h(e,"class","svelte-chrix9")},m(t,n){a(t,e,n),u(e,r),u(e,o),i&&i.m(e,null)},p(t,[n]){(t[1]||t[0])&&i.p(t,n)},i:t,o:t,d(t){t&&c(e),i&&i.d()}}}function it(t){const n=t=>{var n;try{const e=null!==(n=process.env[t])&&void 0!==n?n:"";return String(e)}catch(t){return""}};return[n("TAG"),n("COMMIT").slice(0,8)]}class ut extends V{constructor(t){super(),N(this,t,it,ot,i,{})}}function at(t){let n,e,r,o,i;return e=new rt({props:{onClick:t[2],topCard:t[1],numCards:t[0],fourColor:!1}}),o=new ut({}),{c(){n=s("main"),E(e.$$.fragment),r=d(),E(o.$$.fragment),h(n,"class","svelte-1tag1lj")},m(t,u){a(t,n,u),K(e,n,null),a(t,r,u),K(o,t,u),i=!0},p(t,[n]){const r={};2&n&&(r.topCard=t[1]),1&n&&(r.numCards=t[0]),e.$set(r)},i(t){i||(P(e.$$.fragment,t),P(o.$$.fragment,t),i=!0)},o(t){x(e.$$.fragment,t),x(o.$$.fragment,t),i=!1},d(t){t&&c(n),H(e),t&&c(r),H(o,t)}}}function ct(t,n,e){let r=new L.Deck,o=r.cardsRemaining,i=null;return[o,i,function(){void 0!==i?e(1,i=r.pop()):(r=new L.Deck,e(1,i=null)),e(0,o=r.cardsRemaining)}]}return new class extends V{constructor(t){super(),N(this,t,ct,at,i,{})}}({target:document.body,props:{}})}();
