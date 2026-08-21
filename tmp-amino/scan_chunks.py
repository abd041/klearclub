import re
import urllib.request

# Pull JS chunks referenced on affiliate-terms gate page and search for terms copy
html = open("tmp-amino/affiliate-terms-live.html", encoding="utf-8").read()
chunks = re.findall(r"/_next/static/chunks/[a-f0-9]+\.js", html)
print("chunks", len(set(chunks)))
found = []
for path in sorted(set(chunks))[:40]:
    url = "https://www.aminoclub.com" + path
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        js = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    except Exception as e:
        print("fail", path, e)
        continue
    if "Affiliate Terms" in js or "affiliate terms" in js.lower() or "Commission Eligibility" in js:
        found.append(path)
        open("tmp-amino/chunk-hit-" + path.split("/")[-1] + ".txt", "w", encoding="utf-8").write(js)
        print("HIT", path, "len", len(js))
    # also search for distinctive legal phrases
    for needle in ["Referral Partner Program", "claw back", "14-day approval", "First order commission"]:
        if needle in js:
            print("  phrase", needle, "in", path)

print("done hits", found)

# Also try sitemap
try:
    sm = urllib.request.urlopen(
        urllib.request.Request("https://www.aminoclub.com/sitemap.xml", headers={"User-Agent": "Mozilla/5.0"}),
        timeout=30,
    ).read().decode("utf-8", "replace")
    open("tmp-amino/sitemap.xml", "w", encoding="utf-8").write(sm)
    print("sitemap affiliate", "affiliate-terms" in sm)
except Exception as e:
    print("sitemap", e)
