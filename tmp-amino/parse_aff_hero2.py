# -*- coding: utf-8 -*-
import re
raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()
i = raw.find('aria-label="Referral partner program showcase"')
chunk = raw[i:i+4500]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{60,}"', 'src="..."', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-hero2.txt","w",encoding="utf-8").write(chunk)
print(chunk[:4000])
