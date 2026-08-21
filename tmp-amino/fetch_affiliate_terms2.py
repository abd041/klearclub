import re
import http.cookiejar
import urllib.parse
import urllib.request

class NoRaiseRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print("redirect", code, "->", newurl)
        return urllib.request.HTTPRedirectHandler.redirect_request(
            self, req, fp, code, msg, headers, newurl
        )

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(NoRaiseRedirect, urllib.request.HTTPCookieProcessor(cj))
opener.addheaders = [("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")]

html = opener.open("https://www.aminoclub.com/us/affiliate-terms", timeout=40).read().decode("utf-8", "replace")
ids = re.findall(r'name="(\$ACTION_ID_[^"]+)"', html)
print("ids", ids)
print("cookies before", [(c.name, c.value[:60]) for c in cj])

# multipart form like the page
boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
parts = []
fields = {
    ids[0]: "",
    "return": "/us/affiliate-terms",
    "over21": "on",
    "researcher": "on",
}
body_chunks = []
for k, v in fields.items():
    body_chunks.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n")
body_chunks.append(f"--{boundary}--\r\n")
data = "".join(body_chunks).encode()

req = urllib.request.Request(
    "https://www.aminoclub.com/us/affiliate-terms",
    data=data,
    method="POST",
    headers={
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        "User-Agent": "Mozilla/5.0",
        "Origin": "https://www.aminoclub.com",
        "Referer": "https://www.aminoclub.com/us/affiliate-terms",
    },
)
try:
    resp = opener.open(req, timeout=40)
    body = resp.read().decode("utf-8", "replace")
    print("final url", resp.geturl(), "len", len(body))
except Exception as e:
    print("err", type(e), e)
    if hasattr(e, "headers"):
        print("loc", e.headers.get("Location"))
        print("set-cookie", e.headers.get_all("Set-Cookie") if hasattr(e.headers, "get_all") else e.headers.get("Set-Cookie"))
    raise SystemExit(1)

open("tmp-amino/affiliate-terms-unlocked.html", "w", encoding="utf-8").write(body)
print("title", body[body.find("<title>") + 7 : body.find("</title>")])
print("cookies after", [(c.name, c.value[:80]) for c in cj])
for needle in ["Affiliate Terms", "Commission", "Last Updated", "Referral", "Partner Program Terms", "Eligibility"]:
    print(needle, body.find(needle))
