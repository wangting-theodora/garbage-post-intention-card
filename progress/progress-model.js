(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ProgressModel=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const quotes=['你又把一个真实的念头，送到了世界里。','不需要每次都完整，今天这一小步也算数。','你给自己的声音，留出了一个位置。','休息以后再回来，依然可以接着走。','表达可以很小，这一次也值得被记住。','慢慢积累的，是越来越熟悉自己的声音。'];
 function integer(v,min=0){const n=Number(v);if(v===''||!Number.isSafeInteger(n)||n<min||n>1000000)throw Error('请填写有效的整数条数。');return n}
 function validate(s){if(!s||s.version!==1||typeof s.nickname!=='string'||!s.nickname.trim()||s.nickname.length>20||typeof s.platform!=='string'||s.platform.length>40||!Array.isArray(s.records)||s.records.length>10000)throw Error('这份备份格式不正确。');if(s.target!==integer(s.target,1)||s.baseline!==integer(s.baseline))throw Error('备份中的条数必须是数字。');for(const r of s.records){if(!r||r.amount!==integer(r.amount,1)||typeof r.feeling!=='string'||r.feeling.length>400||typeof r.date!=='string'||isNaN(Date.parse(r.date)))throw Error('备份中的记录不完整。')}if(s.days!=null&&(!Number.isInteger(s.days)||s.days<1||s.days>3650))throw Error('挑战天数需要是1到3650之间的整数。');return s}
 function create(nickname,target,baseline=0,platform='',days=null){return validate({version:1,nickname:nickname.trim(),target:integer(target,1),baseline:integer(baseline),platform:platform.trim(),days,records:[]})}
 function total(s){return s.baseline+s.records.reduce((n,r)=>n+r.amount,0)}
 function add(s,amount,feeling='',date=new Date().toISOString()){validate(s);const before=total(s);const next=validate({...s,records:[...s.records,{amount:integer(amount,1),feeling:feeling.trim(),date}]});const after=total(next);return {state:next,entry:{nickname:next.nickname,platform:next.platform,target:next.target,days:next.days||null,amount:integer(amount,1),total:after,count:next.records.length,feeling:feeling.trim(),date,quote:quotes[(next.records.length-1)%quotes.length],milestone:Math.min(4,Math.floor(after/next.target*4))>Math.min(4,Math.floor(before/next.target*4))}}}
 function undo(s){validate(s);return {...s,records:s.records.slice(0,-1)}}
 function restore(raw){let s;try{s=JSON.parse(raw)}catch{throw Error('无法读取这份备份，请选择导出的JSON文件。')}return validate(s)}
 return {create,validate,total,add,undo,restore,quotes};
});
