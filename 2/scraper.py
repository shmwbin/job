import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Target Job Portals for West Bengal & IT/Computer Operator roles
TARGET_URLS = [
    "https://www.karmasandhan.com/jobs/state/west-bengal/",
    "https://www.freejobalert.com/wb-government-jobs/"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def load_existing_jobs():
    try:
        with open('jobs.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []

def hunt_and_extract_jobs():
    existing_jobs = load_existing_jobs()
    newly_hunted_jobs = []
    
    print("Starting automated job hunting from provided portals...")

    for url in TARGET_URLS:
        try:
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Example parsing logic for listing items (can be customized per site structure)
                # Ekhane amra job titles and links gulo khujchi
                for item in soup.find_all(['h2', 'h3', 'a'], limit=25):
                    text = item.get_text(strip=True)
                    link = item.get('href') if item.name == 'a' else (item.find('a')['href'] if item.find('a') else "")
                    
                    # Filter keywords relevant to user preference (IT, Computer, Data Entry, WB Govt)
                    keywords = ['Computer', 'Operator', 'Data Entry', 'IT', 'WBPSC', 'Police', 'Assistant', 'Clerk']
                    if any(kw.lower() in text.lower() for kw in keywords) and len(text) > 10:
                        
                        job_code = f"AUTO{len(existing_jobs) + len(newly_hunted_jobs) + 1}"
                        
                        # Check duplicate
                        if not any(j['post'] == text for j in existing_jobs + newly_hunted_jobs):
                            new_job = {
                                "code": job_code,
                                "type": "WB Govt" if "WB" in text or "PSC" in text else "Central Govt",
                                "org": "Hunted from Portal",
                                "post": text[:80], # Limit length
                                "vacancies": "Updating...",
                                "qualification": "Graduate / Diploma / IT",
                                "lastDate": datetime.now().strftime("%Y-%m-%d"),
                                "applyLink": link if link.startswith("http") else url,
                                "priority": "উচ্চ (High)"
                            }
                            newly_hunted_jobs.append(new_job)
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    # Merge newly hunted jobs to the top of existing list
    updated_jobs = newly_hunted_jobs + existing_jobs
    
    # Save back to jobs.json
    with open('jobs.json', 'w', encoding='utf-8') as f:
        json.dump(updated_jobs, f, ensure_ascii=False, indent=4)
    
    print(f"Hunting completed! Added {len(newly_hunted_jobs)} new jobs dynamically.")

if __name__ == "__main__":
    hunt_and_export = hunt_extract_jobs() if 'hunt_extract_jobs' in locals() else hunt_and_extract_jobs()
