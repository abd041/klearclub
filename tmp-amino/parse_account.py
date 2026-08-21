import re
import html
from pathlib import Path

raw = Path("tmp-amino/account.html").read_text(encoding="utf-8", errors="ignore")

# titles / descriptions from flight data
for m in re.finditer(r'"(?:title|description|content)":"([^"\\]{5,160})"', raw):
    print("META:", m.group(1))

print("\n--- VISIBLE TEXT ---\n")
t = re.sub(r"<script[^>]*>.*?</script>", "", raw, flags=re.S)
t = re.sub(r"<style[^>]*>.*?</style>", "", t, flags=re.S)
texts = re.findall(r">([^<]{2,220})<", t)
seen = set()
for x in texts:
    x = html.unescape(x.strip())
    if not x or x in seen:
        continue
    if x.startswith("{") or x.startswith("$") or "function" in x[:30]:
        continue
    seen.add(x)
    print(x[:200])

print("\n--- CLASS SNIPPETS AROUND SIGN ---\n")
for key in [
    "Sign in",
    "Create account",
    "Email or phone",
    "Send my code",
    "Enter your code",
    "Welcome",
    "Researcher",
    "placeholder",
]:
    idx = raw.find(key)
    if idx >= 0:
        print(f"\n[{key}] @ {idx}")
        print(raw[max(0, idx - 180) : idx + 220].replace("\n", " ")[:400])

# Extract main card-ish HTML block
print("\n--- BODY MAIN ---\n")
m = re.search(r"<main[\s\S]{0,8000}</main>", raw)
if m:
    Path("tmp-amino/account-main.html").write_text(m.group(0), encoding="utf-8")
    print("wrote account-main.html", len(m.group(0)))
else:
    # try section
    for pat in [r'class="[^"]*min-h-screen[^"]*"[\s\S]{0,12000}', r'Sign in to[\s\S]{0,3000}']:
        m2 = re.search(pat, raw)
        if m2:
            Path("tmp-amino/account-chunk.html").write_text(m2.group(0)[:12000], encoding="utf-8")
            print("wrote chunk", pat[:40], len(m2.group(0)))
            break
