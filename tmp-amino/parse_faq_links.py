import re
from pathlib import Path
raw = Path("tmp-amino/faq.html").read_text(encoding="utf-8", errors="ignore")
# all FAQ answer links
links = re.findall(r'<a class="mt-3[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)</a>', raw)
for href, text in links:
    label = re.sub(r"<[^>]+>", "", text)
    label = re.sub(r"\s+", " ", label).strip()
    print(href, "=>", label)
