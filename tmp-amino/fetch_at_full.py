import re
import http.cookiejar
import urllib.request
from http.cookiejar import Cookie

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))


def add_cookie(name, value):
    cj.set_cookie(
        Cookie(
            0,
            name,
            value,
            None,
            False,
            ".aminoclub.com",
            True,
            True,
            "/",
            False,
            False,
            None,
            False,
            None,
            None,
            {},
        )
    )


for name, value in [
    ("amino_age_verified", "1"),
    ("age_verified", "1"),
    ("researcher_verified", "1"),
    ("amino_researcher", "1"),
    ("verified", "1"),
    ("amino_geo_restricted", "0"),
]:
    add_cookie(name, value)

req = urllib.request.Request(
    "https://www.aminoclub.com/us/affiliate-terms",
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html",
    },
)
body = opener.open(req, timeout=40).read().decode("utf-8", "replace")
open("tmp-amino/affiliate-terms-full.html", "w", encoding="utf-8").write(body)
print("len", len(body))
print("title", body[body.find("<title>") + 7 : body.find("</title>")])

ns = re.sub(r"<script[\s\S]*?</script>", "", body)
i = ns.find("Partner Program")
print("partner idx", i)
open("tmp-amino/affiliate-terms-visible-full.html", "w", encoding="utf-8").write(ns)

# vials
for m in re.finditer(
    r'<div class="(absolute[^"]*aspect-\[1/1\.5\][^"]*)" style="transform:rotate\(([-\d]+)deg\)">.*?<img alt="([^"]+)"',
    body,
):
    print("VIAL", m.group(3), m.group(2), m.group(1)[:100])

# bg
m = re.search(r'style="background:linear-gradient\([^"]+\)"', ns)
print("BG", m.group(0) if m else None)

# badge
for needle in ["Partner Program Terms", "Affiliate", "Legal", "Last Updated"]:
    print(needle, ns.find(needle))

h2s = re.findall(r"<h2[^>]*>([\s\S]*?)</h2>", ns)
print("H2 count", len(h2s))
for h in h2s:
    print(" -", re.sub(r"<[^>]+>", "", h).strip()[:120])

h3s = re.findall(r"<h3[^>]*>([\s\S]*?)</h3>", ns)
print("H3 count", len(h3s))
for h in h3s[:20]:
    print("  *", re.sub(r"<[^>]+>", "", h).strip()[:120])
