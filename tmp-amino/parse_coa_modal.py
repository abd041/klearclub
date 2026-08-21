import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
# Look for modal / dialog related to COA on coa page
for n in ["dialog", "Certificate of Analysis", "coa-modal", "iframe", "radix", "Download"]:
    print(n, raw.lower().find(n.lower()), raw.find(n))

# Also check product page modal pattern from our codebase usage
