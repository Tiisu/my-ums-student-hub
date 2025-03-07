
export interface SurahInfo {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  versesCount: number;
  audioUrl?: string;
}

// Complete list of all 114 surahs of the Quran
export const QURAN_CHAPTERS: SurahInfo[] = [
  { id: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", revelationType: "Meccan", versesCount: 7, audioUrl: "https://server8.mp3quran.net/afs/001.mp3" },
  { id: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", revelationType: "Medinan", versesCount: 286, audioUrl: "https://server8.mp3quran.net/afs/002.mp3" },
  { id: 3, name: "آل عمران", englishName: "Aal-Imran", englishNameTranslation: "The Family of Imran", revelationType: "Medinan", versesCount: 200, audioUrl: "https://server8.mp3quran.net/afs/003.mp3" },
  { id: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", revelationType: "Medinan", versesCount: 176, audioUrl: "https://server8.mp3quran.net/afs/004.mp3" },
  { id: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", revelationType: "Medinan", versesCount: 120, audioUrl: "https://server8.mp3quran.net/afs/005.mp3" },
  { id: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", revelationType: "Meccan", versesCount: 165, audioUrl: "https://server8.mp3quran.net/afs/006.mp3" },
  { id: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", revelationType: "Meccan", versesCount: 206, audioUrl: "https://server8.mp3quran.net/afs/007.mp3" },
  { id: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", revelationType: "Medinan", versesCount: 75, audioUrl: "https://server8.mp3quran.net/afs/008.mp3" },
  { id: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", revelationType: "Medinan", versesCount: 129, audioUrl: "https://server8.mp3quran.net/afs/009.mp3" },
  { id: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", revelationType: "Meccan", versesCount: 109, audioUrl: "https://server8.mp3quran.net/afs/010.mp3" },
  { id: 11, name: "هود", englishName: "Hud", englishNameTranslation: "Hud", revelationType: "Meccan", versesCount: 123, audioUrl: "https://server8.mp3quran.net/afs/011.mp3" },
  { id: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", revelationType: "Meccan", versesCount: 111, audioUrl: "https://server8.mp3quran.net/afs/012.mp3" },
  { id: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", revelationType: "Medinan", versesCount: 43, audioUrl: "https://server8.mp3quran.net/afs/013.mp3" },
  { id: 14, name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", revelationType: "Meccan", versesCount: 52, audioUrl: "https://server8.mp3quran.net/afs/014.mp3" },
  { id: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", revelationType: "Meccan", versesCount: 99, audioUrl: "https://server8.mp3quran.net/afs/015.mp3" },
  { id: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", revelationType: "Meccan", versesCount: 128, audioUrl: "https://server8.mp3quran.net/afs/016.mp3" },
  { id: 17, name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", revelationType: "Meccan", versesCount: 111, audioUrl: "https://server8.mp3quran.net/afs/017.mp3" },
  { id: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", revelationType: "Meccan", versesCount: 110, audioUrl: "https://server8.mp3quran.net/afs/018.mp3" },
  { id: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", revelationType: "Meccan", versesCount: 98, audioUrl: "https://server8.mp3quran.net/afs/019.mp3" },
  { id: 20, name: "طه", englishName: "Ta-Ha", englishNameTranslation: "Ta-Ha", revelationType: "Meccan", versesCount: 135, audioUrl: "https://server8.mp3quran.net/afs/020.mp3" },
  { id: 21, name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", revelationType: "Meccan", versesCount: 112, audioUrl: "https://server8.mp3quran.net/afs/021.mp3" },
  { id: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", revelationType: "Medinan", versesCount: 78, audioUrl: "https://server8.mp3quran.net/afs/022.mp3" },
  { id: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", revelationType: "Meccan", versesCount: 118, audioUrl: "https://server8.mp3quran.net/afs/023.mp3" },
  { id: 24, name: "النور", englishName: "An-Nur", englishNameTranslation: "The Light", revelationType: "Medinan", versesCount: 64, audioUrl: "https://server8.mp3quran.net/afs/024.mp3" },
  { id: 25, name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", revelationType: "Meccan", versesCount: 77, audioUrl: "https://server8.mp3quran.net/afs/025.mp3" },
  { id: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", revelationType: "Meccan", versesCount: 227, audioUrl: "https://server8.mp3quran.net/afs/026.mp3" },
  { id: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ants", revelationType: "Meccan", versesCount: 93, audioUrl: "https://server8.mp3quran.net/afs/027.mp3" },
  { id: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", revelationType: "Meccan", versesCount: 88, audioUrl: "https://server8.mp3quran.net/afs/028.mp3" },
  { id: 29, name: "العنكبوت", englishName: "Al-Ankabut", englishNameTranslation: "The Spider", revelationType: "Meccan", versesCount: 69, audioUrl: "https://server8.mp3quran.net/afs/029.mp3" },
  { id: 30, name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", revelationType: "Meccan", versesCount: 60, audioUrl: "https://server8.mp3quran.net/afs/030.mp3" },
  { id: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", revelationType: "Meccan", versesCount: 34, audioUrl: "https://server8.mp3quran.net/afs/031.mp3" },
  { id: 32, name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", revelationType: "Meccan", versesCount: 30, audioUrl: "https://server8.mp3quran.net/afs/032.mp3" },
  { id: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", revelationType: "Medinan", versesCount: 73, audioUrl: "https://server8.mp3quran.net/afs/033.mp3" },
  { id: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "Sheba", revelationType: "Meccan", versesCount: 54, audioUrl: "https://server8.mp3quran.net/afs/034.mp3" },
  { id: 35, name: "فاطر", englishName: "Fatir", englishNameTranslation: "Originator", revelationType: "Meccan", versesCount: 45, audioUrl: "https://server8.mp3quran.net/afs/035.mp3" },
  { id: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", revelationType: "Meccan", versesCount: 83, audioUrl: "https://server8.mp3quran.net/afs/036.mp3" },
  { id: 37, name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "Those who set the Ranks", revelationType: "Meccan", versesCount: 182, audioUrl: "https://server8.mp3quran.net/afs/037.mp3" },
  { id: 38, name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", revelationType: "Meccan", versesCount: 88, audioUrl: "https://server8.mp3quran.net/afs/038.mp3" },
  { id: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", revelationType: "Meccan", versesCount: 75, audioUrl: "https://server8.mp3quran.net/afs/039.mp3" },
  { id: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", revelationType: "Meccan", versesCount: 85, audioUrl: "https://server8.mp3quran.net/afs/040.mp3" },
  { id: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", revelationType: "Meccan", versesCount: 54, audioUrl: "https://server8.mp3quran.net/afs/041.mp3" },
  { id: 42, name: "الشورى", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", revelationType: "Meccan", versesCount: 53, audioUrl: "https://server8.mp3quran.net/afs/042.mp3" },
  { id: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", revelationType: "Meccan", versesCount: 89, audioUrl: "https://server8.mp3quran.net/afs/043.mp3" },
  { id: 44, name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", revelationType: "Meccan", versesCount: 59, audioUrl: "https://server8.mp3quran.net/afs/044.mp3" },
  { id: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", revelationType: "Meccan", versesCount: 37, audioUrl: "https://server8.mp3quran.net/afs/045.mp3" },
  { id: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", revelationType: "Meccan", versesCount: 35, audioUrl: "https://server8.mp3quran.net/afs/046.mp3" },
  { id: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", revelationType: "Medinan", versesCount: 38, audioUrl: "https://server8.mp3quran.net/afs/047.mp3" },
  { id: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", revelationType: "Medinan", versesCount: 29, audioUrl: "https://server8.mp3quran.net/afs/048.mp3" },
  { id: 49, name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "The Rooms", revelationType: "Medinan", versesCount: 18, audioUrl: "https://server8.mp3quran.net/afs/049.mp3" },
  { id: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", revelationType: "Meccan", versesCount: 45, audioUrl: "https://server8.mp3quran.net/afs/050.mp3" },
  { id: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", revelationType: "Meccan", versesCount: 60, audioUrl: "https://server8.mp3quran.net/afs/051.mp3" },
  { id: 52, name: "الطور", englishName: "At-Tur", englishNameTranslation: "The Mount", revelationType: "Meccan", versesCount: 49, audioUrl: "https://server8.mp3quran.net/afs/052.mp3" },
  { id: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", revelationType: "Meccan", versesCount: 62, audioUrl: "https://server8.mp3quran.net/afs/053.mp3" },
  { id: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", revelationType: "Meccan", versesCount: 55, audioUrl: "https://server8.mp3quran.net/afs/054.mp3" },
  { id: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", revelationType: "Medinan", versesCount: 78, audioUrl: "https://server8.mp3quran.net/afs/055.mp3" },
  { id: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", revelationType: "Meccan", versesCount: 96, audioUrl: "https://server8.mp3quran.net/afs/056.mp3" },
  { id: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", revelationType: "Medinan", versesCount: 29, audioUrl: "https://server8.mp3quran.net/afs/057.mp3" },
  { id: 58, name: "المجادلة", englishName: "Al-Mujadila", englishNameTranslation: "The Pleading Woman", revelationType: "Medinan", versesCount: 22, audioUrl: "https://server8.mp3quran.net/afs/058.mp3" },
  { id: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", revelationType: "Medinan", versesCount: 24, audioUrl: "https://server8.mp3quran.net/afs/059.mp3" },
  { id: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "She That is to be Examined", revelationType: "Medinan", versesCount: 13, audioUrl: "https://server8.mp3quran.net/afs/060.mp3" },
  { id: 61, name: "الصف", englishName: "As-Saf", englishNameTranslation: "The Ranks", revelationType: "Medinan", versesCount: 14, audioUrl: "https://server8.mp3quran.net/afs/061.mp3" },
  { id: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "The Congregation, Friday", revelationType: "Medinan", versesCount: 11, audioUrl: "https://server8.mp3quran.net/afs/062.mp3" },
  { id: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", revelationType: "Medinan", versesCount: 11, audioUrl: "https://server8.mp3quran.net/afs/063.mp3" },
  { id: 64, name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", revelationType: "Medinan", versesCount: 18, audioUrl: "https://server8.mp3quran.net/afs/064.mp3" },
  { id: 65, name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", revelationType: "Medinan", versesCount: 12, audioUrl: "https://server8.mp3quran.net/afs/065.mp3" },
  { id: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", revelationType: "Medinan", versesCount: 12, audioUrl: "https://server8.mp3quran.net/afs/066.mp3" },
  { id: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", revelationType: "Meccan", versesCount: 30, audioUrl: "https://server8.mp3quran.net/afs/067.mp3" },
  { id: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", revelationType: "Meccan", versesCount: 52, audioUrl: "https://server8.mp3quran.net/afs/068.mp3" },
  { id: 69, name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "The Reality", revelationType: "Meccan", versesCount: 52, audioUrl: "https://server8.mp3quran.net/afs/069.mp3" },
  { id: 70, name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", revelationType: "Meccan", versesCount: 44, audioUrl: "https://server8.mp3quran.net/afs/070.mp3" },
  { id: 71, name: "نوح", englishName: "Nuh", englishNameTranslation: "Noah", revelationType: "Meccan", versesCount: 28, audioUrl: "https://server8.mp3quran.net/afs/071.mp3" },
  { id: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", revelationType: "Meccan", versesCount: 28, audioUrl: "https://server8.mp3quran.net/afs/072.mp3" },
  { id: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", revelationType: "Meccan", versesCount: 20, audioUrl: "https://server8.mp3quran.net/afs/073.mp3" },
  { id: 74, name: "المدثر", englishName: "Al-Muddathir", englishNameTranslation: "The Cloaked One", revelationType: "Meccan", versesCount: 56, audioUrl: "https://server8.mp3quran.net/afs/074.mp3" },
  { id: 75, name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", revelationType: "Meccan", versesCount: 40, audioUrl: "https://server8.mp3quran.net/afs/075.mp3" },
  { id: 76, name: "الإنسان", englishName: "Al-Insan", englishNameTranslation: "The Human", revelationType: "Medinan", versesCount: 31, audioUrl: "https://server8.mp3quran.net/afs/076.mp3" },
  { id: 77, name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", revelationType: "Meccan", versesCount: 50, audioUrl: "https://server8.mp3quran.net/afs/077.mp3" },
  { id: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", revelationType: "Meccan", versesCount: 40, audioUrl: "https://server8.mp3quran.net/afs/078.mp3" },
  { id: 79, name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "Those who drag forth", revelationType: "Meccan", versesCount: 46, audioUrl: "https://server8.mp3quran.net/afs/079.mp3" },
  { id: 80, name: "عبس", englishName: "Abasa", englishNameTranslation: "He Frowned", revelationType: "Meccan", versesCount: 42, audioUrl: "https://server8.mp3quran.net/afs/080.mp3" },
  { id: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", revelationType: "Meccan", versesCount: 29, audioUrl: "https://server8.mp3quran.net/afs/081.mp3" },
  { id: 82, name: "الانفطار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", revelationType: "Meccan", versesCount: 19, audioUrl: "https://server8.mp3quran.net/afs/082.mp3" },
  { id: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "The Defrauding", revelationType: "Meccan", versesCount: 36, audioUrl: "https://server8.mp3quran.net/afs/083.mp3" },
  { id: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Sundering", revelationType: "Meccan", versesCount: 25, audioUrl: "https://server8.mp3quran.net/afs/084.mp3" },
  { id: 85, name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", revelationType: "Meccan", versesCount: 22, audioUrl: "https://server8.mp3quran.net/afs/085.mp3" },
  { id: 86, name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "The Nightcomer", revelationType: "Meccan", versesCount: 17, audioUrl: "https://server8.mp3quran.net/afs/086.mp3" },
  { id: 87, name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "The Most High", revelationType: "Meccan", versesCount: 19, audioUrl: "https://server8.mp3quran.net/afs/087.mp3" },
  { id: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", revelationType: "Meccan", versesCount: 26, audioUrl: "https://server8.mp3quran.net/afs/088.mp3" },
  { id: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", revelationType: "Meccan", versesCount: 30, audioUrl: "https://server8.mp3quran.net/afs/089.mp3" },
  { id: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", revelationType: "Meccan", versesCount: 20, audioUrl: "https://server8.mp3quran.net/afs/090.mp3" },
  { id: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", revelationType: "Meccan", versesCount: 15, audioUrl: "https://server8.mp3quran.net/afs/091.mp3" },
  { id: 92, name: "الليل", englishName: "Al-Layl", englishNameTranslation: "The Night", revelationType: "Meccan", versesCount: 21, audioUrl: "https://server8.mp3quran.net/afs/092.mp3" },
  { id: 93, name: "الضحى", englishName: "Ad-Duha", englishNameTranslation: "The Morning Hours", revelationType: "Meccan", versesCount: 11, audioUrl: "https://server8.mp3quran.net/afs/093.mp3" },
  { id: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", revelationType: "Meccan", versesCount: 8, audioUrl: "https://server8.mp3quran.net/afs/094.mp3" },
  { id: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", revelationType: "Meccan", versesCount: 8, audioUrl: "https://server8.mp3quran.net/afs/095.mp3" },
  { id: 96, name: "العلق", englishName: "Al-Alaq", englishNameTranslation: "The Clot", revelationType: "Meccan", versesCount: 19, audioUrl: "https://server8.mp3quran.net/afs/096.mp3" },
  { id: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", revelationType: "Meccan", versesCount: 5, audioUrl: "https://server8.mp3quran.net/afs/097.mp3" },
  { id: 98, name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", revelationType: "Medinan", versesCount: 8, audioUrl: "https://server8.mp3quran.net/afs/098.mp3" },
  { id: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", revelationType: "Medinan", versesCount: 8, audioUrl: "https://server8.mp3quran.net/afs/099.mp3" },
  { id: 100, name: "العاديات", englishName: "Al-Adiyat", englishNameTranslation: "The Coursers", revelationType: "Meccan", versesCount: 11, audioUrl: "https://server8.mp3quran.net/afs/100.mp3" },
  { id: 101, name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", revelationType: "Meccan", versesCount: 11, audioUrl: "https://server8.mp3quran.net/afs/101.mp3" },
  { id: 102, name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in world increase", revelationType: "Meccan", versesCount: 8, audioUrl: "https://server8.mp3quran.net/afs/102.mp3" },
  { id: 103, name: "العصر", englishName: "Al-Asr", englishNameTranslation: "The Declining Day", revelationType: "Meccan", versesCount: 3, audioUrl: "https://server8.mp3quran.net/afs/103.mp3" },
  { id: 104, name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", revelationType: "Meccan", versesCount: 9, audioUrl: "https://server8.mp3quran.net/afs/104.mp3" },
  { id: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", revelationType: "Meccan", versesCount: 5, audioUrl: "https://server8.mp3quran.net/afs/105.mp3" },
  { id: 106, name: "قريش", englishName: "Quraysh", englishNameTranslation: "Quraysh", revelationType: "Meccan", versesCount: 4, audioUrl: "https://server8.mp3quran.net/afs/106.mp3" },
  { id: 107, name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "The Small Kindnesses", revelationType: "Meccan", versesCount: 7, audioUrl: "https://server8.mp3quran.net/afs/107.mp3" },
  { id: 108, name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", revelationType: "Meccan", versesCount: 3, audioUrl: "https://server8.mp3quran.net/afs/108.mp3" },
  { id: 109, name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", revelationType: "Meccan", versesCount: 6, audioUrl: "https://server8.mp3quran.net/afs/109.mp3" },
  { id: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", revelationType: "Medinan", versesCount: 3, audioUrl: "https://server8.mp3quran.net/afs/110.mp3" },
  { id: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", revelationType: "Meccan", versesCount: 5, audioUrl: "https://server8.mp3quran.net/afs/111.mp3" },
  { id: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", revelationType: "Meccan", versesCount: 4, audioUrl: "https://server8.mp3quran.net/afs/112.mp3" },
  { id: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", revelationType: "Meccan", versesCount: 5, audioUrl: "https://server8.mp3quran.net/afs/113.mp3" },
  { id: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "The Mankind", revelationType: "Meccan", versesCount: 6, audioUrl: "https://server8.mp3quran.net/afs/114.mp3" }
];

export interface Reciter {
  id: number;
  name: string;
  language: string;
  baseUrl?: string;
}

export const RECITERS: Reciter[] = [
  { id: 1, name: "Mishari Rashid al-Afasy", language: "Arabic", baseUrl: "https://server8.mp3quran.net/afs/" },
  { id: 10, name: "This is Matrood", language: "Arabic", baseUrl: "https://server8.mp3quran.net/mtrod/" },

  // { id: 2, name: "Abdul Rahman Al-Sudais", language: "Arabic", baseUrl: "https://server7.mp3quran.net/sudais/" },
  // { id: 3, name: "Saud Al-Shuraim", language: "Arabic", baseUrl: "https://server7.mp3quran.net/shur/" },
  // { id: 4, name: "Abu Bakr Al-Shatri", language: "Arabic", baseUrl: "https://server7.mp3quran.net/shatri/" },
  { id: 5, name: "Mahmoud Khalil Al-Husary", language: "Arabic", baseUrl: "https://server13.mp3quran.net/husr/" },
  // { id: 6, name: "Mohamed Siddiq El-Minshawi", language: "Arabic", baseUrl: "https://server8.mp3quran.net/minsh/" },
  // { id: 7, name: "Hani Ar-Rifai", language: "Arabic", baseUrl: "https://server11.mp3quran.net/hani/" },
  // { id: 8, name: "Sa`d Al-Ghamdi", language: "Arabic", baseUrl: "https://server11.mp3quran.net/gmd/" },
  { id: 9, name: "My Man Bukhatir", language: "Arabic", baseUrl: "https://server8.mp3quran.net/bu_khtr/" },

];

export interface Verse {
  id: number;
  arabic: string;
  english: string;
  surahId: number;
  verseNumber: number;
}

// Sample verses data for demonstration (first few verses of Al-Fatiha)
export const SAMPLE_VERSES: Verse[] = [
  { id: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", surahId: 1, verseNumber: 1 },
  { id: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", english: "All praise is due to Allah, Lord of the worlds -", surahId: 1, verseNumber: 2 },
  { id: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", english: "The Entirely Merciful, the Especially Merciful,", surahId: 1, verseNumber: 3 },
  { id: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", english: "Sovereign of the Day of Recompense.", surahId: 1, verseNumber: 4 },
  { id: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", english: "It is You we worship and You we ask for help.", surahId: 1, verseNumber: 5 },
  { id: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", english: "Guide us to the straight path -", surahId: 1, verseNumber: 6 },
  { id: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", surahId: 1, verseNumber: 7 },
];
