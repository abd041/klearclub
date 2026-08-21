import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
i = raw.find('<div class="bg-white"><div class="max-w-7xl')
j = raw.find('lg:grid lg:grid-cols-[minmax(0,1fr)_400px]', i)
chunk = raw[i:j]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{40,}"', 'src="..."', chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-header-clean.html", "w", encoding="utf-8").write(chunk)
print(chunk)

css = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\amino-1.css", encoding="utf-8").read()
for key in ["brand-butter", "brand-mint", "brand-sky", "brand-lavender"]:
    m = re.search(rf"--color-{key}:([^;]+);", css)
    print(key, m.group(0) if m else "missing")
    m2 = re.search(rf"\.bg-{key}\{{[^}}]+\}}", css)
    print(" bg", m2.group(0) if m2 else "missing")
