raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\mem-tiers.html", encoding="utf-8").read()
# Founder remaining benefits
i = raw.find(">Founder</h3>")
print(raw[i:i+3500])
