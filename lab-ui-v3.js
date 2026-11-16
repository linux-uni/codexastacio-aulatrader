/* DANTE Lab v3 UI - pure study inputs, no exchange connections */
(function(root,factory){
  const lib=typeof module==='object'&&module.exports?require('./lab-v3.js'):root.AulaLabV3;
  const api=factory(lib);
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.AulaLabUIV3=api;
})(typeof window!=='undefined'?window:null,function(lab){
  'use strict';
  function markup(){
    return '<section class="card v3-lab-card" aria-label="Laboratorio avanzado DANTE">'+
      '<div class="v3-headline"><h2>Laboratorio avanzado · DANTE</h2><span class="v3-tag">Solo escenarios educativos</span></div>'+
      '<p class="muted small">Tres herramientas para distinguir una operación atractiva de una hipótesis con costos y pérdidas posibles. Ninguna constituye una recomendación financiera.</p>'+
      '<div class="v3-lab-grid">'+
        '<div class="v3-control"><label for="v3CostUnits">Unidades ficticias</label><input id="v3CostUnits" type="number" min=".01" step="any" value="10"></div>'+
        '<div class="v3-control"><label for="v3CostEntry">Precio de entrada</label><input id="v3CostEntry" type="number" min=".01" step="any" value="100"></div>'+
        '<div class="v3-control"><label for="v3CostExit">Precio de salida</label><input id="v3CostExit" type="number" min=".01" step="any" value="102"></div>'+
        '<div class="v3-control"><label for="v3CostCommission">Comisión por operación (USD)</label><input id="v3CostCommission" type="number" min="0" step="any" value="1"></div>'+
        '<div class="v3-control"><label for="v3CostSpread">Spread total por unidad (USD)</label><input id="v3CostSpread" type="number" min="0" step="any" value=".10"></div>'+
        '<div class="v3-control"><label for="v3CostSlippage">Deslizamiento por unidad/lado (USD)</label><input id="v3CostSlippage" type="number" min="0" step="any" value=".05"></div>'+
      '</div>'+
      '<div id="v3CostResult" class="v3-output" role="status" aria-live="polite"></div>'+
      '<p class="v3-lab-note">Modelo simplificado: posición larga, compra y venta, dos comisiones, un spread total por unidad y deslizamiento en ambos lados. No incluye impuestos ni costos de financiación.</p>'+
      '<hr style="border:0;border-top:1px solid #36546b;margin:23px 0">'+
      '<div class="v3-headline"><h2>Probabilidades y esperanza matemática</h2><span class="v3-tag">No pronostica resultados</span></div>'+
      '<div class="v3-lab-grid">'+
        '<div class="v3-control"><label for="v3WinRate">Aciertos supuestos (%)</label><input id="v3WinRate" type="number" min="0" max="100" step="any" value="40"></div>'+
        '<div class="v3-control"><label for="v3AvgWin">Ganancia media (USD)</label><input id="v3AvgWin" type="number" min=".01" step="any" value="120"></div>'+
        '<div class="v3-control"><label for="v3AvgLoss">Pérdida media (USD)</label><input id="v3AvgLoss" type="number" min=".01" step="any" value="60"></div>'+
        '<div class="v3-control"><label for="v3AvgCost">Costos medios/operación (USD)</label><input id="v3AvgCost" type="number" min="0" step="any" value="2"></div>'+
      '</div>'+
      '<div id="v3ExpectancyResult" class="v3-output" role="status" aria-live="polite"></div>'+
      '<p class="v3-lab-note">Ejercicio de probabilidades establecidas por el alumno, no una estimación estadística de una estrategia real. En la práctica, los resultados pueden variar notablemente.</p>'+
      '<hr style="border:0;border-top:1px solid #36546b;margin:23px 0">'+
      '<div class="v3-headline"><h2>Analizador de drawdown</h2><span class="v3-tag">Capital ficticio</span></div>'+
      '<div class="v3-control"><label for="v3Balances">Saldos por período (USD; separados por comas)</label><input id="v3Balances" type="text" spellcheck="false" value="10000, 9800, 10400, 8900, 9300, 8500" maxlength="1000"></div>'+
      '<div id="v3DrawdownResult" class="v3-output" role="status" aria-live="polite"></div>'+
      '<p class="v3-lab-note">El drawdown se calcula desde el máximo histórico observado en los valores introducidos. Una caída del 50% requiere ganar 100% sobre el capital restante para recuperar el máximo.</p>'+
      '<p class="v3-warning">Práctica educativa: no se envían órdenes a intermediarios, no se consultan cotizaciones reales y las cifras no representan asesoría financiera.</p>'+
      '</section>';
  }
  function money(n){
    return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n);
  }
  function metric(title,value){
    return '<div><small>'+title+'</small><strong>'+value+'</strong></div>';
  }
  function init(){
    if(typeof document==='undefined'||!document.getElementById('v3CostResult'))return;
    const el=(id)=>document.getElementById(id),value=(id)=>el(id).value;
    function costs(){
      const output=el('v3CostResult');
      try{
        const c=lab.costs({units:value('v3CostUnits'),entry:value('v3CostEntry'),exit:value('v3CostExit'),commission:value('v3CostCommission'),spread:value('v3CostSpread'),slippage:value('v3CostSlippage')});
        output.innerHTML='<div class="v3-metrics">'+metric('P/L bruto',money(c.gross))+metric('Costo completo',money(c.totalCost))+metric('Resultado neto',money(c.net))+metric('Salida para equilibrio',money(c.breakEvenExit))+'</div>';
      }catch(err){output.textContent=err.message}
    }
    function expectancy(){
      const output=el('v3ExpectancyResult');
      try{
        const r=lab.expectancy({winRate:value('v3WinRate'),avgWin:value('v3AvgWin'),avgLoss:value('v3AvgLoss'),cost:value('v3AvgCost')});
        output.innerHTML='<div class="v3-metrics">'+metric('Esperanza neta teórica',money(r.net))+metric('Esperanza antes de costos',money(r.gross))+metric('Aciertos para equilibrio',r.breakEvenRate.toFixed(1)+'%')+'</div>'+(r.breakEvenRate>100?'<p class="v3-warning">Con estos costos no hay un punto de equilibrio alcanzable con estas magnitudes de ganancia/pérdida.</p>':'');
      }catch(err){output.textContent=err.message}
    }
    function drawdown(){
      const output=el('v3DrawdownResult');
      try{
        const balances=lab.parseBalances(value('v3Balances')),r=lab.drawdown(balances);
        output.innerHTML='<div class="v3-metrics">'+metric('Drawdown máximo',r.maxDrawdownPct.toFixed(2)+'%')+metric('Pico registrado',money(r.peakBalance))+metric('Valle observado',money(r.troughBalance))+metric('Subida para recuperar ese descenso',Number.isFinite(r.recoveryPct)?r.recoveryPct.toFixed(2)+'%':'No calculable')+'</div>';
      }catch(err){output.textContent=err.message}
    }
    for(const id of ['v3CostUnits','v3CostEntry','v3CostExit','v3CostCommission','v3CostSpread','v3CostSlippage'])el(id).addEventListener('input',costs);
    for(const id of ['v3WinRate','v3AvgWin','v3AvgLoss','v3AvgCost'])el(id).addEventListener('input',expectancy);
    el('v3Balances').addEventListener('input',drawdown);
    costs();expectancy();drawdown();
  }
  return Object.freeze({markup,init});
});
