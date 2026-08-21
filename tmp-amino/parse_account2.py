import re
import html
from pathlib import Path

raw = Path("tmp-amino/account.html").read_text(encoding="utf-8", errors="ignore")
out = []

def p(s=""):
    out.append(str(s))

# titles
for m in re.finditer(r'\\"children\\":\\"([^"\\]{5,120})\\"', raw):
    p("ESC children: " + m.group(1))
for m in re.finditer(r'"children":"([^"\\]{5,160})"', raw):
    p("children: " + m.group(1))
for m in re.finditer(r'"content":"([^"\\]{10,200})"', raw):
    p("content: " + m.group(1))

p("\n--- KEY CONTEXTS ---\n")
for key in [
    "Sign in or sign up",
    "one-time code",
    "Email or phone",
    "Send my code",
    "Enter your code",
    "Create account",
    "Terms",
    "Privacy",
    "bg-gradient",
    "radial-gradient",
]:
    idx = raw.find(key)
    if idx < 0:
        p(f"MISSING: {key}")
        continue
    snippet = raw[max(0, idx - 300) : idx + 400]
    p(f"\n=== {key} @ {idx} ===")
    p(snippet.replace("\n", " ")[:700])

# Find the auth card container
p("\n--- LOOK FOR AUTH FORM CLASSES ---\n")
for pat in [
    r'class="[^"]{0,200}max-w-[^"]{0,80}"[^>]{0,200}>[\s\S]{0,500}Sign in',
    r'Sign in or sign up[\s\S]{0,2500}',
]:
    m = re.search(pat, raw)
    if m:
        p(f"\nPAT {pat[:40]}")
        p(m.group(0)[:2500])

Path("tmp-amino/account-parsed.txt").write_text("\n".join(out), encoding="utf-8")
print("wrote", len(out), "lines")
