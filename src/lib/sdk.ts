export const PYTHON_SDK = `import json
import re

FILLER_PATTERNS = [
    r"^\\s*as an ai language model[,]?\\s*",
    r"^\\s*please note that\\s+",
    r"^\\s*i would like to point out that\\s+",
    r"^\\s*it is important to note that\\s+",
]

def compress_context(text: str, *, whitespace=True, duplicate_lines=False, filler=True, json_mode=False, remove_null=False):
    """Deterministic local cleanup. Not an AI summarizer or tokenizer."""
    if json_mode:
        try:
            value = json.loads(text)
            if remove_null:
                def strip_nulls(obj):
                    if isinstance(obj, dict): return {k: strip_nulls(v) for k, v in obj.items() if v is not None}
                    if isinstance(obj, list): return [strip_nulls(v) for v in obj]
                    return obj
                value = strip_nulls(value)
            return json.dumps(value, separators=(",", ":"), ensure_ascii=False)
        except json.JSONDecodeError:
            pass
    lines = text.splitlines()
    if filler:
        cleaned = []
        for line in lines:
            for pattern in FILLER_PATTERNS:
                line = re.sub(pattern, "", line, flags=re.I)
            cleaned.append(line)
        lines = cleaned
    if duplicate_lines:
        seen, cleaned = set(), []
        for line in lines:
            key = line.strip().casefold()
            if key and key in seen: continue
            if key: seen.add(key)
            cleaned.append(line)
        lines = cleaned
    result = "\\n".join(lines)
    if whitespace:
        result = re.sub(r"\\n[ \\t]*\\n(?:[ \\t]*\\n)+", "\\n\\n", result)
        result = "\\n".join(part.rstrip() for part in result.split("\\n")).strip()
    return result

if __name__ == "__main__":
    sample = "Please note that this is a sample.\\n\\n\\nKeep the requirement."
    print(compress_context(sample))
`;
export const TS_SDK = `export type CompressOptions = { whitespace?: boolean; duplicateLines?: boolean; filler?: boolean; jsonMode?: boolean; removeNull?: boolean };
const fillerPatterns = [/^\\s*as an ai language model[,]?\\s*/i, /^\\s*please note that\\s+/i, /^\\s*i would like to point out that\\s+/i, /^\\s*it is important to note that\\s+/i];

export function compressContext(input: string, options: CompressOptions = {}): string {
  const { whitespace = true, duplicateLines = false, filler = true, jsonMode = false, removeNull = false } = options;
  if (jsonMode) {
    try {
      const strip = (v: unknown): unknown => Array.isArray(v) ? v.map(strip) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v as Record<string, unknown>).filter(([, value]) => !(removeNull && value === null)).map(([key, value]) => [key, strip(value)])) : v;
      return JSON.stringify(strip(JSON.parse(input)));
    } catch { /* Invalid JSON is kept intact and processed as text. */ }
  }
  let lines = input.split('\\n');
  if (filler) lines = lines.map(line => fillerPatterns.reduce((value, pattern) => value.replace(pattern, ''), line));
  if (duplicateLines) { const seen = new Set<string>(); lines = lines.filter(line => { const key = line.trim().toLowerCase(); if (!key) return true; if (seen.has(key)) return false; seen.add(key); return true; }); }
  let result = lines.join('\\n');
  if (whitespace) result = result.split('\\n').map(line => line.trimEnd()).join('\\n').replace(/\\n[ \\t]*\\n(?:[ \\t]*\\n)+/g, '\\n\\n').trim();
  return result;
}
`;
