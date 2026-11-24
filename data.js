/* ================= 仁川演唱會旅遊資料庫（純原生 JS 結構，可直接編輯） ================= */

const TRIP = {
  base_hotel: {
    name: "Sky Top Incheon Airport Hotel",
    korean_name: "영종 스카이탑 호텔",
    address: "인천 중구 영종대로196번길 15-7"
  },
  days: [
    {
      day: "Day 1",
      date: "2026-11-26",
      weekday: "週四",
      theme: "抵達仁川・機場汗蒸幕過夜",
      overview: "搭乘 LJ188 抵達仁川 T2，完成入境與領行李後，在航廈內補給宵夜並入住汗蒸幕。第一晚不進市區，保留完整睡眠時間。",
      hotel: "機場汗蒸幕",
      schedule: [
        {
          time: "18:30 - 22:15",
          title: "台中飛往仁川",
          korean_name: "",
          transport: "搭乘 LJ188，台中清泉崗機場 T1 飛往仁川機場 T2",
          category: "交通",
          notes: "18:30 台中出發，預計 22:15 抵達仁川國際機場第二航廈。"
        },
        {
          time: "22:15 - 23:00",
          title: "入境與領取行李",
          korean_name: "인천국제공항 제2여객터미널",
          transport: "抵達 T2，入境並領取託運行李",
          category: "交通",
          notes: "預留入境與行李時間；因 T2 一般區美食街多在 22:00 打烊，建議入境後直接買 24 小時宵夜。"
        },
        {
          time: "23:00 - 23:30",
          title: "機場深夜晚餐／宵夜補給",
          korean_name: "롯데리아 인천공항2터미널1층점 / CU 인천공항2터미널점",
          transport: "T2 入境大廳 1 樓中央（3 號出入口附近），步行即達",
          category: "美食",
          notes: "24 小時營業。可現點熱騰騰的韓牛/蝦堡套餐，或到旁邊 24H CU 買香蕉牛奶、三角飯糰、泡麵帶去汗蒸幕休息區吃。"
        },
        {
          time: "23:30 - 00:30",
          title: "機場汗蒸幕入住與休息",
          korean_name: "스파앳홈 인천공항 제2여객터미널점",
          transport: "仁川機場 T2 地下 1 樓西側，步行前往",
          category: "休息",
          notes: "24 小時營業，使用夜間過夜方案。建議攜帶耳塞、眼罩，護照及錢包放入個人置物櫃。"
        },
        {
          time: "00:30 - 09:30",
          title: "汗蒸幕過夜睡眠",
          korean_name: "스파앳홈 인천공항 제2여객터미널점",
          transport: "留在機場汗蒸幕內",
          category: "休息",
          notes: "第一晚不進市區、不趕末班車，安心休息，隔天睡飽再移動。"
        }
      ]
    },
    {
      day: "Day 2",
      date: "2026-11-27",
      weekday: "週五",
      theme: "雲西站慢遊採買・第一場演唱會",
      overview: "上午從機場前往雲西站寄放行李，安排早午餐與輕量採買；下午入住 Sky Top、休息及整理應援物，傍晚前往 INSPIRE Arena。散場後優先搭公演接駁與 AREX，留意 23:42 末班車並準備叫車備案。",
      hotel: "Sky Top（15:00 入住）",
      schedule: [
        {
          time: "09:30 - 10:30",
          title: "睡醒梳洗與前往雲西站",
          korean_name: "운서역",
          transport: "從仁川機場搭 AREX 普通列車至雲西站，步行約 8 分鐘至飯店寄放行李",
          category: "交通",
          notes: "不早起趕車，醒來後整理隨身物品，先到飯店免費寄放行李。"
        },
        {
          time: "10:30 - 11:30",
          title: "牛骨湯暖胃早午餐",
          korean_name: "동남집 운서점",
          transport: "雲西站生活圈步行約 10 分鐘內",
          category: "美食",
          notes: "一人食友善。推薦牛骨湯、牛肉湯飯。依現場營業狀況安排。"
        },
        {
          time: "11:30 - 13:00",
          title: "美妝與超市輕鬆採買",
          korean_name: "올리브영 운서역점 / 롯데마트 영종도점",
          transport: "雲西站 1 號出口附近，Olive Young 步行約 3 分鐘、樂天超市約 5 分鐘",
          category: "購物",
          notes: "採買補妝品、喉糖、瓶裝水、宵夜及伴手禮。不必買太多，考量一人搬運。"
        },
        {
          time: "13:00 - 14:00",
          title: "輕鬆午餐",
          korean_name: "통영해물뚝배기 운서점",
          transport: "雲西站商圈步行約 10 分鐘內",
          category: "美食",
          notes: "推薦個人份海鮮砂鍋，可選清湯或微辣。以舒適吃飽為主。"
        },
        {
          time: "14:00 - 15:00",
          title: "返回飯店與辦理入住",
          korean_name: "영종 스카이탑 호텔",
          transport: "從雲西站周邊步行約 8 分鐘",
          category: "休息",
          notes: "取回行李，15:00 後正式入住。"
        },
        {
          time: "15:00 - 16:30",
          title: "飯店休息、午睡與應援整理",
          korean_name: "영종 스카이탑 호텔",
          transport: "飯店房間內休息",
          category: "休息",
          notes: "演唱會前保留休息時間。洗澡、午睡 40 至 60 分鐘，整理門票、手燈、行動電源與應援物。"
        },
        {
          time: "16:30 - 18:30",
          title: "前往 INSPIRE Arena 與入場",
          korean_name: "인스파이어 아레나",
          transport: "雲西站搭 AREX 1 站至 공항화물청사역，轉乘公演免費接駁車直達場館；或搭 Kakao T / Uber 計程車約 15 至 20 分鐘",
          category: "交通",
          notes: "預留交通、領票、拍照、排隊及進場時間。交通尖峰可優先考慮接駁或叫車。"
        },
        {
          time: "19:00 - 21:30",
          title: "第一場演唱會（位置：309 A3）",
          korean_name: "인스파이어 아레나",
          transport: "INSPIRE Arena 場內（位置：309 A3）",
          category: "演唱會",
          notes: "座位／區域：309 A3。預估演出約 2.5 至 3 小時，結束時間依現場為準。"
        },
        {
          time: "21:30 - 22:45",
          title: "散場返回雲西站",
          korean_name: "공항화물청사역 / 운서역",
          transport: "優先搭公演免費接駁車至機場貨物廳舍站，再搭 AREX 1 站至雲西站；若排隊過長則直接 Kakao T / Uber 計程車",
          category: "交通",
          notes: "11/27 特別注意 AREX 末班車時間（機場貨物廳舍站→雲西站 23:42）。"
        },
        {
          time: "22:45 - 23:45",
          title: "演唱會後韓式炸雞宵夜",
          korean_name: "푸라닭 인천운서역점",
          transport: "雲西站 1 號出口步行約 3 分鐘（營業至凌晨 01:00）",
          category: "美食",
          notes: "號稱炸雞界精品！位於雲西站出口旁、回 Sky Top 飯店順路，營業至凌晨 1 點。推薦黑蒜炸雞（블랙알리오）或辣椒美乃滋炸雞，內用或外帶回飯店都很方便。"
        },
        {
          time: "23:45 - 00:15",
          title: "步行返回飯店休息",
          korean_name: "영종 스카이탑 호텔",
          transport: "從雲西站商圈步行約 8 分鐘回飯店",
          category: "休息",
          notes: "洗熱水澡、充電、準備隔天第二場演唱會。"
        }
      ]
    },
    {
      day: "Day 3",
      date: "2026-11-28",
      weekday: "週六",
      theme: "韓屋咖啡慢活・第二場演唱會",
      overview: "上午以早午餐及韓屋咖啡廳為主，不安排長距離移動；中午回飯店午睡、洗澡與補電，下午前往場館。散場後回雲西站吃晚餐，再回飯店休息。",
      hotel: "Sky Top",
      schedule: [
        {
          time: "09:30 - 10:30",
          title: "自然醒與慢慢梳洗",
          korean_name: "영종 스카이탑 호텔",
          transport: "飯店內",
          category: "休息",
          notes: "不設定鬧鐘，睡飽再起床，慢慢整理。"
        },
        {
          time: "10:30 - 11:30",
          title: "雞湯刀削麵早午餐",
          korean_name: "백운닭칼국수 운서본점",
          transport: "雲西站生活圈步行約 10 分鐘內",
          category: "美食",
          notes: "推薦雞湯刀削麵，適合演唱會前吃熱食補充能量。"
        },
        {
          time: "11:30 - 12:30",
          title: "韓屋咖啡廳喝咖啡放空",
          korean_name: "목현",
          transport: "雲西站附近銀谷咖啡街 은골카페거리，步行約 5 至 8 分鐘區域",
          category: "休息",
          notes: "找位置坐下喝咖啡、滑手機、放空，不安排需要走很久的活動。營業狀況請出發前確認。"
        },
        {
          time: "12:30 - 14:30",
          title: "飯店午睡與演唱會前自由時間",
          korean_name: "영종 스카이탑 호텔",
          transport: "步行返回飯店",
          category: "休息",
          notes: "保留完整 2 小時自由時間。可午睡、洗澡、敷面膜、整理應援物。"
        },
        {
          time: "14:30 - 17:00",
          title: "前往演唱會場館與入場",
          korean_name: "인스파이어 아레나",
          transport: "AREX 雲西站至機場貨物廳舍站，轉乘公演免費接駁；或飯店直接搭計程車約 15 至 20 分鐘",
          category: "交通",
          notes: "今天 17:00 開演，提早出發預留交通及場館排隊時間。"
        },
        {
          time: "17:00 - 19:30",
          title: "第二場演唱會（位置：308 K33）",
          korean_name: "인스파이어 아레나",
          transport: "INSPIRE Arena 場內（位置：308 K33）",
          category: "演唱會",
          notes: "座位／區域：308 K33。散場後交通時間相對充裕。"
        },
        {
          time: "20:00 - 21:30",
          title: "雲西站人氣大醬鍋晚餐",
          korean_name: "옥된장 인천운서점",
          transport: "搭公演接駁至機場貨物廳舍站後，AREX 返回雲西站，步行約 6 分鐘（週六營業至 24:00）",
          category: "美食",
          notes: "高評價韓式定食名店！推薦牛胸肉大醬鍋（소고기된장전골）或蛤蜊大醬鍋，一人點一鍋配白飯超滿足。"
        },
        {
          time: "21:30 - 22:30",
          title: "返回飯店放鬆",
          korean_name: "영종 스카이탑 호텔",
          transport: "雲西站步行約 8 分鐘",
          category: "休息",
          notes: "回房洗澡、整理照片、充電，早點休息。"
        }
      ]
    },
    {
      day: "Day 4",
      date: "2026-11-29",
      weekday: "週日",
      theme: "最後一場演唱會・慶功與行李整理",
      overview: "睡到自然醒，早午餐後在飯店保留休息時間，再前往 INSPIRE Arena 完成最後一場演唱會。晚上回雲西站慶功、最後採買，回飯店整理行李與退稅單據。",
      hotel: "Sky Top",
      schedule: [
        {
          time: "09:30 - 10:30",
          title: "睡到自然醒",
          korean_name: "영종 스카이탑 호텔",
          transport: "飯店內",
          category: "休息",
          notes: "最後一個演唱會日，不排早晨景點。"
        },
        {
          time: "10:30 - 11:30",
          title: "悠閒早午餐",
          korean_name: "그릴드버거 영종도본점",
          transport: "雲西站生活圈步行約 10 分鐘內",
          category: "美食",
          notes: "手工漢堡、一人使用自助點餐機方便。也可依食慾改吃湯飯。"
        },
        {
          time: "11:30 - 13:30",
          title: "飯店自由時間與休息",
          korean_name: "영종 스카이탑 호텔",
          transport: "步行返回飯店",
          category: "休息",
          notes: "完整保留 2 小時。午睡、整理妝容、充手機、準備最後一天演唱會。"
        },
        {
          time: "13:30 - 15:30",
          title: "前往 INSPIRE Arena 與入場",
          korean_name: "인스파이어 아레나",
          transport: "AREX 雲西站至機場貨物廳舍站轉乘公演免費接駁；或計程車約 15 至 20 分鐘",
          category: "交通",
          notes: "提早前往場館，保留入場、拍照及排隊時間。"
        },
        {
          time: "16:00 - 18:30",
          title: "第三場演唱會（位置：311 K1）",
          korean_name: "인스파이어 아레나",
          transport: "INSPIRE Arena 場內（位置：311 K1）",
          category: "演唱會",
          notes: "座位／區域：311 K1。最後一場演唱會，享受旅程最重要的時刻。"
        },
        {
          time: "18:30 - 19:30",
          title: "散場返回雲西站",
          korean_name: "운서역",
          transport: "公演免費接駁至機場貨物廳舍站，搭 AREX 返回雲西站",
          category: "交通",
          notes: "16:00 開演散場時間很早，回雲西站剛好趕上熱鬧的晚餐時段。"
        },
        {
          time: "19:30 - 20:45",
          title: "最終場慶功泡菜鍋晚餐",
          korean_name: "삼산회관 인천운서역점",
          transport: "雲西站 1 號出口步行約 5 分鐘（週日營業至 23:30）",
          category: "美食",
          notes: "韓國知名豬肉泡菜鍋連鎖名店！推薦一人份豬肉泡菜鍋（돼지김치찌개）配白飯或加點雞蛋捲，酸辣開胃慶祝演唱會圓滿落幕。"
        },
        {
          time: "20:45 - 21:45",
          title: "最後採買與宵夜",
          korean_name: "올리브영 운서역점 / 롯데마트 영종도점",
          transport: "雲西站 1 號出口步行約 3 至 5 分鐘",
          category: "購物",
          notes: "補買伴手禮、美妝或旅途中需要的物品。注意商店營業時間（Olive Young 至 22:30、樂天超市至 23:00），避免逛到太晚。"
        },
        {
          time: "21:45 - 22:45",
          title: "返回飯店整理行李",
          korean_name: "영종 스카이탑 호텔",
          transport: "雲西站步行約 8 分鐘",
          category: "休息",
          notes: "整理行李、確認護照、機票與退稅物品，為隔天回程做好準備。"
        }
      ]
    },
    {
      day: "Day 5",
      date: "2026-11-30",
      weekday: "週一",
      theme: "悠閒退房・仁川機場返台",
      overview: "上午早餐與最後檢查，11:00 前退房；午餐後預留緩衝前往雲西站，搭 AREX 至仁川 T2，辦理報到、托運、退稅與安檢，搭 LJ187 返回台中。",
      hotel: "Sky Top（11:00 前退房）",
      schedule: [
        {
          time: "09:30 - 10:30",
          title: "起床、早餐與最後整理",
          korean_name: "운서역",
          transport: "飯店及雲西站周邊步行",
          category: "美食",
          notes: "不早起，吃簡單早餐或咖啡，確認行李、護照及登機資訊。"
        },
        {
          time: "10:30 - 11:00",
          title: "飯店退房",
          korean_name: "영종 스카이탑 호텔",
          transport: "飯店內辦理退房",
          category: "交通",
          notes: "11:00 前退房，檢查房間及個人物品。"
        },
        {
          time: "11:00 - 12:00",
          title: "雲西站附近最後午餐或咖啡",
          korean_name: "운서역",
          transport: "雲西站周邊步行 10 分鐘內",
          category: "美食",
          notes: "選擇不用排隊的簡單餐廳，避免吃太久或離車站太遠。"
        },
        {
          time: "12:00 - 12:30",
          title: "返回雲西站與候車緩衝",
          korean_name: "운서역",
          transport: "回到雲西站，確認 AREX 方向與班次；預留購票、進站及月台候車時間",
          category: "交通",
          notes: "不把午餐時間排得太緊，建議最晚 12:30 左右離開雲西站前往仁川機場 T2。"
        },
        {
          time: "12:30 - 13:00",
          title: "搭 AREX 前往仁川機場 T2",
          korean_name: "운서역 / 인천공항2터미널역",
          transport: "從雲西站搭 AREX 普通列車往仁川機場第二航廈，車程約 11 分鐘",
          category: "交通",
          notes: "建議 12:30 至 13:00 間離開飯店區，確保起飛前 2.5 至 3 小時抵達機場。"
        },
        {
          time: "13:00 - 15:35",
          title: "機場報到、退稅與候機",
          korean_name: "인천국제공항 제2여객터미널",
          transport: "仁川機場 T2 航廈內",
          category: "交通",
          notes: "辦理 LJ187 登機、行李托運、退稅、免稅購物與候機。"
        },
        {
          time: "15:35 - 17:30",
          title: "仁川飛回台中",
          korean_name: "인천국제공항 제2여객터미널 / 타이중 칭취안강 공항",
          transport: "搭乘 LJ187，仁川 T2 飛往台中清泉崗 T1",
          category: "交通",
          notes: "15:35 仁川起飛，預計 17:30 抵達台中，結束五天四夜旅程。"
        }
      ]
    }
  ]
};

const CAT_COLOR = {
  "交通": "#0ea5e9",
  "休息": "#06b6d4",
  "美食": "#f59e0b",
  "購物": "#a78bfa",
  "演唱會": "#ec4899"
};

const PLACE_ZH = {
  "인천국제공항 제2여객터미널": "仁川機場第二航廈 (T2)",
  "롯데리아 인천공항2터미널1층점": "Lotteria 仁川機場 T2 1樓店",
  "CU 인천공항2터미널점": "CU 便利商店 T2 店",
  "스파앳홈 인천공항 제2여객터미널점": "SPA at Home T2 汗蒸幕",
  "운서역": "雲西站 (AREX)",
  "동남집 운서점": "東南家 雲西店",
  "올리브영 운서역점": "Olive Young 雲西站店",
  "롯데마트 영종도점": "樂天超市 永宗島店",
  "통영해물뚝배기 운서점": "統營海鮮砂鍋 雲西店",
  "영종 스카이탑 호텔": "Sky Top 仁川機場飯店",
  "인스파이어 아레나": "INSPIRE Arena 迎仕柏綜藝館",
  "공항화물청사역": "機場貨物廳舍站 (AREX)",
  "푸라닭 인천운서역점": "Puradak 韓式炸雞 仁川雲西站店",
  "백운닭칼국수 운서본점": "白雲雞肉刀削麵 雲西本店",
  "목현": "木峴韓屋咖啡廳",
  "옥된장 인천운서점": "玉大醬 仁川雲西店",
  "그릴드버거 영종도본점": "Grilled Burger 永宗島本店",
  "삼산회관 인천운서역점": "三山會館 仁川雲西站店",
  "인천공항2터미널역": "仁川機場第二航廈站 (AREX)",
  "참들뼈해장국": "參德排骨醒酒湯",
  "콩심 인천영종점": "豆心 仁川永宗店",
  "바우네나주곰탕 공항신도시점": "巴宇內羅州牛骨湯",
  "북창동순두부 공항신도시점": "北倉洞嫩豆腐",
  "장안삼계탕": "長安參雞湯",
  "7곡제면소 인천영종운서점": "7 穀製麵所",
  "통돼지보쌈김치찌개": "整豬菜包肉泡菜鍋",
  "통돼지 김치찌개 삼겹살": "整豬泡菜鍋五花肉（站前）",
  "탐라담 영종도점": "耽羅潭 永宗島店",
  "제주흑돈": "濟州黑豚",
  "민우네돼지세끼": "民宇家豬三餐",
  "육도": "肉道",
  "육즙삼겹 영종운서역점": "肉汁五花肉 永宗雲西站店",
  "고기차차": "Gogichacha 炭烤五花肉",
  "교촌치킨 운서점": "橋村炸雞 雲西店",
  "BHC치킨 운서점": "BHC 炸雞 雲西店",
  "카페 목현": "木峴咖啡廳（韓屋）",
  "카페 빵선생 운서역점": "Cafe Bbangseonsaeng 麵包咖啡",
  "이삭토스트 인천운서역점": "Isaac Toast 鐵板吐司",
  "설빙 인천운서역점": "雪冰 Sulbing 雲西站店"
};

const PLACE_EN = {
  "인천국제공항 제2여객터미널": "Incheon International Airport Terminal 2 (T2)",
  "롯데리아 인천공항2터미널1층점": "Lotteria Incheon Airport T2 1F",
  "CU 인천공항2터미널점": "CU Convenience Store Incheon Airport T2",
  "스파앳홈 인천공항 제2여객터미널점": "SPA at Home Incheon Airport T2",
  "운서역": "Unseo Station (AREX)",
  "동남집 운서점": "Dongnamjip Unseo Branch",
  "올리브영 운서역점": "Olive Young Unseo Station Branch",
  "롯데마트 영종도점": "Lotte Mart Yeongjongdo Branch",
  "통영해물뚝배기 운서점": "Tongyeong Haemul Ttukbaegi Unseo Branch",
  "영종 스카이탑 호텔": "Sky Top Incheon Airport Hotel",
  "인스파이어 아레나": "INSPIRE Arena",
  "공항화물청사역": "Airport Cargo Terminal Station (AREX)",
  "푸라닭 인천운서역점": "Puradak Chicken Incheon Unseo Station Branch",
  "백운닭칼국수 운서본점": "Baekun Dak-kalguksu Unseo Main Branch",
  "목현": "Mokhyeon Hanok Cafe",
  "옥된장 인천운서점": "Okdoenjang Incheon Unseo Branch",
  "그릴드버거 영종도본점": "Grilled Burger Yeongjongdo Main Branch",
  "삼산회관 인천운서역점": "Samsan Hoegwan Incheon Unseo Station Branch",
  "인천공항2터미널역": "Incheon Int'l Airport Terminal 2 Station (AREX)",
  "참들뼈해장국": "Chamdeul Ppyeo Haejangguk",
  "콩심 인천영종점": "Kongsim Incheon Yeongjong Branch",
  "바우네나주곰탕 공항신도시점": "Bauune Naju Gomtang",
  "북창동순두부 공항신도시점": "Bukchangdong Sundubu",
  "장안삼계탕": "Jangan Samgyetang",
  "7곡제면소 인천영종운서점": "7-Grain Noodle House Unseo",
  "통돼지보쌈김치찌개": "Tongdwaeji Bossam Kimchi Jjigae",
  "통돼지 김치찌개 삼겹살": "Tongdwaeji Kimchi Jjigae Samgyeopsal",
  "탐라담 영종도점": "Tamradam Yeongjongdo",
  "제주흑돈": "Jeju Heukdon",
  "민우네돼지세끼": "Minwoone Dwaeji Segi",
  "육도": "Yukdo",
  "육즙삼겹 영종운서역점": "Yukjeup Samgyeop Unseo Station",
  "고기차차": "Gogi Chacha",
  "교촌치킨 운서점": "Kyochon Chicken Unseo",
  "BHC치킨 운서점": "BHC Chicken Unseo",
  "카페 목현": "Cafe Mokhyeon",
  "카페 빵선생 운서역점": "Cafe Bbang Seonsaeng Unseo Station",
  "이삭토스트 인천운서역점": "Isaac Toast Incheon Unseo Station",
  "설빙 인천운서역점": "Sulbing Incheon Unseo Station"
};

const ADDR = {
  "영종 스카이탑 호텔": "인천 중구 영종대로196번길 15-7",
  "올리브영 운서역점": "신도시남로142번길 6 메가스타영종 1층",
  "롯데리아 인천공항2터미널1층점": "인천 중구 제2터미널대로 446 일반지역 중앙 1층",
  "동남집 운서점": "인천 중구 신도시남로142번길 6",
  "인스파이어 아레나": "인천 중구 공항문화로 127",
  "푸라닭 인천운서역점": "인천 중구 신도시남로142번길 15",
  "옥된장 인천운서점": "인천 중구 영종대로 118",
  "삼산회관 인천운서역점": "인천 중구 운서동 2805-3",
  "참들뼈해장국": "인천 중구 햇내로13번길 17",
  "북창동순두부 공항신도시점": "인천 중구 영종대로 100 신성하우스빌",
  "장안삼계탕": "인천 중구 신도시남로141번길 2 대원프라자",
  "백운닭칼국수 운서본점": "인천 영종구 모랫말로5번길 5 1층",
  "7곡제면소 인천영종운서점": "인천 중구 흰바위로59번길 8",
  "통돼지보쌈김치찌개": "인천 영종구 화랑목로 40-3 1층",
  "탐라담 영종도점": "인천 중구 신도시남로141번길 14",
  "제주흑돈": "인천 영종구 신도시남로142번길 6 1층 180호",
  "민우네돼지세끼": "인천 중구 영종대로162번길 20",
  "육도": "인천 영종구 신도시남로142번길 6 1층 150호",
  "육즙삼겹 영종운서역점": "인천 중구 흰바위로59번길 8",
  "장안삼계탕": "인천 중구 신도시남로141번길 2 대원프라자",
  "카페 목현": "인천 중구 화랑목로 50-9"
};

const PHRASES = [
  {
    id: "customs_spa",
    cat: "🛂 入境海關與機場汗蒸幕",
    items: [
      { zh: "我是來旅遊和看演唱會的", kr: "관광하고 콘서트 보러 왔어요.", en: "I'm here for sightseeing and a concert.", ro: "gwangwanghago konseoteo boreo wasseoyo." },
      { zh: "我會待五天四夜", kr: "4박 5일 동안 머물 예정입니다.", en: "I will stay for 5 days and 4 nights.", ro: "sabak oil dongan meomul yejeongimnida." },
      { zh: "這是我的回程機票和飯店預訂單", kr: "제 귀국 항공권과 호텔 예약 확인서입니다.", en: "Here are my return ticket and hotel confirmation.", ro: "je gwiguk hanggonggwongwa hotel yeyak hwaginseoimnida." },
      { zh: "我要辦自動通關（SeS）註冊", kr: "자동출입국심사 등록하고 싶습니다.", en: "I'd like to register for Smart Entry Service (SeS).", ro: "jadongchuripguksimsa deungnokhago sipseumnida." },
      { zh: "請問行李轉盤在幾號？", kr: "수하물 찾는 곳은 몇 번 벨트인가요?", en: "Which baggage claim belt is it?", ro: "suhamul channeun goseun myeot beon belteuingayo?" },
      { zh: "我想用夜間過夜方案，一位", kr: "야간 숙박 요금으로 한 명 이용할게요.", en: "One person for the overnight stay rate, please.", ro: "yagan sukbak yogeumeuro han myeong iyonghalgeyo." },
      { zh: "請問大件行李可以寄放在哪裡？", kr: "큰 캐리어는 어디에 맡길 수 있나요?", en: "Where can I store my large suitcase?", ro: "keun kaerieoneun eodie matgil su innayo?" },
      { zh: "請問毛巾和汗蒸服在哪裡領取？", kr: "수건이랑 찜질복은 어디서 받나요?", en: "Where can I get towels and sauna clothes?", ro: "sugeonirang jjimjilbogeun eodiseo bannayo?" }
    ]
  },
  {
    id: "transit_taxi",
    cat: "🚇 地鐵、接駁與計程車",
    items: [
      { zh: "請問這班車有到雲西站嗎？", kr: "이 열차 운서역에 가나요?", en: "Does this train go to Unseo Station?", ro: "i yeolcha unseoyeoge ganayo?" },
      { zh: "請問往仁川機場第二航廈在哪搭車？", kr: "인천공항 2터미널 가는 열차는 어디서 타요?", en: "Where do I catch the train to Incheon Airport T2?", ro: "incheongonghang iteomineol ganeun yeolchaneun eodiseo tayo?" },
      { zh: "我要買一張 T-money 卡並儲值 1 萬韓元", kr: "티머니 카드 한 장 주시고 만 원 충전해 주세요.", en: "One T-money card and top up 10,000 KRW, please.", ro: "timoni kadeu han jang jusigo man won chungjeonhae juseyo." },
      { zh: "請問 INSPIRE 演唱會免費接駁車在哪裡搭？", kr: "인스파이어 콘서트 무료 셔틀버스 타는 곳이 어디예요?", en: "Where is the free shuttle bus for the INSPIRE concert?", ro: "inseupaieo konseoteu muryo syeoteulbeoseu taneun gosi eodiyeyo?" },
      { zh: "請問這班接駁車有去機場貨物廳舍站嗎？", kr: "이 셔틀버스 공항화물청사역으로 가나요?", en: "Does this shuttle go to Airport Cargo Terminal Station?", ro: "i syeoteulbeoseu gonghanghwamulcheongsayeogeuro ganayo?" },
      { zh: "請載我到這裡", kr: "여기까지 가 주세요.", en: "Please take me to this address.", ro: "yeogikkaji ga juseyo." },
      { zh: "請在前面方便停車的地方放我下車", kr: "앞에 세우기 편한 곳에서 내려 주세요.", en: "Please drop me off anywhere convenient ahead.", ro: "ape seugi pyeonhan goseseo naeryeo juseyo." },
      { zh: "請幫我開後車廂放行李", kr: "트렁크 좀 열어 주세요.", en: "Could you open the trunk for my luggage, please?", ro: "teureongkeu jom yeoreo juseyo." }
    ]
  },
  {
    id: "hotel",
    cat: "🏨 飯店入住與退房",
    items: [
      { zh: "我有訂房，這是我的護照", kr: "예약했습니다. 제 여권입니다.", en: "I have a reservation. Here is my passport.", ro: "yeyakhaetseumnida. je yeogwonimnida." },
      { zh: "請問入住前可以先寄放行李嗎？", kr: "체크인 전에 짐 보관 부탁드립니다.", en: "Can I leave my luggage before check-in?", ro: "chekeuin jeone jim bogwan butakdeurimnida." },
      { zh: "請問退房後可以暫時寄放行李嗎？", kr: "체크아웃 후에 짐 잠시 맡길 수 있을까요?", en: "Can I leave my luggage for a while after check-out?", ro: "chekeuaut hue jim jamsi matgil su isseulkkayo?" },
      { zh: "請問 Wi-Fi 密碼是多少？", kr: "와이파이 비밀번호가 뭐예요?", en: "What is the Wi-Fi password?", ro: "waipai bimilbeonhoga mwoyeyo?" },
      { zh: "請問房卡感應不到／無法開門", kr: "방 카드키가 인식이 안 돼요.", en: "My room key card isn't working.", ro: "bang kadeukiga insigi an dwaeyo." },
      { zh: "請問可以多給我兩瓶水／毛巾嗎？", kr: "생수 두 병이랑 수건 좀 더 주실 수 있나요?", en: "Could I have two more bottles of water and extra towels?", ro: "saengsu du byeongirang sugeon jom deo jusil su innayo?" },
      { zh: "請問可以幫我叫計程車嗎？", kr: "택시 좀 불러 주실 수 있나요?", en: "Could you please call a taxi for me?", ro: "taeksi jom bulleo jusil su innayo?" }
    ]
  },
  {
    id: "concert",
    cat: "🎤 演唱會領票與入場",
    items: [
      { zh: "我是外國人，我要現場領票（核對護照）", kr: "외국인인데 현장 수령하러 왔습니다.", en: "I'm a foreigner here for on-site ticket pickup.", ro: "oegugininde hyeonjang suryeonghareo watseumnida." },
      { zh: "這是我的購票確認單和護照", kr: "제 예매 내역서와 여권입니다.", en: "Here is my booking confirmation and passport.", ro: "je yemae naeyeokseowa yeogwonimnida." },
      { zh: "請問我的座位入口是哪一區？", kr: "제 좌석 입장 게이트가 어디예요?", en: "Which entrance gate is for my seat?", ro: "je jwaseok ipjang geiteuga eodiyeyo?" },
      { zh: "請問排隊進場的隊伍從哪裡開始？", kr: "입장 줄은 어디서부터 서나요?", en: "Where does the line for admission start?", ro: "ipjang jureun eodiseobuteo seonayo?" },
      { zh: "請問周邊商品（MD）區在哪裡？", kr: "MD 부스는 어디에 있나요?", en: "Where is the merchandise (MD) booth?", ro: "emdi buseuneun eodie innayo?" },
      { zh: "請問這裡可以寄放不能帶進場的物品嗎？", kr: "물품 보관소는 어디에 있나요?", en: "Where is the baggage/item storage locker?", ro: "mulpum bogwansoneun eodie innayo?" },
      { zh: "請問洗手間在哪裡？", kr: "화장실이 어디예요?", en: "Where is the restroom?", ro: "hwajangsiri eodiyeyo?" }
    ]
  },
  {
    id: "dining",
    cat: "🍜 一人食餐廳點餐",
    items: [
      { zh: "請問一位可以內用嗎？", kr: "혼자 왔는데 식사 되나요?", en: "Is a table for one available?", ro: "honja wanneunde siksa doenayo?" },
      { zh: "請給我這一份（指圖片／菜單）", kr: "이거 하나 주세요.", en: "One of this, please.", ro: "igeo hana juseyo." },
      { zh: "我不吃辣，請幫我做不辣的", kr: "저는 매운 거 못 먹어요. 안 맵게 해 주세요.", en: "I can't eat spicy food. Please make it non-spicy.", ro: "jeoneun maeun geo mot meogeoyo. an maepge hae juseyo." },
      { zh: "請不要加香菜／蔥", kr: "고수랑 파는 빼 주세요.", en: "No cilantro or green onions, please.", ro: "gosurang paneun ppae juseyo." },
      { zh: "請給我一杯冰水／衛生紙", kr: "물하고 휴지 좀 주세요.", en: "Some water and tissues, please.", ro: "mulhago hyuji jom juseyo." },
      { zh: "我要外帶（打包帶走）", kr: "포장해 주세요.", en: "For takeout, please.", ro: "pojanghae juseyo." },
      { zh: "我要結帳", kr: "계산해 주세요.", en: "Check / Bill, please.", ro: "gyesanhae juseyo." }
    ]
  },
  {
    id: "shopping_tax",
    cat: "🛍️ 購物、退稅與離境",
    items: [
      { zh: "請問多少錢？", kr: "얼마예요?", en: "How much is it?", ro: "eolmayeyo?" },
      { zh: "請問有新的／未開封的嗎？", kr: "새 상품으로 있나요?", en: "Do you have a brand new / unopened one?", ro: "sae sangpumeuro innayo?" },
      { zh: "請幫我辦理退稅（這是護照）", kr: "세금 환급 부탁드립니다. 여권 여기 있습니다.", en: "Tax refund, please. Here is my passport.", ro: "segeum hwangeup butakdeurimnida. yeogwon yeogi itseumnida." },
      { zh: "可以刷卡嗎？（支援 Apple Pay 嗎？）", kr: "카드 결제 되나요? 애플페이 되나요?", en: "Can I pay by card? Do you accept Apple Pay?", ro: "kadeu gyeolje doenayo? aepeulpei doenayo?" },
      { zh: "請給我一個購物袋", kr: "봉투 하나 주세요.", en: "One shopping bag, please.", ro: "bongtu hana juseyo." },
      { zh: "我要辦理海關退稅單蓋章／掃描", kr: "세관 반출 확인 도장 받으러 왔습니다.", en: "I'm here for the customs tax-refund stamp/scan.", ro: "segwan banchul hwagin dojang badeureo watseumnida." },
      { zh: "請問我在哪裡領取退稅現金？", kr: "세금 환급금은 어디서 받나요?", en: "Where can I receive my tax refund?", ro: "segeum hwangeupgeumeun eodiseo bannayo?" },
      { zh: "我要辦理托運行李（這件有易碎物）", kr: "수하물 부치려고 합니다. 깨지기 쉬운 물건이 있어요.", en: "I'd like to check in my bag. There are fragile items inside.", ro: "suhamul buchiryeogo hamnida. kkaejigi swiun mulgeoni isseoyo." }
    ]
  },
  {
    id: "emergency",
    cat: "🆘 緊急求助與身體不適",
    items: [
      { zh: "不好意思，請幫幫我", kr: "죄송하지만 좀 도와주세요.", en: "Excuse me, please help me.", ro: "joesonghajiman jom dowajuseyo." },
      { zh: "我的手機／錢包／護照不見了", kr: "제 휴대폰 / 지갑 / 여권을 잃어버렸어요.", en: "I lost my phone / wallet / passport.", ro: "je hyudaepon / jigap / yeogwoneul ireobeoryeosseoyo." },
      { zh: "我身體不舒服（頭痛／喉嚨痛／腸胃痛）", kr: "몸이 안 좋아요. (머리가 아파요 / 목이 아파요 / 배가 아파요)", en: "I don't feel well. (Headache / Sore throat / Stomachache)", ro: "momi an joayo." },
      { zh: "請問附近哪裡有藥局？", kr: "근처에 약국이 어디에 있나요?", en: "Where is the nearest pharmacy?", ro: "geuncheoe yakgugi eodie innayo?" },
      { zh: "請幫我叫救護車／報警", kr: "119 / 112에 신고해 주세요.", en: "Please call an ambulance (119) / the police (112).", ro: "ililgu / ilirie singohae juseyo." }
    ]
  }
];

/* ================= 按天分類的準備清單預設資料 ================= */

const CHECKLIST_TABS = [
  { key: "todo",    short: "待辦事項", title: "📝 待辦事項｜出發前線上申辦與設定" },
  { key: "pack",    short: "行李準備", title: "🧳 行李準備｜出發前打包" },
  { key: "back",    short: "行李整理", title: "🛫 行李整理｜11/29 晚間整理 → 11/30 返台" },
  { key: "food",    short: "美食清單", title: "🍜 美食清單｜雲西站・機場・演唱會周邊", doneLabel: "已吃過" }
];

const CHECKLIST_DATA = {
  /* ───────────── 出發前 ───────────── */
  todo: [
    {
      id: "pre_prep",
      group: "📝 線上申辦與設定",
      items: [
        { id: "pre_a1", text: "出發前 72 小時內線上填寫韓國電子入境卡（e-Arrival Card）並截圖" },
        { id: "pre_a2", text: "確認台灣移民署自動通關（e-Gate）可用" },
        { id: "pre_a3", text: "起飛前 24 小時辦理真航空（LJ188）線上報到與選位" },
        { id: "pre_a4", text: "投保旅遊平安險與不便險，下載英文保單與急難救助電話" },
        { id: "pre_a5", text: "通知銀行開通海外刷卡功能，確認跨國提款 4 位數磁條密碼" },
        { id: "pre_a6", text: "在台完成 Kakao T 帳號簡訊驗證與綁卡（避免在韓換網卡收不到簡訊）" },
        { id: "pre_a7", text: "Uber 確認海外信用卡正常；Naver Map 事先收藏場館與飯店地點" },
        { id: "pre_a8", text: "eSIM／網卡設定完成並截圖備份 QR Code" },
        { id: "pre_a9", text: "清理手機容量，預留演唱會拍照錄影空間" },
        { id: "pre_a10", text: "把本網頁加入手機主畫面，並在有網路時完整開過一次（離線備用）" }
      ]
    },
    {
      id: "pre_d1_info",
      group: "🛬 11/26 抵達當晚提醒",
      info: true,
      notes: [
        "抵達仁川 T2 後啟用 eSIM 網路，並辦理自動通關（SeS）。",
        "出關領行李，到 T2 1 樓 24H Lotteria／CU 買宵夜。",
        "前往 T2 地下 1 樓西側 SPA at Home 寄放行李並辦理過夜。",
        "護照及錢包鎖進個人置物櫃。"
      ]
    }
  ],

  /* ───────────── 行李準備 ───────────── */
  pack: [
    {
      id: "pre_carry",
      group: "🚫 絕對不能託運（隨身手提行李）",
      items: [
        { id: "pre_k1", text: "護照正本（效期 6 個月以上）＋護照影本／照片備份" },
        { id: "pre_k2", text: "機票資料（LJ188／LJ187）、飯店訂房確認單（Sky Top）、保險資料" },
        { id: "pre_k3", text: "演唱會票券、購票帳號與入場規定離線備份" },
        { id: "pre_k4", text: "行動電源（機身標示 ≤100Wh，嚴禁託運；機上請勿使用或充電，以航空公司規定為準）" },
        { id: "pre_k5", text: "備用鋰電池（應援手燈電池等裸電池，需個別套袋或貼膠帶）" },
        { id: "pre_k6", text: "手機、耳機、相機等貴重電子設備" },
        { id: "pre_k7", text: "錢包、信用卡、其他貴重物品" },
        { id: "pre_k8", text: "電動刮鬍刀（內建鋰電池，建議手提）" },
        { id: "pre_k9", text: "牙套（含收納盒，貴重易遺失，務必手提）" },
        { id: "pre_k10", text: "個人常備藥（腸胃藥、止痛藥）、處方藥與英文藥單" },
        { id: "pre_k11", text: "易碎品、應援物、隨身會用到的物品" },
        { id: "pre_k11b", text: "手提液體（每瓶 ≤100ml）裝進 1L 透明夾鏈袋" }
      ],
      notes: ["提醒：超過 100ml 的保養品／液體請放託運行李。"]
    },
    {
      id: "pre_cloth",
      group: "🧥 衣物與保暖用品",
      items: [
        { id: "pre_c1", text: "保暖外套、發熱衣／保暖內搭（11 月底仁川偏冷）" },
        { id: "pre_c2", text: "長袖上衣、毛衣、長褲、睡衣、內衣褲與襪子" },
        { id: "pre_c3", text: "圍巾、毛帽、手套、暖暖包、口罩" },
        { id: "pre_c4", text: "好走的鞋、室內拖鞋" },
        { id: "pre_c5", text: "折疊購物袋、髒衣袋、收納袋" }
      ]
    },
    {
      id: "pre_care",
      group: "🧴 盥洗保養與常備藥品",
      items: [
        { id: "pre_h1", text: "牙刷牙膏、洗面乳、卸妝、保養及化妝品、護唇膏、護手霜" },
        { id: "pre_h5", text: "喉糖、面紙、濕紙巾" }
      ]
    },
    {
      id: "pre_elec",
      group: "🔌 電子與轉接配件",
      items: [
        { id: "pre_e1", text: "手機充電器、充電線（短線另備一條放外出包）" },
        { id: "pre_e2", text: "韓國 220V 雙圓孔轉接頭" },
        { id: "pre_e3", text: "耳機、備用線（如需要）" },
        { id: "pre_e4", text: "應援手燈（備用電池放手提，見上方）" }
      ]
    },
    {
      id: "pre_money",
      group: "💴 金錢與交通卡",
      items: [
        { id: "pre_m1", text: "韓元現金（含小額鈔票）" },
        { id: "pre_m2", text: "海外回饋信用卡、備用卡（分開收好）" },
        { id: "pre_m3", text: "T-money 交通卡與足夠餘額" }
      ]
    },
    {
      id: "pre_d1",
      group: "🛁 11/26 汗蒸幕過夜小袋（要帶）",
      items: [
        { id: "pre_d1_2", text: "耳塞、眼罩" },
        { id: "pre_d1_3", text: "輕便換洗衣物" },
        { id: "pre_d1_4", text: "盥洗卸妝保養隨身包" },
        { id: "pre_d1_5", text: "手機充電線（睡前充電）" }
      ]
    }
  ],

  /* ───────────── 演唱會資訊頁：要帶出門的物品（可勾選） ───────────── */
  concert: [
    {
      id: "con_all",
      group: "🎒 每天都要帶（演唱會＋出門逛逛通用）",
      items: [
        { id: "con_n2", text: "護照正本（演唱會實名制核對；Olive Young 結帳辦退稅）" },
        { id: "con_n5", text: "手機（出門前充滿電）" },
        { id: "con_b2", text: "行動電源與短充電線" },
        { id: "con_b1", text: "T-money 卡、少量韓元、信用卡" },
        { id: "con_b5", text: "保暖外套、暖暖包、圍巾" },
        { id: "con_b6", text: "喉糖、面紙、口罩" },
        { id: "con_b3", text: "折疊購物袋（Olive Young／樂天超市採買用）" }
      ]
    },
    {
      id: "con_show",
      group: "🎤 演唱會專用",
      items: [
        { id: "con_n1", text: "演唱會票券 QR Code／實體票（離線備份）" },
        { id: "con_n3", text: "應援手燈（確認電量充足）" },
        { id: "con_n3b", text: "備用電池（放隨身包）" }
      ]
    }
  ],

  /* ───────────── 行李整理（回國前） ───────────── */
  back: [
    {
      id: "bk_carry",
      group: "🚫 絕對不能託運（隨身手提行李）",
      items: [
        { id: "bk_k1", text: "行動電源、備用鋰電池、手燈電池全部取出放隨身手提（嚴禁託運）" },
        { id: "bk_k2", text: "護照正本、登機資訊（LJ187，15:35 仁川 T2 起飛）" },
        { id: "bk_k3", text: "所有退稅單據（方便機場辦理退稅）" },
        { id: "bk_k4", text: "手機、錢包、信用卡、T-money 卡、剩餘韓元" },
        { id: "bk_k5", text: "電動刮鬍刀、牙套（含收納盒）" },
        { id: "bk_k6", text: "個人藥品、面紙、口罩、喉糖" },
        { id: "bk_k7", text: "貴重物品、易碎伴手禮、演唱會紀念品" }
      ]
    },
    {
      id: "bk_prep",
      group: "📝 事先準備（11/29 晚間～11/30 退房前）",
      items: [
        { id: "bk_p1", text: "起飛前 24 小時辦理回程真航空（LJ187）線上報到" },
        { id: "bk_p3", text: "行李初步打包與秤重，確認託運總重未超標" },
        { id: "bk_p4", text: "睡前幫手機、行動電源、手燈充滿電" },
        { id: "bk_p5", text: "檢查飯店房間插座、床頭充電線是否全數拔除" },
        { id: "bk_p6", text: "檢查保險箱、浴室、衣櫃、抽屜無遺漏物品" },
        { id: "bk_p7", text: "11:00 前完成飯店退房" }
      ]
    },
    {
      id: "bk_check",
      group: "🧳 託運行李",
      items: [
        { id: "bk_c1", text: "超過 100ml 的液體／保養品／醬料全數裝入託運行李" },
        { id: "bk_c2", text: "衣物、髒衣袋、折疊購物袋" },
        { id: "bk_c3", text: "伴手禮（零食、液體類、泡菜類）包好防漏後放託運" }
      ]
    },
    {
      id: "bk_air",
      group: "🛫 11/30 機場交通與通關退稅（提醒）",
      info: true,
      notes: [
        "12:30–13:00 從雲西站搭 AREX 普通列車前往仁川機場 T2（約 11 分鐘）。",
        "抵達 T2 先掃描／蓋章海關退稅單，再至航空櫃檯托運行李。",
        "過安檢與自動通關後，至管制區內領取退稅款項並免稅購物。",
        "登機前切換回台灣門號 SIM 卡。",
        "搭乘 LJ187（15:35 起飛）返回台中，17:30 抵達，走 e-Gate 入境。"
      ]
    }
  ],

  /* ───────────── 美食清單 ───────────── */
  food: [
    {
      id: "f_soup",
      group: "🍲 湯飯・醒酒湯（單人友善・深夜首選）",
      items: [
        { id: "f1", text: "參德排骨醒酒湯", kr: "참들뼈해장국", note: "2 號出口步行 1–5 分｜₩11,000–15,000｜15:00–16:00 午休，勿 22:00 後去" },
        { id: "f2", text: "東南家 雲西店", kr: "동남집 운서점", note: "1 號出口步行約 3 分｜24H（03:00–06:00 整備）｜自助點餐機，₩11,000–17,000" },
        { id: "f3", text: "豆心 仁川永宗店（黃豆芽湯飯）", kr: "콩심 인천영종점", note: "站前步行圈｜24H｜清爽不油膩，適合散場宵夜" },
        { id: "f4", text: "巴宇內羅州牛骨湯", kr: "바우네나주곰탕 공항신도시점", note: "站前步行圈｜24H｜不辣，腸胃敏感首選" }
      ]
    },
    {
      id: "f_pot",
      group: "🍜 鍋物・參雞湯・刀削麵",
      items: [
        { id: "f5", text: "北倉洞嫩豆腐", kr: "북창동순두부 공항신도시점", note: "步行 3–4 分｜10:00 起｜約 ₩15,000｜單人石鍋套餐，自選辣度" },
        { id: "f6", text: "長安參雞湯", kr: "장안삼계탕", note: "1 號出口步行 6–7 分｜09:30 起｜₩14,000–17,000｜完全不辣" },
        { id: "f7", text: "白雲雞肉刀削麵 雲西本店", kr: "백운닭칼국수 운서본점", note: "2 號出口附近｜10:00–21:00（最後點餐 20:30）｜約 ₩10,000，小菜可續加" },
        { id: "f8", text: "7 穀製麵所", kr: "7곡제면소 인천영종운서점", note: "站口步行約 2 分｜營業時間請現場確認｜七穀刀削麵、冷麵" },
        { id: "f9", text: "整豬菜包肉泡菜鍋", kr: "통돼지보쌈김치찌개", note: "2 號出口華郎木路｜週一至六 08:00–21:00，⚠️週日公休｜₩9,000–12,000" },
        { id: "f10", text: "統營海鮮砂鍋 雲西店", kr: "통영해물뚝배기 운서점", note: "原行程餐廳｜海鮮砂鍋，營業時間請以地圖確認" },
        { id: "f11", text: "玉大醬 仁川雲西店", kr: "옥된장 인천운서점", note: "原行程 11/28 晚餐｜大醬鍋" },
        { id: "f12", text: "三山會館 仁川雲西站店", kr: "삼산회관 인천운서역점", note: "原行程 11/29 慶功餐｜豬肉泡菜鍋" },
        { id: "f13", text: "整豬泡菜鍋五花肉（站前）", kr: "통돼지 김치찌개 삼겹살", note: "24H｜深夜熱辣泡菜鍋備案；與 2 號出口同名定食店不同，請看地圖" }
      ]
    },
    {
      id: "f_bbq",
      group: "🥩 韓式烤肉（多為 2 人份起，單人較難）",
      items: [
        { id: "f14", text: "濟州黑豚", kr: "제주흑돈", note: "1 號出口步行約 2 分｜11:00–23:00（最後點餐 21:30），⚠️週日公休" },
        { id: "f15", text: "民宇家豬三餐", kr: "민우네돼지세끼", note: "步行 4–5 分｜24H 全年無休｜週日、散場深夜的穩定選擇" },
        { id: "f16", text: "肉道（帶骨牛肋排）", kr: "육도", note: "步行 2–3 分｜16:00–01:00（最後點餐 00:00），⚠️週日公休" },
        { id: "f17", text: "肉汁五花肉 永宗雲西站店", kr: "육즙삼겹 영종운서역점", note: "步行約 1 分｜11:00–23:00｜午間定食單人友善；⚠️勿點生拌牛肉拌飯" },
        { id: "f18", text: "耽羅潭 永宗島店", kr: "탐라담 영종도점", note: "步行 5–7 分｜專人代烤，適合 2 人以上；⚠️勿點生拌牛肉／生牛肉壽司" },
        { id: "f19", text: "Gogichacha 炭烤五花肉", kr: "고기차차", note: "站前商圈｜晚間營業為主｜建議 2 人以上" }
      ]
    },
    {
      id: "f_chicken",
      group: "🍗 韓式炸雞・宵夜",
      items: [
        { id: "f20", text: "Puradak 韓式炸雞 仁川雲西站店", kr: "푸라닭 인천운서역점", note: "原行程 11/27 散場宵夜｜營業至 01:00｜適合外帶回飯店" },
        { id: "f21", text: "橋村炸雞 雲西店", kr: "교촌치킨 운서점", note: "約 ₩20,000–25,000｜實測中午未開門，只排傍晚／散場；建議外帶（店名請以地圖確認）" },
        { id: "f22", text: "BHC 炸雞 雲西店（起司星星口味）", kr: "BHC치킨 운서점", note: "步行 10–12 分｜現炸約等 20 分｜中午未開，建議外帶回房分食" }
      ]
    },
    {
      id: "f_cafe",
      group: "☕ 咖啡廳・輕食・漢堡",
      items: [
        { id: "f23", text: "木峴咖啡廳（韓屋）", kr: "카페 목현", note: "2 號出口步行 10–12 分｜09:00–18:00｜手工鮮奶油木峴拿鐵 ₩5,500，18:00 打烊" },
        { id: "f24", text: "Cafe Bbangseonsaeng 麵包咖啡", kr: "카페 빵선생 운서역점", note: "1 號出口正對面｜適合出發前整理應援物、外帶現烤麵包" },
        { id: "f25", text: "Isaac Toast 鐵板吐司", kr: "이삭토스트 인천운서역점", note: "站前約 2 分｜₩3,500–5,500｜早起趕車、演前快速補給" },
        { id: "f26", text: "雪冰 Sulbing 雲西站店", kr: "설빙 인천운서역점", note: "站前約 2 分｜約 ₩10,000–15,000｜韓式雪冰甜點" },
        { id: "f27", text: "Grilled Burger 永宗島本店", kr: "그릴드버거 영종도본점", note: "原行程漢堡餐廳｜營業時間請以地圖確認" }
      ]
    },
    {
      id: "f_conv",
      group: "🏪 便利商店・機場補給・採買",
      items: [
        { id: "f28", text: "Lotteria 仁川機場 T2 1 樓店", kr: "롯데리아 인천공항2터미널1층점", note: "11/26 抵達宵夜｜T2 1 樓中央，24H" },
        { id: "f29", text: "CU 便利商店 T2 店", kr: "CU 인천공항2터미널점", note: "11/26 抵達宵夜、飲料零食補給" },
        { id: "f30", text: "樂天超市 永宗島店", kr: "롯데마트 영종도점", note: "營業至 23:00｜零食伴手禮採買" },
        { id: "f31", text: "Olive Young 雲西站店", kr: "올리브영 운서역점", note: "營業至 22:30｜美妝保養；結帳出示護照辦退稅" }
      ]
    }
  ]
};
