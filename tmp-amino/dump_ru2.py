h = open("tmp-amino/research-use-live.html", encoding="utf-8").read()
for needle in [
    "qualified researcher",
    "Browse products",
    "Read the full disclaimer",
    "Purity, HPLC verified",
    "Published certificates",
    "bg-[#0",
    "bg-black",
    "from-[#",
]:
    print(needle, h.find(needle))

i = h.find("Purity, HPLC verified")
print(h[i : i + 1200].replace("\\n", "\n").replace('\\"', '"')[:1100])

i = h.find("qualified researcher")
print("---QUAL---")
print(h[max(0, i - 400) : i + 900].replace("\\n", "\n").replace('\\"', '"')[:1300])
