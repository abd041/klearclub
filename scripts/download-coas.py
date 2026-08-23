"""Download COA PDFs for the local catalog.

Configure COA_SOURCE_BASE (product page origin) before running.
Saved filenames are normalized to the klear-club-* prefix when applicable.
"""
from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "coas" / "pdf"
MAP_PATH = ROOT / "src" / "data" / "coas.ts"
UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
SOURCE_BASE = os.environ.get("COA_SOURCE_BASE", "").rstrip("/")

SLUGS = [
    "glp-3", "bpc-157", "ghk-cu", "tesamorelin", "tb-500", "melanotan-ii", "nad-plus",
    "aod-9604", "mots-c", "cjc-ipa-no-dac", "wolverine-stack", "glow", "dsip", "semax",
    "selank", "klow", "kpv", "pt-141", "glutathione", "ipamorelin", "igf-1-lr3", "klear-h2o",
    "cagrilintide", "epithalon", "5-amino-1mq", "melanotan-i", "thymosin-alpha-1", "snap-8",
    "nad-plus-spray", "selank-spray", "semax-spray", "ghk-cu-spray", "pt-141-spray",
    "sermorelin", "dihexa", "ara-290", "kisspeptin", "vip", "glp-2", "glp-1", "ahk-cu",
    "pinealon", "bpc-spray", "bpc-tb-spray", "adamax-spray", "adalank-spray", "dsip-spray",
    "melanotan-ii-spray", "ll-37", "cartalax",
]

ALIASES = {
    "klear-h2o": ["klear-h2o", "h2o"],
    "ghk-cu-spray": ["ghkcu-spray", "ghk-cu-spray"],
    "cjc-ipa-no-dac": ["cjc-1295-ipamorelin", "cjc-ipa", "cjc-ipamorelin"],
    "wolverine-stack": ["bpc-tb-500", "bpc-157-tb-500", "wolverine"],
    "nad-plus": ["nad"],
    "nad-plus-spray": ["nad-spray"],
    "melanotan-ii": ["melanotan-2", "mt-2"],
    "melanotan-ii-spray": ["melanotan-2-spray", "mt-2-spray"],
    "igf-1-lr3": ["igf1-lr3", "igf-1"],
    "5-amino-1mq": ["5-amino-1-mq", "5amino1mq"],
}

def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read()

def extract(html: str) -> list[dict]:
    found: dict[str, dict] = {}
    for m in re.finditer(
        r'lotNumber\\":\\"([^\\]+)\\".{0,400}?coaUrl\\":\\"([^\\]+)\\"',
        html,
        re.S,
    ):
        lot, url = m.group(1), m.group(2).replace("\\/", "/")
        found[url] = {"lot": lot, "url": url}
    for m in re.finditer(r'coaUrl\\":\\"([^\\]+)\\"', html):
        url = m.group(1).replace("\\/", "/")
        found.setdefault(url, {"lot": "", "url": url})
    for path in re.findall(r"/coa/[A-Za-z0-9_./%-]+\.pdf", html):
        found.setdefault(path, {"lot": "", "url": path})
    rows = list(found.values())
    for row in rows:
        name = row["url"].split("/")[-1]
        if not row["lot"]:
            m = re.search(r"(?:LOT[_-])?([A-Z]{2,6}\d{3,5})", name, re.I)
            row["lot"] = m.group(1).upper() if m else name.replace(".pdf", "")
        row["file"] = name
    return rows

def handles_for(slug: str) -> list[str]:
    out = [slug, *ALIASES.get(slug, [])]
    seen = set()
    uniq = []
    for h in out:
        if h not in seen:
            seen.add(h)
            uniq.append(h)
    return uniq

def main() -> None:
    if not SOURCE_BASE:
        raise SystemExit("Set COA_SOURCE_BASE to the product catalog origin before running.")

    mapping: dict[str, list[dict]] = {}
    OUT.mkdir(parents=True, exist_ok=True)
    for i, slug in enumerate(SLUGS, 1):
        rows: list[dict] = []
        for handle in handles_for(slug):
            url = f"{SOURCE_BASE}/us/products/{handle}"
            try:
                html = fetch(url).decode("utf-8", "ignore")
            except Exception as exc:
                print(f"[{i}/{len(SLUGS)}] fail {handle}: {exc}")
                continue
            rows = extract(html)
            print(f"[{i}/{len(SLUGS)}] {handle} -> {len(rows)} pdfs")
            if rows:
                break
            time.sleep(0.2)
        saved = []
        dest_dir = OUT / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        for row in rows:
            dest = dest_dir / row["file"]
            remote = SOURCE_BASE + row["url"]
            try:
                data = fetch(remote)
            except Exception as exc:
                print("  download fail", row["url"], exc)
                continue
            if not data.startswith(b"%PDF"):
                print("  not pdf", row["url"], data[:30])
                continue
            dest.write_bytes(data)
            saved.append(
                {
                    "lot": row["lot"],
                    "label": row["file"].replace(".pdf", ""),
                    "href": f"/coas/pdf/{slug}/{row['file']}",
                }
            )
            print(f"  saved {dest.name} ({len(data)} bytes)")
        mapping[slug] = saved
        time.sleep(0.15)

    MAP_PATH.write_text(
        "export type CoaEntry = { lot: string; label: string; href: string };\n"
        "export const PRODUCT_COAS: Record<string, CoaEntry[]> = "
        + json.dumps(mapping, indent=2)
        + ";\n"
        "export function getProductCoas(slug: string) {\n"
        "  return PRODUCT_COAS[slug] ?? [];\n"
        "}\n",
        encoding="utf-8",
    )
    print("wrote", MAP_PATH)

if __name__ == "__main__":
    main()
