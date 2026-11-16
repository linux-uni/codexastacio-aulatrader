/* Laboratorio DANTE v3. Cálculos de práctica, nunca operaciones reales. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.AulaLabV3=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function number(value,label,zeroOK){
    if(value===''||value===null||value===undefined)throw new RangeError(label+' no puede estar vacío.');
    const n=Number(value);
    if(!Number.isFinite(n)||(zeroOK?n<0:n<=0))throw new RangeError(label+' debe ser un número '+(zeroOK?'no negativo.':'positivo.'));
    return n;
  }
  function costs(input){
    const units=number(input.units,'Unidades');
    const entry=number(input.entry,'Entrada');
    const exit=number(input.exit,'Salida');
    const commission=number(input.commission,'Comisión por ejecución',true);
    const spread=number(input.spread,'Spread total por unidad',true);
    const slippage=number(input.slippage,'Deslizamiento por unidad por ejecución',true);
    const gross=(exit-entry)*units;
    const commissions=2*commission;
    const spreadCost=spread*units;
    const slippageCost=2*slippage*units;
    const totalCost=commissions+spreadCost+slippageCost;
    const net=gross-totalCost;
    return {gross,commissions,spreadCost,slippageCost,totalCost,net,breakEvenExit:entry+totalCost/units};
  }
  function expectancy(input){
    const winRate=number(input.winRate,'Tasa de aciertos',true);
    if(winRate>100)throw new RangeError('La tasa de aciertos no puede superar 100%.');
    const avgWin=number(input.avgWin,'Ganancia media');
    const avgLoss=number(input.avgLoss,'Pérdida media');
    const cost=number(input.cost,'Costo medio por operación',true);
    const p=winRate/100;
    const gross=p*avgWin-(1-p)*avgLoss;
    const net=gross-cost;
    const breakEvenRate=100*(avgLoss+cost)/(avgWin+avgLoss);
    return {gross,net,breakEvenRate,p,assumedWin:avgWin,assumedLoss:avgLoss,assumedCost:cost};
  }
  function drawdown(input){
    if(!Array.isArray(input)||input.length<2||input.length>200)throw new RangeError('Usa entre 2 y 200 valores de capital.');
    const vals=input.map(v=>number(v,'Saldo'));
    let peak=vals[0],maxDrawdown=0,peakAt=0,troughAt=0,peakBalance=peak,troughBalance=peak;
    for(let i=1;i<vals.length;i++){
      if(vals[i]>peak){peak=vals[i];peakAt=i;}
      const dd=(peak-vals[i])/peak;
      if(dd>maxDrawdown){maxDrawdown=dd;troughAt=i;peakBalance=peak;troughBalance=vals[i];}
    }
    const current=vals[vals.length-1];
    const recoveryPct=maxDrawdown>=1?Infinity:100*maxDrawdown/(1-maxDrawdown);
    return {maxDrawdownPct:maxDrawdown*100,peakAt,troughAt,peakBalance,troughBalance,current,recoveryPct};
  }
  function candlesFromPrices(prices){
    if(!Array.isArray(prices))throw new TypeError('Se requiere un array de precios.');
    const values=prices.map(p=>Number(p)).filter(v=>Number.isFinite(v)&&v>0);
    if(values.length<2)return [];
    // Las velas usan solo los valores inventados disponibles: no se atribuyen máximos no observados.
    const start=Date.UTC(2025,0,1)/1000;
    return values.slice(1).map((close,i)=>{
      const open=values[i];
      return {time:start+(i+1)*3600,open,close,high:Math.max(open,close),low:Math.min(open,close)};
    });
  }
  function sma(candles,period){
    if(!Array.isArray(candles))throw new TypeError('Se requieren velas.');
    if(!Number.isInteger(period)||period<2||period>100)throw new RangeError('Periodo inválido.');
    const result=[];let sum=0;
    for(let i=0;i<candles.length;i++){
      const value=Number(candles[i].close);
      if(!Number.isFinite(value))throw new RangeError('Precios inválidos.');
      sum+=value;
      if(i>=period)sum-=Number(candles[i-period].close);
      if(i>=period-1)result.push({time:candles[i].time,value:Math.round(sum/period*10000)/10000});
    }
    return result;
  }
  function parseBalances(text){
    const input=String(text||'').trim();
    if(!input)throw new RangeError('Introduce varios saldos separados por comas.');
    const bits=input.split(/[,\n;]+/).map(v=>v.trim());
    if(bits.length<2||bits.length>200)throw new RangeError('Usa entre 2 y 200 valores.');
    if(bits.some(v=>!v))throw new RangeError('No incluyas valores vacíos.');
    return bits.map(v=>number(v,'Saldo'));
  }
  return Object.freeze({costs,expectancy,drawdown,candlesFromPrices,sma,parseBalances});
});
