'use strict';
(function(){const button=document.getElementById('go-progress'),note=document.getElementById('plan-link-note');
 function read(){return PlanTransfer.make({nickname:document.getElementById('nickname').value,platform:document.getElementById('platform').value,days:document.getElementById('days').value,target:document.getElementById('quantity').value,demo:!!window.INTENTION_EXAMPLE})}
 document.getElementById('intent-form').addEventListener('submit',()=>{button.disabled=typeof generated==='undefined'||!generated;note.textContent=button.disabled?'先完成必填项并生成意图卡。':'计划准备好了，可以直接带到报喜页。'});
 for(const id of ['nickname','intention','platform','days','quantity','barrier','response','vision'])document.getElementById(id).addEventListener('input',()=>{button.disabled=true;note.textContent='修改后，请重新生成意图卡，再带入报喜页。'});
 button.addEventListener('click',()=>{try{const plan=read();if(typeof generated==='undefined'||!generated)return;try{if(!plan.demo)localStorage.setItem(PlanTransfer.KEY,JSON.stringify(plan))}catch{}window.location.assign(new URL('progress/index.html'+PlanTransfer.hash(plan),window.location.href).href)}catch(e){note.textContent=e.message}});
})();
