import re
import http.cookiejar
import urllib.parse
import urllib.request
from http.cookiejar import Cookie

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))


def add_cookie(name, value, domain=".aminoclub.com"):
    c = Cookie(
        0,
        name,
        value,
        None,
        False,
        domain,
        True,
        domain.startswith("."),
        "/",
        False,
        False,
        None,
        False,
        None,
        None,
        {},
    )
    cj.set_cookie(c)


# Try common verify cookies
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
print("title", body[body.find("<title>") + 7 : body.find("</title>")][:80])
print("gated", "Researcher verification" in body)
print("Affiliate Terms heading", "Affiliate Terms" in body and "Researcher verification" not in body)

# Also try age-verify page itself for clues
req2 = urllib.request.Request(
    "https://www.aminoclub.com/age-verify?return=%2Fus%2Faffiliate-terms",
    headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9"},
)
age = opener.open(req2, timeout=40).read().decode("utf-8", "replace")
open("tmp-amino/age-verify.html", "w", encoding="utf-8").write(age)
print("age title", age[age.find("<title>") + 7 : age.find("</title>")][:80])
# find cookie names in JS
names = set(re.findall(r'["\']([a-zA-Z0-9_]*(?:verif|age|research|geo|gate)[a-zA-Z0-9_]*)["\']', age, flags=re.I))
print("name hints", sorted(names)[:40])
print("document.cookie mentions", age.lower().count("document.cookie"))
# search Set-Cookie patterns and localStorage keys
for pat in ["localStorage", "sessionStorage", "amino_", "researcher"]:
    print(pat, age.find(pat))
