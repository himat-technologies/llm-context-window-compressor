export type Rules = {
  whitespace: boolean; duplicateLines: boolean; duplicateSentences: boolean;
  filler: boolean; json: boolean; removeNullJson: boolean; directives: boolean;
};
export const DEFAULT_RULES: Rules = { whitespace:true, duplicateLines:false, duplicateSentences:false, filler:true, json:false, removeNullJson:false, directives:false };
export type CompressionResult = { text:string; removedLines:number; removedSentences:number; removedFillers:number; jsonError?:string };
const fillerPatterns = [
  /^\s*as an ai language model[,]?\s*/i,
  /^\s*please note that\s+/i,
  /^\s*i would like to point out that\s+/i,
  /^\s*it is important to note that\s+/i,
  /^\s*to be clear[,]?\s*/i,
  /^\s*in summary[,]?\s*/i,
];
function removeFiller(text:string) { let removed=0; const lines=text.split('\n').map(line=>{let value=line; for(const p of fillerPatterns){if(p.test(value)){value=value.replace(p,'');removed++;break;}} return value;}); return {text:lines.join('\n'),removed}; }
function compactWhitespace(text:string) {
  // Outside fenced Markdown blocks, normalize blank-line runs; preserve code fence contents.
  const lines=text.split('\n'); let inFence=false; let previousBlank=false;
  const result:string[]=[];
  for(const line of lines){ if(/^\s*(```|~~~)/.test(line)) inFence=!inFence;
    if(!inFence && line.trim()===''){ if(previousBlank) continue; previousBlank=true; result.push(''); }
    else { previousBlank=false; result.push(inFence?line:line.replace(/[\t ]+$/g,'')); }
  }
  return result.join('\n').trim();
}
function dedupeLines(text:string, caseSensitive=true) { const seen=new Set<string>(); let removed=0; const out=text.split('\n').filter(line=>{ if(!line.trim()) return true; const key=caseSensitive?line.trim():line.trim().toLowerCase(); if(seen.has(key)){removed++;return false;} seen.add(key);return true; }); return {text:out.join('\n').replace(/\n+$/,''),removed}; }
function dedupeSentences(text:string, caseSensitive=true) { let removed=0; const seen=new Set<string>(); const out=text.split(/(?<=[.!?])\s+/).filter(sentence=>{const trimmed=sentence.trim(); if(!trimmed)return true; const key=caseSensitive?trimmed:trimmed.toLowerCase(); if(seen.has(key)){removed++;return false;} seen.add(key);return true;}); return {text:out.join(' '),removed}; }
export function compactJson(text:string, removeNull=false) { const parsed:unknown=JSON.parse(text); const strip=(value:unknown):unknown=>{ if(Array.isArray(value)) return value.map(strip); if(value && typeof value==='object'){const entries=Object.entries(value as Record<string,unknown>).filter(([,v])=>!(removeNull&&v===null)).map(([k,v])=>[k,strip(v)]);return Object.fromEntries(entries);} return value; }; return JSON.stringify(strip(parsed)); }
function condenseDirectives(text:string) { const lines=text.split('\n'); const seen=new Set<string>(); return lines.filter(line=>{const s=line.trim(); if(!s || /^#{1,6}\s/.test(s) || /^[-*+]\s/.test(s) || /^\d+\.\s/.test(s)) return true; const key=s.toLowerCase(); if(seen.has(key))return false; seen.add(key);return true;}).join('\n'); }
export function compressText(input:string,rules:Rules):CompressionResult {
  let text=input, removedLines=0, removedSentences=0, removedFillers=0; let jsonError:string|undefined;
  if(rules.json && input.trim()) { try { text=compactJson(input,rules.removeNullJson); } catch { jsonError='Input is not valid JSON. JSON compaction was skipped; the original content is preserved.'; text=input; } }
  if(rules.filler){const r=removeFiller(text);text=r.text;removedFillers=r.removed;}
  if(rules.duplicateSentences){const r=dedupeSentences(text,false);text=r.text;removedSentences=r.removed;}
  if(rules.duplicateLines){const r=dedupeLines(text,false);text=r.text;removedLines=r.removed;}
  if(rules.directives) text=condenseDirectives(text);
  if(rules.whitespace) text=compactWhitespace(text);
  return {text,removedLines,removedSentences,removedFillers,jsonError};
}
export function estimateTokens(text:string, charsPerToken=4) { if(!text.trim())return 0; const safe=Number.isFinite(charsPerToken)&&charsPerToken>0?charsPerToken:4; const rough=Math.ceil(text.length/safe); const wordSignal=(text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)||[]).length; return Math.max(rough,Math.ceil(wordSignal*0.72)); }
export function wordCount(text:string) { return (text.trim().match(/\S+/g)||[]).length; }
export function calculateCost(tokens:number,pricePerMillion:number) { return Math.max(0,tokens)/1_000_000*Math.max(0,Number.isFinite(pricePerMillion)?pricePerMillion:0); }
export function percentSaved(before:number,after:number) { return before>0?Math.max(0,(before-after)/before*100):0; }
export function formatNumber(n:number) { return new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n); }
