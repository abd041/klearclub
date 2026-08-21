import re
import json

h = open("tmp-amino/research-use-live.html", encoding="utf-8").read()
# find FAQPage json
i = h.find('"@type":"FAQPage"')
print("faq idx", i)
start = h.rfind("{", 0, i)
# find matching - simpler: regex
m = re.search(r'\{"@context":"https://schema\.org","@type":"FAQPage".*?\]\}', h)
if not m:
    m = re.search(r'\{"@context":"https://schema.org","@type":"FAQPage"[^<]+', h)
print("m", bool(m))
if m:
    raw = m.group(0)
    # may be truncated; try load
    try:
        data = json.loads(raw)
    except Exception:
        # fix trailing
        raw2 = raw[: raw.rfind("]") + 1] + "}"
        data = json.loads(raw2)
    open("tmp-amino/ru-faq.json", "w", encoding="utf-8").write(json.dumps(data, indent=2))
    print("count", len(data["mainEntity"]))
    for q in data["mainEntity"]:
        print("Q:", q["name"])
        print("A:", q["acceptedAnswer"]["text"][:120], "...")
