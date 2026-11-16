const assert=require('node:assert/strict');
const test=require('node:test');
const fs=require('node:fs');
const vm=require('node:vm');
const file=(p)=>fs.readFileSync(p,'utf8');
const html=file('index.html');

test('HTML and inline JavaScript compile',()=>{
  assert.ok(html.startsWith('<!doctype html>'));
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
  assert.ok(scripts.length>=2);
  scripts.forEach(js=>new vm.Script(js,{filename:'index-inline.js'}));
});
test('the complete learning lab is connected to navigation and help',()=>{
  for(const term of ['function toolsPage()','function updateRisk()','function drawCandles()','function bindLab()','id="riskForm"','id="journalForm"','chartModeToggle','navItems.splice(3,0','dante-help-futurista.webp','DANTE']){
    assert.ok(html.includes(term),'Missing '+term);
  }
  for(const id of ['intro','markets','charts','orders','risk','mindset','plan','costs','candles','analysis','events','security']){
    assert.ok(html.includes("id:'"+id+"'"),'Missing lesson '+id);
  }
  assert.ok(!/Lía|Lia · Tutor de trading/.test(html));
});
test('application has all local dependencies and required PWA assets',()=>{
  for(const path of ['risk.js','v2.css','manifest.webmanifest','sw.js','app-icon.svg','dante-realista.webp','dante-help-futurista.webp']){
    assert.ok(fs.existsSync(path),path);
  }
  const manifest=JSON.parse(file('manifest.webmanifest'));
  assert.equal(manifest.display,'standalone');
  assert.equal(manifest.start_url,'./');
  const sw=file('sw.js');
  assert.ok(sw.includes('addAll(ASSETS)'));
  assert.ok(sw.includes('aulatrader-academy-v2'));
});
