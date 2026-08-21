import re
import urllib.request

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
hrefs = re.findall(r'href="(/_next/static/chunks/[^"]+\.css[^"]*)"', raw)
print("css", hrefs)

# Find hero header in HTML body - search for "bg-brand-mint" near Free Amino
i = raw.find("in every box")
print("in every box", i)
chunk = raw[i - 3500 : i + 800]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{80,}"', 'src="..."', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-hero.html", "w", encoding="utf-8").write(chunk)
print(chunk[:4000])

for h in hrefs[:2]:
    path = h.split("?")[0]
    url = "https://www.aminoclub.com" + path
    print("fetch", url)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    css = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")
    out = rf"c:\Users\user\Desktop\klearclub\tmp-amino\amino-{hrefs.index(h)}.css"
    open(out, "w", encoding="utf-8").write(css)
    for key in ["brand-mint", "brand-lavender", "brand-sky", "brand-black", "neutral-offwhite"]:
        for m in re.finditer(rf"[^{{}}]*{key}[^{{}}]*\{{[^}}]+\}}", css):
            s = m.group(0)
            if len(s) < 300:
                print(s)
                break
        # also --color
        for m in re.finditer(rf"--[a-z-]*{key}[a-z-]*:[^;]+;", css):
            print(m.group(0))
