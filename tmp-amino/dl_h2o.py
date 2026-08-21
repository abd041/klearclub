import re, urllib.request, urllib.parse

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
# find Bacteriostatic Water image URL near Free badge / H2O card
i = raw.find("Amino H2O")
chunk = raw[i-800:i+200]
# extract first /api/images or full url
urls = re.findall(r'/api/images/[^"&\s]+', chunk)
print("urls near Amino H2O:", urls[:3])
# better: find in the mint card area
i = raw.find("rounded-[20px] bg-brand-mint")
chunk = raw[i:i+2500]
m = re.search(r'src="([^"]+)"', chunk)
print("src", m.group(1) if m else None)
m2 = re.search(r'srcSet="([^"]+)"', chunk)
if m2:
    first = m2.group(1).split(",")[0].strip().split(" ")[0]
    print("srcset first", first)
    url = "https://www.aminoclub.com" + first.replace("&amp;", "&")
    print("fetch", url[:200])
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)"})
    data = urllib.request.urlopen(req, timeout=40).read()
    out = r"c:\Users\user\Desktop\klearclub\public\hero\h2o-box.png"
    open(out, "wb").write(data)
    print("wrote", out, len(data))
