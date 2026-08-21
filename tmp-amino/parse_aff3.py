# -*- coding: utf-8 -*-
import re
raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()

# Lifetime card + FAQ answers from RSC
i = raw.find("Lifetime Recurring")
chunk = raw[i:i+2000]
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-lifetime.txt","w",encoding="utf-8").write(chunk)

i = raw.find("How does the referral value work?")
chunk2 = raw[i:i+6000]
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-faq.txt","w",encoding="utf-8").write(chunk2)

i = raw.find("Refer researchers to Amino")
chunk3 = raw[i-400:i+1500]
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-cta.txt","w",encoding="utf-8").write(chunk3)

i = raw.find("Real-time tracking")
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-track.txt","w",encoding="utf-8").write(raw[i-100:i+400])

print("ok")
