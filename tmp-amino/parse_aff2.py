import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()

# Find main content
for needle in [
    "Help researchers find quality supply",
    "Built for research referrals",
    "How it works",
    "Example referral value",
    "Why refer researchers",
    "Simple, transparent referral value",
    "Frequently asked questions",
    "Refer researchers to",
]:
    i = raw.find(needle)
    print(f"\n===== {needle} @ {i} =====")
    if i < 0:
        continue
    chunk = raw[max(0, i - 200) : i + 2500]
    chunk = re.sub(r"<script[\s\S]*?</script>", "", chunk)
    chunk = re.sub(r'srcSet="[^"]*"', "", chunk)
    chunk = re.sub(r'src="[^"]{40,}"', 'src="..."', chunk)
    print(chunk[:2200])
