import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# বর্তমান ডিফল্ট বা বেস ডেটাসেট (ব্যাকআপ ও সেফটির জন্য)
jobs_data = [
    {
        "code": "WB001", "type": "WB Govt", "org": "পশ্চিমবঙ্গ পাবলিক সার্ভিস কমিশন (WBPSC)",
        "post": "সাব-সার্ভেয়র (Sub-Surveyor)", "vacancies": "১১৪৫ টি",
        "qualification": "ডিপ্লোমা / সংশ্লিষ্ট ট্রেড", "lastDate": "০৯-১১-২০২৬",
        "applyLink": "https://psc.wb.gov.in", "priority": "উচ্চ (High)"
    },
    {
        "code": "WB002", "type": "WB Govt", "org": "পশ্চিমবঙ্গ পুলিশ রিক্রুটমেন্ট বোর্ড (WBPRB)",
        "post": "কনস্টেবল রিক্রুটমেন্ট", "vacancies": "১১,৭৪৯ টি",
        "qualification": "মাধ্যমিক পাশ", "lastDate": "শীঘ্রই আপডেট হবে",
        "applyLink": "https://prb.wb.gov.in", "priority": "উচ্চ (High)"
    },
    {
        "code": "CG001", "type": "Central Govt", "org": "ইউকো ব্যাংক (UCO Bank)",
        "post": "অপ্রেন্টিস রিক্রুটমেন্ট (Apprentice)", "vacancies": "৫৩০ টি",
        "qualification": "গ্র্যাজুয়েট", "lastDate": "২৯-১০-২০২৬",
        "applyLink": "https://www.ucobank.com", "priority": "উচ্চ (High)"
    }
]

def scrape_wbpsc_jobs():
    """
    এই ফাংশনটি WBPSC অফিশিয়াল সাইట్ থেকে লেটেস্ট নোটিশ বা জব ডেটা লাইভ চেক করার চেষ্টা করবে।
    """
    url = "https://psc.wb.gov.in/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # এখানে সাইটের স্ট্রাকচার অনুযায়ী নতুন জব ফিল্টার করে লিস্টে যোগ করার লজিক লেখা যায়
            # উদাহরণস্বরূপ সাইটের নোটিশ বোর্ড বা টেবিল ট্যাগ ট্র্যাক করা:
            notices = soup.find_all('a') # উদাহরণ
            
            print("Successfully connected to WBPSC portal for live check.")
        else:
            print(f"Failed to fetch. Status code: {response.status_code}")
    except Exception as e:
        print(f"Scraping warning (using standard dataset): {e}")

def update_json_file():
    # লাইভ স্ক্রেপিং বা ডেটা চেক রান করা
    scrape_wbpsc_jobs()
    
    # jobs.json ফাইলে ডেটা সেভ করা
    with open('jobs.json', 'w', encoding='utf-8') as f:
        json.dump(jobs_data, f, ensure_ascii=False, indent=4)
    print("Jobs JSON successfully synchronized via GitHub Actions!")

if __name__ == "__main__":
    update_json_file()
