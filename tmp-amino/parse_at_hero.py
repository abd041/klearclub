import re

ns = open("tmp-amino/affiliate-terms-visible-full.html", encoding="utf-8").read()
# hero region
i = ns.find("Partner Program Terms")
print(ns[max(0, i - 2500) : i + 800])
print("\n\n==== BODY START ====\n")
# body after last updated or welcome
j = ns.find("1. Eligibility")
print(ns[j - 500 : j + 200])
open("tmp-amino/affiliate-terms-body-chunk.html", "w", encoding="utf-8").write(ns[j - 800 : j + 25000])
print("wrote body chunk", j)
