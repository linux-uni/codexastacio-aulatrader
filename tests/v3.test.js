const test=require('node:test');
const assert=require('node:assert/strict');
const lab=require('../lab-v3.js');
const academy=require('../academy-v3.js');
const ui=require('../lab-ui-v3.js');
const addon=require('../v3-addon.js');

test('round-trip fees, spread and slippage are charged transparently',()=>{
 const r=lab.costs({units:10,entry:100,exit:102,commission:1,spread:.10,slippage:.05});
 assert.equal(r.gross,20);assert.equal(r.totalCost,4);assert.equal(r.net,16);
 assert.equal(r.breakEvenExit,100.4);
});
test('invalid prices, zero quantity and negative fees are rejected',()=>{
 for(const change of [{units:0},{entry:-1},{exit:NaN},{commission:-1},{spread:-.01},{slippage:-1}]){
  assert.throws(()=>lab.costs({units:10,entry:100,exit:102,commission:1,spread:.1,slippage:.05,...change}),RangeError);
 }
});
test('the theoretical expected value is net of cost',()=>{
 const r=lab.expectancy({winRate:40,avgWin:120,avgLoss:60,cost:2});
 assert.equal(r.gross,12);assert.equal(r.net,10);assert.equal(Math.round(r.breakEvenRate*100)/100,34.44);
});
test('expectancy rejects rates beyond 100%, negative cost and NaN',()=>{
 for(const change of [{winRate:101},{winRate:-1},{avgLoss:0},{cost:-1},{avgWin:Infinity}]){
  assert.throws(()=>lab.expectancy({winRate:40,avgWin:120,avgLoss:60,cost:2,...change}),RangeError);
 }
});
test('drawdown measures the maximum peak-to-trough fall',()=>{
 const r=lab.drawdown([10000,9800,10400,8900,9300,8500]);
 assert.equal(r.peakBalance,10400);assert.equal(r.troughBalance,8500);
 assert.ok(Math.abs(r.maxDrawdownPct-18.26923076923077)<1e-9);
 assert.ok(Math.abs(r.recoveryPct-22.35294117647059)<1e-9);
});
test('drawdown rejects empty, zero or invalid capital paths',()=>{
 for(const path of [[],[1],[100,0],[100,-10],[100,NaN]]){
  assert.throws(()=>lab.drawdown(path),RangeError);
 }
});
test('synthetic candles preserve real supplied tick extremes, ordered timestamps and SMA alignment',()=>{
 const candles=lab.candlesFromPrices([100,101,102,100,103]);
 assert.equal(candles.length,4);
 assert.deepEqual({open:candles[0].open,low:candles[0].low,high:candles[0].high,close:candles[0].close},{open:100,low:100,high:101,close:101});
 assert.ok(candles.every((c,i)=>i===0||c.time>candles[i-1].time));
 const sma=lab.sma(candles,3);
 assert.equal(sma.length,2);assert.equal(sma[0].value,101);
});
test('educational lessons cite verifiable HTTPS sources and answers are valid',()=>{
 assert.equal(academy.lessons.length,10);
 const ids=new Set();
 for(const lesson of academy.lessons){
  assert.ok(!ids.has(lesson.id));ids.add(lesson.id);
  assert.ok(lesson.title.length>8&&lesson.points.length>=4);
  assert.ok(lesson.example.length>15&&lesson.task.length>10);
  assert.ok(lesson.check.answer<lesson.check.options.length&&lesson.check.answer>=0);
  assert.ok(lesson.sources.length>=1);
  for(const source of lesson.sources){
   const u=new URL(source.url);assert.equal(u.protocol,'https:');
   assert.ok(['www.investor.gov','syndication.finra.org','www.cftc.gov'].includes(u.hostname));
  }
 }
 assert.equal(academy.quiz.length,5);
});
test('advanced UI modules expose safe render and lifecycle entrypoints',()=>{
 assert.match(ui.markup(),/v3CostResult/);
 assert.match(ui.markup(),/v3ExpectancyResult/);
 assert.match(ui.markup(),/v3DrawdownResult/);
 assert.equal(typeof addon.destroy,'function');
 assert.equal(typeof addon.drawPro,'function');
 assert.equal(typeof addon.bind,'function');
});
