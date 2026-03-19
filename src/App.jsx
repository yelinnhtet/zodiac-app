import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getZodiacSign = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  const day = d.getDate();
  const month = d.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn ♑";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces ♓";
  return null;
};

const zodiacData = [
  { name: "Aries ♈", personality_en: "Bold, energetic, natural leader.", personality_mm: "သတ္တိရှိပြီး ခေါင်းဆောင်စိတ်ရှိသည်။", love_en: "Passionate, best with Leo, Sagittarius.", love_mm: "အချစ်ပြင်းထန်ပြီး Leo, Sagittarius နဲ့လိုက်ဖက်။", career_en: "Entrepreneur, Athlete, Leader", career_mm: "စီးပွားရေးစွန့်ဦးတီထွင်ပညာရှင်၊ အားကစားသမား" },
  { name: "Taurus ♉", personality_en: "Calm, reliable, patient.", personality_mm: "တည်ငြိမ်ပြီး စိတ်ရှည်သည်။", love_en: "Loyal, best with Virgo, Capricorn.", love_mm: "သစ္စာရှိပြီး Virgo, Capricorn နဲ့လိုက်ဖက်။", career_en: "Banker, Designer", career_mm: "ဘဏ်ဝန်ထမ်း၊ ဒီဇိုင်နာ" },
  { name: "Gemini ♊", personality_en: "Smart, curious, talkative.", personality_mm: "ဉာဏ်ကောင်းပြီး စကားပြောတတ်သည်။", love_en: "Needs communication.", love_mm: "ဆက်သွယ်မှုအရေးကြီးသည်။", career_en: "Writer, Teacher", career_mm: "စာရေးဆရာ၊ ဆရာ" },
  { name: "Cancer ♋", personality_en: "Emotional, caring.", personality_mm: "စိတ်နူးညံ့ပြီး caring ဖြစ်သည်။", love_en: "Loyal and protective.", love_mm: "သစ္စာရှိပြီး ကာကွယ်ပေးတတ်သည်။", career_en: "Nurse, Counselor", career_mm: "သူနာပြု၊ အကြံပေး" },
  { name: "Leo ♌", personality_en: "Confident, charismatic.", personality_mm: "ယုံကြည်မှုရှိပြီး ဆွဲဆောင်မှုရှိသည်။", love_en: "Romantic and bold.", love_mm: "အချစ်ပြင်းထန်သည်။", career_en: "Actor, Leader", career_mm: "သရုပ်ဆောင်၊ ခေါင်းဆောင်" },
  { name: "Virgo ♍", personality_en: "Practical, organized.", personality_mm: "စနစ်တကျလုပ်တတ်သည်။", love_en: "Honest and stable.", love_mm: "တည်ငြိမ်သော အချစ်ကိုနှစ်သက်သည်။", career_en: "Analyst, Doctor", career_mm: "ခွဲခြမ်းစိတ်ဖြာသူ၊ ဆရာဝန်" },
  { name: "Libra ♎", personality_en: "Balanced, charming.", personality_mm: "ညီမျှမှုကို နှစ်သက်သည်။", love_en: "Seeks harmony.", love_mm: "ညီညွတ်မှုလိုအပ်သည်။", career_en: "Lawyer, Designer", career_mm: "ဥပဒေပညာရှင်၊ ဒီဇိုင်နာ" },
  { name: "Scorpio ♏", personality_en: "Intense, mysterious.", personality_mm: "နက်ရှိုင်းပြီး လျှို့ဝှက်သည်။", love_en: "Deep emotional bonds.", love_mm: "နက်ရှိုင်းသော အချစ်ကိုလိုလားသည်။", career_en: "Detective, Researcher", career_mm: "စုံစမ်းစစ်ဆေးသူ" },
  { name: "Sagittarius ♐", personality_en: "Adventurous, free.", personality_mm: "လွတ်လပ်မှုကို နှစ်သက်သည်။", love_en: "Needs freedom.", love_mm: "လွတ်လပ်မှုလိုအပ်သည်။", career_en: "Traveler, Blogger", career_mm: "ခရီးသွား၊ Blogger" },
  { name: "Capricorn ♑", personality_en: "Disciplined, hardworking.", personality_mm: "ကြိုးစားပြီး စည်းကမ်းရှိသည်။", love_en: "Serious relationships.", love_mm: "ရှည်ကြာသော အချစ်ကိုလိုလားသည်။", career_en: "Engineer, CEO", career_mm: "အင်ဂျင်နီယာ၊ CEO" },
  { name: "Aquarius ♒", personality_en: "Innovative, independent.", personality_mm: "ထူးခြားသော အတွေးအခေါ်ရှိသည်။", love_en: "Values friendship.", love_mm: "မိတ်ဆွေဖြစ်မှုကို အရေးထားသည်။", career_en: "IT, Scientist", career_mm: "IT၊ သိပ္ပံပညာရှင်" },
  { name: "Pisces ♓", personality_en: "Dreamy, artistic.", personality_mm: "အနုပညာနှစ်သက်သည်။", love_en: "Very romantic.", love_mm: "အချစ်နူးညံ့သည်။", career_en: "Artist, Musician", career_mm: "အနုပညာရှင်" }
];

export default function ZodiacApp() {
  const [birthDate, setBirthDate] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const detectedSign = getZodiacSign(birthDate);
  const isDark = theme === "dark";

  const filteredData = detectedSign
    ? zodiacData.filter((z) => z.name === detectedSign)
    : zodiacData;

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${isDark ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🌌 Zodiac Universe</h1>
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="px-4 py-2 rounded-xl bg-purple-600 text-white">
            {isDark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="mb-8 flex gap-3">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`rounded-xl p-2 w-full ${isDark ? "bg-white/20 text-white" : "bg-white text-black"}`}
          />

          <button
            onClick={() => setBirthDate("")}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Reset
          </button>
        </div>

        {detectedSign && (
          <div className="mb-6 text-center font-semibold text-green-400 text-lg">
            Your Zodiac Sign: {detectedSign}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((z, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`rounded-2xl shadow-xl p-5 transition-all duration-300 ${isDark ? "bg-white/10 backdrop-blur-lg" : "bg-white"}`}>
                <h2 className="text-xl font-semibold text-purple-400 mb-2">{z.name}</h2>
                <p className="font-semibold">Personality</p>
                <p>{z.personality_en}</p>
                <p className="text-sm opacity-70 mb-2">{z.personality_mm}</p>
                <p className="font-semibold">Love</p>
                <p>{z.love_en}</p>
                <p className="text-sm opacity-70 mb-2">{z.love_mm}</p>
                <p className="font-semibold">Career</p>
                <p>{z.career_en}</p>
                <p className="text-sm opacity-70">{z.career_mm}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
