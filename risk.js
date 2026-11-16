/* AulaTrader - cálculos educativos. No realiza operaciones reales. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  if(root)root.AulaRisk=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function finitePositive(value,label){
    const n=Number(value);
    if(!Number.isFinite(n)||n<=0) throw new RangeError(label+' debe ser un número positivo.');
    return n;
  }
  function calculateLong(input){
    const capital=finitePositive(input.capital,'Capital');
    const percent=finitePositive(input.percent,'Porcentaje');
    const entry=finitePositive(input.entry,'Entrada');
    const stop=finitePositive(input.stop,'Stop loss');
    const target=finitePositive(input.target,'Objetivo');
    if(percent>100) throw new RangeError('El riesgo no puede superar el 100%.');
    if(stop>=entry) throw new RangeError('En este ejemplo de compra el stop debe ser menor que la entrada.');
    if(target<=entry) throw new RangeError('En este ejemplo de compra el objetivo debe ser mayor que la entrada.');
    const riskCash=capital*percent/100;
    const riskPerUnit=entry-stop;
    const units=riskCash/riskPerUnit;
    const notional=units*entry;
    const reward=(target-entry)*units;
    const ratio=(target-entry)/riskPerUnit;
    return {riskCash,riskPerUnit,units,notional,reward,ratio,allocationPercent:notional/capital*100};
  }
  return Object.freeze({calculateLong});
});
