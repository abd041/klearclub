import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()

# Extract visible text chunks around key sections
for needle in [
    "Start your membership",
    "Points are cash back",
    "How it works",
    "Member",
    "Insider",
    "VIP",
    "Founder",
    "Pick the",
    "Compare",
    "faq",
]:
    i = raw.lower().find(needle.lower())
    print(f"\n===== {needle} @ {i} =====")
    if i < 0:
        continue
    chunk = raw[max(0, i - 100) : i + 1500]
    chunk = re.sub(r"<script[\s\S]*?</script>", "", chunk)
    chunk = re.sub(r'src="[^"]*"', 'src="..."', chunk)
    # unescape a bit of RSC
    print(chunk[:1600])
