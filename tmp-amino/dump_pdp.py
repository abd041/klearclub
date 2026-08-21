from pathlib import Path
import re

html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
text = html.replace("\\n", " ").replace('\\"', '"').replace("\\u0026", "&")
# strip tags for a readable dump of product-ish content
plain = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
plain = re.sub(r"<style[\s\S]*?</style>", " ", plain, flags=re.I)
plain = re.sub(r"<[^>]+>", " ", plain)
plain = re.sub(r"&[a-z]+;", " ", plain)
plain = re.sub(r"\s+", " ", plain)
out = Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\glp3-plain.txt")
out.write_text(plain, encoding="utf-8")
print("plain", len(plain))

# find key windows
for label in [
    "GLP-3 (RT)",
    "Every batch, independently verified",
    "Every batch on record",
    "Compound Information",
    "What Is GLP-3",
    "Stability Information",
    "The research behind this compound",
    "Important research notice",
    "Also known as",
    "Add to cart",
    "Add to bag",
    "+ Add",
    "In stock",
    "8x tested",
]:
    i = plain.find(label)
    print(label, i)
