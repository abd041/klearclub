import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("The lab report")
if i < 0:
    i = raw.find("lab report")
print("hero idx", i)
chunk = raw[i-300:i+18000]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{40,}"', 'src="..."', chunk)
chunk = re.sub(r'<script[\s\S]*?</script>', '', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-chunk1.html","w",encoding="utf-8").write(chunk)
print(chunk[:8000])
