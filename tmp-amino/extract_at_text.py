import re
from html.parser import HTMLParser

ns = open("tmp-amino/affiliate-terms-visible-full.html", encoding="utf-8").read()
# isolate main content
start = ns.find('<main class="bg-white">')
end = ns.find("</main>", start)
main = ns[start:end]


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out = []
        self.skip = 0
        self.in_a = False
        self.a_href = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style", "nav", "footer", "header"):
            self.skip += 1
        if tag in ("p", "h1", "h2", "h3", "li", "div") and self.skip == 0:
            pass
        if tag == "br":
            self.out.append("\n")
        if tag == "li" and self.skip == 0:
            self.out.append("\n- ")
        if tag in ("h1", "h2", "h3") and self.skip == 0:
            self.out.append(f"\n\n##{ '#' if tag=='h3' else '' if tag=='h1' else '' } ")
            if tag == "h1":
                self.out.append("\n\n# ")
            elif tag == "h2":
                self.out.append("\n\n## ")
            elif tag == "h3":
                self.out.append("\n\n### ")
        if tag == "p" and self.skip == 0:
            self.out.append("\n\n")
        if tag == "strong" or tag == "b":
            self.out.append("**")
        if tag == "a":
            self.in_a = True
            self.a_href = attrs.get("href", "")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "nav", "footer", "header"):
            self.skip = max(0, self.skip - 1)
        if tag in ("strong", "b"):
            self.out.append("**")
        if tag == "a":
            self.in_a = False

    def handle_data(self, data):
        if self.skip:
            return
        t = data.strip()
        if t:
            self.out.append(data)


# Simpler: regex strip tags but keep structure markers
chunk = main
# mark headings
chunk = re.sub(r"<h1[^>]*>", "\n\n# ", chunk)
chunk = re.sub(r"<h2[^>]*>", "\n\n## ", chunk)
chunk = re.sub(r"<h3[^>]*>", "\n\n### ", chunk)
chunk = re.sub(r"</h[123]>", "\n", chunk)
chunk = re.sub(r"<li[^>]*>", "\n- ", chunk)
chunk = re.sub(r"<br\s*/?>", "\n", chunk)
chunk = re.sub(r"<p[^>]*>", "\n\n", chunk)
chunk = re.sub(r"</p>", "\n", chunk)
chunk = re.sub(r"<strong[^>]*>", "**", chunk)
chunk = re.sub(r"</strong>", "**", chunk)
chunk = re.sub(r"<a[^>]*href=\"([^\"]+)\"[^>]*>", r"[\1](", chunk)
# fix links poorly - redo
chunk = main
# remove footer-ish from main if any
# Convert to readable text via BeautifulSoup-like manual

text_parts = []
# get intro block
intro = re.search(
    r'Partner Program.*?Effective.*?</p>',
    main,
    flags=re.S,
)
# Better approach: pull each section's inner HTML
sections = re.findall(r"<section class=\"mb-10\">([\s\S]*?)</section>", main)
print("sections", len(sections))

# header block
hdr = re.search(
    r'<div class="mb-10">([\s\S]*?)</div>\s*<div class="prose',
    main,
)
open("tmp-amino/at-header.html", "w", encoding="utf-8").write(hdr.group(1) if hdr else "")
print("header written", bool(hdr))

for i, sec in enumerate(sections, 1):
    open(f"tmp-amino/at-sec-{i:02d}.html", "w", encoding="utf-8").write(sec)

# also dump cleaned full text
def strip_tags(html):
    html = re.sub(r"<br\s*/?>", "\n", html)
    html = re.sub(r"</(p|div|li|h\d|section)>", "\n", html)
    html = re.sub(r"<li[^>]*>", "- ", html)
    html = re.sub(r"<strong[^>]*>", "**", html)
    html = re.sub(r"</strong>", "**", html)
    html = re.sub(r"<a[^>]*href=\"(/[^\"]+)\"[^>]*>([^<]*)</a>", r"\2 (\1)", html)
    html = re.sub(r"<[^>]+>", "", html)
    html = re.sub(r"&amp;", "&", html)
    html = re.sub(r"&quot;", '"', html)
    html = re.sub(r"&#x27;", "'", html)
    html = re.sub(r"&nbsp;", " ", html)
    html = re.sub(r"\n{3,}", "\n\n", html)
    return html.strip()


full = strip_tags(main)
# cut before Shop footer links if present
cut = full.find("\nShop\n")
if cut > 0:
    full = full[:cut].strip()
open("tmp-amino/affiliate-terms-text.md", "w", encoding="utf-8").write(full)
print("text len", len(full))
print(full[:2500])
