import urllib.request
import urllib.parse

path = "/api/images/" + urllib.parse.quote(
    "s3.us-east-1.amazonaws.com/medusajs.cloud-data-prod-use1-20241127093450366600000001/e432a7e0149b9f2bd6e/Bacteriostatic Water-01KPQP09MFDADECQ500NFP3J85.png",
    safe="/",
)
# Live uses double-encoded slash as %252F in path segments after bucket
url = (
    "https://www.aminoclub.com/_next/image?url="
    + urllib.parse.quote(
        "/api/images/s3.us-east-1.amazonaws.com/medusajs.cloud-data-prod-use1-20241127093450366600000001/e432a7e0149b9f2bd6e%2FBacteriostatic%20Water-01KPQP09MFDADECQ500NFP3J85.png"
    )
    + "&w=256&q=75"
)
print(url)
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)"})
data = urllib.request.urlopen(req, timeout=40).read()
out = r"c:\Users\user\Desktop\klearclub\public\hero\h2o-box.png"
open(out, "wb").write(data)
print("wrote", len(data), out)
