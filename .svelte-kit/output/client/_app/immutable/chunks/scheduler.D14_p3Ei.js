function C(){}function T(t,n){for(const e in n)t[e]=n[e];return t}function Q(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function O(t){return t()}function V(){return Object.create(null)}function P(t){t.forEach(O)}function X(t){return typeof t=="function"}function Y(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Z(t){return Object.keys(t).length===0}function H(t,...n){if(t==null){for(const i of n)i(void 0);return C}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function $(t,n,e){t.$$.on_destroy.push(H(n,e))}function tt(t,n,e,i){if(t){const c=E(t,n,e,i);return t[0](c)}}function E(t,n,e,i){return t[1]&&i?T(e.ctx.slice(),t[1](i(n))):e.ctx}function nt(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const o=[],r=Math.max(n.dirty.length,c.length);for(let l=0;l<r;l+=1)o[l]=n.dirty[l]|c[l];return o}return n.dirty|c}return n.dirty}function et(t,n,e,i,c,o){if(c){const r=E(n,e,i,o);t.p(r,c)}}function it(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function ct(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function rt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function st(t){const n={};for(const e in t)n[e]=!0;return n}function lt(t,n,e){return t.set(e),n}let p=!1;function ot(){p=!0}function ut(){p=!1}function B(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function L(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&s.push(a)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let s=0;s<n.length;s++){const u=n[s].claim_order,a=(c>0&&n[e[c]].claim_order<=u?c+1:B(1,c,S=>n[e[S]].claim_order,u))-1;i[s]=e[a]+1;const w=a+1;e[w]=s,c=Math.max(w,c)}const o=[],r=[];let l=n.length-1;for(let s=e[c]+1;s!=0;s=i[s-1]){for(o.push(n[s-1]);l>=s;l--)r.push(n[l]);l--}for(;l>=0;l--)r.push(n[l]);o.reverse(),r.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<r.length;s++){for(;u<o.length&&r[s].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(r[s],a)}}function M(t,n){if(p){for(L(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function at(t,n,e){p&&!e?M(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ft(t){t.parentNode&&t.parentNode.removeChild(t)}function _t(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function q(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function dt(){return v(" ")}function ht(){return v("")}function mt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function pt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function yt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function N(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}const F=["width","height"];function bt(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set&&F.indexOf(i)===-1?t[i]=n[i]:N(t,i,n[i])}function gt(t,n){for(const e in n)N(t,e,n[e])}function xt(t){return t.dataset.svelteH}function vt(t){return Array.from(t.childNodes)}function I(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,c=!1){I(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(n(l)){const s=e(l);return s===void 0?t.splice(r,1):t[r]=s,c||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(n(l)){const s=e(l);return s===void 0?t.splice(r,1):t[r]=s,c?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function j(t,n,e,i){return A(t,c=>c.nodeName===n,c=>{const o=[];for(let r=0;r<c.attributes.length;r++){const l=c.attributes[r];e[l.name]||o.push(l.name)}o.forEach(r=>c.removeAttribute(r))},()=>i(n))}function wt(t,n,e){return j(t,n,e,q)}function kt(t,n,e){return j(t,n,e,z)}function R(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function Et(t){return R(t," ")}function Nt(t,n){n=""+n,t.data!==n&&(t.data=n)}function At(t,n){t.value=n??""}function jt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function Dt(t,n,e){t.classList.toggle(n,!!e)}function U(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function St(t,n){const e=[];let i=0;for(const c of n.childNodes)if(c.nodeType===8){const o=c.textContent.trim();o===`HEAD_${t}_END`?(i-=1,e.push(c)):o===`HEAD_${t}_START`&&(i+=1,e.push(c))}else i>0&&e.push(c);return e}function Ct(t,n){return new t(n)}let m;function y(t){m=t}function d(){if(!m)throw new Error("Function called outside component initialization");return m}function Tt(t){d().$$.on_mount.push(t)}function Ot(t){d().$$.after_update.push(t)}function Pt(t){d().$$.on_destroy.push(t)}function Ht(){const t=d();return(n,e,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[n];if(c){const o=U(n,e,{cancelable:i});return c.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}function Bt(t,n){return d().$$.context.set(t,n),n}function Lt(t){return d().$$.context.get(t)}function Mt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],k=[];let _=[];const g=[],D=Promise.resolve();let x=!1;function W(){x||(x=!0,D.then(J))}function qt(){return W(),D}function G(t){_.push(t)}function zt(t){g.push(t)}const b=new Set;let f=0;function J(){if(f!==0)return;const t=m;do{try{for(;f<h.length;){const n=h[f];f++,y(n),K(n.$$)}}catch(n){throw h.length=0,f=0,n}for(y(null),h.length=0,f=0;k.length;)k.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];b.has(e)||(b.add(e),e())}_.length=0}while(h.length);for(;g.length;)g.pop()();x=!1,b.clear(),y(t)}function K(t){if(t.fragment!==null){t.update(),P(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(G)}}function Ft(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{Mt as $,J as A,Z as B,G as C,Ft as D,m as E,y as F,O as G,h as H,W as I,ot as J,ut as K,tt as L,St as M,et as N,it as O,nt as P,Q,d as R,T as S,z as T,kt as U,gt as V,rt as W,ct as X,bt as Y,Dt as Z,mt as _,H as a,pt as a0,yt as a1,Lt as a2,Ht as a3,st as a4,At as a5,zt as a6,Bt as a7,lt as a8,_t as a9,Pt as aa,xt as ab,dt as b,wt as c,vt as d,q as e,R as f,ft as g,Et as h,X as i,at as j,M as k,Nt as l,$ as m,C as n,ht as o,Ot as p,Tt as q,P as r,Y as s,v as t,N as u,jt as v,k as w,Ct as x,qt as y,V as z};