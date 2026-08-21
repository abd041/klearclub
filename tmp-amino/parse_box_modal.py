import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

needles = [
    "New box",
    "another free",
    "Retail value",
    "Box discount",
    "Sign in and continue",
    "Per month",
    "Included in every",
    "Free Amino",
    "2-day delivery",
]
for n in needles:
    print(n, raw.find(n), raw.lower().find(n.lower()))

# Search in all script payloads too for escaped strings
for n in ["Sign in and continue", "New box, another", "Retail value", "Box discount", "Included in every delivery"]:
    # try escaped
    i = raw.find(n)
    if i < 0:
        esc = n.replace(" ", "\\u0020") if False else None
    print("---", n, i)
    if i >= 0:
        chunk = raw[max(0,i-500):i+1200]
        chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
        chunk = re.sub(r'src="[^"]{40,}"', 'src="..."', chunk)
        print(chunk[:1500])
        print()
