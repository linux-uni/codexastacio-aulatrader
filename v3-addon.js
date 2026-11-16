/* CodeXaStacio AulaTrader v3: progressive enhancement for the original simulator. */
(function(root,factory){
  const lab=typeof module==='object'&&module.exports?require('./lab-v3.js'):root.AulaLabV3;
  const api=factory(lab);
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.AulaAddonV3=api;
})(typeof window!=='undefined'?window:null,function(lab){
  'use strict';
  let chartInstance=null;
  function destroy(){
    if(chartInstance){
      try{chartInstance.remove()}catch(err){ /* Detached DOM during navigation. */ }
      chartInstance=null;
    }
  }
  function drawPro(state){
    if(typeof document==='undefined')return;
    const panel=document.getElementById('proChartPanel'),host=document.getElementById('proChart');
    if(!panel||!host||!state.chartPro)return;
    const lc=typeof window!=='undefined'?window.LightweightCharts:null;
    const legacy=document.getElementById('legacyChartArea');
    if(!lc||typeof lc.createChart!=='function'||!lc.CandlestickSeries){
      host.innerHTML='<div class="v3-pro-error">No se pudo cargar el gráfico profesional. Puedes seguir practicando con el gráfico básico. Revisa tu conexión o recarga la app.</div>';
      if(legacy)legacy.style.display='';
      return;
    }
    try{
      destroy();
      const candles=lab.candlesFromPrices(state.prices);
      if(candles.length<2)throw new Error('Faltan datos ficticios para dibujar las velas.');
      chartInstance=lc.createChart(host,{
        autoSize:true,
        layout:{background:{type:'solid',color:'#0b2033'},textColor:'#a8c5cf',fontFamily:'system-ui'},
        grid:{vertLines:{color:'#193547'},horzLines:{color:'#193547'}},
        rightPriceScale:{borderColor:'#3a596d'},
        timeScale:{borderColor:'#3a596d',timeVisible:false,secondsVisible:false},
        crosshair:{mode:lc.CrosshairMode?.Normal||0}
      });
      const price=chartInstance.addSeries(lc.CandlestickSeries,{
        upColor:'#60efd2',downColor:'#ff899a',
        borderVisible:false,wickUpColor:'#60efd2',wickDownColor:'#ff899a'
      });
      price.setData(candles);
      const sma=lab.sma(candles,10);
      if(sma.length){
        const avg=chartInstance.addSeries(lc.LineSeries,{
          color:'#f7cb7a',lineWidth:2,title:'SMA 10',priceLineVisible:false,lastValueVisible:true
        });
        avg.setData(sma);
      }
      chartInstance.timeScale().fitContent();
    }catch(err){
      destroy();
      host.textContent='El gráfico interactivo no está disponible. Selecciona el gráfico básico para continuar.';
      if(legacy)legacy.style.display='';
    }
  }
  function bind(options){
    if(typeof document==='undefined')return;
    const {state,save,render,lessons,getOpenLesson}=options;
    const filterQuery=document.getElementById('lessonQuery'),filterLevel=document.getElementById('lessonLevel');
    if(filterQuery&&filterLevel){
      function applyFilter(){
        const q=filterQuery.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        const level=filterLevel.value;
        document.querySelectorAll('.lesson-card').forEach(card=>{
          const norm=card.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
          const keep=(!level||card.dataset.level===level)&&(!q||norm.includes(q));
          card.hidden=!keep;
          card.style.display=keep?'':'none';
        });
      }
      filterQuery.addEventListener('input',applyFilter);
      filterLevel.addEventListener('change',applyFilter);
    }
    const btn=document.getElementById('lessonCheckBtn');
    if(btn){
      btn.addEventListener('click',()=>{
        const lesson=lessons.find(l=>l.id===getOpenLesson());
        if(!lesson?.check)return;
        const checked=document.querySelector('input[name="lessonCheck"]:checked');
        const result=document.getElementById('lessonCheckResult');
        if(!checked){result.textContent='Selecciona una respuesta para comprobar tu comprensión.';return;}
        const right=Number(checked.value)===lesson.check.answer;
        result.textContent=(right?'✓ Correcto. ':'Todavía no. ')+lesson.check.explanation;
      });
    }
    const pro=document.getElementById('proChartToggle');
    if(pro)pro.addEventListener('click',()=>{
      state.chartPro=!state.chartPro;
      save();render();
    });
  }
  return Object.freeze({destroy,drawPro,bind});
});
