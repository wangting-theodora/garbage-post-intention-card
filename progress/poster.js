(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.drawProgressPoster=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const ink='#244f3c',muted='#72846c';
 function wrap(c,t,w){let line='',lines=[];for(const ch of t){if(ch==='\n'){lines.push(line);line='';continue}if(c.measureText(line+ch).width>w&&line){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);return lines}
 return function(canvas,d,demo=false){let c=canvas.getContext('2d');c.font='32px "Microsoft YaHei",sans-serif';const lines=wrap(c,d.feeling||'今天这一步，已经留下了自己的声音。',870);canvas.width=1080;canvas.height=1320+Math.max(0,lines.length-3)*48;c=canvas.getContext('2d');
 const H=canvas.height;c.fillStyle='#faf8ef';c.fillRect(0,0,1080,H);c.fillStyle='#e9efdf';c.beginPath();c.arc(950,170,270,0,Math.PI*2);c.fill();
 function txt(t,x,y,size=30,color=ink,bold=false){c.fillStyle=color;c.font=`${bold?'600 ':''}${size}px "Microsoft YaHei",sans-serif`;c.fillText(t,x,y)}
 txt('喜多的工作坊：垃圾帖宝藏场',285,70,24,muted);txt(demo?'填写范例 · 演示数据':'今天，我又表达了一点',80,150,27,muted);
 let name=d.nickname+'的表达报喜卡',size=58;c.font=`600 ${size}px "Microsoft YaHei",sans-serif`;while(c.measureText(name).width>920){size--;c.font=`600 ${size}px "Microsoft YaHei",sans-serif`}txt(name,80,244,size,ink,true);
 const date=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric'}).format(new Date(d.date));const meta=date+(d.platform?'  ·  '+d.platform:'');let metaSize=26;c.font=`${metaSize}px "Microsoft YaHei",sans-serif`;while(c.measureText(meta).width>920){metaSize--;c.font=`${metaSize}px "Microsoft YaHei",sans-serif`}txt(meta,80,305,metaSize,muted);
 c.strokeStyle='#b6c89b';c.lineWidth=5;c.beginPath();c.moveTo(882,385);c.quadraticCurveTo(868,316,927,291);c.stroke();c.fillStyle='#91ac70';c.beginPath();c.ellipse(881,341,35,15,.6,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(910,315,35,15,-.5,0,Math.PI*2);c.fill();
 function fit(t,x,y,width,start){let s=start;c.font=`600 ${s}px "Microsoft YaHei",sans-serif`;while(c.measureText(t).width>width){s--;c.font=`600 ${s}px "Microsoft YaHei",sans-serif`}txt(t,x,y,s,ink,true)}
 txt('本次新增',80,400,27,muted);fit('+'+d.amount+' 条',80,500,400,80);txt('累计发布',530,400,27,muted);fit(d.total+' / '+d.target+' 条',530,500,470,48);
 c.fillStyle='#e0e8d4';c.beginPath();c.roundRect(80,557,920,24,12);c.fill();c.fillStyle='#6d9356';c.beginPath();c.roundRect(80,557,Math.max(2,920*Math.min(1,d.total/d.target)),24,12);c.fill();txt('已完成 '+(d.total/d.target*100).toFixed(1).replace('.0','')+'%   ·   第 '+d.count+' 次报喜',80,634,26,muted);
 if(d.days)txt('计划周期 '+d.days+' 天',80,680,24,muted);txt('这次表达，我想记住',80,760,31,ink,true);c.font='32px "Microsoft YaHei",sans-serif';let y=825;for(const l of wrap(c,d.feeling||'今天这一步，已经留下了自己的声音。',920)){txt(l,80,y,32);y+=48}
 const quoteY=Math.max(1030,y+95);c.strokeStyle='#c6d1b8';c.lineWidth=1;c.beginPath();c.moveTo(80,quoteY-52);c.lineTo(1000,quoteY-52);c.stroke();
 let qy=quoteY;c.font='34px "Microsoft YaHei",sans-serif';const qlines=wrap(c,d.quote,920);qlines.forEach((l,i)=>txt(l,80,qy+i*50,34,ink,true));
 txt('允许自己先写出垃圾，看里面藏着什么宝藏',225,H-58,24,muted);return canvas;
 };
});
