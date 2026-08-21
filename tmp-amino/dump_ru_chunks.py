h = open("tmp-amino/research-use-live.html", encoding="utf-8").read()
i = h.find("Research-grade")
chunk = h[i : i + 3000].replace("\\n", "\n").replace('\\"', '"')
open("tmp-amino/ru-receipts-rsc.txt", "w", encoding="utf-8").write(chunk)
print(chunk[:2000])

i2 = h.find("For research and laboratory use")
chunk2 = h[i2 : i2 + 2000].replace("\\n", "\n").replace('\\"', '"')
open("tmp-amino/ru-for-rsc.txt", "w", encoding="utf-8").write(chunk2)
print("---FOR---")
print(chunk2[:1500])

i3 = h.find("Researcher responsibility")
if i3 < 0:
    i3 = h.find("Researcher responsib")
chunk3 = h[i3 : i3 + 1800].replace("\\n", "\n").replace('\\"', '"')
open("tmp-amino/ru-resp-rsc.txt", "w", encoding="utf-8").write(chunk3)
print("---RESP---", i3)
print(chunk3[:1200])
