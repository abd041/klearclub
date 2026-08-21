import re
import urllib.request

req = urllib.request.Request(
    "https://www.aminoclub.com/us/terms",
    headers={"User-Agent": "Mozilla/5.0"},
)
html = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")
open("tmp-amino/terms-live.html", "w", encoding="utf-8").write(html)
print("len", len(html))

# vial positions
for m in re.finditer(
    r'<div class="(absolute[^"]*aspect-\[1/1\.5\][^"]*)" style="transform:rotate\(([-\d]+)deg\)">.*?<img alt="([^"]+)"',
    html,
):
    print("VIAL", m.group(3), "rot", m.group(2))
    print(" ", m.group(1)[:140])

# hero badge / titles
for needle in ["Legal Agreement", "Terms of Service", "Please read these terms"]:
    i = html.find(needle)
    print(needle, i)

# background
m = re.search(r'background:linear-gradient\([^)]+\)', html)
print("BG", m.group(0) if m else None)

# section structure around hero
noscript = re.sub(r"<script[\s\S]*?</script>", "", html)
i = noscript.find("Legal Agreement")
open("tmp-amino/terms-hero-visible.html", "w", encoding="utf-8").write(noscript[i - 2000 : i + 1500])
print("hero visible written")

# body h2s
h2s = re.findall(r"<h2[^>]*>([^<]+)</h2>", noscript)
print("H2 count", len(h2s))
for h in h2s[:30]:
    print(" -", h)
