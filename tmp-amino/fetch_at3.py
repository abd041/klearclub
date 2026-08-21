import re
import http.cookiejar
import urllib.request

# Fresh jar — no geo cookie
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

def get(url):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
        },
    )
    return opener.open(req, timeout=40)

# Compare privacy vs affiliate-terms
for path in ["/us/privacy", "/us/affiliate-terms", "/us/affiliate"]:
    try:
        resp = get("https://www.aminoclub.com" + path)
        body = resp.read().decode("utf-8", "replace")
        title = body[body.find("<title>") + 7 : body.find("</title>")]
        gated = "Researcher verification" in body
        print(path, "status ok", "gated=", gated, "title=", title[:60], "cookies=", [c.name for c in cj])
        if path.endswith("affiliate-terms"):
            open("tmp-amino/affiliate-terms-fresh2.html", "w", encoding="utf-8").write(body)
    except Exception as e:
        print(path, "ERR", e)

# Try RSC request for affiliate-terms (Next.js)
req = urllib.request.Request(
    "https://www.aminoclub.com/us/affiliate-terms",
    headers={
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/x-component",
        "RSC": "1",
        "Next-Url": "/us/affiliate-terms",
        "Accept-Language": "en-US,en;q=0.9",
    },
)
try:
    r = opener.open(req, timeout=40)
    b = r.read().decode("utf-8", "replace")
    open("tmp-amino/affiliate-terms-rsc.txt", "w", encoding="utf-8").write(b)
    print("RSC len", len(b), "Affiliate Terms", b.find("Affiliate Terms"), "Commission", b.find("Commission"))
    print(b[:500])
except Exception as e:
    print("RSC err", e)
