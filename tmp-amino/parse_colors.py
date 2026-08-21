import re
css = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\amino-1.css", encoding="utf-8").read() + open(r"c:\Users\user\Desktop\klearclub\tmp-amino\amino-0.css", encoding="utf-8").read()
for key in ["brand-butter", "brand-mint", "brand-lavender", "brand-sky", "fraunces"]:
    for m in re.finditer(rf"--color-{key}:[^;]+;", css):
        print(m.group(0))
    i = css.find(key)
    print(key, "first", i, css[i:i+80] if i>=0 else "")
