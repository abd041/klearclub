# -*- coding: utf-8 -*-
import re
raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()
i = raw.find("Example monthly referral value")
print("idx", i)
if i < 0:
    i = raw.find("Example monthly")
    print("alt", i)
chunk = raw[max(0,i-200):i+3500] if i >= 0 else ""
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{50,}"', 'src="..."', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-hero.txt","w",encoding="utf-8").write(chunk)
print(chunk[:3000])
