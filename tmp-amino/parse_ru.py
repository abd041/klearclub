import re

html = open("tmp-amino/research-use-live.html", encoding="utf-8").read()
ns = re.sub(r"<script[\s\S]*?</script>", "", html)
# isolate main
start = ns.find("<main")
end = ns.find("</main>", start)
main = ns[start:end] if start >= 0 else ns
open("tmp-amino/research-use-main.html", "w", encoding="utf-8").write(main)
print("main len", len(main))

# Find section starts by h1/h2 text
markers = [
    "Research Use Only, proven pure",
    "For research and laboratory use only",
    "Pick any 4",
    "Intended research applications",
    "Research-grade, with receipts",
    "Proper handling",
    "Research peptide FAQs",
    "Researcher responsibility",
    "Stocking up",
    "compounds researchers order most",
    "All the research peptides you need",
]
for m in markers:
    i = main.find(m)
    print(f"{i:7d}  {m}")

# hero chunk
i = main.find("Research Use Only, proven pure")
open("tmp-amino/ru-hero.html", "w", encoding="utf-8").write(main[max(0, i - 1500) : i + 2000])

# applications
i = main.find("Intended research applications")
open("tmp-amino/ru-apps.html", "w", encoding="utf-8").write(main[i : i + 3500])

# handling
i = main.find("Proper handling")
open("tmp-amino/ru-handling.html", "w", encoding="utf-8").write(main[i : i + 4500])

# faq
i = main.find("Research peptide FAQs")
open("tmp-amino/ru-faq.html", "w", encoding="utf-8").write(main[i : i + 5000])

# responsibility
i = main.find("Researcher responsibility")
open("tmp-amino/ru-resp.html", "w", encoding="utf-8").write(main[i : i + 2500])

# research-grade receipts
i = main.find("Research-grade, with receipts")
open("tmp-amino/ru-receipts.html", "w", encoding="utf-8").write(main[i : i + 3500])

# for research only section
i = main.find("For research and laboratory use only")
open("tmp-amino/ru-for.html", "w", encoding="utf-8").write(main[max(0, i - 200) : i + 2000])
