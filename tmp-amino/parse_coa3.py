import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
start = raw.find('<section class="py-16 lg:py-')
# Get a large chunk of rendered HTML
chunk = raw[start:start+80000]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="data:[^"]*"', 'src="data:..."', chunk)
chunk = re.sub(r'src="https://[^"]{80,}"', 'src="..."', chunk)
# strip scripts
chunk = re.sub(r'<script[\s\S]*?</script>', '', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-html.html","w",encoding="utf-8").write(chunk)
print(chunk[:10000])
print("\n\n==== MID ====\n")
print(chunk[10000:20000])
