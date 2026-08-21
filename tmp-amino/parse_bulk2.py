import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\bulk-ssr.html", encoding="utf-8").read()
i = raw.find('max-w-7xl')
chunk = raw[i - 200 : i + 25000]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{50,}"', 'src="..."', chunk)
chunk = re.sub(r'<script[\s\S]*?</script>', '', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\bulk-chunk.html", "w", encoding="utf-8").write(chunk)
print(chunk[:12000])
print("\n\n===== MID =====\n")
print(chunk[12000:24000])
