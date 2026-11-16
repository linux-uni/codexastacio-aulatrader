const assert=require('node:assert/strict');
const test=require('node:test');
const {calculateLong}=require('../risk.js');

test('calcula tamaño y relación de riesgo/recompensa',()=>{
  const r=calculateLong({capital:10000,percent:1,entry:100,stop:95,target:110});
  assert.equal(r.riskCash,100);
  assert.equal(r.units,20);
  assert.equal(r.notional,2000);
  assert.equal(r.reward,200);
  assert.equal(r.ratio,2);
});
test('rechaza riesgo cero, negativo o mayor que capital',()=>{
  for(const percent of [0,-1,101])assert.throws(()=>calculateLong({capital:10000,percent,entry:100,stop:95,target:110}),RangeError);
});
test('rechaza stop y objetivo mal ubicados',()=>{
  assert.throws(()=>calculateLong({capital:10000,percent:1,entry:100,stop:101,target:110}),/stop/);
  assert.throws(()=>calculateLong({capital:10000,percent:1,entry:100,stop:95,target:99}),/objetivo/);
});
test('no acepta Infinity, NaN ni valores nulos',()=>{
  for(const capital of [NaN,Infinity,0,-10])assert.throws(()=>calculateLong({capital,percent:1,entry:100,stop:95,target:110}),RangeError);
});
