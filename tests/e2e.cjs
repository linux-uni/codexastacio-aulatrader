const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
(async()=>{
 const root=process.cwd();
 const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp'};
 const server=http.createServer((req,res)=>{
   const pathname=new URL(req.url,'http://127.0.0.1').pathname;
   const target=path.join(root,pathname==='/'?'index.html':decodeURIComponent(pathname).replace(/^\/+/,'')); 
   if(!(target===root||target.startsWith(root+path.sep))){res.writeHead(403);res.end('Forbidden');return;}
   fs.readFile(target,(err,body)=>{
     if(err){res.writeHead(404);res.end('Not found');return;}
     res.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});res.end(body);
   });
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 try{
  await page.goto(url,{waitUntil:'load'});
  await page.locator('#fillDemo').click();
  await page.locator('#loginForm button[type="submit"]').click();
  await page.locator('#mobileNav [data-nav="learn"]').click();
  assert.equal(await page.locator('.lesson-card').count(),22,'22 lessons available');
  await page.locator('#lessonQuery').fill('forex');
  assert.ok(await page.locator('.lesson-card:visible').count()>0);
  assert.ok(await page.locator('.lesson-card:visible').count()<22);
  await page.locator('#lessonQuery').fill('');
  await page.locator('#mobileNav [data-nav="tools"]').click();
  const result=await page.locator('#riskResult').innerText();
  assert.match(result,/100\.00/,'risk calculator USD 100');
  assert.match(await page.locator('#v3CostResult').innerText(),/16\.00/,'net cost example');
  assert.match(await page.locator('#v3ExpectancyResult').innerText(),/10\.00/,'expected net result');
  assert.match(await page.locator('#v3DrawdownResult').innerText(),/18\.27/,'drawdown example');
  assert.match(result,/2\.00:1/,'risk reward ratio');
  await page.locator('#journalTitle').fill('Mi primera hipótesis');
  await page.locator('#journalNote').fill('Practiqué y revisé mi plan antes de decidir');
  await page.locator('#journalForm button[type="submit"]').click();
  assert.equal(await page.locator('[data-del-journal]').count(),1,'journal persisted in view');
  await page.locator('#mobileNav [data-nav="sim"]').click();
  await page.locator('#chartModeToggle').click();
  assert.match(await page.locator('#chartModeToggle').innerText(),/Ver línea/,'candles activated');
  assert.ok(await page.locator('#simChart rect').count()>1,'candles drawn');
  await page.locator('#proChartToggle').click();
  await page.locator('#proChart canvas').first().waitFor({state:'visible'});
  assert.ok(await page.locator('#proChart canvas').count()>=1,'professional chart canvas visible');
  await page.locator('#proChartToggle').click();
  await page.locator('#tutorFab').click();
  assert.match(await page.locator('#chatPanel').innerText(),/DANTE/);
  assert.equal(errors.length,0,'No browser exceptions: '+errors.join('; '));
  console.log('PASS mobile login, 22 lessons, risk tools, journal, SVG + TradingView chart, DANTE chat');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
