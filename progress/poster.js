(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.drawProgressPoster=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const ink='#244f3c',muted='#72846c',paper='#faf8ef',font='"Microsoft YaHei","PingFang SC","Segoe UI Emoji",sans-serif';let background=null;
 function wrap(c,t,w){let line='',lines=[];for(const ch of t){if(ch==='\n'){lines.push(line);line='';continue}if(c.measureText(line+ch).width>w&&line){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);return lines}
 function draw(canvas,d,demo=false){canvas.width=1080;let c=canvas.getContext('2d');
 c.font='32px '+font;const feeling=(d.feeling||'').trim(),fl=wrap(c,feeling,920);
 c.font='600 32px '+font;const pl=wrap(c,'本次发布 · '+(d.platform||'未填写平台'),872),ph=Math.max(82,pl.length*45+32);
 c.font='600 34px '+font;const ql=wrap(c,d.quote||'',880);
 const sy=333+ph+65,sv=sy+90,by=sv+55,ny=by+78,cy=d.days?ny+44:ny,fy=cy+90,bodyY=fy+65,qy=feeling?bodyY+fl.length*48+92:cy+160;
 canvas.height=Math.max(1320,qy+ql.length*53+230);c=canvas.getContext('2d');const H=canvas.height;
 c.fillStyle=paper;c.fillRect(0,0,1080,H);
 if(background){
  const iw=background.naturalWidth||background.width,ih=background.naturalHeight||background.height;
  const cropTop=340*iw/1080,cropBottom=220*iw/1080;
  c.globalAlpha=.78;c.drawImage(background,0,0,iw,Math.min(ih,cropTop),0,0,1080,340);
  c.globalAlpha=.70;c.drawImage(background,0,Math.max(0,ih-cropBottom),iw,Math.min(ih,cropBottom),0,H-220,1080,220);c.globalAlpha=1;
  let g=c.createLinearGradient(0,135,0,340);g.addColorStop(0,'#faf8ef00');g.addColorStop(1,paper);c.fillStyle=g;c.fillRect(0,135,1080,205);
  g=c.createLinearGradient(0,H-220,0,H-80);g.addColorStop(0,paper);g.addColorStop(1,'#faf8ef00');c.fillStyle=g;c.fillRect(0,H-220,1080,140);
 }
 function txt(t,x,y,size=30,color=ink,bold=false,align='left'){c.textAlign=align;c.fillStyle=color;c.font=(bold?'600 ':'')+size+'px '+font;c.fillText(t,x,y)}
 function fit(t,x,y,width,start){let s=start;c.font='600 '+s+'px '+font;while(c.measureText(t).width>width&&s>14){s--;c.font='600 '+s+'px '+font}txt(t,x,y,s,ink,true)}
 txt('喜多的工作坊：垃圾帖宝藏场',540,72,24,muted,false,'center');
 txt(demo?'填写范例 · 演示数据':'今天，我又表达了一点',80,150,27,muted);
 fit(d.nickname+'的表达报喜卡',80,244,920,58);
 const date=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric'}).format(new Date(d.date));txt(date,80,301,26,muted);
 c.fillStyle='#e2ecd6';c.beginPath();c.roundRect(80,333,920,ph,14);c.fill();pl.forEach((l,i)=>txt(l,104,333+49+i*45,32,ink,true));
 txt('本次新增',80,sy,27,muted);fit('+'+d.amount+' 条',80,sv,400,80);txt('累计发布',530,sy,27,muted);fit(d.total+' / '+d.target+' 条',530,sv,470,48);
 c.fillStyle='#e0e8d4';c.beginPath();c.roundRect(80,by,920,24,12);c.fill();c.fillStyle='#6d9356';c.beginPath();c.roundRect(80,by,Math.max(2,920*Math.min(1,d.total/d.target)),24,12);c.fill();
 txt('已完成 '+(d.total/d.target*100).toFixed(1).replace('.0','')+'%   ·   第 '+d.count+' 次报喜',80,ny,26,muted);
 if(d.days)txt('计划周期 '+d.days+' 天',80,cy,24,muted);
 if(feeling){txt('这次表达，我的感受是：',80,fy,31,ink,true);fl.forEach((l,i)=>txt(l,80,bodyY+i*48,32))}
 c.strokeStyle='#c6d1b8';c.lineWidth=1;c.beginPath();c.moveTo(80,qy-52);c.lineTo(1000,qy-52);c.stroke();
 ql.forEach((l,i)=>txt(l,540,qy+i*53,34,ink,true,'center'));
 txt('允许自己先写出垃圾，看里面藏着什么宝藏',540,H-58,24,muted,false,'center');c.textAlign='left';return canvas;
 }
 draw.setBackground=image=>{background=image};return draw;
});
