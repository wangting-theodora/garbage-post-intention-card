(function(){
 const sample=window.INTENTION_EXAMPLE;if(!sample)return;
 for(const id of fieldIds)$(id).value=sample[id]||'';
 document.querySelector('input[name="face-mode"][value="add"]').checked=true;
 $('upload-panel').hidden=false;
 const portrait=new Image();portrait.onload=()=>{faceImage=portrait;$('face-preview').src=sample.face;$('face-preview-wrap').hidden=false;$('upload-status').textContent='已加载原创人物示意卡，实际填写时请换成你选中的Faces卡。';changed();status('完整填写范例已载入。可以生成、保存，也可以修改后再试。')};
 portrait.onerror=()=>{status('示意卡暂时无法读取，可以重新选择一张图片。')};portrait.src=sample.face;
 changed();
})();
