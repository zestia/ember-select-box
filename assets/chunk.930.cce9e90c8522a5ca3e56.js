/*! For license information please see chunk.930.cce9e90c8522a5ca3e56.js.LICENSE.txt */
"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[930],{151:(e,t,r)=>{r.r(t),r.d(t,{graphFor:()=>H,isBelongsTo:()=>u,peekGraph:()=>U})
var i=r(1603),s=r(1274),n=r(7375)
function o(e){return e._store}function a(e,t,r){return(e[t]=e[t]||Object.create(null))[r]}function c(e,t,r,i){(e[t]=e[t]||Object.create(null))[r]=i}function l(e){if(!e.id)return!0
const t=(0,s.oX)(e)
return Boolean(t?.isNew(e))}function u(e){return"belongsTo"===e.definition.kind}function h(e){return e.definition.isImplicit}function d(e){return"hasMany"===e.definition.kind}function f(e,t){if(u(e))e.remoteState&&t(e.remoteState),e.localState&&e.localState!==e.remoteState&&t(e.localState)
else if(d(e)){for(let r=0;r<e.remoteState.length;r++){const i=e.remoteState[r]
t(i)}e.additions?.forEach(t)}else e.localMembers.forEach(t),e.remoteMembers.forEach((r=>{e.localMembers.has(r)||t(r)}))}function p(e,t,r,i){if(u(t))t.remoteState===r&&(t.remoteState=null),t.localState===r&&(t.localState=null,y(e,t.identifier,t.definition.key))
else if(d(t)){t.remoteMembers.delete(r),t.additions?.delete(r)
const i=t.removals?.delete(r),s=t.remoteState.indexOf(r)
if(-1!==s&&t.remoteState.splice(s,1),!i){const i=t.localState?.indexOf(r);-1!==i&&void 0!==i&&(t.localState.splice(i,1),y(e,t.identifier,t.definition.key))}}else t.remoteMembers.delete(r),t.localMembers.delete(r)}function y(e,t,r){t!==e._removing&&e.store.notifyChange(t,"relationships",r)}function g(e){return"belongsTo"===e.kind||"hasMany"===e.kind}const m=null,_="",b=Date.now()
function v(e,t){return`implicit-${e}:${t}${b}`}function w(e,t){e.inverseKind=t.kind,e.inverseKey=t.key,e.inverseType=t.type,e.inverseIsAsync=t.isAsync,e.inverseIsCollection=t.isCollection,e.inverseIsPolymorphic=t.isPolymorphic,e.inverseIsImplicit=t.isImplicit
const r=!1!==e.resetOnRemoteUpdate&&!1!==t.resetOnRemoteUpdate
e.resetOnRemoteUpdate=r,t.resetOnRemoteUpdate=r}function k(e){var t
g(e)||(e={kind:"resource"===(t=e).kind?"belongsTo":"hasMany",name:t.name,type:t.type,options:Object.assign({},{async:!1,inverse:null,resetOnRemoteUpdate:!1},t.options)})
const r={},i=e.options
return r.kind=e.kind,r.key=e.name,r.type=e.type,r.isAsync=i.async,r.isImplicit=!1,r.isCollection="hasMany"===e.kind,r.isPolymorphic=i&&!!i.polymorphic,r.inverseKey=i&&i.inverse||_,r.inverseType=_,r.inverseIsAsync=m,r.inverseIsImplicit=i&&null===i.inverse||m,r.inverseIsCollection=m,r.resetOnRemoteUpdate=!!g(e)&&!1!==e.options?.resetOnRemoteUpdate,r}function S(e,t,r){r?function(e,t,r){const s=t.value,n=e.get(t.record,t.field)
r&&e._addToTransaction(n),n.state.hasReceivedData=!0
const{definition:o}=n,{type:a}=n.definition,c=T(s,n,(i=>{a!==i.type&&e.registerPolymorphicType(a,i.type),n.additions?.has(i)?n.additions.delete(i):n.isDirty=!0,R(e,i,o.inverseKey,t.record,r)}),(i=>{n.removals?.has(i)?n.removals.delete(i):n.isDirty=!0,A(e,i,o.inverseKey,t.record,r)}))
if(n.remoteMembers=c.finalSet,n.remoteState=c.finalState,c.changed&&(n.isDirty=!0),n._diff=c,"hasMany"===n.definition.kind&&!1!==n.definition.resetOnRemoteUpdate){const s={removals:[],additions:[],triggered:!1}
n.removals&&(n.isDirty=!0,n.removals.forEach((i=>{s.triggered=!0,s.removals.push(i),R(e,i,o.inverseKey,t.record,r)})),n.removals=null),n.additions&&(n.additions.forEach((i=>{l(i)||(s.triggered=!0,s.additions.push(i),n.isDirty=!0,n.additions.delete(i),A(e,i,o.inverseKey,t.record,r))})),0===n.additions.size&&(n.additions=null)),s.triggered&&(0,i.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${n.identifier.type}>.${n.definition.key} hasMany relationship but will not be once this deprecation is resolved by opting into the new behavior:\n\n\tAdded: [${s.additions.map((e=>e.lid)).join(", ")}]\n\tRemoved: [${s.removals.map((e=>e.lid)).join(", ")}]`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"})}n.isDirty&&E(e,n)}(e,t,r):function(e,t,r){const i=t.value,s=e.get(t.record,t.field),n=0===s.remoteState.length&&null===s.localState&&!1===s.state.hasReceivedData
s.state.hasReceivedData=!0
const{additions:o,removals:a}=s,{inverseKey:c,type:l}=s.definition,{record:u}=t,h=s.isDirty
s.isDirty=!1
const d=i=>{const n=a?.has(i)
!n&&o?.has(i)||(l!==i.type&&e.registerPolymorphicType(l,i.type),s.isDirty=!0,R(e,i,c,t.record,r),n&&a.delete(i))},f=t=>{const i=o?.has(t)
!i&&a?.has(t)||(s.isDirty=!0,A(e,t,c,u,r),i&&o.delete(t))},p=T(i,s,d,f)
s.isDirty||p.changed,o&&o.size>0&&o.forEach((e=>{p.add.has(e)||f(e)})),a&&a.size>0&&a.forEach((e=>{p.del.has(e)||d(e)})),s.additions=p.add,s.removals=p.del,s.localState=p.finalState,s.isDirty=h,(n||!h)&&y(e,t.record,t.field)}(e,t,r)}function R(e,t,r,i,s){const n=e.get(t,r),{type:o}=n.definition
o!==i.type&&e.registerPolymorphicType(o,i.type),u(n)?(n.state.hasReceivedData=!0,n.state.isEmpty=!1,s&&(e._addToTransaction(n),null!==n.remoteState&&A(e,n.remoteState,n.definition.inverseKey,t,s),n.remoteState=i),n.localState!==i&&(!s&&n.localState&&A(e,n.localState,n.definition.inverseKey,t,s),n.localState=i,y(e,t,r))):d(n)?s?n.remoteMembers.has(i)||(e._addToTransaction(n),n.remoteState.push(i),n.remoteMembers.add(i),n.additions?.has(i)?n.additions.delete(i):(n.isDirty=!0,n.state.hasReceivedData=!0,E(e,n))):M(e,0,n,i,null)&&y(e,t,r):s?n.remoteMembers.has(i)||(n.remoteMembers.add(i),n.localMembers.add(i)):n.localMembers.has(i)||n.localMembers.add(i)}function A(e,t,r,i,s){const n=e.get(t,r)
u(n)?(n.state.isEmpty=!0,s&&(e._addToTransaction(n),n.remoteState=null),n.localState===i&&(n.localState=null,y(e,t,r))):d(n)?s?(e._addToTransaction(n),function(e,t){const{remoteMembers:r,additions:i,removals:s,remoteState:n}=e
if(!r.has(t))return!1
r.delete(t)
let o=n.indexOf(t)
return n.splice(o,1),s?.has(t)?(s.delete(t),!1):(e.localState&&(o=e.localState.indexOf(t),e.localState.splice(o,1)),!0)}(n,i)&&y(e,t,r)):O(n,i)&&y(e,t,r):s?(n.remoteMembers.delete(i),n.localMembers.delete(i)):i&&n.localMembers.has(i)&&n.localMembers.delete(i)}function E(e,t){e._scheduleLocalSync(t)}function C(e,t,r=!1){const s=e.get(t.record,t.field)
r&&e._addToTransaction(s)
const{definition:n,state:o}=s,a=r?"remoteState":"localState",c=s[a]
if(t.value!==c)if(c&&A(e,c,n.inverseKey,t.record,r),s[a]=t.value,o.hasReceivedData=!0,o.isEmpty=null===t.value,o.isStale=!1,o.hasFailedLoadAttempt=!1,t.value&&(n.type!==t.value.type&&e.registerPolymorphicType(n.type,t.value.type),R(e,t.value,n.inverseKey,t.record,r)),r){const{localState:t,remoteState:r}=s
if(t&&l(t)&&!r)return
t!==r&&t===c?(s.localState=r,y(e,s.identifier,s.definition.key)):t!==r&&t!==c&&!1!==s.definition.resetOnRemoteUpdate&&(s.localState=r,(0,i.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${s.identifier.type}>.${s.definition.key} belongsTo relationship but will not be once this deprecation is resolved:\n\n\t${t?"Added: "+t.lid+"\n\t":""}${c?"Removed: "+c.lid:""}`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"}),y(e,s.identifier,s.definition.key))}else y(e,s.identifier,s.definition.key)
else if(o.hasReceivedData=!0,r){const{localState:o}=s
if(o&&l(o)&&!c)return
c&&o===c?function(e,t,r,i,s){const n=e.get(t,r)
d(n)&&s&&n.remoteMembers.has(i)&&y(e,t,r)}(e,c,n.inverseKey,t.record,r):o!==t.value&&!1!==s.definition.resetOnRemoteUpdate&&(s.localState=c,(0,i.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${s.identifier.type}>.${s.definition.key} belongsTo relationship but will not be once this deprecation is resolved:\n\n\t${o?"Added: "+o.lid+"\n\t":""}${c?"Removed: "+c.lid:""}`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"}),y(e,s.identifier,s.definition.key))}}function T(e,t,r,i){const s=new Set(e),{remoteState:n,remoteMembers:o}=t
if(e.length!==s.size){const{diff:t,duplicates:a}=function(e,t,r,i,s,n){const o=e.length,a=r.length,c=Math.max(o,a)
let l=t.size!==i.size
const u=new Set,h=new Set,d=new Map,f=new Set,p=[]
for(let y=0,g=0;y<c;y++){let c,m=!1
if(y<o)if(c=e[y],f.has(c)){let e=d.get(c)
void 0===e&&(e=[],d.set(c,e)),e.push(y)}else p[g]=c,f.add(c),m=!0,i.has(c)||(l=!0,u.add(c),s(c))
if(y<a){const e=r[y]
c!==r[g]&&(l=!0),t.has(e)||(l=!0,h.add(e),n(e))}else m&&g<a&&c!==r[g]&&(l=!0)
m&&g++}return{diff:{add:u,del:h,finalState:p,finalSet:f,changed:l},duplicates:d}}(e,s,n,o,r,i)
return t}return function(e,t,r,i,s,n){const o=e.length,a=r.length,c=Math.max(o,a),l=o===a
let u=t.size!==i.size
const h=new Set,d=new Set
for(let f=0;f<c;f++){let c
if(f<o&&(c=e[f],i.has(c)||(u=!0,h.add(c),s(c))),f<a){const e=r[f]
l&&c!==e&&(u=!0),t.has(e)||(u=!0,d.add(e),n(e))}}return{add:h,del:d,finalState:e,finalSet:t,changed:u}}(e,s,n,o,r,i)}function M(e,t,r,i,s){const{remoteMembers:n,removals:o}=r
let a=r.additions
if((n.has(i)||a?.has(i))&&!o?.has(i))return!1
if(o?.has(i))o.delete(i)
else{a||(a=r.additions=new Set),r.state.hasReceivedData=!0,a.add(i)
const{type:t}=r.definition
t!==i.type&&e.registerPolymorphicType(i.type,t)}return r.localState&&(null!==s?r.localState.splice(s,0,i):r.localState.push(i)),!0}function O(e,t){const{remoteMembers:r,additions:i}=e
let s=e.removals
if(!r.has(t)&&!i?.has(t)||s?.has(t))return!1
if(i?.has(t)?i.delete(t):(s||(s=e.removals=new Set),s.add(t)),e.localState){const r=e.localState.indexOf(t)
e.localState.splice(r,1)}return!0}function j(e,t,r,i){u(i)?C(e,{op:"replaceRelatedRecord",record:t,field:r,value:i.remoteState},!1):S(e,{op:"replaceRelatedRecords",record:t,field:r,value:i.remoteState.slice()},!1)}function P(e){const t={}
return e.state.hasReceivedData&&(t.data=function(e){if(!e.isDirty)return e.localState
const t=e.remoteState.slice()
return e.removals?.forEach((e=>{const r=t.indexOf(e)
t.splice(r,1)})),e.additions?.forEach((e=>{t.push(e)})),e.localState=t,e.isDirty=!1,t}(e)),e.links&&(t.links=e.links),e.meta&&(t.meta=e.meta),t}function F(e,t,r,i,s,n){M(e,0,t,i,s??null)&&R(e,i,t.definition.inverseKey,r,n)}function D(e,t,r,i,s){O(t,i)&&A(e,i,t.definition.inverseKey,r,s)}function I(e){switch(typeof e){case"object":return e
case"string":return{href:e}}}function q(e,t){for(let r=0;r<e.length;r++)e[r]=t.upgradeIdentifier(e[r])
return e}const x=(0,n.L1)("Graphs",new Map)
class N{constructor(e){this._definitionCache=Object.create(null),this._metaCache=Object.create(null),this._potentialPolymorphicTypes=Object.create(null),this.identifiers=new Map,this.store=e,this.isDestroyed=!1,this._willSyncRemote=!1,this._willSyncLocal=!1,this._pushedUpdates={belongsTo:void 0,hasMany:void 0,deletions:[]},this._updatedRelationships=new Set,this._transaction=null,this._removing=null,this.silenceNotifications=!1}has(e,t){const r=this.identifiers.get(e)
return!!r&&void 0!==r[t]}getDefinition(e,t){let r=this._metaCache[e.type],i=r?.[t]
if(!i){const s=function(e,t,r){const i=e._definitionCache,s=e.store,n=e._potentialPolymorphicTypes,{type:l}=t
let u=a(i,l,r)
if(void 0!==u)return u
const h=s.schema.fields(t).get(r)
if(!h){if(n[l]){const e=Object.keys(n[l])
for(let t=0;t<e.length;t++){const s=a(i,e[t],r)
if(s)return c(i,l,r,s),s.rhs_modelNames.push(l),s}}return i[l][r]=null,null}const d=k(h)
let f,p
const y=d.type
if(null===d.inverseKey?f=null:(p=function(e,t,r){const i=e.schema.fields(t).get(r)
return i?i.options.inverse:null}(o(s),t,r),f=!p&&d.isPolymorphic&&d.inverseKey?{kind:"belongsTo",key:d.inverseKey,type:l,isAsync:!1,isImplicit:!1,isCollection:!1,isPolymorphic:!1}:p?k(s.schema.fields({type:y}).get(p)):null),!f){p=v(l,r),f={kind:"implicit",key:p,type:l,isAsync:!1,isImplicit:!0,isCollection:!0,isPolymorphic:!1},w(d,f),w(f,d)
const e={lhs_key:`${l}:${r}`,lhs_modelNames:[l],lhs_baseModelName:l,lhs_relationshipName:r,lhs_definition:d,lhs_isPolymorphic:d.isPolymorphic,rhs_key:f.key,rhs_modelNames:[y],rhs_baseModelName:y,rhs_relationshipName:f.key,rhs_definition:f,rhs_isPolymorphic:!1,hasInverse:!1,isSelfReferential:l===y,isReflexive:!1}
return c(i,y,p,e),c(i,l,r,e),e}const g=f.type
if(u=a(i,g,r)||a(i,y,p),u)return(u.lhs_baseModelName===g?u.lhs_modelNames:u.rhs_modelNames).push(l),c(i,l,r,u),u
w(d,f),w(f,d)
const m=[l]
l!==g&&m.push(g)
const _=g===y,b={lhs_key:`${g}:${r}`,lhs_modelNames:m,lhs_baseModelName:g,lhs_relationshipName:r,lhs_definition:d,lhs_isPolymorphic:d.isPolymorphic,rhs_key:`${y}:${p}`,rhs_modelNames:[y],rhs_baseModelName:y,rhs_relationshipName:p,rhs_definition:f,rhs_isPolymorphic:f.isPolymorphic,hasInverse:!0,isSelfReferential:_,isReflexive:_&&r===p}
return c(i,g,r,b),c(i,l,r,b),c(i,y,p,b),b}(this,e,t)
i=function(e,t,r){const i=e.isSelfReferential
return 1==(r===e.lhs_relationshipName)&&(!0===i||t===e.lhs_baseModelName||e.rhs_isPolymorphic&&e.lhs_modelNames.includes(t))}(s,e.type,t)?s.lhs_definition:s.rhs_definition,r=this._metaCache[e.type]=r||{},r[t]=i}return i}get(e,t){let r=this.identifiers.get(e)
r||(r=Object.create(null),this.identifiers.set(e,r))
let i=r[t]
if(!i){const s=this.getDefinition(e,t)
i="belongsTo"===s.kind?r[t]=function(e,t){return{definition:e,identifier:t,state:{hasReceivedData:!1,isEmpty:!0,isStale:!1,hasFailedLoadAttempt:!1,shouldForceReload:!1,hasDematerializedInverse:!1},transactionRef:0,localState:null,remoteState:null,meta:null,links:null}}(s,e):"hasMany"===s.kind?r[t]=function(e,t){return{definition:e,identifier:t,state:{hasReceivedData:!1,isEmpty:!0,isStale:!1,hasFailedLoadAttempt:!1,shouldForceReload:!1,hasDematerializedInverse:!1},remoteMembers:new Set,remoteState:[],additions:null,removals:null,meta:null,links:null,localState:null,isDirty:!0,transactionRef:0,_diff:void 0}}(s,e):r[t]=function(e,t){return{definition:e,identifier:t,localMembers:new Set,remoteMembers:new Set}}(s,e)}return i}getData(e,t){const r=this.get(e,t)
return u(r)?function(e){let t
const r={}
return e.localState&&(t=e.localState),null===e.localState&&e.state.hasReceivedData&&(t=null),e.links&&(r.links=e.links),void 0!==t&&(r.data=t),e.meta&&(r.meta=e.meta),r}(r):P(r)}registerPolymorphicType(e,t){const r=this._potentialPolymorphicTypes
let i=r[e]
i||(i=r[e]=Object.create(null)),i[t]=!0
let s=r[t]
s||(s=r[t]=Object.create(null)),s[e]=!0}isReleasable(e){const t=this.identifiers.get(e)
if(!t)return!0
const r=Object.keys(t)
for(let i=0;i<r.length;i++){const s=t[r[i]]
if(void 0!==s&&s.definition.inverseIsAsync&&!l(e))return!1}return!0}unload(e,t){const r=this.identifiers.get(e)
r&&Object.keys(r).forEach((e=>{const i=r[e]
i&&(function(e,t,r){if(h(t))return void(e.isReleasable(t.identifier)&&L(e,t))
const{identifier:i}=t,{inverseKey:s}=t.definition
t.definition.inverseIsImplicit||f(t,(t=>function(e,t,r,i,s){if(!e.has(t,r))return
const n=e.get(t,r)
u(n)&&n.localState&&i!==n.localState||function(e,t,r,i){if(u(t)){const r=t.localState
!t.definition.isAsync||r&&l(r)?(t.localState===r&&null!==r&&(t.localState=null),t.remoteState===r&&null!==r&&(t.remoteState=null,t.state.hasReceivedData=!0,t.state.isEmpty=!0,t.localState&&!l(t.localState)&&(t.localState=null))):t.state.hasDematerializedInverse=!0,i||y(e,t.identifier,t.definition.key)}else!t.definition.isAsync||r&&l(r)?p(e,t,r):t.state.hasDematerializedInverse=!0,i||y(e,t.identifier,t.definition.key)}(e,n,i,s)}(e,t,s,i,r))),t.definition.inverseIsImplicit||t.definition.inverseIsAsync||(t.state.isStale=!0,z(t),t.definition.isAsync||r||y(e,t.identifier,t.definition.key))}(this,i,t),h(i)&&(r[e]=void 0))}))}_isDirty(e,t){const r=this.identifiers.get(e)
if(!r)return!1
const i=r[t]
if(!i)return!1
if(u(i))return i.localState!==i.remoteState
if(d(i)){const e=null!==i.additions&&i.additions.size>0,t=null!==i.removals&&i.removals.size>0
return e||t||B(i)}return!1}getChanged(e){const t=this.identifiers.get(e),r=new Map
if(!t)return r
const i=Object.keys(t)
for(let s=0;s<i.length;s++){const e=i[s],n=t[e]
if(n)if(u(n))n.localState!==n.remoteState&&r.set(e,{kind:"resource",remoteState:n.remoteState,localState:n.localState})
else if(d(n)){const t=null!==n.additions&&n.additions.size>0,i=null!==n.removals&&n.removals.size>0,s=B(n);(t||i||s)&&r.set(e,{kind:"collection",additions:new Set(n.additions)||new Set,removals:new Set(n.removals)||new Set,remoteState:n.remoteState,localState:P(n).data||[],reordered:s})}}return r}hasChanged(e){const t=this.identifiers.get(e)
if(!t)return!1
const r=Object.keys(t)
for(let i=0;i<r.length;i++)if(this._isDirty(e,r[i]))return!0
return!1}rollback(e){const t=this.identifiers.get(e),r=[]
if(!t)return r
const i=Object.keys(t)
for(let s=0;s<i.length;s++){const n=i[s],o=t[n]
o&&this._isDirty(e,n)&&(j(this,e,n,o),r.push(n))}return r}remove(e){this._removing=e,this.unload(e),this.identifiers.delete(e),this._removing=null}push(e){if("deleteRecord"===e.op)this._pushedUpdates.deletions.push(e)
else{const t=this.getDefinition(e.record,e.field)
!function(e,t,r){const i=e[t.kind]=e[t.kind]||new Map
let s=i.get(t.inverseType)
s||(s=new Map,i.set(t.inverseType,s))
let n=s.get(r.field)
n||(n=[],s.set(r.field,n)),n.push(r)}(this._pushedUpdates,t,e)}this._willSyncRemote||(this._willSyncRemote=!0,o(this.store)._schedule("coalesce",(()=>this._flushRemoteQueue())))}update(e,t=!1){switch(e.op){case"mergeIdentifiers":{const t=this.identifiers.get(e.record)
t&&function(e,t,r){Object.keys(r).forEach((i=>{const s=r[i]
s&&function(e,t,r){r.identifier=t.value,f(r,(i=>{const s=e.get(i,r.definition.inverseKey)
!function(e,t,r){u(t)?function(e,t,r){t.remoteState===r.record&&(t.remoteState=r.value),t.localState===r.record&&(t.localState=r.value,y(e,t.identifier,t.definition.key))}(e,t,r):d(t)?function(e,t,r){if(t.remoteMembers.has(r.record)){t.remoteMembers.delete(r.record),t.remoteMembers.add(r.value)
const e=t.remoteState.indexOf(r.record)
t.remoteState.splice(e,1,r.value),t.isDirty=!0}t.additions?.has(r.record)&&(t.additions.delete(r.record),t.additions.add(r.value),t.isDirty=!0),t.removals?.has(r.record)&&(t.removals.delete(r.record),t.removals.add(r.value),t.isDirty=!0),t.isDirty&&y(e,t.identifier,t.definition.key)}(e,t,r):function(e,t,r){t.remoteMembers.has(r.record)&&(t.remoteMembers.delete(r.record),t.remoteMembers.add(r.value)),t.localMembers.has(r.record)&&(t.localMembers.delete(r.record),t.localMembers.add(r.value))}(0,t,r)}(e,s,t)}))}(e,t,s)}))}(this,e,t)
break}case"updateRelationship":(function(e,t){const r=e.get(t.record,t.field),{definition:s,state:n,identifier:o}=r,{isCollection:a}=s,c=t.value
let l=!1,u=!1
if(c.meta&&(r.meta=c.meta),void 0!==c.data)if(l=!0,a){null===c.data&&(c.data=[])
const r=e.store.identifierCache
e.update({op:"replaceRelatedRecords",record:o,field:t.field,value:q(c.data,r)},!0)}else e.update({op:"replaceRelatedRecord",record:o,field:t.field,value:c.data?e.store.identifierCache.upgradeIdentifier(c.data):null},!0)
else!1!==s.isAsync||n.hasReceivedData||(l=!0,a?e.update({op:"replaceRelatedRecords",record:o,field:t.field,value:[]},!0):e.update({op:"replaceRelatedRecord",record:o,field:t.field,value:null},!0))
if(c.links){const e=r.links
if(r.links=c.links,c.links.related){const t=I(c.links.related),r=e&&e.related?I(e.related):null,a=r?r.href:null
t&&t.href&&t.href!==a&&((0,i.warn)(`You pushed a record of type '${o.type}' with a relationship '${s.key}' configured as 'async: false'. You've included a link but no primary data, this may be an error in your payload. EmberData will treat this relationship as known-to-be-empty.`,s.isAsync||n.hasReceivedData,{id:"ds.store.push-link-for-sync-relationship"}),u=!0)}}if(r.state.hasFailedLoadAttempt=!1,l){const e=null===c.data||Array.isArray(c.data)&&0===c.data.length
r.state.hasReceivedData=!0,r.state.isStale=!1,r.state.hasDematerializedInverse=!1,r.state.isEmpty=e}else u&&(a||!r.state.hasReceivedData||(h=r.transactionRef,d=e._transaction,0===h||null===d||h<d)?(r.state.isStale=!0,y(e,r.identifier,r.definition.key)):r.state.isStale=!1)
var h,d})(this,e)
break
case"deleteRecord":{const t=e.record,r=this.identifiers.get(t)
r&&(Object.keys(r).forEach((e=>{const t=r[e]
t&&(r[e]=void 0,L(this,t))})),this.identifiers.delete(t))
break}case"replaceRelatedRecord":C(this,e,t)
break
case"addToRelatedRecords":(function(e,t,r){const{record:i,value:s,index:n}=t,o=e.get(i,t.field)
if(Array.isArray(s))for(let a=0;a<s.length;a++)F(e,o,i,s[a],void 0!==n?n+a:n,r)
else F(e,o,i,s,n,r)
y(e,o.identifier,o.definition.key)})(this,e,t)
break
case"removeFromRelatedRecords":(function(e,t,r){const{record:i,value:s}=t,n=e.get(i,t.field)
if(Array.isArray(s))for(let o=0;o<s.length;o++)D(e,n,i,s[o],r)
else D(e,n,i,s,r)
y(e,n.identifier,n.definition.key)})(this,e,t)
break
case"replaceRelatedRecords":S(this,e,t)}}_scheduleLocalSync(e){this._updatedRelationships.add(e),this._willSyncLocal||(this._willSyncLocal=!0,o(this.store)._schedule("sync",(()=>this._flushLocalQueue())))}_flushRemoteQueue(){if(!this._willSyncRemote)return
let e=(0,n.Yj)("transactionRef")??0
this._transaction=++e,(0,n.dV)("transactionRef",e),this._willSyncRemote=!1
const t=this._pushedUpdates,{deletions:r,hasMany:i,belongsTo:s}=t
t.deletions=[],t.hasMany=void 0,t.belongsTo=void 0
for(let n=0;n<r.length;n++)this.update(r[n],!0)
i&&$(this,i),s&&$(this,s),this._transaction=null}_addToTransaction(e){e.transactionRef=this._transaction}_flushLocalQueue(){if(!this._willSyncLocal)return
if(this.silenceNotifications)return this.silenceNotifications=!1,void(this._updatedRelationships=new Set)
this._willSyncLocal=!1
const e=this._updatedRelationships
this._updatedRelationships=new Set,e.forEach((e=>y(this,e.identifier,e.definition.key)))}destroy(){x.delete(this.store),this.identifiers.clear(),this.store=null,this.isDestroyed=!0}}function $(e,t){t.forEach((t=>{t.forEach((t=>{!function(e,t){for(let r=0;r<t.length;r++)e.update(t[r],!0)}(e,t)}))}))}function z(e){u(e)?(e.localState=null,e.remoteState=null,e.state.hasReceivedData=!1,e.state.isEmpty=!0):(e.remoteMembers.clear(),e.remoteState=[],e.additions=null,e.removals=null,e.localState=null)}function L(e,t){const{identifier:r}=t,{inverseKey:i}=t.definition
f(t,(t=>{e.has(t,i)&&p(e,e.get(t,i),r)})),u(t)?(t.definition.isAsync||z(t),t.localState=null):d(t)?t.definition.isAsync||(z(t),y(e,t.identifier,t.definition.key)):(t.remoteMembers.clear(),t.localMembers.clear())}function B(e){if(e.isDirty)return!1
const{remoteState:t,localState:r,additions:i,removals:s}=e
for(let n=0,o=0;n<t.length;n++){const e=t[n],a=r[o]
if(e!==a){if(s&&s.has(e))continue
if(i&&i.has(a)){o++,n--
continue}return!0}o++}return!1}function V(e){return void 0!==e._instanceCache?e._instanceCache._storeWrapper:e}function U(e){return x.get(V(e))}function H(e){const t=V(e)
let r=x.get(t)
return r||(r=new N(t),x.set(t,r),o(t)._graph=r),r}},5501:(e,t,r)=>{r.d(t,{F:()=>p,S:()=>f,a:()=>l,b:()=>c,c:()=>d,i:()=>u,n:()=>h,u:()=>_})
var i=r(1274),s=r(1603),n=r(6082),o=r(7375),a=r(3193)
class c{constructor(e,t,r={}){this.__store=e,this._snapshots=null,this.modelName=t,this.adapterOptions=r.adapterOptions,this.include=r.include}get _recordArray(){return this.__store.peekAll(this.modelName)}get length(){return this._recordArray.length}snapshots(){if(null!==this._snapshots)return this._snapshots
this.__store
const{_fetchManager:e}=this.__store
return this._snapshots=this._recordArray[i.u2].map((t=>e.createSnapshot(t))),this._snapshots}}function l(e){}function u(e,t){return Array.isArray(e)?e.map(t):t(e,0)}function h(e,t,r,i,s,n){return e?e.normalizeResponse(t,r,i,s,n):i}class d{constructor(e,t,r){this._store=r,this.__attributes=null,this._belongsToRelationships=Object.create(null),this._belongsToIds=Object.create(null),this._hasManyRelationships=Object.create(null),this._hasManyIds=Object.create(null)
const i=!!r._instanceCache.peek(t)
if(this.modelName=t.type,this.identifier=t,i&&this._attributes,this.id=t.id,this.adapterOptions=e.adapterOptions,this.include=e.include,this.modelName=t.type,i){const e=this._store.cache
this._changedAttributes=e.changedAttrs(t)}}get record(){return this._store.peekRecord(this.identifier)}get _attributes(){if(null!==this.__attributes)return this.__attributes
const e=this.__attributes=Object.create(null),{identifier:t}=this,r=this._store.schema.fields(t),i=this._store.cache
return r.forEach(((r,s)=>{"attribute"===r.kind&&(e[s]=i.getAttr(t,s))})),e}get isNew(){const e=this._store.cache
return e?.isNew(this.identifier)||!1}attr(e){if(e in this._attributes)return this._attributes[e]}attributes(){return{...this._attributes}}changedAttributes(){const e=Object.create(null)
if(!this._changedAttributes)return e
const t=Object.keys(this._changedAttributes)
for(let r=0,i=t.length;r<i;r++){const i=t[r]
e[i]=this._changedAttributes[i].slice()}return e}belongsTo(e,t){const i=!(!t||!t.id)
let s
const n=this._store
if(!0===i&&e in this._belongsToIds)return this._belongsToIds[e]
if(!1===i&&e in this._belongsToRelationships)return this._belongsToRelationships[e]
n.schema.fields({type:this.modelName}).get(e)
const o=(0,a.A)(r(151)).graphFor,{identifier:c}=this,l=o(this._store).getData(c,e),u=l&&l.data,h=u?n.identifierCache.getOrCreateRecordIdentifier(u):null
if(l&&void 0!==l.data){const e=n.cache
s=h&&!e.isDeleted(h)?i?h.id:n._fetchManager.createSnapshot(h):null}return i?this._belongsToIds[e]=s:this._belongsToRelationships[e]=s,s}hasMany(e,t){const i=!(!t||!t.ids)
let s
const n=this._hasManyIds[e],o=this._hasManyRelationships[e]
if(!0===i&&e in this._hasManyIds)return n
if(!1===i&&e in this._hasManyRelationships)return o
const c=this._store,l=(c.schema.fields({type:this.modelName}).get(e),(0,a.A)(r(151)).graphFor),{identifier:u}=this,h=l(this._store).getData(u,e)
return h.data&&(s=[],h.data.forEach((e=>{const t=c.identifierCache.getOrCreateRecordIdentifier(e)
c.cache.isDeleted(t)||(i?s.push(t.id):s.push(c._fetchManager.createSnapshot(t)))}))),i?this._hasManyIds[e]=s:this._hasManyRelationships[e]=s,s}eachAttribute(e,t){this._store.schema.fields(this.identifier).forEach(((r,i)=>{"attribute"===r.kind&&e.call(t,i,r)}))}eachRelationship(e,t){this._store.schema.fields(this.identifier).forEach(((r,i)=>{"belongsTo"!==r.kind&&"hasMany"!==r.kind||e.call(t,i,r)}))}serialize(e){return this._store,this._store.serializerFor(this.modelName).serialize(this,e)}}const f=(0,o.L1)("SaveOp",Symbol("SaveOp"))
class p{constructor(e){this._store=e,this._pendingFetch=new Map,this.requestCache=e.getRequestStateService(),this.isDestroyed=!1}createSnapshot(e,t={}){return new d(t,e,this._store)}scheduleSave(e,t){const r=(0,n.ud)(),i={data:[{op:"saveRecord",recordIdentifier:e,options:t}]},s={snapshot:this.createSnapshot(e,t),resolver:r,identifier:e,options:t,queryRequest:i},o=this.requestCache._enqueue(r.promise,s.queryRequest)
return function(e,t){const{snapshot:r,resolver:i,identifier:s,options:n}=t,o=e.adapterFor(s.type),a=n[f],c=r.modelName,l=e.modelFor(c)
let u=Promise.resolve().then((()=>o[a](e,l,r)))
const d=e.serializerFor(c)
u=u.then((t=>{if(t)return h(d,e,l,t,r.id,a)})),i.resolve(u)}(this._store,s),o}scheduleFetch(e,t,i){const s={data:[{op:"findRecord",recordIdentifier:e,options:t}]},o=this.getPendingFetch(e,t)
if(o)return o
const c=e.type,l=(0,n.ud)(),u={identifier:e,resolver:l,options:t,queryRequest:s},h=l.promise,d=this._store,f=!d._instanceCache.recordIsLoaded(e)
let p=this.requestCache._enqueue(h,u.queryRequest).then((r=>{r.data&&!Array.isArray(r.data)&&(r.data.lid=e.lid)
const i=d._push(r,t.reload)
return i&&!Array.isArray(i)?i:e}),(t=>{const i=d.cache
if(!i||i.isEmpty(e)||f){let t=!0
if(!i){const i=(0,(0,a.A)(r(151)).graphFor)(d)
t=i.isReleasable(e),t||i.unload(e,!0)}(i||t)&&(d._enableAsyncFlush=!0,d._instanceCache.unloadRecord(e),d._enableAsyncFlush=null)}throw t}))
0===this._pendingFetch.size&&new Promise((e=>setTimeout(e,0))).then((()=>{this.flushAllPendingFetches()}))
const y=this._pendingFetch
let g=y.get(c)
g||(g=new Map,y.set(c,g))
let m=g.get(e)
return m||(m=[],g.set(e,m)),m.push(u),u.promise=p,p}getPendingFetch(e,t){const r=this._pendingFetch.get(e.type)?.get(e)
if(r){const e=r.find((e=>function(e={},t={}){return r=e.adapterOptions,i=t.adapterOptions,(!r||r===i||0===Object.keys(r).length)&&function(e,t){if(!e?.length)return!0
if(!t?.length)return!1
const r=(Array.isArray(e)?e:e.split(",")).sort(),i=(Array.isArray(t)?t:t.split(",")).sort()
if(r.join(",")===i.join(","))return!0
for(let s=0;s<r.length;s++)if(!i.includes(r[s]))return!1
return!0}(e.include,t.include)
var r,i}(t,e.options)))
if(e)return e.promise}}flushAllPendingFetches(){if(this.isDestroyed)return
const e=this._store
this._pendingFetch.forEach(((t,r)=>function(e,t,r){const i=e.adapterFor(r)
if(i.findMany&&i.coalesceFindRequests){const s=[]
t.forEach(((e,r)=>{e.length>1||(t.delete(r),s.push(e[0]))}))
const n=s.length
if(n>1){const t=new Array(n),o=new Map
for(let r=0;r<n;r++){const i=s[r]
t[r]=e._fetchManager.createSnapshot(i.identifier,i.options),o.set(t[r],i)}let a
a=i.groupRecordsForFindMany?i.groupRecordsForFindMany(e,t):[t]
for(let s=0,n=a.length;s<n;s++)m(e,o,a[s],i,r)}else 1===n&&g(e,i,s[0])}t.forEach((t=>{t.forEach((t=>{g(e,i,t)}))}))}(e,t,r))),this._pendingFetch.clear()}fetchDataIfNeededForIdentifier(e,t={},r){const i=function(e,t){const r=e.cache
if(!r)return!0
const i=r.isNew(t),s=r.isDeleted(t),n=r.isEmpty(t)
return(!i||s)&&n}(this._store._instanceCache,e),s=function(e,t){const r=e.store.getRequestStateService()
return!e.recordIsLoaded(t)&&r.getPendingRequestsForRecord(t).some((e=>"query"===e.type))}(this._store._instanceCache,e)
let n
return i?(t.reload=!0,n=this.scheduleFetch(e,t,r)):n=s?this.getPendingFetch(e,t):Promise.resolve(e),n}destroy(){this.isDestroyed=!0}}function y(e,t,r){for(let i=0,s=t.length;i<s;i++){const s=t[i],n=e.get(s)
n&&n.resolver.reject(r||new Error(`Expected: '<${s.modelName}:${s.id}>' to be present in the adapter provided payload, but it was not found.`))}}function g(e,t,r){const n=r.identifier,o=n.type,a=e._fetchManager.createSnapshot(n,r.options),c=e.modelFor(n.type),l=n.id
let u=Promise.resolve().then((()=>t.findRecord(e,c,n.id,a)))
u=u.then((t=>{const r=h(e.serializerFor(o),e,c,t,l,"findRecord")
return(0,s.warn)(`You requested a record of type '${o}' with id '${l}' but the adapter returned a payload with primary data having an id of '${r.data.id}'. Use 'store.findRecord()' when the requested id is the same as the one returned by the adapter. In other cases use 'store.queryRecord()' instead.`,(0,i.pG)(r.data.id)===(0,i.pG)(l),{id:"ds.store.findRecord.id-mismatch"}),r})),r.resolver.resolve(u)}function m(e,t,r,i,n){r.length>1?function(e,t,r,i){const s=e.modelFor(r)
return Promise.resolve().then((()=>{const r=i.map((e=>e.id))
return t.findMany(e,s,r,i)})).then((t=>h(e.serializerFor(r),e,s,t,null,"findMany")))}(e,i,n,r).then((i=>{!function(e,t,r,i){const n=new Map
for(let s=0;s<r.length;s++){const e=r[s].id
let t=n.get(e)
t||(t=[],n.set(e,t)),t.push(r[s])}const o=Array.isArray(i.included)?i.included:[],a=i.data
for(let s=0,l=a.length;s<l;s++){const e=a[s],r=n.get(e.id)
n.delete(e.id),r?r.forEach((r=>{t.get(r).resolver.resolve({data:e})})):o.push(e)}if(o.length>0&&e._push({data:null,included:o},!0),0===n.size)return
const c=[]
n.forEach((e=>{c.push(...e)})),(0,s.warn)('Ember Data expected to find records with the following ids in the adapter response from findMany but they were missing: [ "'+[...n.values()].map((e=>e[0].id)).join('", "')+'" ]',{id:"ds.store.missing-records-from-adapter"}),y(t,c)}(e,t,r,i)})).catch((e=>{y(t,r,e)})):1===r.length&&g(e,i,t.get(r[0]))}function _(e){}},1491:(e,t,r)=>{r.r(t),r.d(t,{FetchManager:()=>i.F,SaveOp:()=>i.S,Snapshot:()=>i.c,SnapshotRecordArray:()=>i.b,upgradeStore:()=>i.u})
var i=r(5501)},1678:(e,t,r)=>{r.r(t),r(1603),r(7262)},7262:(e,t,r)=>{r.d(t,{a:()=>V,b:()=>B,c:()=>F,d:()=>q,e:()=>N,f:()=>g,g:()=>m,h:()=>b,i:()=>D,j:()=>_,k:()=>v,l:()=>I,p:()=>z,r:()=>x,s:()=>$,u:()=>P})
const i={plurals:[[/$/,"s"],[/s$/i,"s"],[/^(ax|test)is$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(octop|vir)i$/i,"$1i"],[/(alias|status|bonus)$/i,"$1es"],[/(bu)s$/i,"$1ses"],[/(buffal|tomat)o$/i,"$1oes"],[/([ti])um$/i,"$1a"],[/([ti])a$/i,"$1a"],[/sis$/i,"ses"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/(hive)$/i,"$1s"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(x|ch|ss|sh)$/i,"$1es"],[/(matr|vert|ind)(?:ix|ex)$/i,"$1ices"],[/^(m|l)ouse$/i,"$1ice"],[/^(m|l)ice$/i,"$1ice"],[/^(ox)$/i,"$1en"],[/^(oxen)$/i,"$1"],[/(quiz)$/i,"$1zes"]],singular:[[/s$/i,""],[/(ss)$/i,"$1"],[/(n)ews$/i,"$1ews"],[/([ti])a$/i,"$1um"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i,"$1sis"],[/(^analy)(sis|ses)$/i,"$1sis"],[/([^f])ves$/i,"$1fe"],[/(hive)s$/i,"$1"],[/(tive)s$/i,"$1"],[/([lr])ves$/i,"$1f"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/(s)eries$/i,"$1eries"],[/(m)ovies$/i,"$1ovie"],[/(x|ch|ss|sh)es$/i,"$1"],[/^(m|l)ice$/i,"$1ouse"],[/(bus)(es)?$/i,"$1"],[/(o)es$/i,"$1"],[/(shoe)s$/i,"$1"],[/(cris|test)(is|es)$/i,"$1is"],[/^(a)x[ie]s$/i,"$1xis"],[/(octop|vir)(us|i)$/i,"$1us"],[/(alias|status|bonus)(es)?$/i,"$1"],[/^(ox)en/i,"$1"],[/(vert|ind)ices$/i,"$1ex"],[/(matr)ices$/i,"$1ix"],[/(quiz)zes$/i,"$1"],[/(database)s$/i,"$1"]],irregularPairs:[["person","people"],["man","men"],["child","children"],["sex","sexes"],["move","moves"],["cow","kine"],["zombie","zombies"]],uncountable:["equipment","information","rice","money","species","series","fish","sheep","jeans","police"]}
class s{constructor(e,t){this.size=t||1e4,this.state=new Map,this.doWork=e}get(e){const t=this.state.get(e)
if(t)return this.state.delete(e),this.state.set(e,t),t
const r=this.doWork(e)
return this.set(e,r),r}set(e,t){if(this.state.size===this.size)for(const[r]of this.state){this.state.delete(r)
break}this.state.set(e,t)}clear(){this.state.clear()}}const n=/[ _]/g,o=/([a-z\d])([A-Z])/g,a=new s((e=>e.replace(o,"$1_$2").toLowerCase().replace(n,"-"))),c=/(\-|\_|\.|\s)+(.)?/g,l=/(^|\/)([A-Z])/g,u=new s((e=>e.replace(c,((e,t,r)=>r?r.toUpperCase():"")).replace(l,(e=>e.toLowerCase())))),h=/([a-z\d])([A-Z]+)/g,d=/\-|\s+/g,f=new s((e=>e.replace(h,"$1_$2").replace(d,"_").toLowerCase())),p=/(^|\/)([a-z\u00C0-\u024F])/g,y=new s((e=>e.replace(p,(e=>e.toUpperCase()))))
function g(e){return a.get(e)}function m(e){return u.get(e)}function _(e){return f.get(e)}function b(e){return y.get(e)}function v(e){u.size=e,f.size=e,y.size=e,a.size=e}const w=/^\s*$/,k=/([\w/-]+[_/\s-])([a-z\d]+$)/,S=/([\w/\s-]+)([A-Z][a-z\d]*$)/,R=/[A-Z][a-z\d]*$/,A=new s((e=>function(e){return U(e,O,M)}(e))),E=new s((e=>function(e){return U(e,j,T)}(e))),C=new Set(i.uncountable),T=new Map,M=new Map,O=new Map(i.singular.reverse()),j=new Map(i.plurals.reverse())
function P(e){C.add(e.toLowerCase())}function F(e){e.forEach((e=>{P(e)}))}function D(e,t){T.set(e.toLowerCase(),t),T.set(t.toLowerCase(),t),M.set(t.toLowerCase(),e),M.set(e.toLowerCase(),e)}function I(e){e.forEach((e=>{T.set(e[0].toLowerCase(),e[1]),T.set(e[1].toLowerCase(),e[1]),M.set(e[1].toLowerCase(),e[0]),M.set(e[0].toLowerCase(),e[0])}))}function q(){A.clear(),E.clear()}function x(){N(),i.uncountable.forEach((e=>C.add(e))),i.singular.forEach((e=>O.set(e[0],e[1]))),i.plurals.forEach((e=>j.set(e[0],e[1]))),I(i.irregularPairs)}function N(){A.clear(),E.clear(),C.clear(),T.clear(),M.clear(),O.clear(),j.clear()}function $(e){return e?A.get(e):""}function z(e){return e?E.get(e):""}function L(e,t){const r=[e,...t.entries()]
t.clear(),r.forEach((e=>{t.set(e[0],e[1])}))}function B(e,t){j.has(e)&&j.delete(e),L([e,t],j)}function V(e,t){O.has(e)&&O.delete(e),L([e,t],O)}function U(e,t,r){if(!e||w.test(e))return e
const i=e.toLowerCase()
if(C.has(i))return e
const s=k.exec(e)||S.exec(e),n=s?s[2].toLowerCase():null
if(n&&C.has(n))return e
const o=R.test(e)
for(let[a,c]of r)if(i.match(a+"$"))return o&&n&&r.has(n)&&(c=b(c),a=b(a)),e.replace(new RegExp(a,"i"),c)
for(const[a,c]of t)if(a.test(e))return e.replace(a,c)
return e}I(i.irregularPairs)},3241:(e,t,r)=>{r.r(t),r.d(t,{camelize:()=>i.g,capitalize:()=>i.h,clear:()=>i.d,clearRules:()=>i.e,dasherize:()=>i.f,irregular:()=>i.i,loadIrregular:()=>i.l,loadUncountable:()=>i.c,plural:()=>i.b,pluralize:()=>i.p,resetToDefaults:()=>i.r,setMaxLRUCacheSize:()=>i.k,singular:()=>i.a,singularize:()=>i.s,uncountable:()=>i.u,underscore:()=>i.j})
var i=r(7262)},2632:(e,t,r)=>{r.d(t,{I:()=>p,b:()=>v,c:()=>h,e:()=>b,f:()=>S,g:()=>d,s:()=>f,u:()=>w})
var i=r(7375),s=r(7648)
function n(e,t){return e.get(o(e,t))}function o(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r
throw new TypeError("Private element is not present on this object")}function a(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const c=(0,i.vs)("PromiseCache",new WeakMap),l=(0,i.vs)("RequestMap",new Map)
function u(e,t){l.set(e,t)}function h(e){l.delete(e)}function d(e){return l.get(e)}function f(e,t){c.set(e,t)}const p=(0,i.L1)("IS_CACHE_HANDLER",Symbol("IS_CACHE_HANDLER"))
function y(e){return e&&!0===e[s.k0]}function g(e,t,r){return y(t)?t:r?{[s.k0]:!0,request:e.request,response:e.getResponse(),error:t}:{[s.k0]:!0,request:e.request,response:e.getResponse(),content:t}}function m(e){return new DOMException(e||"The user aborted a request.","AbortError")}function _(e,t){return 0===t&&Boolean(e[p])}function b(e,t,r,i){const n=new R(t,i,0===r),o=new E(n)
let a
try{a=e[r].request(o,(function(t){return n.nextCalled++,b(e,t,r+1,i)})),a&&_(e[r],r)&&(a instanceof Promise||(u(n.requestId,{isError:!1,result:g(n,a,!1)}),a=Promise.resolve(a)))}catch(t){_(e[r],r)&&u(n.requestId,{isError:!0,result:g(n,t,!0)}),a=Promise.reject(t)}const c=function(e){const t=v()
let r,{promise:i}=t
return i=i.finally((()=>{e.resolveStream(),r&&r.forEach((e=>e()))})),i.onFinalize=e=>{r=r||[],r.push(e)},i[s.J6]=!0,i.getStream=()=>e.getStream(),i.abort=t=>{e.abort(m(t))},t.promise=i,t}(n)
return l=a,Boolean(l&&l instanceof Promise&&!0===l[s.J6])?function(e,t,r){return e.setStream(t.getStream()),t.then((t=>{const i={[s.k0]:!0,request:e.request,response:t.response,content:t.content}
r.resolve(i)}),(t=>{if(y(t)&&e.setStream(e.god.stream),!(t&&t instanceof Error))try{throw new Error(t||"Request Rejected with an Unknown Error")}catch(e){t&&"object"==typeof t&&(Object.assign(e,t),e.message=t.message||"Request Rejected with an Unknown Error"),t=e}t[s.k0]=!0,t.request=e.request,t.response=e.getResponse(),t.error=t.error||t.message,r.reject(t)})),r.promise}(n,a,c):function(e,t,r){return t.then((t=>{if(e.controller.signal.aborted)return void r.reject(m(e.controller.signal.reason))
y(t)&&(e.setStream(e.god.stream),t=t.content)
const i={[s.k0]:!0,request:e.request,response:e.getResponse(),content:t}
r.resolve(i)}),(t=>{if(y(t)&&e.setStream(e.god.stream),!(t&&t instanceof Error))try{throw new Error(t||"Request Rejected with an Unknown Error")}catch(e){t&&"object"==typeof t&&(Object.assign(e,t),e.message=t.message||"Request Rejected with an Unknown Error"),t=e}t[s.k0]=!0,t.request=e.request,t.response=e.getResponse(),t.error=t.error||t.message,r.reject(t)})),r.promise}(n,a,c)
var l}function v(){let e,t
const r=new Promise(((r,i)=>{e=r,t=i}))
return{resolve:e,reject:t,promise:r}}function w(e,t){return e[s.J6]=!0,e.getStream=t.getStream,e.abort=t.abort,e.onFinalize=t.onFinalize,e}function k(e){return e.clone=()=>new Headers(e),e.toJSON=()=>Array.from(e),e}function S(e){const{headers:t,ok:r,redirected:i,status:s,statusText:n,type:o,url:a}=e
return k(t),{headers:t,ok:r,redirected:i,status:s,statusText:n,type:o,url:a}}class R{constructor(e,t,r=!1){a(this,"hasSetStream",!1),a(this,"hasSetResponse",!1),a(this,"hasSubscribers",!1),a(this,"stream",v()),a(this,"response",null),a(this,"nextCalled",0),this.isRoot=r,this.requestId=t.id,this.controller=e.controller||t.controller,this.stream.promise.sizeHint=0,e.controller&&(e.controller!==t.controller&&t.controller.signal.addEventListener("abort",(()=>{this.controller.abort(t.controller.signal.reason)})),delete e.controller)
let i=Object.assign({signal:this.controller.signal},e)
e.headers&&k(e.headers),this.enhancedRequest=i,this.request=e,this.god=t,this.stream.promise=this.stream.promise.then((e=>(this.god.stream===e&&this.hasSubscribers&&(this.god.stream=null),e)))}get hasRequestedStream(){return this.god.hasRequestedStream}getResponse(){return this.hasSetResponse?this.response:1===this.nextCalled?this.god.response:null}getStream(){if(this.isRoot&&(this.god.hasRequestedStream=!0),!this.hasSetResponse){const e=this.god.response?.headers?.get("content-length")
this.stream.promise.sizeHint=e?parseInt(e,10):0}return this.hasSubscribers=!0,this.stream.promise}abort(e){this.controller.abort(e)}setStream(e){this.hasSetStream||(this.hasSetStream=!0,e instanceof Promise||(this.god.stream=e),this.stream.resolve(e))}resolveStream(){this.setStream(1===this.nextCalled?this.god.stream:null)}setResponse(e){if(!this.hasSetResponse)if(this.hasSetResponse=!0,e instanceof Response){let t=S(e)
this.response=t,this.god.response=t
const r=e.headers?.get("content-length")
this.stream.promise.sizeHint=r?parseInt(r,10):0}else this.response=e,this.god.response=e}}var A=new WeakMap
class E{constructor(e){var t,r;(function(e,t){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,void 0)})(this,A),this.id=e.requestId,r=e,(t=A).set(o(t,this),r),this.request=e.enhancedRequest}setStream(e){n(A,this).setStream(e)}setResponse(e){n(A,this).setResponse(e)}get hasRequestedStream(){return n(A,this).hasRequestedStream}}new Map([["records","array"],["data","json"],["body",{type:"string",klass:["Blob","ArrayBuffer","TypedArray","DataView","FormData","URLSearchParams","ReadableStream"]}],["disableTestWaiter","boolean"],["options","object"],["cacheOptions","object"],["op","string"],["store","object"],["url","string"],["cache",["default","force-cache","no-cache","no-store","only-if-cached","reload"]],["credentials",["include","omit","same-origin"]],["destination",["","object","audio","audioworklet","document","embed","font","frame","iframe","image","manifest","paintworklet","report","script","sharedworker","style","track","video","worker","xslt"]],["headers","headers"],["integrity","string"],["keepalive","boolean"],["method",["GET","PUT","PATCH","DELETE","POST","OPTIONS"]],["mode",["same-origin","cors","navigate","no-cors"]],["redirect",["error","follow","manual"]],["referrer","string"],["signal","AbortSignal"],["controller","AbortController"],["referrerPolicy",["","same-origin","no-referrer","no-referrer-when-downgrade","origin","origin-when-cross-origin","strict-origin","strict-origin-when-cross-origin","unsafe-url"]]]),(0,i.L1)("IS_FROZEN",Symbol("FROZEN")),(0,i.L1)("IS_COLLECTION",Symbol.for("Collection")),new Set([])},6082:(e,t,r)=>{r.d(t,{Ay:()=>a,ud:()=>s.b})
var i=r(7375),s=r(2632)
function n(e,t){return e.get(function(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r
throw new TypeError("Private element is not present on this object")}(e,t))}var o=new WeakMap
class a{constructor(e){var t,r
r=[],function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t=o),t.set(this,r),Object.assign(this,e),this._pending=new Map}useCache(e){e[s.I]=!0,n(o,this).unshift(e)}use(e){n(o,this).push(...e)}request(e){const t=n(o,this),r=e.controller||new AbortController
e.controller&&delete e.controller
const a=(0,i.dN)("REQ_ID")??0;(0,i.ml)("REQ_ID",a+1)
const c=(0,s.e)(t,e,0,{controller:r,response:null,stream:null,hasRequestedStream:!1,id:a}),l=(0,s.g)(a),u=(0,s.u)(c.then((e=>((0,s.s)(u,{isError:!1,result:e}),(0,s.c)(a),e)),(e=>{throw(0,s.s)(u,{isError:!0,result:e}),(0,s.c)(a),e})),c)
return l&&(0,s.s)(u,l),u}static create(e){return new this(e)}}},5113:(e,t,r)=>{r.r(t),r.d(t,{BooleanTransform:()=>c,DateTransform:()=>l,NumberTransform:()=>h,StringTransform:()=>d,default:()=>a})
var i=r(4471),s=r.n(i),n=r(1788)
function o(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const a=s()
class c{constructor(){o(this,n.k5,"boolean")}deserialize(e,t){return null==e&&!0===t?.allowNull?null:"boolean"==typeof e?e:"string"==typeof e?/^(true|t|1)$/i.test(e):"number"==typeof e&&1===e}serialize(e,t){return null==e&&!0===t?.allowNull?null:Boolean(e)}static create(){return new this}}class l{constructor(){o(this,n.k5,"date")}deserialize(e,t){if("string"==typeof e){let t=e.indexOf("+")
return-1!==t&&e.length-5===t?(t+=3,new Date(e.slice(0,t)+":"+e.slice(t))):new Date(e)}return"number"==typeof e?new Date(e):null==e?e:null}serialize(e,t){return e instanceof Date&&!isNaN(e)?e.toISOString():null}static create(){return new this}}function u(e){return e==e&&e!==1/0&&e!==-1/0}class h{constructor(){o(this,n.k5,"number")}deserialize(e,t){if(""===e||null==e)return null
{const t=Number(e)
return u(t)?t:null}}serialize(e,t){if(""===e||null==e)return null
{const t=Number(e)
return u(t)?t:null}}static create(){return new this}}class d{constructor(){o(this,n.k5,"string")}deserialize(e,t){return e||""===e?String(e):null}serialize(e,t){return e||""===e?String(e):null}static create(){return new this}}},1274:(e,t,r)=>{r.d(t,{J4:()=>i.n,RX:()=>i.l,TP:()=>i.o,To:()=>i.A,Wz:()=>i.t,XK:()=>i.M,di:()=>i.u,fV:()=>i.s,i:()=>i.q,o:()=>i.r,oX:()=>i.p,oz:()=>i.I,pG:()=>i.g,u2:()=>i.k,xm:()=>i.i})
var i=r(9387)},9387:(e,t,r)=>{r.d(t,{A:()=>Re,C:()=>at,I:()=>je,M:()=>Ee,S:()=>Ye,a:()=>E,b:()=>C,c:()=>T,d:()=>M,e:()=>O,g:()=>p,i:()=>S,k:()=>Ae,l:()=>qe,n:()=>Me,o:()=>Q,p:()=>K,q:()=>Z,r:()=>J,s:()=>X,t:()=>H,u:()=>g})
var i=r(1603),s=r(7648),n=r(7375)
Symbol("record-originated-on-client"),Symbol("identifier-bucket"),Symbol("warpDriveStaleCache")
const o=Symbol("warpDriveCache")
var a=r(3241),c=r(8146),l=r(1223),u=r(8738)
function h(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r
throw new TypeError("Private element is not present on this object")}function f(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e){{let t
return t=null==e||""===e?null:String(e),(0,i.deprecate)(`The resource id '<${typeof e}> ${String(e)} ' is not normalized. Update your application code to use '${JSON.stringify(t)}' instead.`,t===e,{id:"ember-data:deprecate-non-strict-id",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}function y(e){let t=null
return"string"==typeof e?t=e.length>0?e:null:"number"!=typeof e||isNaN(e)||(t=String(e)),t}function g(e){{const t=(0,a.dasherize)(e)
return(0,i.deprecate)(`The resource type '${e}' is not normalized. Update your application code to use '${t}' instead of '${e}'.`,t===e,{id:"ember-data:deprecate-non-strict-types",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}function m(e){return Boolean(e&&"object"==typeof e)}function _(e,t){return Boolean(m(e)&&t in e&&"string"==typeof e[t]&&e[t].length)}function b(e){return _(e,"lid")}function v(e){return _(e,"id")||Boolean(m(e)&&"id"in e&&"number"==typeof e.id)}const w=(0,n.L1)("IDENTIFIERS",new Set),k=(0,n.L1)("DOCUMENTS",new Set)
function S(e){return void 0!==e[o]||w.has(e)}function R(e){return k.has(e)}const A="undefined"!=typeof FastBoot?FastBoot.require("crypto"):window.crypto
function E(e){(0,n.dV)("configuredGenerationMethod",e)}function C(e){(0,n.dV)("configuredUpdateMethod",e)}function T(e){(0,n.dV)("configuredForgetMethod",e)}function M(e){(0,n.dV)("configuredResetMethod",e)}function O(e){(0,n.dV)("configuredKeyInfoMethod",e)}const j=new Map
let P=0
function F(e,t,r){"record"===r&&!e.id&&v(t)&&function(e,t,r){let i=e.get(t.type)
i||(i=new Map,e.set(t.type,i)),i.set(r,t.lid)}(j,e,t.id)}function D(e,t){const r=v(e)?p(e.id):null
return{type:function(e){return _(e,"type")}(e)?g(e.type):t?t.type:null,id:r}}function I(e,t){if("record"===t){if(b(e))return e.lid
if(v(e)){const t=g(e.type),r=j.get(t)?.get(e.id)
return r||`@lid:${t}-${e.id}`}return A.randomUUID()}if("document"===t)return e.url?e.method&&"GET"!==e.method.toUpperCase()?null:e.url:null}function q(...e){}function x(e,t,r){return e}class N{constructor(){this._generate=(0,n.Yj)("configuredGenerationMethod")||I,this._update=(0,n.Yj)("configuredUpdateMethod")||F,this._forget=(0,n.Yj)("configuredForgetMethod")||q,this._reset=(0,n.Yj)("configuredResetMethod")||q,this._merge=x,this._keyInfoForResource=(0,n.Yj)("configuredKeyInfoMethod")||D,this._id=P++,this._cache={resources:new Map,resourcesByType:Object.create(null),documents:new Map,polymorphicLidBackMap:new Map}}__configureMerge(e){this._merge=e||x}upgradeIdentifier(e){return this._getRecordIdentifier(e,2)}_getRecordIdentifier(e,t){if(S(e))return e
const r=this._generate(e,"record")
let i=z(this._cache,r)
if(null!==i)return i
if(0!==t){if(2===t)e.lid=r,e[o]=this._id,i=$(e)
else{const t=this._keyInfoForResource(e,null)
t.lid=r,t[o]=this._id,i=$(t)}return L(this._cache,i),i}}peekRecordIdentifier(e){return this._getRecordIdentifier(e,0)}getOrCreateDocumentIdentifier(e){let t=e.cacheOptions?.key
if(t||(t=this._generate(e,"document")),!t)return null
let r=this._cache.documents.get(t)
return void 0===r&&(r={lid:t},k.add(r),this._cache.documents.set(t,r)),r}getOrCreateRecordIdentifier(e){return this._getRecordIdentifier(e,1)}createIdentifierForNewRecord(e){const t=this._generate(e,"record"),r=$({id:e.id||null,type:e.type,lid:t,[o]:this._id})
return L(this._cache,r),r}updateRecordIdentifier(e,t){let r=this.getOrCreateRecordIdentifier(e)
const i=this._keyInfoForResource(t,r)
let s=function(e,t,r,i){const s=t.id,{id:n,type:o,lid:a}=r,c=e.resourcesByType[r.type]
if(null!==n&&n!==s&&null!==s){const e=c&&c.id.get(s)
return void 0!==e&&e}{const r=t.type
if(null!==n&&n===s&&r===o&&b(i)&&i.lid!==a)return z(e,i.lid)||!1
if(null!==n&&n===s&&r&&r!==o&&b(i)&&i.lid===a){const t=e.resourcesByType[r],i=t&&t.id.get(s)
return void 0!==i&&i}}return!1}(this._cache,i,r,t)
const n=b(t)
if(s||r.type!==i.type&&(n&&delete t.lid,s=this.getOrCreateRecordIdentifier(t)),s){const e=r
r=this._mergeRecordIdentifiers(i,e,s,t),n&&(t.lid=r.lid)}const o=r.id;(function(e,t,r,i){i(e,r,"record"),void 0!==r.id&&(e.id=p(r.id))})(r,0,t,this._update)
const a=r.id
if(o!==a&&null!==a){const e=this._cache.resourcesByType[r.type]
e.id.set(a,r),null!==o&&e.id.delete(o)}return r}_mergeRecordIdentifiers(e,t,r,i){const s=this._merge(t,r,i),n=s===t?r:t,o=this._cache.polymorphicLidBackMap.get(n.lid)
o&&this._cache.polymorphicLidBackMap.delete(n.lid),this.forgetRecordIdentifier(n),this._cache.resources.set(n.lid,s)
const a=this._cache.polymorphicLidBackMap.get(s.lid)??[]
return a.push(n.lid),o&&o.forEach((e=>{a.push(e),this._cache.resources.set(e,s)})),this._cache.polymorphicLidBackMap.set(s.lid,a),s}forgetRecordIdentifier(e){const t=this.getOrCreateRecordIdentifier(e),r=this._cache.resourcesByType[t.type]
null!==t.id&&r.id.delete(t.id),this._cache.resources.delete(t.lid),r.lid.delete(t.lid)
const i=this._cache.polymorphicLidBackMap.get(t.lid)
i&&(i.forEach((e=>{this._cache.resources.delete(e)})),this._cache.polymorphicLidBackMap.delete(t.lid)),t[o]=void 0,w.delete(t),this._forget(t,"record")}destroy(){j.clear(),this._cache.documents.forEach((e=>{k.delete(e)})),this._reset()}}function $(e,t,r){return w.add(e),e}function z(e,t,r){return e.resources.get(t)||null}function L(e,t){e.resources.set(t.lid,t)
let r=e.resourcesByType[t.type]
r||(r={lid:new Map,id:new Map},e.resourcesByType[t.type]=r),r.lid.set(t.lid,t),t.id&&r.id.set(t.id,t)}class B{constructor(e,t){f(this,"___token",void 0),f(this,"___identifier",void 0),this.store=e,this.___identifier=t,this.___token=e.notifications.subscribe(t,((e,t,r)=>{("identity"===t||"attributes"===t&&"id"===r)&&this._ref++}))}destroy(){this.store.notifications.unsubscribe(this.___token)}get type(){return this.identifier().type}id(){return this._ref,this.___identifier.id}identifier(){return this.___identifier}remoteType(){return"identity"}push(e){return Promise.resolve(e).then((e=>this.store.push(e)))}value(){return this.store.peekRecord(this.___identifier)}load(){const e=this.id()
if(null!==e)return this.store.findRecord(this.type,e)}reload(){const e=this.id()
if(null!==e)return this.store.findRecord(this.type,e,{reload:!0})}}(0,c.sg)(B.prototype,"_ref")
class V{constructor(e){this._store=e,this._willNotify=!1,this._pendingNotifies=new Map}get identifierCache(){return this._store.identifierCache}_scheduleNotification(e,t){let r=this._pendingNotifies.get(e)
r||(r=new Set,this._pendingNotifies.set(e,r)),r.add(t),!0!==this._willNotify&&(this._willNotify=!0,this._store._cbs?this._store._schedule("notify",(()=>this._flushNotifications())):this._flushNotifications())}_flushNotifications(){if(!1===this._willNotify)return
const e=this._pendingNotifies
this._pendingNotifies=new Map,this._willNotify=!1,e.forEach(((e,t)=>{e.forEach((e=>{this._store.notifications.notify(t,"relationships",e)}))}))}notifyChange(e,t,r){"relationships"===t&&r?this._scheduleNotification(e,r):this._store.notifications.notify(e,t,r)}get schema(){return this._store.schema}setRecordId(e,t){this._store._instanceCache.setRecordId(e,t)}hasRecord(e){return Boolean(this._store._instanceCache.peek(e))}disconnectRecord(e){this._store._instanceCache.disconnect(e),this._pendingNotifies.delete(e)}}V.prototype.getSchemaDefinitionService=function(){return this._store.schema}
const U=(0,n.L1)("CacheForIdentifierCache",new Map)
function H(e,t){U.set(e,t)}function W(e){U.delete(e)}function K(e){return U.has(e)?U.get(e):null}const Y=(0,n.L1)("RecordCache",new Map)
function G(e){return Y.get(e)}function J(e){return Y.get(e)}function Q(e,t){Y.set(e,t)}const Z=(0,n.L1)("StoreMap",new Map)
function X(e){return Z.get(e)}class ee{constructor(e){f(this,"__instances",{record:new Map,reference:new WeakMap}),this.store=e,this._storeWrapper=new V(this.store),e.identifierCache.__configureMerge(((e,t,r)=>{let i=e
e.id!==t.id?i="id"in r&&e.id===r.id?e:t:e.type!==t.type&&(i="type"in r&&e.type===r.type?e:t)
const s=e===i?t:e,n=this.__instances.record.has(i),o=this.__instances.record.has(s)
if(n&&o&&"id"in r)throw new Error(`Failed to update the 'id' for the RecordIdentifier '${e.type}:${String(e.id)} (${e.lid})' to '${String(r.id)}', because that id is already in use by '${t.type}:${String(t.id)} (${t.lid})'`)
return this.store.cache.patch({op:"mergeIdentifiers",record:s,value:i}),this.unloadRecord(s),i}))}peek(e){return this.__instances.record.get(e)}getRecord(e,t){let r=this.__instances.record.get(e)
if(!r){const i=this.store.cache
H(e,i),r=this.store.instantiateRecord(e,t||{}),Q(r,e),H(r,i),Z.set(r,this.store),this.__instances.record.set(e,r)}return r}getReference(e){const t=this.__instances.reference
let r=t.get(e)
return r||(r=new B(this.store,e),t.set(e,r)),r}recordIsLoaded(e,t=!1){const r=this.cache
if(!r)return!1
const i=r.isNew(e),s=r.isEmpty(e)
return i?!r.isDeleted(e):!(t&&r.isDeletionCommitted(e)||s)}disconnect(e){this.__instances.record.get(e),this.store._graph?.remove(e),this.store.identifierCache.forgetRecordIdentifier(e),W(e),this.store._requestCache._clearEntries(e)}unloadRecord(e){this.store._join((()=>{const t=this.__instances.record.get(e),r=this.cache
t&&(this.store.teardownRecord(t),this.__instances.record.delete(e),Z.delete(t),Y.delete(t),W(t)),r?(r.unloadRecord(e),W(e)):this.disconnect(e),this.store._requestCache._clearEntries(e)}))}clear(e){const t=this.store.identifierCache._cache
if(void 0===e)t.resources.forEach((e=>{this.unloadRecord(e)}))
else{const r=t.resourcesByType,i=r[e]?.lid
i&&i.forEach((e=>{this.unloadRecord(e)}))}}setRecordId(e,t){const{type:r,lid:s}=e,n=e.id
null===n||null!==t?(this.store.identifierCache.peekRecordIdentifier({type:r,id:t}),null===e.id&&this.store.identifierCache.updateRecordIdentifier(e,{type:r,id:t}),this.store.notifications.notify(e,"identity")):(0,i.warn)(`Your ${r} record was saved to the server, but the response does not have an id.`,!(null!==n&&null===t))}}function te(e,t){return"string"==typeof e||"number"==typeof e?{type:t,id:y(e)}:J(e)}const re=(0,n.L1)("AvailableShims",new WeakMap)
class ie{constructor(e,t){this.__store=e,this.modelName=t}get fields(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,r)=>{"attribute"!==t.kind&&"belongsTo"!==t.kind&&"hasMany"!==t.kind||e.set(r,t.kind)})),e}get attributes(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,r)=>{"attribute"===t.kind&&e.set(r,t)})),e}get relationshipsByName(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,r)=>{"belongsTo"!==t.kind&&"hasMany"!==t.kind||e.set(r,t)})),e}eachAttribute(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((r,i)=>{"attribute"===r.kind&&e.call(t,i,r)}))}eachRelationship(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((r,i)=>{"belongsTo"!==r.kind&&"hasMany"!==r.kind||e.call(t,i,r)}))}eachTransformedAttribute(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((r,i)=>{if("attribute"===r.kind){const s=r.type
s&&e.call(t,i,s)}}))}}const se=new Set(["added","removed","state","updated"])
function ne(e){return se.has(e)}function oe(){return!!l._backburner.currentInstance&&!0!==l._backburner._autorun}class ae{constructor(e){this.store=e,this.isDestroyed=!1,this._buffered=new Map,this._hasFlush=!1,this._cache=new Map,this._tokens=new Map}subscribe(e,t){let r=this._cache.get(e)
r||(r=new Map,this._cache.set(e,r))
const i={}
return r.set(i,t),this._tokens.set(i,e),i}unsubscribe(e){this.isDestroyed||function(e,t,r){const i=e.get(t)
if(i){e.delete(t)
const s=r.get(i)
s?.delete(t)}}(this._tokens,e,this._cache)}notify(e,t,r){if(!S(e)&&!R(e))return!1
const i=Boolean(this._cache.get(e)?.size)
if(ne(t)||i){let i=this._buffered.get(e)
i||(i=[],this._buffered.set(e,i)),i.push([t,r]),this._scheduleNotify()}return i}_onNextFlush(e){this._onFlushCB=e}_scheduleNotify(){const e=this.store._enableAsyncFlush
this._hasFlush&&!1!==e&&!oe()||(!e||oe()?this._flush():this._hasFlush=!0)}_flush(){this._buffered.size&&(this._buffered.forEach(((e,t)=>{e.forEach((e=>{this._flushNotification(t,e[0],e[1])}))})),this._buffered=new Map),this._hasFlush=!1,this._onFlushCB?.(),this._onFlushCB=void 0}_flushNotification(e,t,r){if(ne(t)){const r=this._cache.get(R(e)?"document":"resource")
r&&r.forEach((r=>{r(e,t)}))}const i=this._cache.get(e)
return!(!i||!i.size||(i.forEach((i=>{i(e,t,r)})),0))}destroy(){this.isDestroyed=!0,this._tokens.clear(),this._cache.clear()}}const ce=Proxy
var le=Object.defineProperty;((e,t)=>{for(var r in t)le(e,r,{get:t[r],enumerable:!0})})({},{c:()=>ge,f:()=>he,g:()=>de,i:()=>ye,m:()=>fe,n:()=>pe,p:()=>me})
var ue=new WeakMap
function he(e,t,r,i){return de(e.prototype,t,r,i)}function de(e,t,r,i){let s={configurable:!0,enumerable:!0,writable:!0,initializer:null}
i&&(s.initializer=i)
for(let n of r)s=n(e,t,s)||s
void 0===s.initializer?Object.defineProperty(e,t,s):function(e,t,r){let i=ue.get(e)
i||(i=new Map,ue.set(e,i)),i.set(t,r)}(e,t,s)}function fe({prototype:e},t,r){return pe(e,t,r)}function pe(e,t,r){let i={...Object.getOwnPropertyDescriptor(e,t)}
for(let s of r)i=s(e,t,i)||i
void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(e):void 0,i.initializer=void 0),Object.defineProperty(e,t,i)}function ye(e,t){let r=function(e,t){let r=e.prototype
for(;r;){let e=ue.get(r)?.get(t)
if(e)return e
r=r.prototype}}(e.constructor,t)
r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(e):void 0})}function ge(e,t){return t.reduce(((e,t)=>t(e)||e),e)}function me(e,t){for(let[r,i,s]of t)"field"===r?_e(e,i,s):pe(e,i,s)
return e}function _e(e,t,r){let i={configurable:!0,enumerable:!0,writable:!0,initializer:()=>Object.getOwnPropertyDescriptor(e,t)?.value}
for(let s of r)i=s(e,t,i)||i
i.initializer&&(i.value=i.initializer.call(e),delete i.initializer),Object.defineProperty(e,t,i)}const be=new Set([Symbol.iterator,"concat","entries","every","fill","filter","find","findIndex","flat","flatMap","forEach","includes","indexOf","join","keys","lastIndexOf","map","reduce","reduceRight","slice","some","values"]),ve=new Set(["push","pop","unshift","shift","splice","sort"]),we=new Set(["[]","length","links","meta"])
function ke(e){return be.has(e)}function Se(e,t){return t in e}const Re=(0,n.L1)("#signal",Symbol("#signal")),Ae=(0,n.L1)("#source",Symbol("#source")),Ee=(0,n.L1)("#update",Symbol("#update")),Ce=(0,n.L1)("#notify",Symbol("#notify")),Te=(0,n.L1)("IS_COLLECTION",Symbol.for("Collection"))
function Me(e){(0,c.RH)(e[Re])}function Oe(e){if("symbol"==typeof e)return null
const t=Number(e)
return isNaN(t)?null:t%1==0?t:null}class je{[Ce](){Me(this)}destroy(e){this.isDestroying=!e,this[Ae].length=0,this[Ce](),this.isDestroyed=!e}get length(){return this[Ae].length}set length(e){this[Ae].length=e}constructor(e){f(this,"isLoaded",!0),f(this,"isDestroying",!1),f(this,"isDestroyed",!1),f(this,"_updatingPromise",null),f(this,Te,!0),f(this,Ae,void 0)
const t=this
this.modelName=e.type,this.store=e.store,this._manager=e.manager,this[Ae]=e.identifiers,this[Re]=(0,c.n5)(this,"length")
const r=e.store,i=new Map,s=this[Re],n={links:e.links||null,meta:e.meta||null}
let o=!1
const a=new ce(this[Ae],{get(a,l,u){const h=Oe(l)
if(s.shouldReset&&(null!==h||we.has(l)||ke(l))&&(e.manager._syncArray(u),s.t=!1,s.shouldReset=!1),null!==h){const e=a[h]
return o||(0,c.B1)(s),e&&r._instanceCache.getRecord(e)}if("meta"===l)return(0,c.B1)(s),n.meta
if("links"===l)return(0,c.B1)(s),n.links
if("[]"===l)return(0,c.B1)(s),u
if(ke(l)){let e=i.get(l)
return void 0===e&&(e="forEach"===l?function(){(0,c.B1)(s),o=!0
const e=function(e,t,r,i,s){void 0===s&&(s=null)
const n=(t=t.slice()).length
for(let o=0;o<n;o++)i.call(s,r._instanceCache.getRecord(t[o]),o,e)
return e}(u,a,r,arguments[0],arguments[1])
return o=!1,e}:function(){(0,c.B1)(s),o=!0
const e=Reflect.apply(a[l],u,arguments)
return o=!1,e},i.set(l,e)),e}if(function(e){return ve.has(e)}(l)){let r=i.get(l)
return void 0===r&&(r=function(){if(!e.allowMutation)return
const r=Array.prototype.slice.call(arguments)
o=!0
const i=t[Ee](a,u,l,r,s)
return o=!1,i},i.set(l,r)),r}if(Se(t,l)){if(l===Ce||l===Re||l===Ae)return t[l]
let e=i.get(l)
if(e)return e
const r=t[l]
return"function"==typeof r?(e=function(){return(0,c.B1)(s),Reflect.apply(r,u,arguments)},i.set(l,e),e):((0,c.B1)(s),r)}return a[l]},set(r,i,a,c){if("length"===i){if(!o&&0===a)return o=!0,t[Ee](r,c,"length 0",[],s),o=!1,!0
if(o)return Reflect.set(r,i,a)}if("links"===i)return n.links=a||null,!0
if("meta"===i)return n.meta=a||null,!0
const l=Oe(i)
if(null===l||l>r.length){if(null!==l&&o){const e=J(a)
return r[l]=e,!0}return!!Se(t,i)&&(t[i]=a,!0)}if(!e.allowMutation)return!1
const u=r[l],h=(d=a)?J(d):null
var d
return r[l]=h,o?r[l]=h:t[Ee](r,c,"replace cell",[l,u,h],s),!0},deleteProperty:(e,t)=>!!o&&Reflect.deleteProperty(e,t),getPrototypeOf:()=>je.prototype})
return(0,c.zs)(a,s),this[Ce]=this[Ce].bind(a),a}update(){if(this.isUpdating)return this._updatingPromise
this.isUpdating=!0
const e=this._update()
return e.finally((()=>{this._updatingPromise=null,this.isDestroying||this.isDestroyed||(this.isUpdating=!1)})),this._updatingPromise=e,e}_update(){return this.store.findAll(this.modelName,{reload:!0})}save(){return Promise.all(this.map((e=>this.store.saveRecord(e)))).then((()=>this))}}pe(je.prototype,"length",[u.Vv])
const Pe={enumerable:!0,configurable:!1,get:function(){return this}};(0,u.Vv)(Pe),Object.defineProperty(je.prototype,"[]",Pe),(0,c.sg)(je.prototype,"isUpdating",!1)
class Fe extends je{constructor(e){super(e),f(this,"query",null),this.query=e.query||null,this.isLoaded=e.isLoaded||!1}_update(){const{store:e,query:t}=this
return e.query(this.modelName,t,{_recordArray:this})}destroy(e){super.destroy(e),this._manager._managed.delete(this),this._manager._pending.delete(this)}}Fe.prototype.query=null
const De=(0,n.L1)("FAKE_ARR",{}),Ie=1200
function qe(e,t){let r=0
const i=t.length
for(;i-r>Ie;)e.push.apply(e,t.slice(r,r+Ie)),r+=Ie
e.push.apply(e,t.slice(r))}class xe{constructor(e){this.store=e.store,this.isDestroying=!1,this.isDestroyed=!1,this._live=new Map,this._managed=new Set,this._pending=new Map,this._staged=new Map,this._keyedArrays=new Map,this._identifiers=new Map,this._set=new Map,this._visibilitySet=new Map,this._subscription=this.store.notifications.subscribe("resource",((e,t)=>{"added"===t?(this._visibilitySet.set(e,!0),this.identifierAdded(e)):"removed"===t?(this._visibilitySet.set(e,!1),this.identifierRemoved(e)):"state"===t&&this.identifierChanged(e)}))}_syncArray(e){const t=this._pending.get(e)
!t||this.isDestroying||this.isDestroyed||(function(e,t,r){const i=e[Ae],s=[],n=[]
t.forEach(((e,t)=>{if("add"===e){if(r.has(t))return
s.push(t),r.add(t)}else r.has(t)&&(n.push(t),r.delete(t))})),n.length&&(n.length===i.length?i.length=0:n.forEach((e=>{const t=i.indexOf(e);-1!==t&&(i.splice(t,1),r.delete(e))}))),s.length&&qe(i,s)}(e,t,this._set.get(e)),this._pending.delete(e))}liveArrayFor(e){let t=this._live.get(e)
const r=[],i=this._staged.get(e)
return i&&(i.forEach(((e,t)=>{"add"===e&&r.push(t)})),this._staged.delete(e)),t||(t=new je({type:e,identifiers:r,store:this.store,allowMutation:!1,manager:this}),this._live.set(e,t),this._set.set(t,new Set(r))),t}createArray(e){const t={type:e.type,links:e.doc?.links||null,meta:e.doc?.meta||null,query:e.query||null,identifiers:e.identifiers||[],isLoaded:!!e.identifiers?.length,allowMutation:!1,store:this.store,manager:this},r=new Fe(t)
return this._managed.add(r),this._set.set(r,new Set(t.identifiers||[])),e.identifiers&&Ne(this._identifiers,r,e.identifiers),r}dirtyArray(e,t){if(e===De)return
const r=e[Re]
r.shouldReset?t>0&&!r.t&&(0,c.Fe)(e[Ce]):(r.shouldReset=!0,(0,c.Fe)(e[Ce]))}_getPendingFor(e,t,r){if(this.isDestroying||this.isDestroyed)return
const i=this._live.get(e.type),s=this._pending,n=new Map
if(t){const t=this._identifiers.get(e)
t&&t.forEach((e=>{let t=s.get(e)
t||(t=new Map,s.set(e,t)),n.set(e,t)}))}if(i&&0===i[Ae].length&&r){const e=s.get(i)
if(!e||0===e.size)return n}if(i){let e=s.get(i)
e||(e=new Map,s.set(i,e)),n.set(i,e)}else{let t=this._staged.get(e.type)
t||(t=new Map,this._staged.set(e.type,t)),n.set(De,t)}return n}populateManagedArray(e,t,r){this._pending.delete(e)
const i=e[Ae],s=i.slice()
i.length=0,qe(i,t),this._set.set(e,new Set(t)),Me(e),e.meta=r.meta||null,e.links=r.links||null,e.isLoaded=!0,function(e,t,r){for(let i=0;i<r.length;i++)$e(e,t,r[i])}(this._identifiers,e,s),Ne(this._identifiers,e,t)}identifierAdded(e){const t=this._getPendingFor(e,!1)
t&&t.forEach(((t,r)=>{"del"===t.get(e)?t.delete(e):(t.set(e,"add"),this.dirtyArray(r,t.size))}))}identifierRemoved(e){const t=this._getPendingFor(e,!0,!0)
t&&t.forEach(((t,r)=>{"add"===t.get(e)?t.delete(e):(t.set(e,"del"),this.dirtyArray(r,t.size))}))}identifierChanged(e){const t=this.store._instanceCache.recordIsLoaded(e,!0)
this._visibilitySet.get(e)!==t&&(t?this.identifierAdded(e):this.identifierRemoved(e))}clear(e=!0){this._live.forEach((t=>t.destroy(e))),this._managed.forEach((t=>t.destroy(e))),this._managed.clear(),this._identifiers.clear(),this._pending.clear(),this._set.forEach((e=>e.clear())),this._visibilitySet.clear()}destroy(){this.isDestroying=!0,this.clear(!1),this._live.clear(),this.isDestroyed=!0,this.store.notifications.unsubscribe(this._subscription)}}function Ne(e,t,r){for(let i=0;i<r.length;i++){const s=r[i]
let n=e.get(s)
n||(n=new Set,e.set(s,n)),n.add(t)}}function $e(e,t,r){const i=e.get(r)
i&&i.delete(t)}const ze=(0,n.L1)("Touching",Symbol("touching")),Le=(0,n.L1)("RequestPromise",Symbol("promise")),Be=[]
class Ve{constructor(e){f(this,"_pending",new Map),f(this,"_done",new Map),f(this,"_subscriptions",new Map),f(this,"_toFlush",[]),f(this,"_store",void 0),this._store=e}_clearEntries(e){this._done.delete(e)}_enqueue(e,t){const r=t.data[0]
if("recordIdentifier"in r){const i=r.recordIdentifier,s="saveRecord"===r.op?"mutation":"query"
this._pending.has(i)||this._pending.set(i,[])
const n={state:"pending",request:t,type:s}
return n[ze]=[r.recordIdentifier],n[Le]=e,this._pending.get(i).push(n),this._triggerSubscriptions(n),e.then((e=>{this._dequeue(i,n)
const r={state:"fulfilled",request:t,type:s,response:{data:e}}
return r[ze]=n[ze],this._addDone(r),this._triggerSubscriptions(r),e}),(e=>{this._dequeue(i,n)
const r={state:"rejected",request:t,type:s,response:{data:e}}
throw r[ze]=n[ze],this._addDone(r),this._triggerSubscriptions(r),e}))}}_triggerSubscriptions(e){"pending"!==e.state?(this._toFlush.push(e),1===this._toFlush.length&&this._store.notifications._onNextFlush((()=>{this._flush()}))):this._flushRequest(e)}_flush(){this._toFlush.forEach((e=>{this._flushRequest(e)})),this._toFlush=[]}_flushRequest(e){e[ze].forEach((t=>{const r=this._subscriptions.get(t)
r&&r.forEach((t=>t(e)))}))}_dequeue(e,t){const r=this._pending.get(e)
this._pending.set(e,r.filter((e=>e!==t)))}_addDone(e){e[ze].forEach((t=>{const r=e.request.data[0].op
let i=this._done.get(t)
i&&(i=i.filter((e=>{let t
return t=Array.isArray(e.request.data)?e.request.data[0]:e.request.data,t.op!==r}))),i=i||[],i.push(e),this._done.set(t,i)}))}subscribeForRecord(e,t){let r=this._subscriptions.get(e)
r||(r=[],this._subscriptions.set(e,r)),r.push(t)}getPendingRequestsForRecord(e){return this._pending.get(e)||Be}getLastRequestForRecord(e){const t=this._done.get(e)
return t?t[t.length-1]:null}}function Ue(e){return Boolean(e&&"string"==typeof e)}function He(e,t,r){if("object"==typeof e&&null!==e){const t=e
return S(t)||"id"in t&&(t.id=p(t.id)),t}{const i=p(t)
if(!Ue(i)){if(Ue(r))return{lid:r}
throw new Error("Expected either id or lid to be a valid string")}return Ue(r)?{type:e,id:i,lid:r}:{type:e,id:i}}}const We=class{constructor(e){}},Ke=We
Ke!==We&&(0,i.deprecate)("The Store class extending from EmberObject is deprecated.\nPlease remove usage of EmberObject APIs and mark your class as not requiring it.\n\nTo mark the class as no longer extending from EmberObject, in ember-cli-build.js\nset the following config:\n\n```js\nconst app = new EmberApp(defaults, {\n  emberData: {\n    deprecations: {\n      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false\n    }\n  }\n});\n```\n",!1,{id:"ember-data:deprecate-store-extends-ember-object",until:"6.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
class Ye extends Ke{get schema(){return this._schema||(this._schema=this.createSchemaService()),this._schema}get isDestroying(){return this._isDestroying}set isDestroying(e){this._isDestroying=e}get isDestroyed(){return this._isDestroyed}set isDestroyed(e){this._isDestroyed=e}constructor(e){super(e),Object.assign(this,e),this.identifierCache=new N,this.notifications=new ae(this),this.recordArrayManager=new xe({store:this}),this._requestCache=new Ve(this),this._instanceCache=new ee(this),this._documentCache=new Map,this.isDestroying=!1,this.isDestroyed=!1}_run(e){const t=this._cbs={}
e(),t.coalesce&&t.coalesce(),t.sync&&t.sync(),t.notify&&t.notify(),this._cbs=null}_join(e){this._cbs?e():this._run(e)}_schedule(e,t){this._cbs[e]=t}getRequestStateService(){return this._requestCache}_getAllPending(){}request(e){const t={store:this,[s._q]:!0}
if(e.records){const r=this.identifierCache
t.records=e.records.map((e=>r.getOrCreateRecordIdentifier(e)))}const r=Object.assign({},e,t),i=this.requestManager.request(r)
return i.onFinalize((()=>{("findBelongsTo"!==e.op||e.url)&&this.notifications._flush()})),i}modelFor(e){return function(e,t){let r=re.get(e)
r||(r=Object.create(null),re.set(e,r))
let i=r[t]
return void 0===i&&(i=r[t]=new ie(e,t)),i}(this,e)}createRecord(e,t){let r
return this._join((()=>{const i=g(e),s={...t}
let n=null
if(null===s.id||void 0===s.id){const e=this.adapterFor?.(i,!0)
n=e&&e.generateIdForRecord?s.id=p(e.generateIdForRecord(this,i,s)):s.id=null}else n=s.id=p(s.id)
const o={type:i,id:n}
o.id&&this.identifierCache.peekRecordIdentifier(o)
const a=this.identifierCache.createIdentifierForNewRecord(o),c=this.cache,l=function(e,t,r){if(void 0!==r){const{type:i}=t,s=e.schema.fields({type:i})
if(s.size){const e=Object.keys(r)
for(let t=0;t<e.length;t++){const i=e[t],n=s.get(i)
n&&("hasMany"===n.kind?r[i]=r[i].map((e=>Je(e))):"belongsTo"===n.kind&&(r[i]=Je(r[i])))}}}return r}(this,a,s),u=c.clientDidCreate(a,l)
r=this._instanceCache.getRecord(a,u)})),r}deleteRecord(e){const t=G(e),r=this.cache
this._join((()=>{r.setIsDeleted(t,!0),r.isNew(t)&&this._instanceCache.unloadRecord(t)}))}unloadRecord(e){const t=G(e)
t&&this._instanceCache.unloadRecord(t)}findRecord(e,t,r){Ge(e)?r=t:e=He(g(e),y(t))
const i=this.identifierCache.getOrCreateRecordIdentifier(e)
return(r=r||{}).preload&&(this._instanceCache.recordIsLoaded(i)||(r.reload=!0),this._join((()=>{!function(e,t,r){const i={},s=e.schema.fields(t)
Object.keys(r).forEach((e=>{const t=r[e],n=s.get(e)
!n||"hasMany"!==n.kind&&"belongsTo"!==n.kind?(i.attributes||(i.attributes={}),i.attributes[e]=t):(i.relationships||(i.relationships={}),i.relationships[e]=function(e,t){const r=e.type
return"hasMany"===e.kind?{data:t.map((e=>te(e,r)))}:{data:t?te(t,r):null}}(n,t))}))
const n=e.cache,o=Boolean(e._instanceCache.peek(t))
n.upsert(t,i,o)}(this,i,r.preload)}))),this.request({op:"findRecord",data:{record:i,options:r},cacheOptions:{[s.ER]:!0}}).then((e=>e.content))}getReference(e,t){let r
r=1===arguments.length&&Ge(e)?e:He(g(e),y(t))
const i=this.identifierCache.getOrCreateRecordIdentifier(r)
return this._instanceCache.getReference(i)}peekRecord(e,t){if(1===arguments.length&&Ge(e)){const t=this.identifierCache.peekRecordIdentifier(e)
return t&&this._instanceCache.recordIsLoaded(t)?this._instanceCache.getRecord(t):null}const r={type:g(e),id:y(t)},i=this.identifierCache.peekRecordIdentifier(r)
return i&&this._instanceCache.recordIsLoaded(i)?this._instanceCache.getRecord(i):null}query(e,t,r={}){return this.request({op:"query",data:{type:g(e),query:t,options:r},cacheOptions:{[s.ER]:!0}}).then((e=>e.content))}queryRecord(e,t,r){return this.request({op:"queryRecord",data:{type:g(e),query:t,options:r||{}},cacheOptions:{[s.ER]:!0}}).then((e=>e.content))}findAll(e,t={}){return this.request({op:"findAll",data:{type:g(e),options:t||{}},cacheOptions:{[s.ER]:!0}}).then((e=>e.content))}peekAll(e){return this.recordArrayManager.liveArrayFor(g(e))}unloadAll(e){this._join((()=>{void 0===e?(this._graph?.identifiers.clear(),this.recordArrayManager.clear(),this._instanceCache.clear()):this._instanceCache.clear(g(e))}))}push(e){const t=this._push(e,!1)
return Array.isArray(t)?t.map((e=>this._instanceCache.getRecord(e))):null===t?null:this._instanceCache.getRecord(t)}_push(e,t){let r
return t&&(this._enableAsyncFlush=!0),this._join((()=>{r=this.cache.put({content:e})})),this._enableAsyncFlush=null,"data"in r?r.data:null}saveRecord(e,t={}){const r=J(e),i=this.cache
if(!r)return Promise.reject(new Error("Record Is Disconnected"))
if(function(e,t){const r=e.cache
return!r||function(e,t){return t.isDeletionCommitted(e)||t.isNew(e)&&t.isDeleted(e)}(t,r)}(this._instanceCache,r))return Promise.resolve(e)
t||(t={})
let n="updateRecord"
i.isNew(r)?n="createRecord":i.isDeleted(r)&&(n="deleteRecord")
const o={op:n,data:{options:t,record:r},records:[r],cacheOptions:{[s.ER]:!0}}
return this.request(o).then((e=>e.content))}get cache(){let{cache:e}=this._instanceCache
return e||(e=this._instanceCache.cache=this.createCache(this._instanceCache._storeWrapper)),e}destroy(){this.isDestroyed||(this.isDestroying=!0,this._graph?.destroy(),this._graph=void 0,this.notifications.destroy(),this.recordArrayManager.destroy(),this.identifierCache.destroy(),this.unloadAll(),this.isDestroyed=!0)}static create(e){return new this(e)}}function Ge(e){return Boolean(null!==e&&"object"==typeof e&&("id"in e&&"type"in e&&e.id&&e.type||e.lid))}function Je(e){return e?J(e):null}function Qe(e){return"string"==typeof e?e:e.href}Ye.prototype.getSchemaDefinitionService=function(){return(0,i.deprecate)("Use `store.schema` instead of `store.getSchemaDefinitionService()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema},Ye.prototype.registerSchemaDefinitionService=function(e){(0,i.deprecate)("Use `store.createSchemaService` instead of `store.registerSchemaDefinitionService()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema=e},Ye.prototype.registerSchema=function(e){(0,i.deprecate)("Use `store.createSchemaService` instead of `store.registerSchema()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema=e}
var Ze=new WeakMap,Xe=new WeakSet
class et{constructor(e,t){var r
h(this,r=Xe),r.add(this),function(e,t){h(e,t),t.set(e,void 0)}(this,Ze),function(e,t,r){e.set(d(e,t),r)}(Ze,this,e),this.identifier=t}fetch(e={}){return e.cacheOptions=e.cacheOptions||{},e.cacheOptions.key=this.identifier?.lid,d(Xe,this,tt).call(this,this.links.related?"related":"self",e)}next(e={}){return d(Xe,this,tt).call(this,"next",e)}prev(e={}){return d(Xe,this,tt).call(this,"prev",e)}first(e={}){return d(Xe,this,tt).call(this,"first",e)}last(e={}){return d(Xe,this,tt).call(this,"last",e)}toJSON(){const e={}
return e.identifier=this.identifier,void 0!==this.data&&(e.data=this.data),void 0!==this.links&&(e.links=this.links),void 0!==this.errors&&(e.errors=this.errors),void 0!==this.meta&&(e.meta=this.meta),e}}async function tt(e,t){const r=this.links?.[e]
return r?(t.method=t.method||"GET",Object.assign(t,{url:Qe(r)}),(await(i=Ze,i.get(d(i,this))).request(t)).content):null
var i}(0,c.sg)(et.prototype,"data"),(0,c.sg)(et.prototype,"links"),(0,c.sg)(et.prototype,"errors"),(0,c.sg)(et.prototype,"meta")
const rt=new Set(["createRecord","updateRecord","deleteRecord"])
function it(e,t,r,i,s){const{identifier:n}=r
if(!i)return i
if(function(e){return"errors"in e}(i)){if(!n&&!r.shouldHydrate)return i
let t
return n&&(t=e._documentCache.get(n)),t?s||(t.data=void 0,ct(t,i)):(t=new et(e,n),ct(t,i),n&&e._documentCache.set(n,t)),r.shouldHydrate?t:i}if(Array.isArray(i.data)){const{recordArrayManager:o}=e
if(!n){if(!r.shouldHydrate)return i
const s=o.createArray({type:t.url,identifiers:i.data,doc:i,query:t}),n=new et(e,null)
return n.data=s,n.meta=i.meta,n.links=i.links,n}let a=o._keyedArrays.get(n.lid)
if(a){const t=e._documentCache.get(n)
return s||(o.populateManagedArray(a,i.data,i),t.data=a,t.meta=i.meta,t.links=i.links),r.shouldHydrate?t:i}{a=o.createArray({type:n.lid,identifiers:i.data,doc:i}),o._keyedArrays.set(n.lid,a)
const t=new et(e,n)
return t.data=a,t.meta=i.meta,t.links=i.links,e._documentCache.set(n,t),r.shouldHydrate?t:i}}{if(!n&&!r.shouldHydrate)return i
const t=i.data?e.peekRecord(i.data):null
let o
return n&&(o=e._documentCache.get(n)),o?s||(o.data=t,ct(o,i)):(o=new et(e,n),o.data=t,ct(o,i),n&&e._documentCache.set(n,o)),r.shouldHydrate?o:i}}function st(e){return Boolean(e.op&&rt.has(e.op))}function nt(e,t,r,i,n){const{store:o}=t.request,a=t.request[s._q]||!1
let c=!1
if(st(t.request)){c=!0
const e=t.request.data?.record||t.request.records?.[0]
e&&o.cache.willCommit(e,t)}o.lifetimes?.willRequest&&o.lifetimes.willRequest(t.request,r,o)
const l=e(t.request).then((e=>{let s
if(o.requestManager._pending.delete(t.id),o._enableAsyncFlush=!0,o._join((()=>{if(st(t.request)){const r=t.request.data?.record||t.request.records?.[0]
r?s=o.cache.didCommit(r,e):function(e){return!st(e.request)||("createRecord"===e.request.op&&201===e.response?.status?!!e.content&&Object.keys(e.content).length>0:204!==e.response?.status)}(e)&&(s=o.cache.put(e))}else s=o.cache.put(e)
s=it(o,t.request,{shouldHydrate:a,shouldFetch:i,shouldBackgroundFetch:n,identifier:r},s,!1)})),o._enableAsyncFlush=null,o.lifetimes?.didRequest&&o.lifetimes.didRequest(t.request,e.response,r,o),i)return s
n&&o.notifications._flush()}),(e=>{if(o.requestManager._pending.delete(t.id),t.request.signal?.aborted)throw e
let s
if(o.requestManager._pending.delete(t.id),o._enableAsyncFlush=!0,o._join((()=>{if(st(t.request)){const r=e&&e.content&&"object"==typeof e.content&&"errors"in e.content&&Array.isArray(e.content.errors)?e.content.errors:void 0,i=t.request.data?.record||t.request.records?.[0]
throw o.cache.commitWasRejected(i,r),e}s=o.cache.put(e),s=it(o,t.request,{shouldHydrate:a,shouldFetch:i,shouldBackgroundFetch:n,identifier:r},s,!1)})),o._enableAsyncFlush=null,r&&o.lifetimes?.didRequest&&o.lifetimes.didRequest(t.request,e.response,r,o),!n){const t=ot(e)
throw t.content=s,t}o.notifications._flush()}))
if(!c)return l
const u=t.request.data?.record||t.request.records?.[0]
return o._requestCache._enqueue(l,{data:[{op:"saveRecord",recordIdentifier:u,options:void 0}]})}function ot(e){const t=function(e){return e instanceof AggregateError||"AggregateError"===e.name&&Array.isArray(e.errors)}(e),r=t?new AggregateError(structuredClone(e.errors),e.message):new Error(e.message)
return r.stack=e.stack,r.error=e.error,Object.assign(r,e),r}const at={request(e,t){if(!e.request.store||e.request.cacheOptions?.[s.ER])return t(e.request)
const{store:r}=e.request,i=r.identifierCache.getOrCreateDocumentIdentifier(e.request),n=i?r.cache.peekRequest(i):null
if(function(e,t,r,i){const{cacheOptions:s}=t
return t.op&&rt.has(t.op)||s?.reload||!r||!(!e.lifetimes||!i)&&e.lifetimes.isHardExpired(i,e)}(r,e.request,!!n,i))return nt(t,e,i,!0,!1)
if(function(e,t,r,i){const{cacheOptions:s}=t
return s?.backgroundReload||!(!e.lifetimes||!i)&&e.lifetimes.isSoftExpired(i,e)}(r,e.request,0,i)){const s=nt(t,e,i,!1,!0)
r.requestManager._pending.set(e.id,s)}const o=e.request[s._q]||!1
if(e.setResponse(n.response),"error"in n){const t=o?it(r,e.request,{shouldHydrate:o,identifier:i},n.content,!0):n.content,s=ot(n)
throw s.content=t,s}return o?it(r,e.request,{shouldHydrate:o,identifier:i},n.content,!0):n.content}}
function ct(e,t){"links"in t&&(e.links=t.links),"meta"in t&&(e.meta=t.meta),"errors"in t&&(e.errors=t.errors)}},6730:(e,t,r)=>{r.r(t),r.d(t,{CacheHandler:()=>i.C,default:()=>i.S,recordIdentifierFor:()=>i.r,setIdentifierForgetMethod:()=>i.c,setIdentifierGenerationMethod:()=>i.a,setIdentifierResetMethod:()=>i.d,setIdentifierUpdateMethod:()=>i.b,setKeyInfoForResource:()=>i.e,storeFor:()=>i.s})
var i=r(9387)
r(1603),r(3241)},8146:(e,t,r)=>{r.d(t,{B1:()=>c,Fe:()=>u,RH:()=>l,V1:()=>y,i$:()=>g,n5:()=>p,sg:()=>d,zs:()=>f})
var i=r(4463),s=r(5606),n=r(7375)
function o(e){e&&(0,s.consumeTag)(e)}function a(e){e&&(0,s.dirtyTag)(e)}function c(e){const t=(0,n.Yj)("TRANSACTION")
t?t.sub.add(e):"tag"in e?(o(e["[]"]),o(e["@length"]),(0,s.consumeTag)(e.tag)):e.ref}function l(e){const t=(0,n.Yj)("TRANSACTION")
t?t.props.add(e):function(e){"tag"in e?(a(e["[]"]),a(e["@length"]),(0,s.dirtyTag)(e.tag)):e.ref=null}(e)}function u(e){const t=(0,n.Yj)("TRANSACTION")
t?t.cbs.add(e):e()}const h=(0,n.L1)("Signals",Symbol("Signals"))
function d(e,t,r){Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get(){const e=this[h]=this[h]||new Map,i=e.has(t),s=function(e,t,r){let i=e.get(r)
return i||(i=p(t,r),e.set(r,i)),c(i),i}(e,this,t)
return i||void 0===r||(s.lastValue=r),s.lastValue},set(e){const r=this[h]=this[h]||new Map
let i=r.get(t)
i||(i=p(this,t),r.set(t,i)),i.lastValue!==e&&(i.lastValue=e,l(i))}})}function f(e,t){t["[]"]=(0,i.tagForProperty)(e,"[]"),t["@length"]=(0,i.tagForProperty)(e,"length")}function p(e,t){return{key:t,tag:(0,i.tagForProperty)(e,t),t:!1,shouldReset:!1,"[]":null,"@length":null,lastValue:void 0}}function y(e,t,r){let i=e[h]
i||(i=new Map,e[h]=i)
let s=i.get(t)
return s||(s=p(e,t),s.shouldReset=r,i.set(t,s)),s}function g(e,t){const r=e[h]
if(r)return r.get(t)}},8738:(e,t,r)=>{r.d(t,{PO:()=>n,Vv:()=>s.dependentKeyCompat})
var i=r(4217),s=(r(8146),r(394))
function n(e,t,r){const s=new WeakMap,n=r.get
r.get=function(){return s.has(this)||s.set(this,(0,i.createCache)(n.bind(this))),(0,i.getValue)(s.get(this))}}},3193:(e,t,r)=>{function i(e){return e?.__esModule?e:{default:e,...e}}r.d(t,{A:()=>i})},7375:(e,t,r)=>{r.d(t,{L1:()=>c,Yj:()=>l,dN:()=>d,dV:()=>u,ml:()=>f,vs:()=>h})
const i="@warp-drive/core-types",s=globalThis,n=s.__warpDrive_universalCache=s.__warpDrive_universalCache??{}
s[i]=s[i]??{__version:"0.0.0-beta.11"}
const o=s[i],a=o.__warpDrive_ModuleScopedCaches??{}
if(o.__warpDrive_hasOtherCopy)throw new Error("Multiple copies of EmberData detected, the application will malfunction.")
function c(e,t){return t}function l(e){return a[`(transient) ${e}`]??null}function u(e,t){return a[`(transient) ${e}`]=t}function h(e,t){return t}function d(e){return n[`(transient) ${e}`]??null}function f(e,t){return n[`(transient) ${e}`]=t}o.__warpDrive_hasOtherCopy=!0},7648:(e,t,r)=>{r.d(t,{ER:()=>s,J6:()=>o,_q:()=>n,k0:()=>a})
var i=r(7375)
const s=(0,i.vs)("SkipCache",Symbol.for("wd:skip-cache")),n=(0,i.vs)("EnableHydration",Symbol.for("wd:enable-hydration")),o=(0,i.L1)("IS_FUTURE",Symbol("IS_FUTURE")),a=(0,i.L1)("DOC",Symbol("DOC"))},1788:(e,t,r)=>{r.d(t,{k5:()=>n,pm:()=>s})
var i=r(7375)
const s=(0,i.L1)("Store",Symbol("Store")),n=(0,i.L1)("$type",Symbol("$type"));(0,i.L1)("RequestSignature",Symbol("RequestSignature"))},8995:(e,t,r)=>{r.d(t,{w:()=>u})
var i=r(3211),s=r.n(i),n=r(558),o=r(327),a=r(1603),c=r(1223)
class l extends o.O{assert(...e){(0,a.assert)(...e)}async(e){(0,c.join)((()=>(0,c.schedule)("actions",e)))}reportUncaughtRejection(e){(0,c.next)(null,(function(){if(!s().onerror)throw e
s().onerror(e)}))}defer(){return(0,n.v6)()}globalDebuggingEnabled(){return s().ENV.DEBUG_TASKS}}const u=new l},327:(e,t,r)=>{r.d(t,{O:()=>i,U:()=>s})
class i{assert(){}async(e){Promise.resolve().then(e)}reportUncaughtRejection(){this.async((e=>{throw e}))}defer(){let e={promise:null,resolve:null,reject:null},t=new Promise(((t,r)=>{e.resolve=t,e.reject=r}))
return e.promise=t,e}globalDebuggingEnabled(){return!1}}const s=new i},5053:(e,t,r)=>{r.d(t,{A:()=>i})
class i{constructor(e){this.maxConcurrency=e||1}}},2249:(e,t,r)=>{r.d(t,{A:()=>a})
var i=r(5053),s=r(3204)
const n=(0,s.kw)("it belongs to a 'drop' Task that was already running")
class o{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,s.su):n}}class a extends i.A{makeReducer(){return new o(this.maxConcurrency)}}},1488:(e,t,r)=>{r.d(t,{A:()=>o})
var i=r(5053),s=r(3204)
class n{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,s.su):s.I$}}class o extends i.A{makeReducer(){return new n(this.maxConcurrency)}}},3204:(e,t,r)=>{r.d(t,{Hs:()=>n,I$:()=>a,Tb:()=>i,dJ:()=>s,kw:()=>c,su:()=>o})
const i="CANCELLED",s="STARTED",n="QUEUED",o={type:s},a={type:n},c=e=>({type:i,reason:e})},8611:(e,t,r)=>{r.d(t,{A:()=>a})
var i=r(5053),s=r(3204)
const n=(0,s.kw)("it belongs to a 'keepLatest' Task that was already running")
class o{constructor(e,t){this.remainingSlots=e,this.numToCancel=t}step(){return this.remainingSlots>0?(this.remainingSlots--,s.su):this.numToCancel>0?(this.numToCancel--,n):s.I$}}class a extends i.A{makeReducer(e,t){let r=e+t
return new o(this.maxConcurrency,r-this.maxConcurrency-1)}}},5867:(e,t,r)=>{r.d(t,{A:()=>a})
var i=r(5053),s=r(3204)
const n=(0,s.kw)("it belongs to a 'restartable' Task that was .perform()ed again")
class o{constructor(e){this.numToCancel=e}step(){return this.numToCancel>0?(this.numToCancel--,n):s.su}}class a extends i.A{makeReducer(e,t){return new o(e+t-this.maxConcurrency)}}},5674:(e,t,r)=>{r.d(t,{A:()=>d})
var i=r(3204)
const s=new Map
class n{constructor(e,t,r){this.stateTracker=t,this.schedulerPolicy=e,this.initialTaskInstances=r,this.startingInstances=[]}process(){let[e,t,r]=this.filterFinishedTaskInstances(),i=this.schedulerPolicy.makeReducer(t,r),s=e.filter((e=>this.setTaskInstanceExecutionState(e,i.step())))
return this.stateTracker.computeFinalStates((e=>this.applyState(e))),this.startingInstances.forEach((e=>e.start())),s}filterFinishedTaskInstances(){let e=0,t=0
return[this.initialTaskInstances.filter((r=>{let i=this.stateTracker.stateFor(r.task),s=r.executor.state
return s.isFinished?(i.onCompletion(r),!1):(s.hasStarted?e+=1:t+=1,!0)})),e,t]}setTaskInstanceExecutionState(e,t){let r=this.stateTracker.stateFor(e.task)
switch(e.executor.counted||(e.executor.counted=!0,r.onPerformed(e)),t.type){case i.Tb:return e.cancel(t.reason),!1
case i.dJ:return e.executor.state.hasStarted||(this.startingInstances.push(e),r.onStart(e)),r.onRunning(e),!0
case i.Hs:return r.onQueued(e),!0}}applyState(e){let{taskable:t}=e
if(!t.onState)return
const{guid:r}=t
if(s.has(r)&&e.tag<s.get(r))return
let i=Object.assign({numRunning:e.numRunning,numQueued:e.numQueued,numPerformedInc:e.numPerformedInc},e.attrs)
t.onState(i,t),s.set(r,e.tag)}}var o=r(9053)
class a{constructor(e,t){this.taskable=e,this.group=e.group,this.numRunning=0,this.numQueued=0,this.numPerformedInc=0,this.attrs={},this.tag=t}onCompletion(e){let t=e.completionState
this.attrs.lastRunning=null,this.attrs.lastComplete=e,t===o.R5?this.attrs.lastSuccessful=e:(t===o.KH?this.attrs.lastErrored=e:t===o.kY&&(this.attrs.lastCanceled=e),this.attrs.lastIncomplete=e)}onPerformed(e){this.numPerformedInc+=1,this.attrs.lastPerformed=e}onStart(e){this.attrs.last=e}onRunning(e){this.attrs.lastRunning=e,this.numRunning+=1}onQueued(){this.numQueued+=1}recurseTaskGroups(e){let t=this.group
for(;t;)e(t),t=t.group}applyStateFrom(e){Object.assign(this.attrs,e.attrs),this.numRunning+=e.numRunning,this.numQueued+=e.numQueued,this.numPerformedInc+=e.numPerformedInc}}const c=new Map
class l{constructor(){this.states=new Map}stateFor(e){let t=e.guid,r=this.states.get(t)
if(!r){let i=c.has(t)?c.get(t):0
r=new a(e,++i),this.states.set(t,r),c.set(t,i)}return r}computeFinalStates(e){this.computeRecursiveState(),this.forEachState((t=>e(t)))}computeRecursiveState(){this.forEachState((e=>{let t=e
e.recurseTaskGroups((e=>{let r=this.stateFor(e)
r.applyStateFrom(t),t=r}))}))}forEachState(e){this.states.forEach((t=>e(t)))}}const u=new class{onCompletion(){}onPerformed(){}onStart(){}onRunning(){}onQueued(){}}
class h{stateFor(){return u}computeFinalStates(){}}class d{constructor(e,t){this.schedulerPolicy=e,this.stateTrackingEnabled=t,this.taskInstances=[]}cancelAll(e,t){let r=this.taskInstances.map((r=>{r.task.guids[e]&&r.executor.cancel(t)})).filter((e=>!!e))
return Promise.all(r)}perform(e){e.onFinalize((()=>this.scheduleRefresh())),this.taskInstances.push(e),this.refresh()}scheduleRefresh(){Promise.resolve().then((()=>this.refresh()))}refresh(){let e=this.stateTrackingEnabled?new l:new h,t=new n(this.schedulerPolicy,e,this.taskInstances)
this.taskInstances=t.process()}}},5045:(e,t,r)=>{r.d(t,{Ag:()=>b,U6:()=>m,mp:()=>_,Zm:()=>g})
var i=r(5674),s=r(3204)
const n=new class{step(){return s.su}}
class o{makeReducer(){return n}}var a=r(1488),c=r(2249),l=r(8611),u=r(5867),h=r(3757),d=r(8163),f=r(327)
function p(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const y={enqueue:(e,t)=>t&&e.setBufferPolicy(a.A),evented:(e,t)=>t&&e.setEvented(t),debug:(e,t)=>t&&e.setDebug(t),drop:(e,t)=>t&&e.setBufferPolicy(c.A),group:(e,t)=>e.setGroup(t),keepLatest:(e,t)=>t&&e.setBufferPolicy(l.A),maxConcurrency:(e,t)=>e.setMaxConcurrency(t),onState:(e,t)=>e.setOnState(t),restartable:(e,t)=>t&&e.setBufferPolicy(u.A)}
function g(e,t){if(y[e])throw new Error(`A modifier with the name '${e}' has already been defined.`)
y[e]=t}function m(e){return y[e]}function _(e){return e in y}let b=class{constructor(e="<unknown>",t=null,r={}){p(this,"env",f.U),p(this,"_debug",null),p(this,"_enabledModifiers",[]),p(this,"_hasSetConcurrencyConstraint",!1),p(this,"_hasSetBufferPolicy",!1),p(this,"_hasEnabledEvents",!1),p(this,"_maxConcurrency",null),p(this,"_onStateCallback",((e,t)=>t.setState(e))),p(this,"_schedulerPolicyClass",o),p(this,"_taskGroupPath",null),this.name=e,this.taskDefinition=t,this.options=r,this._processModifierOptions(r)}createTask(e){let t=this.getTaskOptions(e)
return new h.Y(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}createTaskGroup(e){let t=this.getTaskOptions(e)
return new d.N(t)}getModifier(e){if(_(e))return y[e].bind(null,this)}getOptions(){return this.options}getScheduler(e,t){return new i.A(e,t)}getTaskOptions(e){let t,r,i=this._onStateCallback
if(this._taskGroupPath){if(t=e[this._taskGroupPath],!(t instanceof d.N))throw new Error(`Expected group '${this._taskGroupPath}' to be defined but was not found.`)
r=t.scheduler}else{let e=new this._schedulerPolicyClass(this._maxConcurrency)
r=this.getScheduler(e,i&&"function"==typeof i)}return{context:e,debug:this._debug,env:this.env,name:this.name,group:t,scheduler:r,hasEnabledEvents:this._hasEnabledEvents,onStateCallback:i,enabledModifiers:this._enabledModifiers,modifierOptions:this.getOptions()}}setBufferPolicy(e){return function(e){if(e._hasSetBufferPolicy)throw new Error(`Cannot set multiple buffer policies on a task or task group. ${e._schedulerPolicyClass} has already been set for task or task group '${e.name}'`)}(this),this._hasSetBufferPolicy=!0,this._hasSetConcurrencyConstraint=!0,this._schedulerPolicyClass=e,function(e){if(e._hasSetConcurrencyConstraint&&e._taskGroupPath)throw new Error("Cannot use both 'group' and other concurrency-constraining task modifiers (e.g. 'drop', 'enqueue', 'restartable')")}(this),this}setDebug(e){return this._debug=e,this}setEvented(e){return this._hasEnabledEvents=e,this}setMaxConcurrency(e){return this._hasSetConcurrencyConstraint=!0,this._maxConcurrency=e,this}setGroup(e){return this._taskGroupPath=e,this}setName(e){return this.name=e,this}setOnState(e){return this._onStateCallback=e,this}setTaskDefinition(e){return this.taskDefinition=e,this}_processModifierOptions(e){if(e)for(let t of Object.keys(e)){let r=e[t],i=this.getModifier(t)
"function"==typeof i&&i(r)&&this._enabledModifiers.push(t)}}}},585:(e,t,r)=>{r.d(t,{Jn:()=>n,Vt:()=>a,W5:()=>i,aV:()=>c,f6:()=>o,iw:()=>s,qs:()=>l})
const i="TaskCancelation"
function s(e){return e&&e.name===i}const n="explicit",o="yielded",a="lifespan_end",c="parent_cancel"
class l{constructor(e,t){this.kind=e,this.reason=t,this.promise=new Promise((e=>{this.finalize=e}))}}},9053:(e,t,r)=>{r.d(t,{KH:()=>n,R5:()=>s,XS:()=>i,kY:()=>o})
const i=0,s=1,n=2,o=3},9295:(e,t,r)=>{r.d(t,{Ni:()=>l,B0:()=>h,wA:()=>u,_p:()=>y,Px:()=>p})
class i{constructor(e,t,r){this.value=e,this.done=t,this.errored=r}}class s{constructor(e){this.done=!1,this.generatorFactory=e,this.iterator=null}step(e,t){try{let r=this.getIterator(),{value:s,done:n}=r[t](e)
return n?this.finalize(s,!1):new i(s,!1,!1)}catch(e){return this.finalize(e,!0)}}getIterator(){return this.iterator||this.done||(this.iterator=this.generatorFactory()),this.iterator}finalize(e,t){return this.done=!0,this.iterator=null,new i(e,!0,t)}}var n=r(2234),o=r(6334),a=r(9053),c=r(585)
const l="PERFORM_TYPE_DEFAULT",u="PERFORM_TYPE_UNLINKED",h="PERFORM_TYPE_LINKED",d={}
let f=[]
function p(){return f[f.length-1]}class y{constructor({generatorFactory:e,env:t,debug:r}){this.generatorState=new s(e),this.state=Object.assign({},n.N),this.index=1,this.disposers=[],this.finalizeCallbacks=[],this.env=t,this.debug=r,this.cancelRequest=null}start(){this.state.hasStarted||this.cancelRequest||(this.setState({hasStarted:!0}),this.proceedSync(o.MM,void 0),this.taskInstance.onStarted())}cancel(e){return this.requestCancel(e)?(this.state.hasStarted?this.proceedWithCancelAsync():this.finalizeWithCancel(),this.cancelRequest.promise):(e.finalize(),e.promise)}setState(e){Object.assign(this.state,e),this.taskInstance.setState(this.state)}proceedChecked(e,t,r){this.state.isFinished||this.advanceIndex(e)&&(t===o.X7?(this.requestCancel(new c.qs(c.f6),r),this.proceedWithCancelAsync()):this.proceedAsync(t,r))}proceedWithCancelAsync(){this.proceedAsync(o.HD,d)}proceedAsync(e,t){this.advanceIndex(this.index),this.env.async((()=>this.proceedSync(e,t)))}proceedSync(e,t){this.state.isFinished||(this.dispose(),this.generatorState.done?this.handleResolvedReturnedValue(e,t):this.handleResolvedContinueValue(e,t))}handleResolvedContinueValue(e,t){let r=this.index,i=this.generatorStep(t,e)
this.advanceIndex(r)&&(i.errored?this.finalize(i.value,a.KH):this.handleYieldedValue(i))}handleResolvedReturnedValue(e,t){switch(e){case o.MM:case o.HD:this.finalize(t,a.R5)
break
case o.pA:this.finalize(t,a.KH)}}handleYieldedUnknownThenable(e){let t=this.index
e.then((e=>{this.proceedChecked(t,o.MM,e)}),(e=>{this.proceedChecked(t,o.pA,e)}))}advanceIndex(e){if(this.index===e)return++this.index}handleYieldedValue(e){let t=e.value
t?(this.addDisposer(t[o.Zp]),t[o.Sx]?this.invokeYieldable(t):"function"==typeof t.then?this.handleYieldedUnknownThenable(t):this.proceedWithSimpleValue(t)):this.proceedWithSimpleValue(t)}proceedWithSimpleValue(e){this.proceedAsync(o.MM,e)}addDisposer(e){"function"==typeof e&&this.disposers.push(e)}dispose(){let e=this.disposers
0!==e.length&&(this.disposers=[],e.forEach((e=>e())))}generatorStep(e,t){f.push(this)
let r=this.generatorState.step(e,t)
if(f.pop(),this._expectsLinkedYield){let e=r.value
e&&e.performType===h||console.warn("You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency)."),this._expectsLinkedYield=!1}return r}maybeResolveDefer(){this.defer&&this.state.isFinished&&(this.state.completionState===a.R5?this.defer.resolve(this.state.value):this.defer.reject(this.state.error))}onFinalize(e){this.finalizeCallbacks.push(e),this.state.isFinished&&this.runFinalizeCallbacks()}runFinalizeCallbacks(){this.finalizeCallbacks.forEach((e=>e())),this.finalizeCallbacks=[],this.maybeResolveDefer(),this.maybeThrowUnhandledTaskErrorLater()}promise(){return this.defer||(this.defer=this.env.defer(),this.asyncErrorsHandled=!0,this.maybeResolveDefer()),this.defer.promise}maybeThrowUnhandledTaskErrorLater(){this.asyncErrorsHandled||this.state.completionState!==a.KH||(0,c.iw)(this.state.error)||this.env.async((()=>{this.asyncErrorsHandled||this.env.reportUncaughtRejection(this.state.error)}))}requestCancel(e){return!this.cancelRequest&&!this.state.isFinished&&(this.cancelRequest=e,!0)}finalize(e,t){if(this.cancelRequest)return this.finalizeWithCancel()
let r={completionState:t}
t===a.R5?(r.isSuccessful=!0,r.value=e):t===a.KH?(r.isError=!0,r.error=e):t===a.kY&&(r.error=e),this.finalizeShared(r)}finalizeWithCancel(){let e=this.taskInstance.formatCancelReason(this.cancelRequest.reason),t=new Error(e)
this.debugEnabled()&&console.log(e),t.name=c.W5,this.finalizeShared({isCanceled:!0,completionState:a.kY,error:t,cancelReason:e}),this.cancelRequest.finalize()}debugEnabled(){return this.debug||this.env.globalDebuggingEnabled()}finalizeShared(e){this.index++,e.isFinished=!0,this.setState(e),this.runFinalizeCallbacks(),this.dispatchFinalizeEvents(e.completionState)}dispatchFinalizeEvents(e){switch(e){case a.R5:this.taskInstance.onSuccess()
break
case a.KH:this.taskInstance.onError(this.state.error)
break
case a.kY:this.taskInstance.onCancel(this.state.cancelReason)}}invokeYieldable(e){try{let t=e[o.Sx](this.taskInstance,this.index)
this.addDisposer(t)}catch(e){this.env.reportUncaughtRejection(e)}}onYielded(e,t){this.asyncErrorsHandled=!0,this.onFinalize((()=>{let r=this.state.completionState
r===a.R5?e.proceed(t,o.MM,this.state.value):r===a.KH?e.proceed(t,o.pA,this.state.error):r===a.kY&&e.proceed(t,o.X7,null)}))
let r=this.getPerformType()
if(r!==u)return()=>{this.detectSelfCancelLoop(r,e),this.cancel(new c.qs(c.aV))}}getPerformType(){return this.taskInstance.performType||l}detectSelfCancelLoop(e,t){if(e!==l)return
let r=t.executor&&t.executor.cancelRequest
!r||r.kind!==c.Vt||this.cancelRequest||this.state.isFinished||this.taskInstance.selfCancelLoopWarning(t)}}},2234:(e,t,r)=>{r.d(t,{N:()=>i})
const i={completionState:r(9053).XS,value:null,error:null,isSuccessful:!1,isError:!1,isCanceled:!1,hasStarted:!1,isFinished:!1}},7291:(e,t,r)=>{r.d(t,{K:()=>i})
const i={last:null,lastRunning:null,lastPerformed:null,lastSuccessful:null,lastComplete:null,lastErrored:null,lastCanceled:null,lastIncomplete:null,performCount:0}
Object.freeze(i)},8163:(e,t,r)=>{r.d(t,{N:()=>s})
var i=r(5209)
let s=class extends i.c{}},3757:(e,t,r)=>{r.d(t,{Y:()=>o})
var i=r(5209),s=r(9295)
class n{constructor(e,t,r){this.task=e,this.performType=t,this.linkedObject=r}perform(...e){return this.task._performShared(e,this.performType,this.linkedObject)}}let o=class e extends i.c{constructor(e){super(e),this.generatorFactory=e.generatorFactory,this.perform=this._perform.bind(this)}linked(){let e=(0,s.Px)()
if(!e)throw new Error("You can only call .linked() from within a task.")
return new n(this,s.B0,e)}unlinked(){return new n(this,s.wA,null)}toString(){return`<Task:${this.name}>`}_clone(){return new e({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}_curry(...e){let t=this._clone()
return t._curryArgs=[...this._curryArgs||[],...e],t}_perform(...e){return this._performShared(e,s.Ni,null)}_performShared(e,t,r){let i=this._curryArgs?[...this._curryArgs,...e]:e,n=this._taskInstanceFactory(i,t,r)
return t===s.B0&&(r._expectsLinkedYield=!0),this._isAlive||n.cancel(),this.scheduler.perform(n),n}_taskInstanceOptions(e,t,r){return{task:this,args:e,executor:new s._p({generatorFactory:()=>this.generatorFactory(e),env:this.env,debug:this.debug}),performType:t,hasEnabledEvents:this.hasEnabledEvents}}}},5209:(e,t,r)=>{r.d(t,{c:()=>o})
var i=r(7291),s=r(585)
let n=0
class o{constructor(e){this.context=e.context,this.debug=e.debug||!1,this.enabledModifiers=e.enabledModifiers,this.env=e.env,this.group=e.group,this.hasEnabledEvents=e.hasEnabledEvents,this.modifierOptions=e.modifierOptions,this.name=e.name,this.onStateCallback=e.onStateCallback,this.scheduler=e.scheduler,this.guid="ec_"+n++,this.guids={},this.guids[this.guid]=!0,this.group&&Object.assign(this.guids,this.group.guids)}cancelAll(e){let{reason:t,cancelRequestKind:r,resetState:i}=e||{}
t=t||".cancelAll() was explicitly called on the Task"
let n=new s.qs(r||s.Jn,t)
return this.scheduler.cancelAll(this.guid,n).then((()=>{i&&this._resetState()}))}get _isAlive(){return!0}_resetState(){this.setState(i.K)}setState(){}}Object.assign(o.prototype,i.K),Object.assign(o.prototype,{numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"})},6334:(e,t,r)=>{r.d(t,{G$:()=>f,HD:()=>a,MM:()=>n,Oc:()=>y,Sx:()=>s,X7:()=>c,Zp:()=>i,_d:()=>u,i4:()=>p,pA:()=>o})
const i="__ec_cancel__",s="__ec_yieldable__",n="next",o="throw",a="return",c="cancel"
class l{constructor(e,t){this._taskInstance=e,this._resumeIndex=t}getTaskInstance(){return this._taskInstance}cancel(){let e=this._taskInstance
e.proceed.call(e,this._resumeIndex,c)}next(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,n,e)}return(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,a,e)}throw(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,o,e)}}class u{constructor(){this[s]=this[s].bind(this)}onYield(){}_deferable(){let e={resolve:void 0,reject:void 0}
return e.promise=new Promise(((t,r)=>{e.resolve=t,e.reject=r})),e}_toPromise(){let e=this._deferable(),t={proceed(t,r,i){r==n||r==a?e.resolve(i):e.reject(i)}},r=this[s](t,0)
return e.promise[i]=r,e.promise}then(...e){return this._toPromise().then(...e)}catch(...e){return this._toPromise().catch(...e)}finally(...e){return this._toPromise().finally(...e)}[s](e,t){let r=new l(e,t)
return this.onYield(r)}}class h extends u{onYield(e){let t=requestAnimationFrame((()=>e.next()))
return()=>cancelAnimationFrame(t)}}class d extends u{constructor(e){super(),this.ms=e}onYield(e){let t=setTimeout((()=>e.next()),this.ms)
return()=>clearTimeout(t)}}function f(){return new h}const p=new class extends u{onYield(){}}
function y(e){return new d(e)}},9781:(e,t,r)=>{r.d(t,{F:()=>n})
var i=r(4471),s=r(1603)
function n(e,t,r,n){let o=r[0],a=r.slice(1)
return function(...r){if(o&&"function"==typeof o[t]){if(n&&n.value){let e=r.pop()
r.push((0,i.get)(e,n.value))}return o[t](...a,...r)}(0,s.assert)(`The first argument passed to the \`${e}\` helper should be a Task object (without quotes); you passed ${o}`,!1)}}},1369:(e,t,r)=>{r.d(t,{A:()=>b})
var i=r(1603),s=r(4471),n=r(4505),o=r(123),a=r(1223),c=r(5045),l=r(979),u=r(1309),h=r(1533),d=r(5674)
class f extends d.A{scheduleRefresh(){(0,a.once)(this,this.refresh)}}var p=r(8995)
let y=0
function g(e,t,r,i,s,n){if(r&&r.length>0)for(let o=0;o<r.length;++o){let a=r[o],c="__ember_concurrency_handler_"+y++
t[c]=m(i,s,n),e(t,a,null,c)}}function m(e,t,r){return function(){let i=(0,s.get)(this,e)
r?(0,a.scheduleOnce)("actions",i,t,...arguments):i[t].apply(i,arguments)}}const _=e=>Array.isArray(e)?e:[e];(0,c.Zm)("cancelOn",((e,t)=>e.addCancelEvents(..._(t)))),(0,c.Zm)("observes",((e,t)=>e.addObserverKeys(..._(t)))),(0,c.Zm)("on",((e,t)=>e.addPerformEvents(..._(t))))
class b extends c.Ag{constructor(...e){var t,r,i
super(...e),t=this,r="env",i=p.w,(r=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(r))in t?Object.defineProperty(t,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[r]=i}createTask(e){(0,i.assert)("Cannot create task if a task definition is not provided as generator function or encapsulated task.",this.taskDefinition)
let t=this.getTaskOptions(e)
return"object"==typeof this.taskDefinition?new l.N(Object.assign({taskObj:this.taskDefinition},t)):new l.Y(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}createTaskGroup(e){(0,i.assert)("A task definition is not expected for a task group.",!this.taskDefinition)
let t=this.getTaskOptions(e)
return new h.N(t)}addCancelEvents(...e){return this._cancelEventNames=this._cancelEventNames||[],this._cancelEventNames.push(...e),this}addObserverKeys(...e){return this._observes=this._observes||[],this._observes.push(...e),this}addPerformEvents(...e){return this._eventNames=this._eventNames||[],this._eventNames.push(...e),this}getModifier(e){let t=super.getModifier(e)
return t||"function"!=typeof u.BA.prototype[e]||(t=u.BA.prototype[e].bind(this)),(0,i.assert)(`Task option '${e}' is not recognized as a supported option.`,t),t}getScheduler(e,t){return new f(e,t)}_setupEmberKVO(e){g(n.addListener,e,this._eventNames,this.name,"perform",!1),g(n.addListener,e,this._cancelEventNames,this.name,"cancelAll",!1),g(o.addObserver,e,this._observes,this.name,"perform",!0)}get taskFn(){return this.taskDefinition}set taskFn(e){this.setTaskDefinition(e)}}},1533:(e,t,r)=>{r.d(t,{N:()=>o})
var i=r(8163),s=r(3247),n=r(3118)
class o extends i.N{}n.e&&Object.defineProperties(o.prototype,n.e),Object.assign(o.prototype,s.W)},3459:(e,t,r)=>{r.d(t,{H:()=>c})
var i=r(2234),s=r(6334),n=r(585)
class o{constructor({task:e,args:t,executor:r,performType:i,hasEnabledEvents:s}){this.task=e,this.args=t,this.performType=i,this.executor=r,this.executor.taskInstance=this,this.hasEnabledEvents=s}setState(){}onStarted(){}onSuccess(){}onError(){}onCancel(){}formatCancelReason(){}selfCancelLoopWarning(){}onFinalize(e){this.executor.onFinalize(e)}proceed(e,t,r){this.executor.proceedChecked(e,t,r)}[s.Sx](e,t){return this.executor.onYielded(e,t)}cancel(e=".cancel() was explicitly called"){this.executor.cancel(new n.qs(n.Jn,e))}then(...e){return this.executor.promise().then(...e)}catch(...e){return this.executor.promise().catch(...e)}finally(...e){return this.executor.promise().finally(...e)}toString(){return`${this.task} TaskInstance`}start(){return this.executor.start(),this}}Object.assign(o.prototype,i.N),Object.assign(o.prototype,{state:"waiting",isDropped:!1,isRunning:!0})
var a=r(3118)
class c extends o{setState(e){let t=this._recomputeState(e)
Object.assign(this,{...e,isRunning:!e.isFinished,isDropped:"dropped"===t,state:t})}_recomputeState(e){return e.isDropped?"dropped":e.isCanceled?e.hasStarted?"canceled":"dropped":e.isFinished?"finished":e.hasStarted?"running":"waiting"}onStarted(){this.triggerEvent("started",this)}onSuccess(){this.triggerEvent("succeeded",this)}onError(e){this.triggerEvent("errored",this,e)}onCancel(e){this.triggerEvent("canceled",this,e)}formatCancelReason(e){return`TaskInstance '${this.getName()}' was canceled because ${e}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`}getName(){return this.name||(this.name=this.task&&this.task.name||"<unknown>"),this.name}selfCancelLoopWarning(e){let t=`\`${e.getName()}\``,r=`\`${this.getName()}\``
console.warn(`ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${t} and child task ${r}. If you want child task ${r} to be canceled when parent task ${t} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${r} to keep running after parent task ${t} is canceled, change it to \`.unlinked().perform()\``)}triggerEvent(...e){if(!this.hasEnabledEvents)return
let t=this.task,r=t.context,i=t&&t.name
if(r&&r.trigger&&i){let[t,...s]=e
r.trigger(`${i}:${t}`,...s)}}}a.O&&Object.defineProperties(c.prototype,a.O)},1309:(e,t,r)=>{r.d(t,{BA:()=>d,GL:()=>u,ah:()=>f,nY:()=>y})
var i=r(3211),s=r.n(i),n=r(4471),o=r(1488),a=r(2249),c=r(8611),l=r(5867)
let u="__ec_task_factory"
const h={restartable(){return this[u].setBufferPolicy(l.A),this},enqueue(){return this[u].setBufferPolicy(o.A),this},drop(){return this[u].setBufferPolicy(a.A),this},keepLatest(){return this[u].setBufferPolicy(c.A),this},maxConcurrency(e){return this[u].setMaxConcurrency(e),this},group(e){return this[u].setGroup(e),this},evented(){return this[u].setEvented(!0),this},debug(){return this[u].setDebug(!0),this},onState(e){return this[u].setOnState(e),this}}
class d{}class f{}Object.assign(f.prototype,h),Object.assign(d.prototype,h,{setup(e,t){this.callSuperSetup&&this.callSuperSetup(...arguments),this[u].setName(t),this[u]._setupEmberKVO(e)},on(){return this[u].addPerformEvents(...arguments),this},cancelOn(){return this[u].addCancelEvents(...arguments),this},observes(){return this[u].addObserverKeys(...arguments),this}})
const p=s()._setClassicDecorator||s()._setComputedDecorator
function y(e){let t=function(r,i){return void 0!==t.setup&&t.setup(r,i),(0,n.computed)(e)(...arguments)}
return p(t),t}},979:(e,t,r)=>{r.d(t,{N:()=>y,Y:()=>f})
var i=r(2294),s=r(4471),n=r.n(s),o=r(1130),a=r(3757),c=r(3459),l=r(9295),u=r(3247),h=r(3118),d=r(585)
class f extends a.Y{constructor(e){super(e),(0,o.isDestroying)(this.context)||(0,o.registerDestructor)(this.context,(()=>{this.cancelAll({reason:"the object it lives on was destroyed or unrendered",cancelRequestKind:d.Vt})}))}get _isAlive(){return!(0,o.isDestroying)(this.context)}_taskInstanceFactory(e,t,r){let i=this._taskInstanceOptions(e,t,r)
return new c.H(i)}_clone(){return new f({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}}h.e&&Object.defineProperties(f.prototype,h.e),Object.assign(f.prototype,u.W)
const p="__ec__encap_current_ti"
class y extends f{constructor(e){super(e),this.taskObj=e.taskObj,this._encapsulatedTaskStates=new WeakMap,this._encapsulatedTaskInstanceProxies=new WeakMap}_getEncapsulatedTaskClass(){let e=this._encapsulatedTaskImplClass
return e||(e=n().extend(this.taskObj,{unknownProperty(e){let t=this[p]
return t?t[e]:void 0}})),e}_taskInstanceFactory(e,t){let r,s=(0,i.getOwner)(this.context),n=this._getEncapsulatedTaskClass().create({context:this.context});(0,i.setOwner)(n,s)
let o=new c.H({task:this,args:e,executor:new l._p({generatorFactory:()=>n.perform.apply(r,e),env:this.env,debug:this.debug}),performType:t,hasEnabledEvents:this.hasEnabledEvents})
return n[p]=o,this._encapsulatedTaskStates.set(o,n),r=this._wrappedEncapsulatedTaskInstance(o),r}_wrappedEncapsulatedTaskInstance(e){if(!e)return null
let t=this._encapsulatedTaskInstanceProxies,r=t.get(e)
if(!r){let i=this._encapsulatedTaskStates.get(e)
r=new Proxy(e,{get:(e,t)=>t in e?e[t]:(0,s.get)(i,t.toString()),set:(e,t,r)=>(t in e?e[t]=r:(0,s.set)(i,t.toString(),r),!0),has:(e,t)=>t in e||t in i,ownKeys:e=>Reflect.ownKeys(e).concat(Reflect.ownKeys(i)),defineProperty(r,s,n){let o=t.get(e)
return o&&(n.get?n.get=n.get.bind(o):o&&n.set&&(n.set=n.set.bind(o))),Reflect.defineProperty(i,s,n)},getOwnPropertyDescriptor:(e,t)=>t in e?Reflect.getOwnPropertyDescriptor(e,t):Reflect.getOwnPropertyDescriptor(i,t)}),t.set(e,r)}return r}}},3247:(e,t,r)=>{r.d(t,{W:()=>i})
const i={_performCount:0,setState(e){this._performCount=this._performCount+(e.numPerformedInc||0)
let t=e.numRunning>0,r=e.numQueued>0,i=Object.assign({},e,{performCount:this._performCount,isRunning:t,isQueued:r,isIdle:!t&&!r,state:t?"running":"idle"})
Object.assign(this,i)},onState(e,t){t.onStateCallback&&t.onStateCallback(e,t)}}},3118:(e,t,r)=>{r.d(t,{O:()=>c,e:()=>a})
var i=r(473),s=r(7291),n=r(2234)
function o(e,t){return Object.keys(e).reduce(((t,r)=>function(e,t,r){const s=Object.getOwnPropertyDescriptor(e,r)
s.initializer=s.initializer||(()=>e[r]),delete s.value
const n=(0,i.tracked)(t,r,s)
return t[r]=n,t}(e,t,r)),t)}let a,c
a=o(s.K,{}),a=o({numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"},a),c=o(n.N,{}),c=o({state:"waiting",isDropped:!1,isRunning:!1},c),Object.freeze(a),Object.freeze(c)},5936:(e,t,r)=>{r.r(t),r.d(t,{buildTask:()=>s})
var i=r(1369)
function s(e,t,r,s){let n=t
s&&(n=Object.assign({},n),n[s]=!0)
const o=e()
return new i.A(r||"<unknown>",o.generator,n).createTask(o.context)}},495:(e,t,r)=>{r.r(t),r.d(t,{cancelHelper:()=>a,default:()=>c})
var i=r(336),s=r(1603),n=r(9781)
const o="the 'cancel-all' template helper was invoked"
function a(e){let t=e[0]
return t&&"function"==typeof t.cancelAll||(0,s.assert)(`The first argument passed to the \`cancel-all\` helper should be a Task or TaskGroup (without quotes); you passed ${t}`,!1),(0,n.F)("cancel-all","cancelAll",[t,{reason:o}])}var c=(0,i.helper)(a)},4418:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c,performHelper:()=>a})
var i=r(336),s=r(1603),n=r(9781)
function o(e){return function(t){"function"==typeof e?e(t):null===e||(0,s.assert)(`The onError argument passed to the \`perform\` helper should be a function or null; you passed ${e}`,!1)}}function a(e,t){let r=(0,n.F)("perform","perform",e,t)
return t&&void 0!==t.onError?function(...e){try{return r(...e).catch(o(t.onError))}catch{o(t.onError)}}:r}var c=(0,i.helper)(a)},74:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i})
var i=(0,r(336).helper)((function(e){let[t,...r]=e
return t._curry(...r)}))},8968:(e,t,r)=>{r.r(t),r.d(t,{Task:()=>ee.Y,TaskGroup:()=>O.N,TaskGroupProperty:()=>l.ah,TaskInstance:()=>D.H,TaskProperty:()=>l.BA,Yieldable:()=>o,all:()=>q,allSettled:()=>x,animationFrame:()=>n.G$,didCancel:()=>X.iw,dropTask:()=>v,dropTaskGroup:()=>A,enqueueTask:()=>w,enqueueTaskGroup:()=>E,forever:()=>n.i4,getModifier:()=>h.U6,hasModifier:()=>h.mp,hash:()=>$,hashSettled:()=>z,keepLatestTask:()=>k,keepLatestTaskGroup:()=>C,lastValue:()=>_,race:()=>N,rawTimeout:()=>n.Oc,registerModifier:()=>h.Zm,restartableTask:()=>S,restartableTaskGroup:()=>T,task:()=>j,taskGroup:()=>P,timeout:()=>c,waitForEvent:()=>Q,waitForProperty:()=>Z,waitForQueue:()=>J})
var i=r(1223),s=r(8995),n=r(6334)
class o extends n._d{_deferable(){return s.w.defer()}}class a extends o{constructor(e){super(),this.ms=e}onYield(e){let t=(0,i.later)((()=>e.next()),this.ms)
return()=>(0,i.cancel)(t)}}function c(e){return new a(e)}var l=r(1309),u=r(1369),h=r(5045)
function d(e,t,r,i=[],s=h.Ag){let n,{initializer:o,get:a,value:c}=r
o?n=o.call(void 0):a?n=a.call(void 0):c&&(n=c),n.displayName=`${t} (task)`
let l=new WeakMap,u=new s(t,n,i[0]||{})
return u._setupEmberKVO(e),{get(){let e=l.get(this)
return e||(e=u.createTask(this),l.set(this,e)),e}}}function f(e,t,r,i=[],s=h.Ag){let n=new WeakMap,o=new s(t,null,i[0]||{})
return{get(){let e=n.get(this)
return e||(e=o.createTaskGroup(this),n.set(this,e)),e}}}function p(e){return function(...t){return function(e){let[t,r,i]=e
return 3===e.length&&"object"==typeof t&&null!==t&&"string"==typeof r&&("object"==typeof i&&null!==i&&"enumerable"in i&&"configurable"in i||void 0===i)}(t)?e(...t):(...r)=>e(...r,t)}}function y(e,t={},r=h.Ag){return p(((i,s,n,[o]=[])=>{let a=Object.assign({},{...t,...o})
return e(i,s,n,[a],r)}))}function g(e={},t=h.Ag){return y(d,e,t)}function m(e={},t=h.Ag){return y(f,e,t)}const _=p(((e,t,r,[i]=[])=>{const{initializer:s}=r
return delete r.initializer,{get(){let e=this[i].lastSuccessful
return e?e.value:s?s.call(this):void 0}}})),b=g({},u.A),v=g({drop:!0},u.A),w=g({enqueue:!0},u.A),k=g({keepLatest:!0},u.A),S=g({restartable:!0},u.A),R=m({},u.A),A=m({drop:!0},u.A),E=m({enqueue:!0},u.A),C=m({keepLatest:!0},u.A),T=m({restartable:!0},u.A)
var M=r(1603),O=r(1533)
function j(e,t,r){var i
return(0,M.assert)('It appears you\'re attempting to use the new task(async () => { ... }) syntax, but the async arrow task function you\'ve provided is not being properly compiled by Babel.\n\nPossible causes / remedies:\n\n1. You must pass the async function expression directly to the task() function (it is not currently supported to pass in a variable containing the async arrow fn, or any other kind of indirection)\n2. The new task syntax is only supported by native classes. Ensure that this is one.\n3. If this code is in an addon, please ensure the addon specifies ember-concurrency "2.3.0" or higher in "dependencies" (not "devDependencies")\n4. Ensure that there is only one version of ember-concurrency v2.3.0+ being used in your project (including nested dependencies) and consider using npm/yarn/pnpm resolutions to enforce a single version is used\n5. Ensure that you have registered the Babel transform that Ember Concurrency uses to transform tasks in the "async-arrow" notation, see https://ember-concurrency.com/docs/v4-upgrade',!((i=arguments[arguments.length-1])&&i.constructor&&"AsyncFunction"===i.constructor.name)),F(e)||t&&r?b(...arguments):function(e){const t=(0,l.nY)((function(){return t[l.GL].setTaskDefinition(t.taskFn),t[l.GL].createTask(this)}))
return t.taskFn=e,t[l.GL]=new u.A,Object.setPrototypeOf(t,l.BA.prototype),t}(e)}function P(e,t,r){if(F(e)||t&&r)return R(...arguments)
{let e=(0,l.nY)((function(t){return e[l.GL].setName(t),e[l.GL].createTaskGroup(this)}))
return e[l.GL]=new u.A,Object.setPrototypeOf(e,l.ah.prototype),e}}function F(e){return!(!e||"function"==typeof e||"object"==typeof e&&"perform"in e&&"function"==typeof e.perform||Object.getPrototypeOf(e)!==Object.prototype)}var D=r(3459),I=r(558)
const q=U(I.Ay.Promise,"all",L),x=U(I.Ay,"allSettled",L),N=U(I.K7,"race",L),$=U(I.Ay,"hash",B),z=U(I.Ay,"hashSettled",B)
function L(e){return e}function B(e){return Object.keys(e).map((t=>e[t]))}function V(e){if(e)if(e instanceof D.H)e.executor.asyncErrorsHandled=!0
else if(e instanceof n._d)return e._toPromise()
return e}function U(e,t,r){return function(i){let s=function(e,t){if(Array.isArray(e))return e.map(t)
if("object"==typeof e&&null!==e){let r={}
return Object.keys(e).forEach((i=>{r[i]=t(e[i])})),r}return e}(i,V),o=r(s);(0,M.assert)(`'${t}' expects an array.`,Array.isArray(o))
let a=I.Ay.defer()
e[t](s).then(a.resolve,a.reject)
let c=!1,l=()=>{c||(c=!0,o.forEach((e=>{e&&(e instanceof D.H?e.cancel():"function"==typeof e[n.Zp]&&e[n.Zp]())})))},u=a.promise.finally(l)
return u[n.Zp]=l,u}}var H=r(4471),W=r(123)
class K extends o{constructor(e){super(),this.queueName=e}onYield(e){let t
try{t=(0,i.schedule)(this.queueName,(()=>e.next()))}catch(t){e.throw(t)}return()=>(0,i.cancel)(t)}}class Y extends o{constructor(e,t){super(),this.object=e,this.eventName=t,this.usesDOMEvents=!1}on(e){"function"==typeof this.object.addEventListener?(this.usesDOMEvents=!0,this.object.addEventListener(this.eventName,e)):this.object.on(this.eventName,e)}off(e){this.usesDOMEvents?this.object.removeEventListener(this.eventName,e):this.object.off(this.eventName,e)}onYield(e){let t=null,r=()=>{t&&this.off(t),t=null}
return t=t=>{r(),e.next(t)},this.on(t),r}}class G extends o{constructor(e,t,r=Boolean){super(),this.object=e,this.key=t,this.predicateCallback="function"==typeof r?r:e=>e===r}onYield(e){let t=!1,r=()=>{let t=(0,H.get)(this.object,this.key)
if(this.predicateCallback(t))return e.next(t),!0}
return r()||((0,W.addObserver)(this.object,this.key,null,r),t=!0),()=>{t&&r&&(0,W.removeObserver)(this.object,this.key,null,r)}}}function J(e){return new K(e)}function Q(e,t){var r
return(0,M.assert)(`${e} must include Ember.Evented (or support \`.on()\` and \`.off()\`) or DOM EventTarget (or support \`addEventListener\` and  \`removeEventListener\`) to be able to use \`waitForEvent\``,(r=e)&&("function"==typeof r.one&&"function"==typeof r.off||"function"==typeof r.on&&"function"==typeof r.off||"function"==typeof r.addEventListener&&"function"==typeof r.removeEventListener)),new Y(e,t)}function Z(e,t,r){return new G(e,t,r)}var X=r(585),ee=r(979)},7099:(e,t,r)=>{r.r(t),r.d(t,{default:()=>mt})
var i=r(151)
const s={iterator:()=>({next:()=>({done:!0,value:void 0})})}
class n{constructor(e){this.version="2",this._capabilities=e,this.__cache=new Map,this.__graph=(0,i.graphFor)(e),this.__destroyedCache=new Map,this.__documents=new Map}put(e){if(b(e))return this._putDocument(e,void 0,void 0)
if(function(e){return!(e instanceof Error)&&e.content&&!("data"in e.content)&&!("included"in e.content)&&"meta"in e.content}(e))return this._putDocument(e,void 0,void 0)
const t=e.content,r=t.included
let i,s
const{identifierCache:n}=this._capabilities
if(r)for(i=0,s=r.length;i<s;i++)r[i]=m(this,n,r[i])
if(Array.isArray(t.data)){s=t.data.length
const o=[]
for(i=0;i<s;i++)o.push(m(this,n,t.data[i]))
return this._putDocument(e,o,r)}if(null===t.data)return this._putDocument(e,null,r)
const o=m(this,n,t.data)
return this._putDocument(e,o,r)}_putDocument(e,t,r){const i=b(e)?function(e){const t={}
return e.content&&(v(t,e.content),"errors"in e.content?t.errors=e.content.errors:"object"==typeof e.error&&"errors"in e.error?t.errors=e.error.errors:t.errors=[{title:e.message}]),t}(e):function(e){const t={},r=e.content
return r&&v(t,r),t}(e)
void 0!==t&&(i.data=t),void 0!==r&&(i.included=r)
const s=e.request,n=s?this._capabilities.identifierCache.getOrCreateDocumentIdentifier(s):null
if(n){i.lid=n.lid,e.content=i
const t=this.__documents.has(n.lid)
this.__documents.set(n.lid,e),this._capabilities.notifyChange(n,t?"updated":"added")}return i}patch(e){if("mergeIdentifiers"===e.op){const t=this.__cache.get(e.record)
t&&(this.__cache.set(e.value,t),this.__cache.delete(e.record)),this.__graph.update(e,!0)}}mutate(e){this.__graph.update(e,!1)}peek(e){if("type"in e){const t=this.__safePeek(e,!1)
if(!t)return null
const{type:r,id:i,lid:s}=e,n=Object.assign({},t.remoteAttrs,t.inflightAttrs,t.localAttrs),o={},a=this.__graph.identifiers.get(e)
a&&Object.keys(a).forEach((t=>{a[t].definition.isImplicit||(o[t]=this.__graph.getData(e,t))})),this._capabilities
const l=this._capabilities._store
return this._capabilities.schema.fields(e).forEach(((t,r)=>{if(r in n&&void 0!==n[r])return
const i=c(t,e,l)
void 0!==i&&(n[r]=i)})),{type:r,id:i,lid:s,attributes:n,relationships:o}}const t=this.peekRequest(e)
return t&&"content"in t?t.content:null}peekRequest(e){return this.__documents.get(e.lid)||null}upsert(e,t,r){let i
const s=this.__safePeek(e,!1),n=!!s,o=s||this._createCache(e),a=function(e,t,r){const i=t._store.getRequestStateService()
return!d(e)&&i.getPendingRequestsForRecord(r).some((e=>"query"===e.type))}(s,this._capabilities,e)||!d(s),c=!function(e){if(!e)return!0
const t=e.isNew,r=e.isDeleted,i=h(e)
return(!t||r)&&i}(s)&&!a
return o.isNew&&(o.isNew=!1,this._capabilities.notifyChange(e,"identity"),this._capabilities.notifyChange(e,"state")),r&&(i=n?u(o,t.attributes):Object.keys(t.attributes||{})),o.remoteAttrs=Object.assign(o.remoteAttrs||Object.create(null),t.attributes),o.localAttrs&&g(o)&&this._capabilities.notifyChange(e,"state"),c||this._capabilities.notifyChange(e,"added"),t.id&&(o.id=t.id),t.relationships&&f(this.__graph,this._capabilities,e,t),i&&i.length&&l(this._capabilities,e,i),i}fork(){throw new Error("Not Implemented")}merge(e){throw new Error("Not Implemented")}diff(){throw new Error("Not Implemented")}dump(){throw new Error("Not Implemented")}hydrate(e){throw new Error("Not Implemented")}clientDidCreate(e,t){this._createCache(e).isNew=!0
const r={}
if(void 0!==t){const i=this._capabilities.schema.fields(e),s=this.__graph,n=Object.keys(t)
for(let o=0;o<n.length;o++){const a=n[o],c=t[a]
if("id"===a)continue
const l=i.get(a)
let u
switch(void 0!==l?"kind"in l?l.kind:"attribute":null){case"attribute":this.setAttr(e,a,c),r[a]=c
break
case"belongsTo":this.mutate({op:"replaceRelatedRecord",field:a,record:e,value:c}),u=s.get(e,a),u.state.hasReceivedData=!0,u.state.isEmpty=!1
break
case"hasMany":this.mutate({op:"replaceRelatedRecords",field:a,record:e,value:c}),u=s.get(e,a),u.state.hasReceivedData=!0,u.state.isEmpty=!1
break
default:r[a]=c}}}return this._capabilities.notifyChange(e,"added"),r}willCommit(e){const t=this.__peek(e,!1)
t.inflightAttrs?t.localAttrs&&Object.assign(t.inflightAttrs,t.localAttrs):t.inflightAttrs=t.localAttrs,t.localAttrs=null}didCommit(e,t){const r=t.content,i=t.request.op,s=r&&r.data,{identifierCache:n}=this._capabilities,o=e.id,a="deleteRecord"!==i&&s?n.updateRecordIdentifier(e,s):e,c=this.__peek(a,!1)
let h
c.isDeleted&&(this.__graph.push({op:"deleteRecord",record:a,isNew:!1}),c.isDeletionCommitted=!0,this._capabilities.notifyChange(a,"removed")),c.isNew=!1,s&&(s.id&&!c.id&&(c.id=s.id),a===e&&a.id!==o&&this._capabilities.notifyChange(a,"identity"),s.relationships&&f(this.__graph,this._capabilities,a,s),h=s.attributes)
const d=u(c,h)
c.remoteAttrs=Object.assign(c.remoteAttrs||Object.create(null),c.inflightAttrs,h),c.inflightAttrs=null,g(c),c.errors&&(c.errors=null,this._capabilities.notifyChange(a,"errors")),l(this._capabilities,a,d),this._capabilities.notifyChange(a,"state")
const p=r&&r.included
if(p)for(let l=0,u=p.length;l<u;l++)m(this,n,p[l])
return{data:a}}commitWasRejected(e,t){const r=this.__peek(e,!1)
if(r.inflightAttrs){const e=Object.keys(r.inflightAttrs)
if(e.length>0){const t=r.localAttrs=r.localAttrs||Object.create(null)
for(let i=0;i<e.length;i++)void 0===t[e[i]]&&(t[e[i]]=r.inflightAttrs[e[i]])}r.inflightAttrs=null}t&&(r.errors=t),this._capabilities.notifyChange(e,"errors")}unloadRecord(e){const t=this._capabilities
if(!this.__cache.has(e))return void(0,i.peekGraph)(t)?.unload(e)
const r=!this.isDeletionCommitted(e)
let s=!1
const n=this.__peek(e,!1)
n.isNew?(0,i.peekGraph)(t)?.push({op:"deleteRecord",record:e,isNew:!0}):(0,i.peekGraph)(t)?.unload(e),n.localAttrs=null,n.remoteAttrs=null,n.defaultAttrs=null,n.inflightAttrs=null
const o=function(e,t){const r=[],i=[],s=new Set
for(i.push(t);i.length>0;){const n=i.shift()
r.push(n),s.add(n)
const o=_(e,t).iterator()
for(let e=o.next();!e.done;e=o.next()){const t=e.value
t&&!s.has(t)&&(s.add(t),i.push(t))}}return r}(t,e)
if(function(e,t){for(let r=0;r<t.length;++r){const i=t[r]
if(e.hasRecord(i))return!1}return!0}(t,o))for(let i=0;i<o.length;++i){const e=o[i]
t.notifyChange(e,"removed"),s=!0,t.disconnectRecord(e)}this.__cache.delete(e),this.__destroyedCache.set(e,n),1===this.__destroyedCache.size&&setTimeout((()=>{this.__destroyedCache.clear()}),100),!s&&r&&t.notifyChange(e,"removed")}getAttr(e,t){const r=!Array.isArray(t)||1===t.length
if(Array.isArray(t)&&1===t.length&&(t=t[0]),r){const r=t,s=this.__peek(e,!0)
if(s.localAttrs&&r in s.localAttrs)return s.localAttrs[r]
if(s.inflightAttrs&&r in s.inflightAttrs)return s.inflightAttrs[r]
if(s.remoteAttrs&&r in s.remoteAttrs)return s.remoteAttrs[r]
if(s.defaultAttrs&&r in s.defaultAttrs)return s.defaultAttrs[r]
{const t=this._capabilities.schema.fields(e).get(r)
this._capabilities
const n=c(t,e,this._capabilities._store)
return(i=t)&&a(i.options)&&(s.defaultAttrs=s.defaultAttrs||Object.create(null),s.defaultAttrs[r]=n),n}}var i
const s=t,n=this.__peek(e,!0),o=s[0]
let l=n.localAttrs&&o in n.localAttrs?n.localAttrs[o]:void 0
if(void 0===l&&(l=n.inflightAttrs&&o in n.inflightAttrs?n.inflightAttrs[o]:void 0),void 0===l&&(l=n.remoteAttrs&&o in n.remoteAttrs?n.remoteAttrs[o]:void 0),void 0!==l){for(let e=1;e<s.length;e++)if(l=l[s[e]],void 0===l)return
return l}}setAttr(e,t,r){const i=!Array.isArray(t)||1===t.length
if(Array.isArray(t)&&1===t.length&&(t=t[0]),i){const i=this.__peek(e,!1),s=t,n=i.inflightAttrs&&s in i.inflightAttrs?i.inflightAttrs[s]:i.remoteAttrs&&s in i.remoteAttrs?i.remoteAttrs[s]:void 0
return n!==r?(i.localAttrs=i.localAttrs||Object.create(null),i.localAttrs[s]=r,i.changes=i.changes||Object.create(null),i.changes[s]=[n,r]):i.localAttrs&&(delete i.localAttrs[s],delete i.changes[s]),i.defaultAttrs&&s in i.defaultAttrs&&delete i.defaultAttrs[s],void this._capabilities.notifyChange(e,"attributes",s)}const s=t,n=this.__peek(e,!1),o=s[0],a=n.inflightAttrs&&o in n.inflightAttrs?n.inflightAttrs[o]:n.remoteAttrs&&o in n.remoteAttrs?n.remoteAttrs[o]:void 0
let c
if(a){c=a[s[1]]
for(let e=2;e<s.length;e++)c=c[s[e]]}if(c!==r){n.localAttrs=n.localAttrs||Object.create(null),n.localAttrs[o]=n.localAttrs[o]||structuredClone(a),n.changes=n.changes||Object.create(null)
let e=n.localAttrs[o],t=1
for(;t<s.length-1;)e=e[s[t++]]
e[s[t]]=r,n.changes[o]=[a,n.localAttrs[o]]}else if(n.localAttrs)try{if(!a)return
JSON.stringify(a)!==JSON.stringify(n.localAttrs[o])&&(delete n.localAttrs[o],delete n.changes[o])}catch(e){}this._capabilities.notifyChange(e,"attributes",o)}changedAttrs(e){return this.__peek(e,!1).changes||Object.create(null)}hasChangedAttrs(e){const t=this.__peek(e,!0)
return null!==t.inflightAttrs&&Object.keys(t.inflightAttrs).length>0||null!==t.localAttrs&&Object.keys(t.localAttrs).length>0}rollbackAttrs(e){const t=this.__peek(e,!1)
let r
return t.isDeleted=!1,null!==t.localAttrs&&(r=Object.keys(t.localAttrs),t.localAttrs=null,t.changes=null),t.isNew&&(t.isDeletionCommitted=!0,t.isDeleted=!0,t.isNew=!1),t.inflightAttrs=null,t.defaultAttrs=null,t.errors&&(t.errors=null,this._capabilities.notifyChange(e,"errors")),this._capabilities.notifyChange(e,"state"),r&&r.length&&l(this._capabilities,e,r),r||[]}changedRelationships(e){return this.__graph.getChanged(e)}hasChangedRelationships(e){return this.__graph.hasChanged(e)}rollbackRelationships(e){let t
return this._capabilities,this._capabilities._store._join((()=>{t=this.__graph.rollback(e)})),t}getRelationship(e,t){return this.__graph.getData(e,t)}setIsDeleted(e,t){this.__peek(e,!1).isDeleted=t,this._capabilities.notifyChange(e,"state")}getErrors(e){return this.__peek(e,!0).errors||[]}isEmpty(e){const t=this.__safePeek(e,!0)
return!t||null===t.remoteAttrs&&null===t.inflightAttrs&&null===t.localAttrs}isNew(e){return this.__safePeek(e,!0)?.isNew||!1}isDeleted(e){return this.__safePeek(e,!0)?.isDeleted||!1}isDeletionCommitted(e){return this.__safePeek(e,!0)?.isDeletionCommitted||!1}_createCache(e){const t={id:null,remoteAttrs:null,localAttrs:null,defaultAttrs:null,inflightAttrs:null,changes:null,errors:null,isNew:!1,isDeleted:!1,isDeletionCommitted:!1}
return this.__cache.set(e,t),t}__safePeek(e,t){let r=this.__cache.get(e)
return!r&&t&&(r=this.__destroyedCache.get(e)),r}__peek(e,t){return this.__safePeek(e,t)}}function o(e){return(0,i.isBelongsTo)(e)?e.remoteState?[e.remoteState]:[]:e.remoteState}function a(e){return!!e&&"function"==typeof e.defaultValue}function c(e,t,r){const i=e?.options
if(e&&(i||e.type)&&("attribute"===e.kind||"field"===e.kind)){if(a(i))return i.defaultValue()
if(i&&"defaultValue"in i)return i.defaultValue
if("attribute"!==e.kind&&e.type){const s=r.schema.transformation(e)
if(s?.defaultValue)return s.defaultValue(i||null,t)}}}function l(e,t,r){if(r)for(let i=0;i<r.length;i++)e.notifyChange(t,"attributes",r[i])
else e.notifyChange(t,"attributes")}function u(e,t){const r=[]
if(t){const i=Object.keys(t),s=i.length,n=e.localAttrs,o=Object.assign(Object.create(null),e.remoteAttrs,e.inflightAttrs)
for(let e=0;e<s;e++){const s=i[e],a=t[s]
n&&void 0!==n[s]||o[s]!==a&&r.push(s)}}return r}function h(e){return!e||null===e.remoteAttrs&&null===e.inflightAttrs&&null===e.localAttrs}function d(e,t=!1){if(!e)return!1
const r=e.isNew,i=h(e)
return r?!e.isDeleted:!(t&&e.isDeletionCommitted||i)}function f(e,t,r,i){const s=t.schema.fields(r)
for(const[n,o]of s){if(!y(o))continue
const t=i.relationships[n]
t&&e.push({op:"updateRelationship",record:r,field:n,value:t})}}const p=new Set(["hasMany","belongsTo","resource","collection"])
function y(e){return p.has(e.kind)}function g(e){const{localAttrs:t,remoteAttrs:r,inflightAttrs:i,defaultAttrs:s,changes:n}=e
if(!t)return e.changes=null,!1
let o=!1
const a=Object.keys(t)
for(let c=0,l=a.length;c<l;c++){const e=a[c];(i&&e in i?i[e]:r&&e in r?r[e]:void 0)===t[e]&&(o=!0,delete t[e],delete n[e]),s&&e in s&&delete s[e]}return o}function m(e,t,r){let i=t.peekRecordIdentifier(r)
return i=i?t.updateRecordIdentifier(i,r):t.getOrCreateRecordIdentifier(r),e.upsert(i,r,e._capabilities.hasRecord(i)),i}function _(e,t){const r=(0,i.peekGraph)(e),n=r?.identifiers.get(t)
if(!n)return s
const a=[]
Object.keys(n).forEach((e=>{const t=n[e]
t&&!t.definition.isImplicit&&a.push(t)}))
let c=0,l=0,u=0
return{iterator:()=>({next:()=>{const e=(()=>{for(;c<a.length;){for(;l<2;){const t=0===l?(e=a[c],(0,i.isBelongsTo)(e)?e.localState?[e.localState]:[]:e.additions?[...e.additions]:[]):o(a[c])
for(;u<t.length;){const e=t[u++]
if(null!==e)return e}u=0,l++}l=0,c++}var e})()
return{value:e,done:void 0===e}}})}}function b(e){return e instanceof Error}function v(e,t){"links"in t&&(e.links=t.links),"meta"in t&&(e.meta=t.meta)}var w=r(2294),k=r(6730),S=r(1274),R=r(5501)
function A(e,t,r,i){const s=t.data?(0,R.i)(t.data,((t,s)=>{const{id:n,type:o}=t
return function(e,t,r,i){const{id:s,type:n}=e
e.relationships||(e.relationships={})
const{relationships:o}=e,a=function(e,t,r,i){const{name:s}=r,{type:n}=t,o=function(e,t,r){const i=e.schema.fields(t).get(r)
return i?i.options.inverse:null}(e,{type:n},s)
if(o)return{inverseKey:o,kind:e.schema.fields({type:i}).get(o).kind}}(r,t,i,n)
if(a){const{inverseKey:e,kind:r}=a,i=o[e]?.data
"hasMany"===r&&void 0===i||(o[e]=o[e]||{},o[e].data=function(e,t,{id:r,type:i}){const s={id:r,type:i}
let n=null
if("hasMany"===t){const t=e||[]
e&&e.find((e=>e.type===s.type&&e.id===s.id))||t.push(s),n=t}else{const t=e||{}
Object.assign(t,s),n=t}return n}(i??null,r,t))}}(t,r,e,i),{id:n,type:o}})):null,n={}
"meta"in t&&(n.meta=t.meta),"links"in t&&(n.links=t.links),"data"in t&&(n.data=s)
const o={id:r.id,type:r.type,relationships:{[i.name]:n}}
return Array.isArray(t.included)||(t.included=[]),t.included.push(o),t}const E=new Set(["findRecord","findAll","query","queryRecord","findBelongsTo","findHasMany","updateRecord","createRecord","deleteRecord"]),C={request(e,t){if(e.request.url||!e.request.op||!E.has(e.request.op))return t(e.request)
const{store:r}=e.request
switch(r._fetchManager||(r._fetchManager=new R.F(r)),e.request.op){case"findRecord":return function(e){const{store:t,data:r}=e.request,{record:i,options:s}=r
let n
if(t._instanceCache.recordIsLoaded(i))if(s.reload)(0,R.a)(i),n=t._fetchManager.scheduleFetch(i,s,e.request)
else{let r=null
const o=t.adapterFor(i.type)
void 0===s.reload&&o.shouldReloadRecord&&o.shouldReloadRecord(t,r=t._fetchManager.createSnapshot(i,s))?((0,R.a)(i),s.reload=!0,n=t._fetchManager.scheduleFetch(i,s,e.request)):(!1===s.backgroundReload||!s.backgroundReload&&o.shouldBackgroundReloadRecord&&!o.shouldBackgroundReloadRecord(t,r=r||t._fetchManager.createSnapshot(i,s))||((0,R.a)(i),s.backgroundReload=!0,t._fetchManager.scheduleFetch(i,s,e.request)),n=Promise.resolve(i))}else n=t._fetchManager.fetchDataIfNeededForIdentifier(i,s,e.request)
return n.then((e=>t.peekRecord(e)))}(e)
case"findAll":return function(e){const{store:t,data:r}=e.request,{type:i,options:s}=r,n=t.adapterFor(i),o=t.recordArrayManager._live.get(i),a=new R.b(t,i,s)
let c
return s.reload||!1!==s.reload&&(n.shouldReloadAll&&n.shouldReloadAll(t,a)||!n.shouldReloadAll&&0===a.length)?(o&&(o.isUpdating=!0),c=M(n,t,i,a,e.request,!0)):(c=Promise.resolve(t.peekAll(i)),(s.backgroundReload||!1!==s.backgroundReload&&(!n.shouldBackgroundReloadAll||n.shouldBackgroundReloadAll(t,a)))&&(o&&(o.isUpdating=!0),M(n,t,i,a,e.request,!1))),c}(e)
case"query":return function(e){const{store:t,data:r}=e.request
let{options:i}=r
const{type:s,query:n}=r,o=t.adapterFor(s),a=i._recordArray||t.recordArrayManager.createArray({type:s,query:n})
delete i._recordArray
const c=t.modelFor(s)
return Promise.resolve().then((()=>o.query(t,c,n,a,i))).then((e=>{const r=t.serializerFor(s),i=(0,R.n)(r,t,c,e,null,"query"),n=t._push(i,!0)
return t.recordArrayManager.populateManagedArray(a,n,i),a}))}(e)
case"queryRecord":return function(e){const{store:t,data:r}=e.request,{type:i,query:s,options:n}=r,o=t.adapterFor(i),a=t.modelFor(i)
return Promise.resolve().then((()=>o.queryRecord(t,a,s,n))).then((e=>{const r=t.serializerFor(i),s=(0,R.n)(r,t,a,e,null,"queryRecord"),n=t._push(s,!0)
return n?t.peekRecord(n):null}))}(e)
case"findBelongsTo":return function(e){const{store:t,data:r,records:i}=e.request,{options:s,record:n,links:o,useLink:a,field:c}=r,l=i?.[0],u=l&&t._fetchManager.getPendingFetch(l,s)
if(u)return u
if(a)return function(e,t,r,i,s){return Promise.resolve().then((()=>{const n=e.adapterFor(t.type),o=e._fetchManager.createSnapshot(t,s),a=r&&"string"!=typeof r?r.href:r
return n.findBelongsTo(e,o,a,i)})).then((r=>{const s=e.modelFor(i.type),n=e.serializerFor(i.type)
let o=(0,R.n)(n,e,s,r,null,"findBelongsTo")
return o.data||o.links||o.meta?(o=A(e,o,t,i),e._push(o,!0)):null}),null)}(t,n,o.related,c,s)
const h=t._fetchManager
return(0,R.a)(l),s.reload?h.scheduleFetch(l,s,e.request):h.fetchDataIfNeededForIdentifier(l,s,e.request)}(e)
case"findHasMany":return function(e){const{store:t,data:r,records:i}=e.request,{options:s,record:n,links:o,useLink:a,field:c}=r
if(a)return function(e,t,r,i,s,n){return Promise.resolve().then((()=>{const o=t._fetchManager.createSnapshot(r,n),a=i&&"string"!=typeof i?i.href:i
return e.findHasMany(t,o,a,s)})).then((e=>{const i=t.modelFor(s.type),n=t.serializerFor(s.type)
let o=(0,R.n)(n,t,i,e,null,"findHasMany")
return o=A(t,o,r,s),t._push(o,!0)}),null)}(t.adapterFor(n.type),t,n,o.related,c,s)
const l=new Array(i.length),u=t._fetchManager
for(let h=0;h<i.length;h++){const t=i[h];(0,R.a)(t),l[h]=s.reload?u.scheduleFetch(t,s,e.request):u.fetchDataIfNeededForIdentifier(t,s,e.request)}return Promise.all(l)}(e)
case"updateRecord":case"createRecord":case"deleteRecord":return function(e){const{store:t,data:r,op:i}=e.request,{options:s,record:n}=r
t.cache.willCommit(n,e)
const o=Object.assign({[R.S]:i},s)
return t._fetchManager.scheduleSave(n,o).then((r=>{let s
return t._join((()=>{s=t.cache.didCommit(n,{request:e.request,content:r})})),t.lifetimes?.didRequest&&"createRecord"===i&&t.lifetimes.didRequest(e.request,{status:201},null,t),t.peekRecord(s.data)})).catch((e=>{let r=e
throw e?"string"==typeof e&&(r=new Error(e)):r=new Error("Unknown Error Occurred During Request"),function(e,t,r){if(r&&!0===r.isAdapterError&&"InvalidError"===r.code){const i=e.serializerFor(t.type)
if(i&&"function"==typeof i.extractErrors){const s=i.extractErrors(e,e.modelFor(t.type),r,t.id)
r.errors=function(e){const t=[]
return e&&Object.keys(e).forEach((r=>{const i=(s=e[r],Array.isArray(s)?s:[s])
var s
for(let e=0;e<i.length;e++){let s="Invalid Attribute",n=`/data/attributes/${r}`
r===T&&(s="Invalid Document",n="/data"),t.push({title:s,detail:i[e],source:{pointer:n}})}})),t}(s)}}const i=e.cache
if(r.errors){let e=r.errors
0===e.length&&(e=[{title:"Invalid Error",detail:"",source:{pointer:"/data"}}]),i.commitWasRejected(t,e)}else i.commitWasRejected(t)}(t,n,r),r}))}(e)
default:return t(e.request)}}},T="base"
function M(e,t,r,i,s,n){const o=t.modelFor(r)
let a=Promise.resolve().then((()=>e.findAll(t,o,null,i)))
return a=a.then((e=>{const s=t.serializerFor(r),a=(0,R.n)(s,t,o,e,null,"findAll")
return t._push(a,n),i._recordArray.isUpdating=!1,i._recordArray})),a}function O(e,t){this._adapterCache=this._adapterCache||Object.create(null)
const r=(0,S.di)(e),{_adapterCache:i}=this
let s=i[r]
if(s)return s
const n=(0,w.getOwner)(this)
return s=n.lookup(`adapter:${r}`),void 0!==s?(i[r]=s,s):(s=i.application||n.lookup("adapter:application"),void 0!==s?(i[r]=s,i.application=s,s):void 0)}function j(e){this._serializerCache=this._serializerCache||Object.create(null)
const t=(0,S.di)(e),{_serializerCache:r}=this
let i=r[t]
if(i)return i
const s=(0,w.getOwner)(this)
return i=s.lookup(`serializer:${t}`),void 0!==i?(r[t]=i,i):(i=r.application||s.lookup("serializer:application"),void 0!==i?(r[t]=i,r.application=i,i):null)}function P(e,t){const r=(0,S.di)(e),i=this.serializerFor(r),s=this.modelFor(r)
return i.normalize(s,t)}function F(e,t){const r=t||e,i=t?(0,S.di)(e):"application"
this.serializerFor(i).pushPayload(this,r)}function D(e,t){return this._fetchManager||(this._fetchManager=new R.F(this)),this._fetchManager.createSnapshot((0,k.recordIdentifierFor)(e)).serialize(t)}function I(){for(const e in this._adapterCache){const t=this._adapterCache[e]
"function"==typeof t.destroy&&t.destroy()}for(const e in this._serializerCache){const t=this._serializerCache[e]
"function"==typeof t.destroy&&t.destroy()}}var q,x,N,$,z,L=r(1603),B=r(3241),V=r(4471),U=r.n(V),H=r(8738),W=r(8146),K=r(1788),Y=r(1389),G=r(8410),J=r.n(G),Q=r(3991),Z=r(1491),X=r(7375),ee=r(9280),te=r.n(ee),re=r(7104),ie=r.n(re),se=r(4666),ne=r(3193)
function oe(e,t,r){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,r)}function ae(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ce(e){{const t=(0,B.dasherize)(e)
return(0,L.deprecate)(`The resource type '${e}' is not normalized. Update your application code to use '${t}' instead of '${e}'.`,t===e,{id:"ember-data:deprecate-non-strict-types",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}class le extends S.oz{constructor(e){super(e),this.isLoaded=e.isLoaded||!1,this.isAsync=e.isAsync||!1,this.isPolymorphic=e.isPolymorphic||!1,this.identifier=e.identifier,this.key=e.key}[S.XK](e,t,r,i,s){switch(r){case"length 0":return Reflect.set(e,"length",0),ye(this,[],s),!0
case"replace cell":{const[t,r,n]=i
return e[t]=n,function(e,t,r){ge(e,{op:"replaceRelatedRecord",record:e.identifier,field:e.key,...t},r)}(this,{value:n,prior:r,index:t},s),!0}case"push":{const n=ue(i)
de(this,e,(e=>e.push(...n)),"Cannot push duplicates to a hasMany's state.")
{const n=new Set(e),o=new Set
i.forEach((e=>{const t=(0,S.o)(e)
n.has(t)||(n.add(t),o.add(e))}))
const a=Array.from(o),c=Reflect.apply(e[r],t,a)
return a.length&&fe(this,{value:ue(a)},s),c}}case"pop":{const n=Reflect.apply(e[r],t,i)
return n&&pe(this,{value:(0,S.o)(n)},s),n}case"unshift":{const n=ue(i)
de(this,e,(e=>e.unshift(...n)),"Cannot unshift duplicates to a hasMany's state.")
{const n=new Set(e),o=new Set
i.forEach((e=>{const t=(0,S.o)(e)
n.has(t)||(n.add(t),o.add(e))}))
const a=Array.from(o),c=Reflect.apply(e[r],t,a)
return a.length&&fe(this,{value:ue(a),index:0},s),c}}case"shift":{const n=Reflect.apply(e[r],t,i)
return n&&pe(this,{value:(0,S.o)(n),index:0},s),n}case"sort":{const n=Reflect.apply(e[r],t,i)
return function(e,t,r){ge(e,{op:"sortRelatedRecords",record:e.identifier,field:e.key,value:t},r)}(this,n.map(S.o),s),n}case"splice":{const[n,o,...a]=i
if(0===n&&o===this[S.u2].length){const i=ue(a)
de(this,e,(e=>e.splice(n,o,...i)),"Cannot replace a hasMany's state with a new state that contains duplicates.")
{const i=new Set(a),c=Array.from(i),l=[n,o].concat(c),u=Reflect.apply(e[r],t,l)
return ye(this,ue(c),s),u}}const c=ue(a)
de(this,e,(e=>e.splice(n,o,...c)),"Cannot splice a hasMany's state with a new state that contains duplicates.")
{const i=e.slice()
i.splice(n,o)
const c=new Set(i),l=[]
a.forEach((e=>{const t=(0,S.o)(e)
c.has(t)||(c.add(t),l.push(e))}))
const u=[n,o,...l],h=Reflect.apply(e[r],t,u)
return o>0&&pe(this,{value:h.map(S.o),index:n},s),l.length>0&&fe(this,{value:ue(l),index:n},s),h}}}}notify(){this[S.To].shouldReset=!0,(0,S.J4)(this)}reload(e){return this._manager.reloadHasMany(this.key,e)}createRecord(e){const{store:t}=this,r=t.createRecord(this.modelName,e)
return this.push(r),r}destroy(){super.destroy(!1)}}function ue(e){return e.map(he)}function he(e){return(0,S.o)(e)}function de(e,t,r,i){const s=t.slice()
if(r(s),s.length!==new Set(s).size){const t=s.filter(((e,t)=>s.indexOf(e)!==t));(0,L.deprecate)(`${i} This behavior is deprecated. Found duplicates for the following records within the new state provided to \`<${e.identifier.type}:${e.identifier.id||e.identifier.lid}>.${e.key}\`\n\t- ${Array.from(new Set(t)).map((e=>(0,S.xm)(e)?e.lid:(0,S.o)(e).lid)).sort(((e,t)=>e.localeCompare(t))).join("\n\t- ")}`,!1,{id:"ember-data:deprecate-many-array-duplicates",for:"ember-data",until:"6.0",since:{enabled:"5.3",available:"5.3"}})}}function fe(e,t,r){ge(e,{op:"addToRelatedRecords",record:e.identifier,field:e.key,...t},r)}function pe(e,t,r){ge(e,{op:"removeFromRelatedRecords",record:e.identifier,field:e.key,...t},r)}function ye(e,t,r){ge(e,{op:"replaceRelatedRecords",record:e.identifier,field:e.key,value:t},r)}function ge(e,t,r){e._manager.mutate(t),(0,W.RH)(r)}le.prototype.isAsync=!1,le.prototype.isPolymorphic=!1,le.prototype.identifier=null,le.prototype.cache=null,le.prototype._inverseIsAsync=!1,le.prototype.key="",le.prototype.DEPRECATED_CLASS_NAME="ManyArray"
const me=ie().extend(te())
var _e=Object.defineProperty;((e,t)=>{for(var r in t)_e(e,r,{get:t[r],enumerable:!0})})({},{c:()=>Ae,f:()=>ve,g:()=>we,i:()=>Re,m:()=>ke,n:()=>Se,p:()=>Ee})
var be=new WeakMap
function ve(e,t,r,i){return we(e.prototype,t,r,i)}function we(e,t,r,i){let s={configurable:!0,enumerable:!0,writable:!0,initializer:null}
i&&(s.initializer=i)
for(let n of r)s=n(e,t,s)||s
void 0===s.initializer?Object.defineProperty(e,t,s):function(e,t,r){let i=be.get(e)
i||(i=new Map,be.set(e,i)),i.set(t,r)}(e,t,s)}function ke({prototype:e},t,r){return Se(e,t,r)}function Se(e,t,r){let i={...Object.getOwnPropertyDescriptor(e,t)}
for(let s of r)i=s(e,t,i)||i
void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(e):void 0,i.initializer=void 0),Object.defineProperty(e,t,i)}function Re(e,t){let r=function(e,t){let r=e.prototype
for(;r;){let e=be.get(r)?.get(t)
if(e)return e
r=r.prototype}}(e.constructor,t)
r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(e):void 0})}function Ae(e,t){return t.reduce(((e,t)=>t(e)||e),e)}function Ee(e,t){for(let[r,i,s]of t)"field"===r?Ce(e,i,s):Se(e,i,s)
return e}function Ce(e,t,r){let i={configurable:!0,enumerable:!0,writable:!0,initializer:()=>Object.getOwnPropertyDescriptor(e,t)?.value}
for(let s of r)i=s(e,t,i)||i
i.initializer&&(i.value=i.initializer.call(e),delete i.initializer),Object.defineProperty(e,t,i)}const Te=Symbol.for("LegacyPromiseProxy"),Me=me
class Oe extends Me{constructor(...e){super(...e),ae(this,Te,!0)}get id(){const{key:e,legacySupport:t}=this._belongsToState
return t.referenceFor("belongsTo",e).id()}get meta(){}async reload(e){const{key:t,legacySupport:r}=this._belongsToState
return await r.reloadBelongsTo(t,e),this}}Se((q=Oe).prototype,"id",[H.PO]),Se(q.prototype,"meta",[(0,V.computed)()])
class je{constructor(e,t){ae(this,Te,!0),this._update(e,t),this.isDestroyed=!1}get length(){return this["[]"],this.content?this.content.length:0}forEach(e){this.content&&this.length&&this.content.forEach(e)}reload(e){return this.content.reload(e),this}then(e,t){return this.promise.then(e,t)}catch(e){return this.promise.catch(e)}finally(e){return this.promise.finally(e)}destroy(){this.isDestroyed=!0,this.content=null,this.promise=null}get links(){return this.content?this.content.links:void 0}get meta(){return this.content?this.content.meta:void 0}_update(e,t){void 0!==t&&(this.content=t),this.promise=function(e,t){return e.isPending=!0,e.isSettled=!1,e.isFulfilled=!1,e.isRejected=!1,Promise.resolve(t).then((t=>(e.isPending=!1,e.isFulfilled=!0,e.isSettled=!0,e.content=t,t)),(t=>{throw e.isPending=!1,e.isFulfilled=!1,e.isRejected=!0,e.isSettled=!0,t}))}(this,e)}static create({promise:e,content:t}){return new this(e,t)}}Se((x=je).prototype,"length",[H.Vv]),Se(x.prototype,"links",[H.Vv]),Se(x.prototype,"meta",[H.Vv]),(0,W.sg)(je.prototype,"content",null),(0,W.sg)(je.prototype,"isPending",!1),(0,W.sg)(je.prototype,"isRejected",!1),(0,W.sg)(je.prototype,"isFulfilled",!1),(0,W.sg)(je.prototype,"isSettled",!1)
{const e={enumerable:!0,configurable:!1,get:function(){return this.content?.length&&this.content}};(0,H.Vv)(e),Object.defineProperty(je.prototype,"[]",e)}class Pe{constructor(e,t,r,i,s){ae(this,"___token",void 0),ae(this,"___identifier",void 0),ae(this,"___relatedTokenMap",void 0),this.graph=t,this.key=s,this.hasManyRelationship=i,this.type=i.definition.type,this.store=e,this.___identifier=r,this.___token=e.notifications.subscribe(r,((e,t,r)=>{"relationships"===t&&r===s&&this._ref++})),this.___relatedTokenMap=new Map}destroy(){this.store.notifications.unsubscribe(this.___token),this.___relatedTokenMap.forEach((e=>{this.store.notifications.unsubscribe(e)})),this.___relatedTokenMap.clear()}get identifiers(){this._ref
const e=this._resource(),t=this.___relatedTokenMap
return this.___relatedTokenMap=new Map,e&&e.data?e.data.map((e=>{const r=this.store.identifierCache.getOrCreateRecordIdentifier(e)
let i=t.get(r)
return i?t.delete(r):i=this.store.notifications.subscribe(r,((e,t,r)=>{("identity"===t||"attributes"===t&&"id"===r)&&this._ref++})),this.___relatedTokenMap.set(r,i),r})):(t.forEach((e=>{this.store.notifications.unsubscribe(e)})),t.clear(),[])}_resource(){return this.store.cache.getRelationship(this.___identifier,this.key)}remoteType(){const e=this._resource()
return e&&e.links&&e.links.related?"link":"ids"}ids(){return this.identifiers.map((e=>e.id))}link(){const e=this._resource()
if(t=e,Boolean(t&&t.links&&t.links.related)&&e.links){const t=e.links.related
return t&&"string"!=typeof t?t.href:t}var t
return null}links(){const e=this._resource()
return e&&e.links?e.links:null}meta(){let e=null
const t=this._resource()
return t&&t.meta&&"object"==typeof t.meta&&(e=t.meta),e}async push(e,t){const{store:r}=this,i=Array.isArray(e)?{data:e}:e,s=Array.isArray(i.data)&&i.data.length>0&&Fe(i.data[0]),n=Array.isArray(i.data)?s?r._push(i,!0):i.data.map((e=>r.identifierCache.getOrCreateRecordIdentifier(e))):[],{identifier:o}=this.hasManyRelationship,a={}
if(Array.isArray(i.data)&&(a.data=n),"links"in i&&(a.links=i.links),"meta"in i&&(a.meta=i.meta),r._join((()=>{this.graph.push({op:"updateRelationship",record:o,field:this.key,value:a})})),!t)return this.load()}_isLoaded(){if(!this.hasManyRelationship.state.hasReceivedData)return!1
const e=this.graph.getData(this.hasManyRelationship.identifier,this.key)
return e.data?.every((e=>!0===this.store._instanceCache.recordIsLoaded(e,!0)))}value(){const e=qe.get(this.___identifier)
return this._isLoaded()?e.getManyArray(this.key):(this._ref,null)}async load(e){const t=qe.get(this.___identifier)
return this.hasManyRelationship.definition.isAsync||ze(this.store,this._resource())?t.getHasMany(this.key,e):t.reloadHasMany(this.key,e)}reload(e){return qe.get(this.___identifier).reloadHasMany(this.key,e)}}function Fe(e){return Object.keys(e).filter((e=>"id"!==e&&"type"!==e&&"lid"!==e)).length>0}function De(e){return Boolean(e&&e.links&&e.links.related)}Se(Pe.prototype,"identifiers",[H.Vv,H.PO]),(0,W.sg)(Pe.prototype,"_ref",0)
class Ie{constructor(e,t,r,i,s){this.graph=t,this.key=s,this.belongsToRelationship=i,this.type=i.definition.type,this.store=e,this.___identifier=r,this.___relatedToken=null,this.___token=e.notifications.subscribe(r,((e,t,r)=>{"relationships"===t&&r===s&&this._ref++}))}destroy(){this.store.notifications.unsubscribe(this.___token),this.___token=null,this.___relatedToken&&(this.store.notifications.unsubscribe(this.___relatedToken),this.___relatedToken=null)}get identifier(){this.___relatedToken&&(this.store.notifications.unsubscribe(this.___relatedToken),this.___relatedToken=null)
const e=this._resource()
if(e&&e.data){const t=this.store.identifierCache.getOrCreateRecordIdentifier(e.data)
return this.___relatedToken=this.store.notifications.subscribe(t,((e,t,r)=>{("identity"===t||"attributes"===t&&"id"===r)&&this._ref++})),t}return null}id(){return this.identifier?.id||null}link(){const e=this._resource()
if(De(e)&&e.links){const t=e.links.related
return t&&"string"!=typeof t?t.href:t}return null}links(){const e=this._resource()
return e&&e.links?e.links:null}meta(){let e=null
const t=this._resource()
return t&&t.meta&&"object"==typeof t.meta&&(e=t.meta),e}_resource(){return this._ref,this.store.cache.getRelationship(this.___identifier,this.key)}remoteType(){return De(this._resource())?"link":"id"}async push(e,t){const{store:r}=this,i=e.data&&Fe(e.data)?r._push(e,!0):e.data?r.identifierCache.getOrCreateRecordIdentifier(e.data):null,{identifier:s}=this.belongsToRelationship,n={}
if((e.data||null===e.data)&&(n.data=i),"links"in e&&(n.links=e.links),"meta"in e&&(n.meta=e.meta),r._join((()=>{this.graph.push({op:"updateRelationship",record:s,field:this.key,value:n})})),!t)return this.load()}value(){const e=this._resource()
return e&&e.data?this.store.peekRecord(e.data):null}async load(e){const t=qe.get(this.___identifier)
return this.belongsToRelationship.definition.isAsync||ze(this.store,this._resource())?t.getBelongsTo(this.key,e):t.reloadBelongsTo(this.key,e).then((()=>this.value()))}reload(e){return qe.get(this.___identifier).reloadBelongsTo(this.key,e).then((()=>this.value()))}}Se(Ie.prototype,"identifier",[H.Vv,H.PO]),(0,W.sg)(Ie.prototype,"_ref",0)
const qe=(0,X.L1)("LEGACY_SUPPORT",new Map)
function xe(e){const t=(0,S.o)(e)
let r=qe.get(t)
return r||(r=new Ne(e),qe.set(t,r),qe.set(e,r)),r}class Ne{constructor(e){this.record=e,this.store=(0,S.fV)(e),this.identifier=(0,S.o)(e),this.cache=(0,S.oX)(e)
{const e=(0,ne.A)(r(151)).graphFor
this.graph=e(this.store)}this._manyArrayCache=Object.create(null),this._relationshipPromisesCache=Object.create(null),this._relationshipProxyCache=Object.create(null),this._pending=Object.create(null),this.references=Object.create(null)}_syncArray(e){if(this.isDestroyed||this.isDestroying)return
const t=e[S.u2],r=this.identifier,[i,s]=this._getCurrentState(r,e.key)
s.meta&&(e.meta=s.meta),s.links&&(e.links=s.links),t.length=0,(0,S.RX)(t,i)}mutate(e){this.cache.mutate(e)}_findBelongsTo(e,t,r,i){return this._findBelongsToByJsonApiResource(t,this.identifier,r,i).then((t=>$e(this,e,r,t)),(t=>$e(this,e,r,null,t)))}reloadBelongsTo(e,t){const r=this._relationshipPromisesCache[e]
if(r)return r
const i=this.graph.get(this.identifier,e),s=this.cache.getRelationship(this.identifier,e)
i.state.hasFailedLoadAttempt=!1,i.state.shouldForceReload=!0
const n=this._findBelongsTo(e,s,i,t)
return this._relationshipProxyCache[e]?this._updatePromiseProxyFor("belongsTo",e,{promise:n}):n}getBelongsTo(e,t){const{identifier:r,cache:i}=this,s=i.getRelationship(this.identifier,e),n=s&&s.data?s.data:null,o=this.store,a=this.graph.get(this.identifier,e),c=a.definition.isAsync,l={key:e,store:o,legacySupport:this,modelName:a.definition.type}
if(c){if(a.state.hasFailedLoadAttempt)return this._relationshipProxyCache[e]
const r=this._findBelongsTo(e,s,a,t),i=n&&o._instanceCache.recordIsLoaded(n)
return this._updatePromiseProxyFor("belongsTo",e,{promise:r,content:i?o._instanceCache.getRecord(n):null,_belongsToState:l})}return null===n?null:o._instanceCache.getRecord(n)}setDirtyBelongsTo(e,t){return this.cache.mutate({op:"replaceRelatedRecord",record:this.identifier,field:e,value:(r=t,r?(0,S.o)(r):null)},!0)
var r}_getCurrentState(e,t){const r=this.cache.getRelationship(e,t),i=this.store._instanceCache,s=[]
if(r.data)for(let n=0;n<r.data.length;n++){const e=r.data[n]
i.recordIsLoaded(e,!0)&&s.push(e)}return[s,r]}getManyArray(e,t){{let r=this._manyArrayCache[e]
if(t||(t=this.graph.get(this.identifier,e).definition),!r){const[i,s]=this._getCurrentState(this.identifier,e)
r=new le({store:this.store,type:t.type,identifier:this.identifier,cache:this.cache,identifiers:i,key:e,meta:s.meta||null,links:s.links||null,isPolymorphic:t.isPolymorphic,isAsync:t.isAsync,_inverseIsAsync:t.inverseIsAsync,manager:this,isLoaded:!t.isAsync,allowMutation:!0}),this._manyArrayCache[e]=r}return r}}fetchAsyncHasMany(e,t,r,i){{let s=this._relationshipPromisesCache[e]
if(s)return s
const n=this.cache.getRelationship(this.identifier,e),o=this._findHasManyByJsonApiResource(n,this.identifier,t,i)
return o?(s=o.then((()=>$e(this,e,t,r)),(i=>$e(this,e,t,r,i))),this._relationshipPromisesCache[e]=s,s):(r.isLoaded=!0,Promise.resolve(r))}}reloadHasMany(e,t){{const r=this._relationshipPromisesCache[e]
if(r)return r
const i=this.graph.get(this.identifier,e),{definition:s,state:n}=i
n.hasFailedLoadAttempt=!1,n.shouldForceReload=!0
const o=this.getManyArray(e,s),a=this.fetchAsyncHasMany(e,i,o,t)
return this._relationshipProxyCache[e]?this._updatePromiseProxyFor("hasMany",e,{promise:a}):a}}getHasMany(e,t){{const r=this.graph.get(this.identifier,e),{definition:i,state:s}=r,n=this.getManyArray(e,i)
if(i.isAsync){if(s.hasFailedLoadAttempt)return this._relationshipProxyCache[e]
const i=this.fetchAsyncHasMany(e,r,n,t)
return this._updatePromiseProxyFor("hasMany",e,{promise:i,content:n})}return n}}_updatePromiseProxyFor(e,t,r){let i=this._relationshipProxyCache[t]
if("hasMany"===e){const{promise:e,content:s}=r
return i?i._update(e,s):i=this._relationshipProxyCache[t]=new je(e,s),i}if(i){const{promise:e,content:t}=r
void 0!==t&&i.set("content",t),i.set("promise",e)}else i=Oe.create(r),this._relationshipProxyCache[t]=i
return i}referenceFor(e,t){let r=this.references[t]
if(!r){const{graph:e,identifier:i}=this,s=e.get(i,t),n=s.definition.kind
"belongsTo"===n?r=new Ie(this.store,e,i,s,t):"hasMany"===n&&(r=new Pe(this.store,e,i,s,t)),this.references[t]=r}return r}_findHasManyByJsonApiResource(e,t,r,i={}){{if(!e)return
const{definition:s,state:n}=r;(0,Z.upgradeStore)(this.store)
const o=this.store.adapterFor?.(s.type),{isStale:a,hasDematerializedInverse:c,hasReceivedData:l,isEmpty:u,shouldForceReload:h}=n,d=ze(this.store,e),f=e.data,p=e.links&&e.links.related&&("function"==typeof o?.findHasMany||void 0===f)&&(h||c||a||!d&&!u),y={useLink:p,field:this.store.schema.fields({type:s.inverseType}).get(s.key),links:e.links,meta:e.meta,options:i,record:t}
if(p)return this.store.request({op:"findHasMany",records:f||[],data:y,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})
const g=l&&!u,m=c||u&&Array.isArray(f)&&f.length>0,_=!h&&!a&&(g||m)
if(_&&d)return
return _||l&&!u||m?(i.reload=i.reload||!_||void 0,this.store.request({op:"findHasMany",records:f,data:y,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})):void 0}}_findBelongsToByJsonApiResource(e,t,r,i={}){if(!e)return Promise.resolve(null)
const s=r.definition.key
if(this._pending[s])return this._pending[s]
const n=e.data?e.data:null,{isStale:o,hasDematerializedInverse:a,hasReceivedData:c,isEmpty:l,shouldForceReload:u}=r.state,h=ze(this.store,e),d=e.links?.related&&(u||a||o||!h&&!l),f={useLink:d,field:this.store.schema.fields(this.identifier).get(r.definition.key),links:e.links,meta:e.meta,options:i,record:t}
if(d){const e=this.store.request({op:"findBelongsTo",records:n?[n]:[],data:f,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})
return this._pending[s]=e.then((e=>e.content)).finally((()=>{this._pending[s]=void 0})),this._pending[s]}const p=c&&h&&!l,y=a||l&&e.data,g=!u&&!o&&(p||y)
return g&&!n?Promise.resolve(null):g&&h||null===n?.id?Promise.resolve(n):n?(i.reload=i.reload||!g||void 0,this._pending[s]=this.store.request({op:"findBelongsTo",records:[n],data:f,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}}).then((e=>e.content)).finally((()=>{this._pending[s]=void 0})),this._pending[s]):Promise.resolve(null)}destroy(){this.isDestroying=!0
let e=this._manyArrayCache
this._manyArrayCache=Object.create(null),Object.keys(e).forEach((t=>{e[t].destroy()})),e=this._relationshipProxyCache,this._relationshipProxyCache=Object.create(null),Object.keys(e).forEach((t=>{const r=e[t]
r.destroy&&r.destroy()})),e=this.references,this.references=Object.create(null),Object.keys(e).forEach((t=>{e[t].destroy()})),this.isDestroyed=!0}}function $e(e,t,r,i,s){delete e._relationshipPromisesCache[t],r.state.shouldForceReload=!1
const n="hasMany"===r.definition.kind
if(n&&i.notify(),s){r.state.hasFailedLoadAttempt=!0
const i=e._relationshipProxyCache[t]
throw i&&!n&&(i.content&&i.content.isDestroying&&i.set("content",null),e.store.notifications._flush()),s}return n?i.isLoaded=!0:e.store.notifications._flush(),r.state.hasFailedLoadAttempt=!1,r.state.isStale=!1,n||!i?i:e.store.peekRecord(i)}function ze(e,t){const r=e._instanceCache,i=t.data
return Array.isArray(i)?i.every((e=>r.recordIsLoaded(e))):!i||r.recordIsLoaded(i)}const Le=J()
var Be=new WeakMap,Ve=new WeakMap
class Ue extends Le{constructor(...e){super(...e),oe(this,Be,void Re(this,"messages")),oe(this,Ve,void Re(this,"isEmpty"))}get errorsByAttributeName(){return new Map}errorsFor(e){const t=this.errorsByAttributeName
let r=t.get(e)
return void 0===r&&(r=(0,Y.A)(),t.set(e,r)),(0,V.get)(r,"[]"),r}get content(){return(0,Y.A)()}unknownProperty(e){const t=this.errorsFor(e)
if(0!==t.length)return t}add(e,t){const r=this._findOrCreateMessages(e,t)
this.addObjects(r),this.errorsFor(e).addObjects(r),this.__record.currentState.notify("isValid"),this.notifyPropertyChange(e)}_findOrCreateMessages(e,t){const r=this.errorsFor(e),i=Array.isArray(t)?t:[t],s=new Array(i.length)
for(let n=0;n<i.length;n++){const t=i[n],o=r.findBy("message",t)
s[n]=o||{attribute:e,message:t}}return s}remove(e){if(this.isEmpty)return
const t=this.rejectBy("attribute",e)
this.content.setObjects(t)
const r=this.errorsFor(e)
for(let i=0;i<r.length;i++)r[i].attribute===e&&r.replace(i,1)
this.errorsByAttributeName.delete(e),this.__record.currentState.notify("isValid"),this.notifyPropertyChange(e),this.notifyPropertyChange("length")}clear(){if(this.isEmpty)return
const e=this.errorsByAttributeName,t=[]
e.forEach((function(e,r){t.push(r)})),e.clear(),t.forEach((e=>{this.notifyPropertyChange(e)})),this.__record.currentState.notify("isValid"),super.clear()}has(e){return this.errorsFor(e).length>0}}function He(e,t,r,i){if("belongsTo"===i.kind)r.notifyPropertyChange(t)
else if("hasMany"===i.kind){const s=qe.get(e),n=s&&s._manyArrayCache[t],o=s&&s._relationshipPromisesCache[t]
if(n&&o)return
n&&(n.notify(),i.options.async&&r.notifyPropertyChange(t))}}function We(e,t,r,i){(0,se.cacheFor)(i,r)!==e.cache.getAttr(t,r)&&i.notifyPropertyChange(r)}Se((N=Ue).prototype,"errorsByAttributeName",[(0,V.computed)()]),we(N.prototype,"messages",[(0,Q.mapBy)("content","message")]),Se(N.prototype,"content",[(0,V.computed)()]),we(N.prototype,"isEmpty",[(0,Q.not)("length")])
const Ke=/^\/?data\/(attributes|relationships)\/(.*)/,Ye=/^\/?data/
function Ge(e){return!!e&&e instanceof Error&&"isAdapterError"in e&&!0===e.isAdapterError&&"code"in e&&"InvalidError"===e.code}function Je(e,t,r){const i=r.get,s=r.set
return r.get=function(){const e=(0,W.V1)(this,t,!0)
return(0,W.B1)(e),e.shouldReset&&(e.shouldReset=!1,e.lastValue=i.call(this)),e.lastValue},r.set=function(e){(0,W.V1)(this,t,!0),s.call(this,e)},(0,H.Vv)(r),r}function Qe(e,t){const r=(0,W.i$)(e,t)
r&&(r.shouldReset=!0,(0,W.RH)(r))}class Ze{constructor(e){const t=(0,k.storeFor)(e),r=(0,S.o)(e)
this.identifier=r,this.record=e,this.cache=t.cache,this.pendingCount=0,this.fulfilledCount=0,this.rejectedCount=0,this._errorRequests=[],this._lastError=null
const i=t.getRequestStateService(),s=t.notifications,n=e=>{if("mutation"===e.type)switch(e.state){case"pending":this.isSaving=!0
break
case"rejected":this.isSaving=!1,this._lastError=e,e.response&&Ge(e.response.data)||this._errorRequests.push(e),Xe(this)
break
case"fulfilled":this._errorRequests=[],this._lastError=null,this.isSaving=!1,this.notify("isDirty"),Xe(this)}else switch(e.state){case"pending":this.pendingCount++,this.notify("isLoading")
break
case"rejected":this.pendingCount--,this._lastError=e,e.response&&Ge(e.response.data)||this._errorRequests.push(e),this.notify("isLoading"),Xe(this)
break
case"fulfilled":this.pendingCount--,this.fulfilledCount++,this.notify("isLoading"),this.notify("isDirty"),Xe(this),this._errorRequests=[],this._lastError=null}}
i.subscribeForRecord(r,n)
const o=i.getLastRequestForRecord(r)
o&&n(o),this.handler=s.subscribe(r,((e,t,r)=>{switch(t){case"state":this.notify("isSaved"),this.notify("isNew"),this.notify("isDeleted"),this.notify("isDirty")
break
case"attributes":this.notify("isEmpty"),this.notify("isDirty")
break
case"errors":this.updateInvalidErrors(this.record.errors),this.notify("isValid")}}))}destroy(){(0,k.storeFor)(this.record).notifications.unsubscribe(this.handler)}notify(e){Qe(this,e)}updateInvalidErrors(e){const t=this.cache.getErrors(this.identifier)
e.clear()
for(let r=0;r<t.length;r++){const i=t[r]
if(i.source&&i.source.pointer){const t=i.source.pointer.match(Ke)
let r
if(t?r=t[2]:-1!==i.source.pointer.search(Ye)&&(r="base"),r){const t=i.detail||i.title
e.add(r,t)}}}}cleanErrorRequests(){this.notify("isValid"),this.notify("isError"),this.notify("adapterError"),this._errorRequests=[],this._lastError=null}get isLoading(){return!this.isLoaded&&this.pendingCount>0&&0===this.fulfilledCount}get isLoaded(){return!!this.isNew||this.fulfilledCount>0||!this.isEmpty}get isSaved(){const e=this.cache
return this.isDeleted?e.isDeletionCommitted(this.identifier):!(this.isNew||this.isEmpty||!this.isValid||this.isDirty||this.isLoading)}get isEmpty(){const e=this.cache
return!this.isNew&&e.isEmpty(this.identifier)}get isNew(){return this.cache.isNew(this.identifier)}get isDeleted(){return this.cache.isDeleted(this.identifier)}get isValid(){return 0===this.record.errors.length}get isDirty(){const e=this.cache
return!(this.isEmpty||e.isDeletionCommitted(this.identifier)||this.isDeleted&&this.isNew)&&(this.isDeleted||this.isNew||e.hasChangedAttrs(this.identifier))}get isError(){return!!this._errorRequests[this._errorRequests.length-1]}get adapterError(){const e=this._lastError
return e?"rejected"===e.state&&e.response.data:null}get isPreloaded(){return!this.isEmpty&&this.isLoading}get stateName(){return this.isLoading?"root.loading":this.isEmpty?"root.empty":this.isDeleted?this.isSaving?"root.deleted.inFlight":this.isSaved?"root.deleted.saved":this.isValid?"root.deleted.uncommitted":"root.deleted.invalid":this.isNew?this.isSaving?"root.loaded.created.inFlight":this.isValid?"root.loaded.created.uncommitted":"root.loaded.created.invalid":this.isSaving?"root.loaded.updated.inFlight":this.isValid?this.isDirty?"root.loaded.updated.uncommitted":"root.loaded.saved":"root.loaded.updated.invalid"}get dirtyType(){return this.isLoading||this.isEmpty?"":this.isDirty&&this.isDeleted?"deleted":this.isNew?"created":this.isSaving||!this.isValid||this.isDirty?"updated":""}}function Xe(e){e.notify("isValid"),e.notify("isError"),e.notify("adapterError")}function et(e,t,r){const i=new WeakMap,s=r.get
return r.get=function(){let e=i.get(this)
return e||(e={hasComputed:!1,value:void 0},i.set(this,e)),e.hasComputed||(e.value=s.call(this),e.hasComputed=!0),e.value},r}Se(($=Ze).prototype,"isLoading",[Je]),Se($.prototype,"isLoaded",[Je]),Se($.prototype,"isSaved",[Je]),Se($.prototype,"isEmpty",[Je]),Se($.prototype,"isNew",[Je]),Se($.prototype,"isDeleted",[Je]),Se($.prototype,"isValid",[Je]),Se($.prototype,"isDirty",[Je]),Se($.prototype,"isError",[Je]),Se($.prototype,"adapterError",[Je]),Se($.prototype,"isPreloaded",[H.PO]),Se($.prototype,"stateName",[H.PO]),Se($.prototype,"dirtyType",[H.PO]),(0,W.sg)(Ze.prototype,"isSaving",!1)
class tt extends(U()){init(e){const t=e._createProps,r=e._secretInit
e._createProps=null,e._secretInit=null
const i=this.store=r.store
super.init(e),this[K.pm]=i
const s=r.identifier
r.cb(this,r.cache,s,r.store),this.___recordState=null,this.setProperties(t)
const n=i.notifications
this.___private_notifications=n.subscribe(s,((e,t,r)=>{!function(e,t,r,i,s){if("attributes"===t)r?We(s,e,r,i):i.eachAttribute((t=>{We(s,e,t,i)}))
else if("relationships"===t)if(r){const t=i.constructor.relationshipsByName.get(r)
He(e,r,i,t)}else i.eachRelationship(((t,r)=>{He(e,t,i,r)}))
else"identity"===t&&i.notifyPropertyChange("id")}(e,t,r,this,i)}))}destroy(){const e=(0,k.recordIdentifierFor)(this)
this.___recordState?.destroy(),(0,k.storeFor)(this).notifications.unsubscribe(this.___private_notifications),this.eachRelationship(((e,t)=>{"belongsTo"===t.kind&&this.notifyPropertyChange(e)})),qe.get(this)?.destroy(),qe.delete(this),qe.delete(e),super.destroy()}get isEmpty(){return this.currentState.isEmpty}get isLoading(){return this.currentState.isLoading}get isLoaded(){return this.currentState.isLoaded}get hasDirtyAttributes(){return this.currentState.isDirty}get isSaving(){return this.currentState.isSaving}get isDeleted(){return this.currentState.isDeleted}get isNew(){return this.currentState.isNew}get isValid(){return this.currentState.isValid}get dirtyType(){return this.currentState.dirtyType}get isError(){return this.currentState.isError}set isError(e){}get id(){return(0,k.recordIdentifierFor)(this).id}set id(e){const t=(0,S.pG)(e),r=(0,k.recordIdentifierFor)(this),i=t!==r.id
null!==t&&i&&(this.store._instanceCache.setRecordId(r,t),this.store.notifications.notify(r,"identity"))}toString(){return`<model::${this.constructor.modelName}:${this.id}>`}get currentState(){return this.___recordState||(this.___recordState=new Ze(this)),this.___recordState}set currentState(e){throw new Error("cannot set currentState")}get errors(){const e=Ue.create({__record:this})
return this.currentState.updateInvalidErrors(e),e}get adapterError(){return this.currentState.adapterError}set adapterError(e){throw new Error("adapterError is not directly settable")}notifyPropertyChange(e){Qe(this,e),super.notifyPropertyChange(e)}attr(){}eachRelationship(e,t){this.constructor.eachRelationship(e,t)}relationshipFor(e){return this.constructor.relationshipsByName.get(e)}inverseFor(e){return this.constructor.inverseFor(e,(0,k.storeFor)(this))}eachAttribute(e,t){this.constructor.eachAttribute(e,t)}static typeForRelationship(e,t){const r=this.relationshipsByName.get(e)
return r&&t.modelFor(r.type)}static get inverseMap(){return Object.create(null)}static inverseFor(e,t){const r=this.inverseMap
if(r[e])return r[e]
{const i=this._findInverseFor(e,t)
return r[e]=i,i}}static _findInverseFor(e,t){const r=this.relationshipsByName.get(e)
if(!r)return null
const{options:i}=r
return null===i.inverse?null:t.schema.hasResource(r)&&t.schema.fields(r).get(i.inverse)||null}static get relationships(){const e=new Map
return this.relationshipsByName.forEach((t=>{const{type:r}=t
e.has(r)||e.set(r,[]),e.get(r).push(t)})),e}static get relationshipNames(){const e={hasMany:[],belongsTo:[]}
return this.eachComputedProperty(((t,r)=>{rt(r)&&e[r.kind].push(t)})),e}static get relatedTypes(){const e=[],t=this.relationshipsObject,r=Object.keys(t)
for(let i=0;i<r.length;i++){const s=t[r[i]].type
e.includes(s)||e.push(s)}return e}static get relationshipsByName(){const e=new Map,t=this.relationshipsObject,r=Object.keys(t)
for(let i=0;i<r.length;i++){const s=t[r[i]]
e.set(s.name,s)}return e}static get relationshipsObject(){const e=Object.create(null)
return this.modelName,this.eachComputedProperty(((t,r)=>{rt(r)&&(r.key=t,r.name=t,e[t]=r)})),e}static get fields(){const e=new Map
return this.eachComputedProperty(((t,r)=>{rt(r)?e.set(t,r.kind):it(r)&&e.set(t,"attribute")})),e}static eachRelationship(e,t){this.relationshipsByName.forEach(((r,i)=>{e.call(t,i,r)}))}static eachRelatedType(e,t){const r=this.relatedTypes
for(let i=0;i<r.length;i++){const s=r[i]
e.call(t,s)}}static determineRelationshipType(e,t){const r=e.name,i=e.kind,s=this.inverseFor(r,t)
return s?"belongsTo"===s.kind?"belongsTo"===i?"oneToOne":"manyToOne":"belongsTo"===i?"oneToMany":"manyToMany":"belongsTo"===i?"oneToNone":"manyToNone"}static get attributes(){const e=new Map
return this.eachComputedProperty(((t,r)=>{it(r)&&(r.key=t,r.name=t,e.set(t,r))})),e}static get transformedAttributes(){const e=new Map
return this.eachAttribute(((t,r)=>{r.type&&e.set(t,r.type)})),e}static eachAttribute(e,t){this.attributes.forEach(((r,i)=>{e.call(t,i,r)}))}static eachTransformedAttribute(e,t){this.transformedAttributes.forEach(((r,i)=>{e.call(t,i,r)}))}static toString(){return`model:${this.modelName}`}}function rt(e){return"object"==typeof e&&null!==e&&"kind"in e&&"options"in e&&("hasMany"===e.kind||"belongsTo"===e.kind)}function it(e){return"object"==typeof e&&null!==e&&"kind"in e&&"attribute"===e.kind}Se((z=tt).prototype,"isEmpty",[H.Vv]),Se(z.prototype,"isLoading",[H.Vv]),Se(z.prototype,"isLoaded",[H.Vv]),Se(z.prototype,"hasDirtyAttributes",[H.Vv]),Se(z.prototype,"isSaving",[H.Vv]),Se(z.prototype,"isDeleted",[H.Vv]),Se(z.prototype,"isNew",[H.Vv]),Se(z.prototype,"isValid",[H.Vv]),Se(z.prototype,"dirtyType",[H.Vv]),Se(z.prototype,"isError",[H.Vv]),Se(z.prototype,"id",[Je]),Se(z.prototype,"currentState",[Je]),Se(z.prototype,"errors",[et]),Se(z.prototype,"adapterError",[H.Vv]),ae(tt,"isModel",!0),ae(tt,"modelName",null),Se(z,"inverseMap",[et]),Se(z,"relationships",[et]),Se(z,"relationshipNames",[et]),Se(z,"relatedTypes",[et]),Se(z,"relationshipsByName",[et]),Se(z,"relationshipsObject",[et]),Se(z,"fields",[et]),Se(z,"attributes",[et]),Se(z,"transformedAttributes",[et]),tt.prototype.save=function(e){let t
return this.currentState.isNew&&this.currentState.isDeleted?t=Promise.resolve(this):(this.errors.clear(),t=this[K.pm].saveRecord(this,e)),t},tt.prototype.destroyRecord=function(e){const{isNew:t}=this.currentState
return this.deleteRecord(),t?Promise.resolve(this):this.save(e).then((e=>(this.unloadRecord(),this)))},tt.prototype.unloadRecord=function(){this.currentState.isNew&&(this.isDestroyed||this.isDestroying)||this[K.pm].unloadRecord(this)},tt.prototype.hasMany=function(e){return xe(this).referenceFor("hasMany",e)},tt.prototype.belongsTo=function(e){return xe(this).referenceFor("belongsTo",e)},tt.prototype.serialize=function(e){return(0,Z.upgradeStore)(this[K.pm]),this[K.pm].serializeRecord(this,e)},tt.prototype._createSnapshot=function(){const e=this[K.pm]
if((0,Z.upgradeStore)(e),!e._fetchManager){const t=(0,ne.A)(r(1491)).FetchManager
e._fetchManager=new t(e)}return e._fetchManager.createSnapshot((0,k.recordIdentifierFor)(this))},tt.prototype.deleteRecord=function(){this.currentState&&this[K.pm].deleteRecord(this)},tt.prototype.changedAttributes=function(){return(0,S.oX)(this).changedAttrs((0,k.recordIdentifierFor)(this))},tt.prototype.rollbackAttributes=function(){const{currentState:e}=this,{isNew:t}=e
this[K.pm]._join((()=>{(0,S.oX)(this).rollbackAttrs((0,k.recordIdentifierFor)(this)),this.errors.clear(),e.cleanErrorRequests(),t&&this.unloadRecord()}))},tt.prototype.reload=function(e={}){e.isReloading=!0,e.reload=!0
const t=(0,k.recordIdentifierFor)(this)
return this.isReloading=!0,this[K.pm].request({op:"findRecord",data:{options:e,record:t},cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}}).then((()=>this)).finally((()=>{this.isReloading=!1}))},(0,W.sg)(tt.prototype,"isReloading",!1),tt.prototype._createProps=null,tt.prototype._secretInit=null
class st{constructor(e){this.store=e,this._schemas=new Map,this._typeMisses=new Set}hasTrait(e){return!1}resourceHasTrait(e,t){return!1}transformation(e){}derivation(e){}hashFn(e){}resource(e){const t=ce(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).schema}registerResources(e){}registerResource(e){}registerTransformation(e){}registerDerivation(e){}registerHashFn(e){}_loadModelSchema(e){const t=this.store.modelFor(e),r=t.attributes,i=Object.create(null)
r.forEach(((e,t)=>i[t]=e))
const s=t.relationshipsObject||null,n=new Map
for(const a of Object.values(i))n.set(a.name,a)
for(const a of Object.values(s))n.set(a.name,a)
const o={schema:{legacy:!0,identity:{name:"id",kind:"@id"},type:e,fields:Array.from(n.values())},attributes:i,relationships:s,fields:n}
return this._schemas.set(e,o),o}fields(e){const t=ce(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).fields}hasResource(e){const t=ce(e.type)
return!!this._schemas.has(t)||!this._typeMisses.has(t)&&!(null===nt(this.store,t)&&(this._typeMisses.add(t),1))}}function nt(e,t){e._modelFactoryCache||(e._modelFactoryCache=Object.create(null))
const r=e._modelFactoryCache
let i=r[t]
if(!i){if(i=(0,w.getOwner)(e).factoryFor(`model:${t}`),i||(i=function(e,t){const r=(0,w.getOwner)(e),i=r.factoryFor(`mixin:${t}`),s=i&&i.class
if(s){const e=tt.extend(s)
e.__isMixin=!0,e.__mixin=s,r.register(`model:${t}`,e)}return r.factoryFor(`model:${t}`)}(e,t)),!i)return null
const s=i.class
s.isModel&&(s.modelName&&Object.prototype.hasOwnProperty.call(s,"modelName")||Object.defineProperty(s,"modelName",{value:t})),r[t]=i}return i}function ot(e,t){const r=e.type,i={_createProps:t,_secretInit:{identifier:e,cache:this.cache,store:this,cb:lt}}
return(0,w.setOwner)(i,(0,w.getOwner)(this)),nt(this,r).class.create(i)}function at(e){e.destroy()}function ct(e){const t=nt(this,ce(e)),r=t&&t.class?t.class:null
if(r&&r.isModel&&!this._forceShim)return r}function lt(e,t,r,i){(0,S.TP)(e,r),S.i.set(e,i),(0,S.Wz)(e,t)}st.prototype.doesTypeExist=function(e){return(0,L.deprecate)("Use `schema.hasResource({ type })` instead of `schema.doesTypeExist(type)`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this.hasResource({type:e})},st.prototype.attributesDefinitionFor=function(e){(0,L.deprecate)("Use `schema.fields({ type })` instead of `schema.attributesDefinitionFor({ type })`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
const t=ce(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).attributes},st.prototype.relationshipsDefinitionFor=function(e){(0,L.deprecate)("Use `schema.fields({ type })` instead of `schema.relationshipsDefinitionFor({ type })`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
const t=ce(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).relationships}
var ut=r(6082),ht=r(2632)
const dt="undefined"!=typeof fetch?(...e)=>fetch(...e):"undefined"!=typeof FastBoot?(...e)=>FastBoot.require("node-fetch")(...e):()=>{throw new Error("No Fetch Implementation Found")},ft=new Set(["updateRecord","createRecord","deleteRecord"]),pt=new Map([[400,"Bad Request"],[401,"Unauthorized"],[402,"Payment Required"],[403,"Forbidden"],[404,"Not Found"],[405,"Method Not Allowed"],[406,"Not Acceptable"],[407,"Proxy Authentication Required"],[408,"Request Timeout"],[409,"Conflict"],[410,"Gone"],[411,"Length Required"],[412,"Precondition Failed"],[413,"Payload Too Large"],[414,"URI Too Long"],[415,"Unsupported Media Type"],[416,"Range Not Satisfiable"],[417,"Expectation Failed"],[419,"Page Expired"],[420,"Enhance Your Calm"],[421,"Misdirected Request"],[422,"Unprocessable Entity"],[423,"Locked"],[424,"Failed Dependency"],[425,"Too Early"],[426,"Upgrade Required"],[428,"Precondition Required"],[429,"Too Many Requests"],[430,"Request Header Fields Too Large"],[431,"Request Header Fields Too Large"],[450,"Blocked By Windows Parental Controls"],[451,"Unavailable For Legal Reasons"],[500,"Internal Server Error"],[501,"Not Implemented"],[502,"Bad Gateway"],[503,"Service Unavailable"],[504,"Gateway Timeout"],[505,"HTTP Version Not Supported"],[506,"Variant Also Negotiates"],[507,"Insufficient Storage"],[508,"Loop Detected"],[509,"Bandwidth Limit Exceeded"],[510,"Not Extended"],[511,"Network Authentication Required"]]),yt={async request(e){let t
try{t=await dt(e.request.url,e.request)}catch(e){throw e instanceof DOMException&&"AbortError"===e.name?(e.statusText="Aborted",e.status=20,e.isRequestError=!0):(e.statusText="Unknown Network Error",e.status=0,e.isRequestError=!0),e}const r=!t.ok||t.status>=400,i=e.request.op,s=Boolean(i&&ft.has(i))
if(!r&&!s&&204!==t.status&&!t.headers.has("date")){const e=new Headers(t.headers)
e.set("date",(new Date).toUTCString()),t=function(e,t){const r=(0,ht.f)(e)
return new Response(e.body,Object.assign(r,t))}(t,{headers:e})}if(e.setResponse(t),204===t.status)return null
let n=""
{const r=t.body.getReader(),i=new TextDecoder
let s=e.hasRequestedStream,o=s?new TransformStream:null,a=o?.writable.getWriter()
for(s&&(e.request.signal?.addEventListener("abort",(()=>{s&&(o.writable.abort("Request Aborted"),o.readable.cancel("Request Aborted"))})),e.setStream(o.readable));;){const{done:t,value:c}=await r.read()
if(t){s&&(s=!1,await a.ready,await a.close())
break}if(n+=i.decode(c,{stream:!0}),s)await a.ready,await a.write(c)
else if(e.hasRequestedStream){const t=new TextEncoder
s=!0,o=new TransformStream,e.request.signal?.addEventListener("abort",(()=>{s&&(o.writable.abort("Request Aborted"),o.readable.cancel("Request Aborted"))})),e.setStream(o.readable),a=o.writable.getWriter(),await a.ready,await a.write(t.encode(n)),await a.ready,await a.write(c)}}s&&(s=!1,await a.ready,await a.close())}if(r){let r
try{r=JSON.parse(n)}catch{}const i=Array.isArray(r)?r:null!==(o=r)&&"object"==typeof o&&Array.isArray(r.errors)?r.errors:null,s=t.statusText||pt.get(t.status)||"Unknown Request Error",a=`[${t.status} ${s}] ${e.request.method??"GET"} (${t.type}) - ${t.url}`,c=i?new AggregateError(i,a):new Error(a)
throw c.status=t.status,c.statusText=s,c.isRequestError=!0,c.code=c.status,c.name=c.statusText.replaceAll(" ","")+"Error",c.content=r,c}return JSON.parse(n)
var o}}
function gt(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class mt extends k.default{constructor(e){super(e),gt(this,"adapterFor",O),gt(this,"serializerFor",j),gt(this,"pushPayload",F),gt(this,"normalize",P),gt(this,"serializeRecord",D),"requestManager"in this||(this.requestManager=new ut.Ay,this.requestManager.use([C,yt])),this.requestManager.useCache(k.CacheHandler)}createSchemaService(){return new st(this)}createCache(e){return new n(e)}instantiateRecord(e,t){return ot.call(this,e,t)}teardownRecord(e){at.call(this,e)}modelFor(e){return ct.call(this,e)||super.modelFor(e)}destroy(){I.call(this),super.destroy()}}},7853:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c,modifier:()=>u})
var i=r(2294),s=r(2377),n=r(1130)
function o(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class a{constructor(e){o(this,"capabilities",(0,s.capabilities)("3.22")),this.owner=e}createModifier(e,t){return{instance:new e(this.owner,t),element:null}}installModifier(e,t,r){const i=function(e,t){const r=e
return r.element=t,r}(e,t)
i.instance.modify(t,r.positional,r.named)}updateModifier(e,t){e.instance.modify(e.element,t.positional,t.named)}destroyModifier({instance:e}){(0,n.destroy)(e)}}class c{constructor(e,t){(0,i.setOwner)(this,e)}modify(e,t,r){}}(0,s.setModifierManager)((e=>new a(e)),c)
const l=new class{constructor(){o(this,"capabilities",(0,s.capabilities)("3.22"))}createModifier(e){return{element:null,instance:e}}installModifier(e,t,r){const i=function(e,t){const r=e
return r.element=t,r}(e,t),{positional:s,named:n}=r,o=e.instance(t,s,n)
"function"==typeof o&&(i.teardown=o)}updateModifier(e,t){"function"==typeof e.teardown&&e.teardown()
const r=e.instance(e.element,t.positional,t.named)
"function"==typeof r&&(e.teardown=r)}destroyModifier(e){"function"==typeof e.teardown&&e.teardown()}getDebugName(e){return e.instance.toString()}getDebugInstance(e){return e}}
function u(e,t){return e.toString=()=>t?.name||e.name,(0,s.setModifierManager)((()=>l),e)}},81:(e,t,r)=>{function i(e,t,r){return(t="symbol"==typeof(i=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:String(i))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e
var i}function s(e,t,r,i){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(i):void 0})}function n(e,t,r,i,s){var n={}
return Object.keys(i).forEach((function(e){n[e]=i[e]})),n.enumerable=!!n.enumerable,n.configurable=!!n.configurable,("value"in n||n.initializer)&&(n.writable=!0),n=r.slice().reverse().reduce((function(r,i){return i(e,t,r)||r}),n),s&&void 0!==n.initializer&&(n.value=n.initializer?n.initializer.call(s):void 0,n.initializer=void 0),void 0===n.initializer&&(Object.defineProperty(e,t,n),n=null),n}r.d(t,{_:()=>n,a:()=>s,b:()=>i})},5266:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h})
var i,s,n,o=r(81),a=r(2735),c=r(336),l=r.n(c),u=r(4666)
let h=(i=(0,a.inject)("page-title"),s=class extends(l()){constructor(e){super(e),(0,o.a)(this,"tokens",n,this),(0,o.b)(this,"tokenId",(0,u.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const r={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(r),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},n=(0,o._)(s.prototype,"tokens",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s)},3299:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m})
var i,s,n,o,a,c=r(81),l=r(1223),u=r(2735),h=r.n(u),d=r(9553),f=r(1603)
const p="undefined"!=typeof FastBoot,y="routeDidChange",g=["separator","prepend","replace"]
let m=(i=(0,u.inject)("router"),s=(0,u.inject)("-document"),n=class extends(h()){constructor(e){if(super(e),(0,c.a)(this,"router",o,this),(0,c.a)(this,"document",a,this),(0,c.b)(this,"tokens",[]),(0,c.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,c.b)(this,"scheduleTitleUpdate",(()=>{(0,l.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const r=e.resolveRegistration("config:environment")
"object"==typeof(t=r)&&null!==t&&"pageTitle"in t&&g.forEach((e=>{if(!(0,d.isEmpty)(r.pageTitle[e])){const t=r.pageTitle[e]
this._defaultConfig[e]=t}}))}var t
this.router.on(y,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,r=this._defaultConfig.prepend,i=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=r&&(e.prepend=r),null==e.replace&&null!=i&&(e.replace=i)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const r=this.tokens.indexOf(t),i=[...this.tokens],s=t.previous
return e.previous=s,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),i.splice(r,1,e),void(this.tokens=i)}const r=this.tokens.slice(-1)[0]
r&&(e.previous=r??null,r.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:r,previous:i}=t
r&&(r.previous=i),i&&(i.next=r),t.previous=t.next=null
const s=[...this.tokens]
s.splice(s.indexOf(t),1),this.tokens=s}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const r=[]
for(;t--;){const i=e[t]
if(i){if(i.replace){r.unshift(i)
break}r.unshift(i)}}return r}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,r=[]
const i=[r],s=[]
return e.forEach((e=>{if(e.front)s.unshift(e)
else if(e.prepend){t&&(t=!1,r=[],i.push(r))
const s=r[0]
s&&((e={...e}).separator=s.separator),r.unshift(e)}else t||(t=!0,r=[],i.push(r)),r.push(e)})),s.concat(i.reduce(((e,t)=>e.concat(t)),[]))}toString(){const e=this.sortedTokens,t=[]
for(let r=0,i=e.length;r<i;r++){const s=e[r]
s&&s.title&&(t.push(s.title),r+1<i&&t.push(s.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(y,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
p?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){p||(0,f.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!p)return
const t=this.document.head,r=t.childNodes
for(let n=0;n<r.length;n++){const e=r[n]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const i=this.document.createElement("title"),s=this.document.createTextNode(e)
i.appendChild(s),t.appendChild(i)}titleDidUpdate(e){}},o=(0,c._)(n.prototype,"router",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=(0,c._)(n.prototype,"document",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),n)},558:(e,t,r)=>{function i(e,t){for(var r=0,i=e.length;r<i;r++)if(e[r]===t)return r
return-1}function s(e){var t=e._promiseCallbacks
return t||(t=e._promiseCallbacks={}),t}r.d(t,{Ay:()=>ve,K7:()=>q,v6:()=>K})
var n={mixin:function(e){return e.on=this.on,e.off=this.off,e.trigger=this.trigger,e._promiseCallbacks=void 0,e},on:function(e,t){if("function"!=typeof t)throw new TypeError("Callback must be a function")
var r=s(this),n=void 0;(n=r[e])||(n=r[e]=[]),-1===i(n,t)&&n.push(t)},off:function(e,t){var r,n=s(this),o=void 0
t?-1!==(r=i(o=n[e],t))&&o.splice(r,1):n[e]=[]},trigger:function(e,t,r){var i
if(i=s(this)[e])for(var n=0;n<i.length;n++)(0,i[n])(t,r)}},o={instrument:!1}
function a(e,t){if(2!==arguments.length)return o[e]
o[e]=t}function c(e){return"function"==typeof e}function l(e){return null!==e&&"object"==typeof e}n.mixin(o)
var u=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},h=Date.now||function(){return(new Date).getTime()},d=[]
function f(e,t,r){1===d.push({name:e,payload:{key:t._guidKey,id:t._id,eventName:e,detail:t._result,childId:r&&r._id,label:t._label,timeStamp:h(),error:o["instrument-with-stack"]?new Error(t._label):null}})&&setTimeout((function(){for(var e=0;e<d.length;e++){var t=d[e],r=t.payload
r.guid=r.key+r.id,r.childGuid=r.key+r.childId,r.error&&(r.stack=r.error.stack),o.trigger(t.name,t.payload)}d.length=0}),50)}function p(e,t){if(e&&"object"==typeof e&&e.constructor===this)return e
var r=new this(y,t)
return k(r,e),r}function y(){}var g=void 0,m=1,_=2,b=new T
function v(e){try{return e.then}catch(e){return b.error=e,b}}function w(e,t,r){t.constructor===e.constructor&&r===j&&e.constructor.resolve===p?function(e,t){t._state===m?R(e,t._result):t._state===_?(t._onError=null,A(e,t._result)):E(t,void 0,(function(r){t!==r?k(e,r):R(e,r)}),(function(t){return A(e,t)}))}(e,t):r===b?(A(e,b.error),b.error=null):c(r)?function(e,t,r){o.async((function(e){var i=!1,s=function(r,s){try{r.call(s,(function(r){i||(i=!0,t!==r?k(e,r):R(e,r))}),(function(t){i||(i=!0,A(e,t))}))}catch(e){return e}}(r,t,e._label)
!i&&s&&(i=!0,A(e,s))}),e)}(e,t,r):R(e,t)}function k(e,t){var r,i
e===t?R(e,t):(i=typeof(r=t),null===r||"object"!==i&&"function"!==i?R(e,t):w(e,t,v(t)))}function S(e){e._onError&&e._onError(e._result),C(e)}function R(e,t){e._state===g&&(e._result=t,e._state=m,0===e._subscribers.length?o.instrument&&f("fulfilled",e):o.async(C,e))}function A(e,t){e._state===g&&(e._state=_,e._result=t,o.async(S,e))}function E(e,t,r,i){var s=e._subscribers,n=s.length
e._onError=null,s[n]=t,s[n+m]=r,s[n+_]=i,0===n&&e._state&&o.async(C,e)}function C(e){var t=e._subscribers,r=e._state
if(o.instrument&&f(r===m?"fulfilled":"rejected",e),0!==t.length){for(var i=void 0,s=void 0,n=e._result,a=0;a<t.length;a+=3)i=t[a],s=t[a+r],i?O(r,i,s,n):s(n)
e._subscribers.length=0}}function T(){this.error=null}var M=new T
function O(e,t,r,i){var s=c(r),n=void 0,o=void 0
if(s){if(n=function(e,t){try{return e(t)}catch(e){return M.error=e,M}}(r,i),n===M)o=n.error,n.error=null
else if(n===t)return void A(t,new TypeError("A promises callback cannot return that same promise."))}else n=i
t._state!==g||(s&&void 0===o?k(t,n):void 0!==o?A(t,o):e===m?R(t,n):e===_&&A(t,n))}function j(e,t,r){var i=this,s=i._state
if(s===m&&!e||s===_&&!t)return o.instrument&&f("chained",i,i),i
i._onError=null
var n=new i.constructor(y,r),a=i._result
if(o.instrument&&f("chained",i,n),s===g)E(i,n,e,t)
else{var c=s===m?e:t
o.async((function(){return O(s,n,c,a)}))}return n}var P=function(){function e(e,t,r,i){this._instanceConstructor=e,this.promise=new e(y,i),this._abortOnReject=r,this._init.apply(this,arguments)}return e.prototype._init=function(e,t){var r=t.length||0
this.length=r,this._remaining=r,this._result=new Array(r),this._enumerate(t),0===this._remaining&&R(this.promise,this._result)},e.prototype._enumerate=function(e){for(var t=this.length,r=this.promise,i=0;r._state===g&&i<t;i++)this._eachEntry(e[i],i)},e.prototype._settleMaybeThenable=function(e,t){var r=this._instanceConstructor,i=r.resolve
if(i===p){var s=v(e)
if(s===j&&e._state!==g)e._onError=null,this._settledAt(e._state,t,e._result)
else if("function"!=typeof s)this._remaining--,this._result[t]=this._makeResult(m,t,e)
else if(r===q){var n=new r(y)
w(n,e,s),this._willSettleAt(n,t)}else this._willSettleAt(new r((function(t){return t(e)})),t)}else this._willSettleAt(i(e),t)},e.prototype._eachEntry=function(e,t){var r
null!==(r=e)&&"object"==typeof r?this._settleMaybeThenable(e,t):(this._remaining--,this._result[t]=this._makeResult(m,t,e))},e.prototype._settledAt=function(e,t,r){var i=this.promise
i._state===g&&(this._abortOnReject&&e===_?A(i,r):(this._remaining--,this._result[t]=this._makeResult(e,t,r),0===this._remaining&&R(i,this._result)))},e.prototype._makeResult=function(e,t,r){return r},e.prototype._willSettleAt=function(e,t){var r=this
E(e,void 0,(function(e){return r._settledAt(m,t,e)}),(function(e){return r._settledAt(_,t,e)}))},e}()
function F(e,t,r){return e===m?{state:"fulfilled",value:r}:{state:"rejected",reason:r}}var D="rsvp_"+h()+"-",I=0,q=function(){function e(t,r){this._id=I++,this._label=r,this._state=void 0,this._result=void 0,this._subscribers=[],o.instrument&&f("created",this),y!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(e,t){var r=!1
try{t((function(t){r||(r=!0,k(e,t))}),(function(t){r||(r=!0,A(e,t))}))}catch(t){A(e,t)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype._onError=function(e){var t=this
o.after((function(){t._onError&&o.trigger("error",e,t._label)}))},e.prototype.catch=function(e,t){return this.then(void 0,e,t)},e.prototype.finally=function(e,t){var r=this.constructor
return this.then((function(t){return r.resolve(e()).then((function(){return t}))}),(function(t){return r.resolve(e()).then((function(){throw t}))}),t)},e}()
function x(){this.value=void 0}q.cast=p,q.all=function(e,t){return u(e)?new P(this,e,!0,t).promise:this.reject(new TypeError("Promise.all must be called with an array"),t)},q.race=function(e,t){var r=new this(y,t)
if(!u(e))return A(r,new TypeError("Promise.race must be called with an array")),r
for(var i=0;r._state===g&&i<e.length;i++)E(this.resolve(e[i]),void 0,(function(e){return k(r,e)}),(function(e){return A(r,e)}))
return r},q.resolve=p,q.reject=function(e,t){var r=new this(y,t)
return A(r,e),r},q.prototype._guidKey=D,q.prototype.then=j
var N=new x,$=new x
function z(e,t,r){try{e.apply(t,r)}catch(e){return N.value=e,N}}function L(e,t){return{then:function(r,i){return e.call(t,r,i)}}}function B(e){return!(!e||"object"!=typeof e)&&(e.constructor===q||function(e){try{return e.then}catch(e){return N.value=e,N}}(e))}var V=function(e){function t(t,r,i){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,!1,i))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t}(P)
V.prototype._makeResult=F
var U=Object.prototype.hasOwnProperty,H=function(e){function t(t,r){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments[3]
return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,i,s))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype._init=function(e,t){this._result={},this._enumerate(t),0===this._remaining&&R(this.promise,this._result)},t.prototype._enumerate=function(e){var t=this.promise,r=[]
for(var i in e)U.call(e,i)&&r.push({position:i,entry:e[i]})
var s=r.length
this._remaining=s
for(var n=void 0,o=0;t._state===g&&o<s;o++)n=r[o],this._eachEntry(n.entry,n.position)},t}(P),W=function(e){function t(t,r,i){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,!1,i))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t}(H)
function K(e){var t={resolve:void 0,reject:void 0}
return t.promise=new q((function(e,r){t.resolve=e,t.reject=r}),e),t}function Y(e,t){return q.resolve(e,t)}function G(e,t){return q.all(e,t)}W.prototype._makeResult=F
var J=0,Q=void 0
function Z(e,t){ne[J]=e,ne[J+1]=t,2===(J+=2)&&pe()}var X="undefined"!=typeof window?window:void 0,ee=X||{},te=ee.MutationObserver||ee.WebKitMutationObserver,re="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),ie="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel
function se(){return function(){return setTimeout(oe,1)}}var ne=new Array(1e3)
function oe(){for(var e=0;e<J;e+=2)(0,ne[e])(ne[e+1]),ne[e]=void 0,ne[e+1]=void 0
J=0}var ae,ce,le,ue,he,de,fe,pe=void 0
if(re?(he=process.nextTick,de=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/),Array.isArray(de)&&"0"===de[1]&&"10"===de[2]&&(he=setImmediate),pe=function(){return he(oe)}):te?(ce=0,le=new te(oe),ue=document.createTextNode(""),le.observe(ue,{characterData:!0}),pe=function(){return ue.data=ce=++ce%2}):ie?((ae=new MessageChannel).port1.onmessage=oe,pe=function(){return ae.port2.postMessage(0)}):pe=void 0===X?function(){try{var e=r(2018)
return void 0!==(Q=e.runOnLoop||e.runOnContext)?function(){Q(oe)}:se()}catch(e){return se()}}():se(),"object"==typeof self)self
else{if("object"!=typeof global)throw new Error("no global: `self` or `global` found")
global}function ye(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}o.async=Z,o.after=function(e){return setTimeout(e,0)}
var ge=Y
function me(){o.on.apply(o,arguments)}if("undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var _e=window.__PROMISE_INSTRUMENTATION__
for(var be in a("instrument",!0),_e)_e.hasOwnProperty(be)&&me(be,_e[be])}const ve=(ye(fe={asap:Z,cast:ge,Promise:q,EventTarget:n,all:function(e,t){return q.all(e,t)},allSettled:function(e,t){return u(e)?new V(q,e,t).promise:q.reject(new TypeError("Promise.allSettled must be called with an array"),t)},race:function(e,t){return q.race(e,t)},hash:function(e,t){return l(e)?new H(q,e,t).promise:q.reject(new TypeError("Promise.hash must be called with an object"),t)},hashSettled:function(e,t){return l(e)?new W(q,e,!1,t).promise:q.reject(new TypeError("RSVP.hashSettled must be called with an object"),t)},rethrow:function(e){throw setTimeout((function(){throw e})),e},defer:K,denodeify:function(e,t){var r=function(){for(var r=arguments.length,i=new Array(r+1),s=!1,n=0;n<r;++n){var o=arguments[n]
if(!s){if((s=B(o))===$){var a=new q(y)
return A(a,$.value),a}s&&!0!==s&&(o=L(s,o))}i[n]=o}var c=new q(y)
return i[r]=function(e,r){e?A(c,e):void 0===t?k(c,r):!0===t?k(c,function(e){for(var t=e.length,r=new Array(t-1),i=1;i<t;i++)r[i-1]=e[i]
return r}(arguments)):u(t)?k(c,function(e,t){for(var r={},i=e.length,s=new Array(i),n=0;n<i;n++)s[n]=e[n]
for(var o=0;o<t.length;o++)r[t[o]]=s[o+1]
return r}(arguments,t)):k(c,r)},s?function(e,t,r,i){return q.all(t).then((function(t){var s=z(r,i,t)
return s===N&&A(e,s.value),e}))}(c,i,e,this):function(e,t,r,i){var s=z(r,i,t)
return s===N&&A(e,s.value),e}(c,i,e,this)}
return r.__proto__=e,r},configure:a,on:me,off:function(){o.off.apply(o,arguments)},resolve:Y,reject:function(e,t){return q.reject(e,t)},map:function(e,t,r){return u(e)?c(t)?q.all(e,r).then((function(e){for(var i=e.length,s=new Array(i),n=0;n<i;n++)s[n]=t(e[n])
return q.all(s,r)})):q.reject(new TypeError("RSVP.map expects a function as a second argument"),r):q.reject(new TypeError("RSVP.map must be called with an array"),r)}},"async",(function(e,t){return o.async(e,t)})),ye(fe,"filter",(function(e,t,r){return u(e)||l(e)&&void 0!==e.then?c(t)?(u(e)?G(e,r):function(e,t){return q.resolve(e,t).then((function(e){return G(e,t)}))}(e,r)).then((function(e){for(var i=e.length,s=new Array(i),n=0;n<i;n++)s[n]=t(e[n])
return G(s,r).then((function(t){for(var r=new Array(i),s=0,n=0;n<i;n++)t[n]&&(r[s]=e[n],s++)
return r.length=s,r}))})):q.reject(new TypeError("RSVP.filter expects function as a second argument"),r):q.reject(new TypeError("RSVP.filter must be called with an array or promise"),r)})),fe)},2723:(e,t,r)=>{r.r(t),r.d(t,{TrackedArray:()=>R,TrackedMap:()=>a,TrackedObject:()=>q,TrackedSet:()=>u,TrackedWeakMap:()=>c,TrackedWeakSet:()=>h,tracked:()=>z})
var i=r(473),s=r(1603),n=r(32)
function o(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class a{readStorageFor(e){const{storages:t}=this
let r=t.get(e)
void 0===r&&(r=(0,n.createStorage)(null,(()=>!1)),t.set(e,r)),(0,n.getValue)(r)}dirtyStorageFor(e){const t=this.storages.get(e)
t&&(0,n.setValue)(t,null)}constructor(e){o(this,"collection",(0,n.createStorage)(null,(()=>!1))),o(this,"storages",new Map),this.vals=e?new Map(e):new Map}get(e){return this.readStorageFor(e),this.vals.get(e)}has(e){return this.readStorageFor(e),this.vals.has(e)}entries(){return(0,n.getValue)(this.collection),this.vals.entries()}keys(){return(0,n.getValue)(this.collection),this.vals.keys()}values(){return(0,n.getValue)(this.collection),this.vals.values()}forEach(e){(0,n.getValue)(this.collection),this.vals.forEach(e)}get size(){return(0,n.getValue)(this.collection),this.vals.size}[Symbol.iterator](){return(0,n.getValue)(this.collection),this.vals[Symbol.iterator]()}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}set(e,t){return this.dirtyStorageFor(e),(0,n.setValue)(this.collection,null),this.vals.set(e,t),this}delete(e){return this.dirtyStorageFor(e),(0,n.setValue)(this.collection,null),this.vals.delete(e)}clear(){this.storages.forEach((e=>(0,n.setValue)(e,null))),(0,n.setValue)(this.collection,null),this.vals.clear()}}Object.setPrototypeOf(a.prototype,Map.prototype)
class c{readStorageFor(e){const{storages:t}=this
let r=t.get(e)
void 0===r&&(r=(0,n.createStorage)(null,(()=>!1)),t.set(e,r)),(0,n.getValue)(r)}dirtyStorageFor(e){const t=this.storages.get(e)
t&&(0,n.setValue)(t,null)}constructor(e){o(this,"storages",new WeakMap),this.vals=e?new WeakMap(e):new WeakMap}get(e){return this.readStorageFor(e),this.vals.get(e)}has(e){return this.readStorageFor(e),this.vals.has(e)}set(e,t){return this.dirtyStorageFor(e),this.vals.set(e,t),this}delete(e){return this.dirtyStorageFor(e),this.vals.delete(e)}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}}function l(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.setPrototypeOf(c.prototype,WeakMap.prototype)
class u{storageFor(e){const t=this.storages
let r=t.get(e)
return void 0===r&&(r=(0,n.createStorage)(null,(()=>!1)),t.set(e,r)),r}dirtyStorageFor(e){const t=this.storages.get(e)
t&&(0,n.setValue)(t,null)}constructor(e){l(this,"collection",(0,n.createStorage)(null,(()=>!1))),l(this,"storages",new Map),this.vals=new Set(e)}has(e){return(0,n.getValue)(this.storageFor(e)),this.vals.has(e)}entries(){return(0,n.getValue)(this.collection),this.vals.entries()}keys(){return(0,n.getValue)(this.collection),this.vals.keys()}values(){return(0,n.getValue)(this.collection),this.vals.values()}forEach(e){(0,n.getValue)(this.collection),this.vals.forEach(e)}get size(){return(0,n.getValue)(this.collection),this.vals.size}[Symbol.iterator](){return(0,n.getValue)(this.collection),this.vals[Symbol.iterator]()}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}add(e){return this.dirtyStorageFor(e),(0,n.setValue)(this.collection,null),this.vals.add(e),this}delete(e){return this.dirtyStorageFor(e),(0,n.setValue)(this.collection,null),this.vals.delete(e)}clear(){this.storages.forEach((e=>(0,n.setValue)(e,null))),(0,n.setValue)(this.collection,null),this.vals.clear()}}Object.setPrototypeOf(u.prototype,Set.prototype)
class h{storageFor(e){const t=this.storages
let r=t.get(e)
return void 0===r&&(r=(0,n.createStorage)(null,(()=>!1)),t.set(e,r)),r}dirtyStorageFor(e){const t=this.storages.get(e)
t&&(0,n.setValue)(t,null)}constructor(e){l(this,"storages",new WeakMap),this.vals=new WeakSet(e)}has(e){return(0,n.getValue)(this.storageFor(e)),this.vals.has(e)}add(e){return this.vals.add(e),this.dirtyStorageFor(e),this}delete(e){return this.dirtyStorageFor(e),this.vals.delete(e)}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}}function d(e,t){var r=function(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance")
return t.get(e)}(e,t)
return function(e,t){return t.get?t.get.call(e):t.value}(e,r)}function f(e,t){y(e,t),t.add(e)}function p(e,t,r){y(e,t),t.set(e,r)}function y(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function g(e,t,r){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance")
return r}Object.setPrototypeOf(h.prototype,WeakSet.prototype)
const m=new Set([Symbol.iterator,"concat","entries","every","filter","find","findIndex","flat","flatMap","forEach","includes","indexOf","join","keys","lastIndexOf","map","reduce","reduceRight","slice","some","values"]),_=new Set(["fill","push","unshift"])
function b(e){if("symbol"==typeof e)return null
const t=Number(e)
return isNaN(t)?null:t%1==0?t:null}var v=new WeakMap,w=new WeakMap,k=new WeakSet,S=new WeakSet
class R{static from(e,t,r){return new R(t?Array.from(e,t,r):Array.from(e))}static of(...e){return new R(e)}constructor(e=[]){f(this,S),f(this,k),p(this,v,{writable:!0,value:(0,n.createStorage)(null,(()=>!1))}),p(this,w,{writable:!0,value:new Map})
let t=e.slice(),r=this,i=new Map,s=!1
return new Proxy(t,{get(e,t){let o=b(t)
if(null!==o)return g(r,k,A).call(r,o),(0,n.getValue)(d(r,v)),e[o]
if("length"===t)return s?s=!1:(0,n.getValue)(d(r,v)),e[t]
if(_.has(t)&&(s=!0),m.has(t)){let s=i.get(t)
return void 0===s&&(s=(...i)=>((0,n.getValue)(d(r,v)),e[t](...i)),i.set(t,s)),s}return e[t]},set(e,t,i){e[t]=i
let s=b(t)
return null!==s?(g(r,S,E).call(r,s),(0,n.setValue)(d(r,v),null)):"length"===t&&(0,n.setValue)(d(r,v),null),!0},getPrototypeOf:()=>R.prototype})}}function A(e){let t=d(this,w).get(e)
void 0===t&&(t=(0,n.createStorage)(null,(()=>!1)),d(this,w).set(e,t)),(0,n.getValue)(t)}function E(e){const t=d(this,w).get(e)
t&&(0,n.setValue)(t,null)}function C(e,t){M(e,t),t.add(e)}function T(e,t,r){M(e,t),t.set(e,r)}function M(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function O(e,t,r){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance")
return r}Object.setPrototypeOf(R.prototype,Array.prototype)
var j=new WeakMap,P=new WeakMap,F=new WeakSet,D=new WeakSet,I=new WeakSet
class q{static fromEntries(e){return new q(Object.fromEntries(e))}constructor(e={}){C(this,I),C(this,D),C(this,F),T(this,j,{writable:!0,value:new Map}),T(this,P,{writable:!0,value:(0,n.createStorage)(null,(()=>!1))})
let t=Object.getPrototypeOf(e),r=Object.getOwnPropertyDescriptors(e),i=Object.create(t)
for(let n in r)Object.defineProperty(i,n,r[n])
let s=this
return new Proxy(i,{get:(e,t)=>(O(s,F,x).call(s,t),e[t]),has:(e,t)=>(O(s,F,x).call(s,t),t in e),ownKeys:e=>((0,n.getValue)(d(s,P)),Reflect.ownKeys(e)),set:(e,t,r)=>(e[t]=r,O(s,D,N).call(s,t),O(s,I,$).call(s),!0),deleteProperty:(e,t)=>(t in e&&(delete e[t],O(s,D,N).call(s,t),O(s,I,$).call(s)),!0),getPrototypeOf:()=>q.prototype})}}function x(e){let t=d(this,j).get(e)
void 0===t&&(t=(0,n.createStorage)(null,(()=>!1)),d(this,j).set(e,t)),(0,n.getValue)(t)}function N(e){const t=d(this,j).get(e)
t&&(0,n.setValue)(t,null)}function $(){(0,n.setValue)(d(this,P),null)}function z(e,t,r){if(void 0!==t&&void 0!==r)return(0,i.tracked)(e,t,r)
if(Array.isArray(e))return new R(e)
switch(e){case Object:return new q
case Array:return new R
case Map:return new a
case WeakMap:return new c
case Set:return new u
case WeakSet:return new h}return e instanceof Map?new a(e):e instanceof WeakMap?new c:e instanceof Set?new u(e):e instanceof WeakSet?new h:((0,s.assert)("You must either use tracked as a field decorator, or to wrap built-in class instances:\n\n      class Example {\n        @tracked field = 123;\n\n        map = tracked(Map);\n        map = tracked(new Map());\n      }","object"==typeof e&&null!==e),new q(e))}},3742:(e,t,r)=>{r.r(t),r.d(t,{cached:()=>b,dedupeTracked:()=>v,localCopy:()=>m,trackedReset:()=>_})
var i,s,n=r(1603),o=r(4471),a=r(473),c=r(4217)
function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let u=(i=class{constructor(){var e
l(this,"prevRemote",void 0),l(this,"peek",void 0),(e=s)&&Object.defineProperty(this,"value",{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:e.initializer?e.initializer.call(this):void 0})}},h=i.prototype,d="value",f=[a.tracked],p={configurable:!0,enumerable:!0,writable:!0,initializer:null},y={},Object.keys(p).forEach((function(e){y[e]=p[e]})),y.enumerable=!!y.enumerable,y.configurable=!!y.configurable,("value"in y||y.initializer)&&(y.writable=!0),void 0===(y=f.slice().reverse().reduce((function(e,t){return t(h,d,e)||e}),y)).initializer&&(Object.defineProperty(h,d,y),y=null),s=y,i)
var h,d,f,p,y
function g(e,t,r){let i=t.get(e)
return void 0===i&&(i=new u,t.set(e,i),i.value=i.peek="function"==typeof r?r.call(e):r),i}function m(e,t){(0,n.assert)(`@localCopy() must be given a memo path as its first argument, received \`${String(e)}\``,"string"==typeof e)
let r=new WeakMap
return()=>{let i=t=>(0,o.get)(t,e)
return{get(){let e=g(this,r,t),{prevRemote:s}=e,n=i(this)
return s!==n&&(e.value=e.prevRemote=n),e.value},set(e){if(!r.has(this)){let s=g(this,r,t)
return s.prevRemote=i(this),void(s.value=e)}g(this,r,t).value=e}}}}function _(e){(0,n.assert)(`@trackedReset() must be given a memo path, a memo function, or config object with a memo path or function as its first argument, received \`${String(e)}\``,"string"==typeof e||"function"==typeof e||"object"==typeof e&&null!==e&&void 0!==e.memo)
let t=new WeakMap
return(r,i,s)=>{let n,a,c=s.initializer??(()=>{})
"object"==typeof e?(n=e.memo,a=e.update??c):(n=e,a=c)
let l="function"==typeof n?(e,t)=>n.call(e,e,i,t):e=>(0,o.get)(e,n)
return{get(){let e=g(this,t,c),{prevRemote:r}=e,s=l(this,r)
return s!==r&&(e.prevRemote=s,e.value=e.peek=a.call(this,this,i,e.peek)),e.value},set(e){g(this,t,c).value=e}}}}function b(e,t,r){(0,n.assert)("@cached can only be used on getters",r&&r.get)
let{get:i,set:s}=r,o=new WeakMap
return{get(){let e=o.get(this)
return void 0===e&&(e=(0,c.createCache)(i.bind(this)),o.set(this,e)),(0,c.getValue)(e)},set:s}}function v(){let e
const t=function(t,r,i){let{initializer:s}=i,{get:n,set:o}=(0,a.tracked)(t,r,i),c=new WeakMap
return{get(){if(!c.has(this)){let e=s?.call(this)
c.set(this,e),o.call(this,e)}return n.call(this)},set(t){c.has(this)&&e(t,c.get(this))||(c.set(this,t),o.call(this,t))}}}
return 3===arguments.length?(e=(e,t)=>e===t,t(...arguments)):1===arguments.length&&"function"==typeof arguments[0]?(e=arguments[0],t):void(0,n.assert)(`@dedupeTracked() can either be invoked without arguments or with one comparator function, received \`${String(arguments)}\``,!1)}}}])
