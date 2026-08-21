import re
import http.cookiejar
import urllib.parse
import urllib.request

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
opener.addheaders = [("User-Agent", "Mozilla/5.0")]

# 1) load gate page
html = opener.open("https://www.aminoclub.com/us/affiliate-terms", timeout=40).read().decode("utf-8", "replace")
# find ACTION_ID
m = re.search(r'name="\$ACTION_ID_([^"]+)"', html)
print("action", m.group(0) if m else None)
# also find form action fields
ids = re.findall(r'name="(\$ACTION_ID_[^"]+)"', html)
print("ids", ids[:3])

# Try posting verification
if ids:
    data = urllib.parse.urlencode(
        {
            ids[0]: "",
            "return": "/us/affiliate-terms",
            "over21": "on",
            "researcher": "on",
        }
    ).encode()
    req = urllib.request.Request(
        "https://www.aminoclub.com/us/affiliate-terms",
        data=data,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0"},
    )
    resp = opener.open(req, timeout=40)
    body = resp.read().decode("utf-8", "replace")
    print("post status url", resp.geturl(), "len", len(body))
    open("tmp-amino/affiliate-terms-after-post.html", "w", encoding="utf-8").write(body)
    print("title", body[body.find("<title>") + 7 : body.find("</title>")])
    for needle in ["Affiliate Terms", "Commission", "Last Updated", "Referral Partner", "Legal Agreement"]:
        print(needle, body.find(needle))

print("cookies", [(c.name, c.value[:40]) for c in cj])
