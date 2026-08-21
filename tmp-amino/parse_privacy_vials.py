import re

html = open("tmp-amino/privacy-live-now.html", encoding="utf-8").read()
for m in re.finditer(
    r'<div class="(absolute[^"]*aspect-\[1/1\.5\][^"]*)" style="transform:rotate\(([-\d]+)deg\)">.*?<img alt="([^"]+)"',
    html,
):
    print("ALT", m.group(3))
    print("ROT", m.group(2))
    print("CLS", m.group(1))
    print("---")
