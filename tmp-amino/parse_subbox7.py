import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

# Find header section start for subscription page
# Look for "40% off retail" visible text
i = raw.find("40% off retail")
print("40% off retail at", i)
chunk = raw[i-2500:i+500]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{80,}"', 'src="..."', chunk)
print(chunk)

# Find brand color CSS variables from stylesheet link - try fetch CSS
print("\n\nLooking for brand-mint in HTML:")
for m in re.finditer(r'--brand-[a-z-]+:\s*[^;]+', raw):
    print(m.group(0))
for m in re.finditer(r'brand-mint|brand-lavender|brand-sky|brand-black', raw[:50000]):
    pass
# In style tags
styles = re.findall(r'<style[^>]*>([\s\S]*?)</style>', raw)
print("style tags", len(styles), "lens", [len(s) for s in styles])
for s in styles:
    if "brand" in s or "mint" in s or "lavender" in s:
        # print relevant lines
        for line in s.split("\n"):
            if any(k in line for k in ["mint", "lavender", "sky", "brand", "offwhite"]):
                print(line[:200])
