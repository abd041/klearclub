import re

html = open("tmp-amino/privacy-live-now.html", encoding="utf-8").read()
noscript = re.sub(r"<script[\s\S]*?</script>", "", html)
i = noscript.find("FDA research-use disclaimer")
print(repr(noscript[i - 400 : i + 80]))
