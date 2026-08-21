import re
from pathlib import Path
raw = Path("tmp-amino/account.html").read_text(encoding="utf-8", errors="ignore")
# extract main open tag
m = re.search(r"<main[^>]*>", raw)
print(m.group(0) if m else "no main")
# button full
idx = raw.find('Sign in or sign up</span>')
print(raw[idx-500:idx+200] if idx>0 else "no")
# look for enter code in flight
for key in ["Enter your code", "6-digit", "Resend", "different email", "code to"]:
    print(key, raw.find(key))
