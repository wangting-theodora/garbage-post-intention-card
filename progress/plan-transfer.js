(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PlanTransfer=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';const KEY='kita-intention-plan-v1';
 function validNumber(v,max){const n=Number(v);return v!==null&&v!==undefined&&v!==''&&Number.isInteger(n)&&n>0&&n<=max?n:null}
 function clean(p){if(!p||p.kind!=='kita-intention-plan'||p.version!==1)throw Error('无法读取这份发布计划。');const nickname=typeof p.nickname==='string'?p.nickname.trim():'',platform=typeof p.platform==='string'?p.platform.trim():'';const target=validNumber(p.target,1000000),days=p.days==null?null:validNumber(p.days,3650);if(!nickname||nickname.length>20||platform.length>40||!target||(p.days!=null&&!days))throw Error('发布计划不完整，请检查昵称、天数和总条数。');return {kind:'kita-intention-plan',version:1,nickname,platform,days,target,demo:p.demo===true}}
 function make(fields){return clean({kind:'kita-intention-plan',version:1,...fields})}
 function hash(p){return '#plan='+encodeURIComponent(JSON.stringify(clean(p)))}
 function fromHash(value){if(value.length>4096)throw Error('计划链接过长，请重新从意图卡页面进入。');const params=new URLSearchParams(value.replace(/^#/,''));const data=params.get('plan');return data?clean(JSON.parse(data)):null}
 function parseOCR(raw){const text=raw.normalize('NFKC').replace(/[ \t\r]+/g,'');const title=text.match(/(?:^|\n)([^\n]{1,20}?)的垃圾[帖贴].{0,4}意图卡/);const start=text.search(/发布平[台合]/);const region=(start<0?'':text.slice(start)).split(/平均每天|应对计划|愿景期待|可能的阻碍/)[0];const day=region.match(/(\d{1,4})天/);const qty=region.match(/(\d[\d,]*)条/);const platforms=[...new Set(region.match(/朋友圈|公众号|小红书|即刻|微博|抖音|视频号|豆瓣|知乎|Instagram|Newsletter|博客/gi)||[])];return {nickname:title?.[1]||'',platform:platforms.join('、'),days:validNumber(day?.[1],3650),target:validNumber(qty?.[1].replaceAll(',',''),1000000)}}
 return {KEY,clean,make,hash,fromHash,parseOCR};
});
