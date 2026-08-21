import re

html = open("tmp-amino/terms-live.html", encoding="utf-8").read()
# find gradient near Legal Agreement
i = html.find("Legal Agreement")
chunk = html[i - 3500 : i + 200]
# find linear-gradient in chunk
for m in re.finditer(r"linear-gradient\([^)]+\)", chunk):
    print("GRAD", m.group(0))
# badge svg / classes
noscript = re.sub(r"<script[\s\S]*?</script>", "", html)
i = noscript.find("Legal Agreement")
print(noscript[i - 900 : i + 600])
