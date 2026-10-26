import { describe, expect, it } from 'vitest';
import { calculateCost, compactJson, compressText, DEFAULT_RULES, estimateTokens, percentSaved, type Rules } from '../src/lib/compression';
import { PYTHON_SDK, TS_SDK } from '../src/lib/sdk';
const rules=(overrides:Partial<Rules>):Rules=>({...DEFAULT_RULES,...overrides});
describe('compression engine',()=>{
 it('compacts whitespace deterministically',()=>{const r=compressText('alpha  \n\n\n\nbeta  ',rules({whitespace:true}));expect(r.text).toBe('alpha\n\nbeta');expect(compressText('alpha  \n\n\n\nbeta  ',rules({whitespace:true})).text).toBe(r.text)});
 it('removes repeated non-empty lines only when enabled',()=>{expect(compressText('hello\nhello\n',rules({duplicateLines:false})).text).toContain('hello\nhello');expect(compressText('hello\nhello\n',rules({duplicateLines:true})).text).toBe('hello')});
 it('removes repeated sentences while preserving first order',()=>{const r=compressText('Keep me. Keep me. Next item.',rules({duplicateSentences:true}));expect(r.text).toContain('Keep me.');expect(r.removedSentences).toBe(1);expect(r.text).toContain('Next item.')});
 it('removes recognized filler preambles',()=>{const r=compressText('Please note that read the docs.\nI would like to point out that keep the ID.',rules({filler:true}));expect(r.text).toContain('read the docs.');expect(r.text).toContain('keep the ID.');expect(r.removedFillers).toBe(2)});
 it('minifies valid JSON and preserves meaningful false, zero and empty string',()=>{expect(compactJson('{ "ok": false, "count": 0, "text": "", "none": null }')).toBe('{"ok":false,"count":0,"text":"","none":null}')});
 it('can explicitly remove null object properties without altering arrays',()=>{expect(compactJson('{"a":null,"b":[null,0,false]}',true)).toBe('{"b":[null,0,false]}')});
 it('throws for invalid JSON so callers can preserve the input',()=>{expect(()=>compactJson('{oops')).toThrow();const r=compressText('{oops',rules({json:true,whitespace:false}));expect(r.text).toBe('{oops');expect(r.jsonError).toBeTruthy()});
 it('does not corrupt URLs or code string values in ordinary cleanup',()=>{const input='const url = "https://example.com/a//b";\nconst note = "/* not a comment */";';expect(compressText(input,rules({whitespace:true})).text).toContain('https://example.com/a//b');expect(compressText(input,rules({whitespace:true})).text).toContain('/* not a comment */')});
 it('handles empty input and token estimates',()=>{expect(estimateTokens('')).toBe(0);expect(compressText('',DEFAULT_RULES).text).toBe('')});
 it('calculates costs and reduction safely',()=>{expect(calculateCost(500000,2)).toBe(1);expect(calculateCost(1,-3)).toBe(0);expect(percentSaved(100,25)).toBe(75);expect(percentSaved(0,0)).toBe(0);expect(percentSaved(25,50)).toBe(0)});
 it('keeps the JSON rule independent from unrelated transformations',()=>{const r=compressText('{ "x": 1 }',rules({json:false,whitespace:false}));expect(r.text).toContain(' "x"')});
 it('exports useful Python and TypeScript function implementations',()=>{expect(PYTHON_SDK).toContain('def compress_context');expect(PYTHON_SDK).toContain('json.loads');expect(TS_SDK).toContain('export function compressContext');expect(TS_SDK).toContain('JSON.parse')});
});
