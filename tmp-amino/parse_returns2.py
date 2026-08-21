from pathlib import Path
import re

raw = Path("tmp-amino/returns.html").read_text(encoding="utf-8", errors="ignore")

# policy section start
i = raw.find("Damage Protection Policy")
start = raw.rfind("<section", 0, i)
# end before Received a Damaged section's parent or at Replacement Timeline's previous
j = raw.find("Received a Damaged or Defective Product?")
# find section containing that
start2 = raw.rfind("<section", 0, j)
end1 = start2
Path("tmp-amino/returns-policy.html").write_text(raw[start:end1], encoding="utf-8")
print("policy", end1-start)

end2 = raw.find("</section>", j) + len("</section>")
Path("tmp-amino/returns-damaged.html").write_text(raw[start2:end2], encoding="utf-8")
print("damaged", end2-start2)

k = raw.find("Replacement Timeline")
start3 = raw.rfind("<section", 0, k)
end3 = raw.find("</section>", k) + len("</section>")
Path("tmp-amino/returns-timeline.html").write_text(raw[start3:end3], encoding="utf-8")
print("timeline", end3-start3)

# print section class wrappers
for label, chunk in [("policy", raw[start:end1][:200]), ("damaged", raw[start2:start2+200]), ("timeline", raw[start3:start3+200])]:
    print(label, chunk)
