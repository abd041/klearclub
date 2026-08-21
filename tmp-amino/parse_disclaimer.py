import re
import urllib.request

req = urllib.request.Request(
    "https://www.aminoclub.com/us/disclaimer",
    headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9"},
)
html = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")
open("tmp-amino/disclaimer-live.html", "w", encoding="utf-8").write(html)
print("len", len(html))
print("title", html[html.find("<title>") + 7 : html.find("</title>")])

ns = re.sub(r"<script[\s\S]*?</script>", "", html)
i = ns.find("Important Notice")
print("badge idx", i)
open("tmp-amino/disclaimer-hero.txt", "w", encoding="utf-8").write(ns[max(0, i - 2200) : i + 900])

for m in re.finditer(
    r'<div class="(absolute[^"]*aspect-\[1/1\.5\][^"]*)" style="transform:rotate\(([-\d]+)deg\)">.*?<img alt="([^"]+)"',
    html,
):
    print("VIAL", m.group(3), m.group(2), m.group(1)[:110])

m = re.search(r'style="background:linear-gradient\([^"]+\)"', ns[ns.find("<main") : ns.find("Important Notice") + 50] if "<main" in ns else ns)
# find gradient near hero
idx = ns.find("min-h-[45vh]")
print(ns[idx - 200 : idx + 250] if idx >= 0 else "no min-h")
grads = re.findall(r"linear-gradient\([^)]+\)", ns[max(0, ns.find("BPC-157")) - 500 : ns.find("Important Notice") + 50])
print("grads", grads[:3])

h2s = re.findall(r"<h2[^>]*>([^<]+)</h2>", ns)
print("H2s", h2s)
