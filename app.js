/* ================= 應用程式核心邏輯 ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

const store = {
  get(k, d) {
    try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
};

const naverUrl = n => "https://map.naver.com/v5/search/" + encodeURIComponent(n);
const googleUrl = n => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(n);
const p2 = n => String(n).padStart(2, "0");

/* ================= 時間解析與自動排序 ================= */
// 將起始時間轉換為排序用分鐘數；00:00~05:59 視為深夜跨日延續時段 (+1440分鐘) 排在當日最後
function getSortMinutes(timeStr) {
  const m = String(timeStr || "").match(/(\d{1,2}):(\d{2})/);
  if (!m) return 9999;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  let total = h * 60 + min;
  if (h < 6) total += 1440;
  return total;
}

// 取得指定天數（預設行程 + 手機手動新增行程）並自動依時間排序
function getDaySchedule(di) {
  const seen = {};
  const baseList = TRIP.days[di].schedule.map((item, idx) => {
    const k = "base_" + di + "_" + (item.time || "") + "_" + (item.title || "");
    seen[k] = (seen[k] || 0) + 1;
    item = { ...item, _k: seen[k] > 1 ? k + "#" + seen[k] : k };
    return item;
  }).map(item => ({
    ...item,
    _uid: item._k,
    _isCustom: false
  }));
  const customAll = store.get("customEvents", {});
  const customList = (customAll[di] || []).map(item => ({
    ...item,
    _isCustom: true
  }));
  const merged = baseList.concat(customList);
  merged.sort((a, b) => getSortMinutes(a.time) - getSortMinutes(b.time));
  return merged;
}

/* ================= 行程時間換算（韓國時區 UTC+9） ================= */
function buildAllSchedules() {
  const all = [];
  TRIP.days.forEach((d, di) => {
    const [Y, M, D] = d.date.split("-").map(Number);
    const list = getDaySchedule(di);
    list.forEach((s, idx) => {
      const parts = s.time.split("-");
      const sm = (parts[0] || "").match(/\d{1,2}:\d{2}/g);
      const em = (parts[1] || parts[0] || "").match(/\d{1,2}:\d{2}/g);
      if (!sm) return;
      const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
      const sMin = toMin(sm[0]);
      const eMin = em ? toMin(em[em.length - 1]) : sMin + 60;
      const sOff = sMin < 360 ? 1 : 0;
      const eOff = sOff + (eMin < sMin ? 1 : 0);

      let start = Date.UTC(Y, M - 1, D + sOff, 0, sMin) - 9 * 3600000;
      let end = Date.UTC(Y, M - 1, D + eOff, 0, eMin) - 9 * 3600000;
      // 台灣起飛與抵達時間微調 (+1h)
      if (di === 0 && idx === 0 && s.title.indexOf("台中飛往仁川") >= 0) start += 3600000;
      if (di === 4 && s.title.indexOf("仁川飛回台中") >= 0) end += 3600000;
      all.push({ di, uid: s._uid, start, end });
    });
  });
  return all;
}

function computeStatus() {
  const sched = buildAllSchedules();
  if (!sched.length) return { cur: null, next: null };
  const now = Date.now();
  const first = sched[0].start, last = sched[sched.length - 1].end;
  if (now < first - 6 * 3600000 || now > last) return { cur: null, next: null };
  let cur = null, next = null;
  sched.forEach(x => { if (x.start <= now && now < x.end) cur = x; });
  for (const x of sched) { if (x.start > now) { next = x; break; } }
  return { cur: cur ? cur.uid : null, next: next ? next.uid : null, curDi: cur ? cur.di : (next ? next.di : null) };
}

/* ================= 行程頁（時間軸） ================= */
const BIGS = [];
function mapsHTML(kn) {
  if (!kn) return "";
  const places = kn.split("/").map(s => s.trim()).filter(p => p && p.indexOf("타이중") < 0);
  if (!places.length) return "";
  return `<div class="maps">` + places.map(p => {
    const zh = PLACE_ZH[p] || "";
    const i = BIGS.push({ kr: p, zh: zh, en: (typeof PLACE_EN !== "undefined" && PLACE_EN[p]) || "", addr: ADDR[p] || "", driver: false }) - 1;
    const label = zh ? `${p}（${zh}）` : p;
    return `<div>
      <div class="mplace">📍 ${esc(label)}</div>
      <div class="mrow">
        <a class="btn n" href="${naverUrl(p)}" target="_blank" rel="noopener">Naver Map</a>
        <a class="btn g" href="${googleUrl(p)}" target="_blank" rel="noopener">Google Maps</a>
        <button class="btn k" data-act="big" data-v="${i}">🗣️ 韓文大字卡</button>
      </div>
    </div>`;
  }).join("") + `</div>`;
}

/* ================= 行程對應手指書分類對照 ================= */
const PHRASE_CAT_MAP = {
  customs_spa: "🛂 入境與汗蒸幕會話",
  transit_taxi: "🚇 交通與叫車會話",
  hotel: "🏨 飯店入住退房會話",
  concert: "🎤 演唱會領票入場會話",
  dining: "🍜 餐廳一人食點餐會話",
  shopping_tax: "🛍️ 購物退稅與離境會話",
  emergency: "🆘 緊急求助會話"
};

function getEventPhraseCat(s) {
  if (s.phrase_cat && PHRASE_CAT_MAP[s.phrase_cat]) return s.phrase_cat;
  const text = (s.title || "") + " " + (s.transport || "") + " " + (s.notes || "");
  if (/汗蒸幕|入境|領取行李/.test(text)) return "customs_spa";
  if (/退稅|報到|候機|飛回台中/.test(text)) return "shopping_tax";
  if (/入住|退房|寄放行李|飯店休息|自然醒|午睡/.test(text)) return "hotel";
  if (/演唱會|INSPIRE|場館|入場/.test(text) && s.category === "演唱會") return "concert";
  if (s.category === "交通") return "transit_taxi";
  if (s.category === "美食") return "dining";
  if (s.category === "購物") return "shopping_tax";
  if (s.category === "演唱會") return "concert";
  return "";
}

function dayHTML(di) {
  const d = TRIP.days[di];
  const done = store.get("done", {});
  const st = computeStatus();
  const list = getDaySchedule(di);

  const head = `<div class="info">
      <span>🏨 <b>${esc(d.hotel)}</b></span>
      <span class="th">${d.date.slice(5).replace("-", "/")}（${esc(d.weekday)}）<br>${esc(d.theme)}</span>
    </div>`;

  const items = list.map((s, idx) => {
    const key = s._uid;
    const c = CAT_COLOR[s.category] || "#06b6d4";
    const isDone = !!done[key], isCur = st.cur === key, isNext = st.next === key;
    const tag = isCur ? `<span class="tag now">進行中</span>` : (isNext ? `<span class="tag next">下一站</span>` : "");
    const delBtn = s._isCustom ? `<button class="del-ev" data-act="delEvent" data-v="${esc(key)}" aria-label="刪除此自訂行程" title="刪除此自訂行程">🗑️</button>` : "";
    const expMap = store.get("exp", {});
    const collapsed = isDone && !expMap[key];   // 完成後自動收合，只留 time / title / category
    const customBadge = s._isCustom ? `<span class="custom-badge">自訂</span>` : "";

    return `<div class="tl ${idx === list.length - 1 ? "last" : ""}" style="--bar:${c}">
      <div class="tl-rail"><i class="dot ${isDone ? "on" : ""}"></i></div>
      <article class="card item ${isDone ? "done" : ""} ${collapsed ? "collapsed" : ""} ${isCur ? "cur" : ""}" data-key="${esc(key)}">
        <div class="row">
          <div class="lh"><span class="time">${esc(s.time)}</span><span class="chip">${esc(s.category)}</span>${customBadge}</div>
          <div class="corner">${tag}${delBtn}<button class="ck ${isDone ? "on" : ""}" data-act="done" data-v="${esc(key)}" aria-label="標記完成">✓</button></div>
        </div>
        ${isDone
          ? `<h3 class="h3-tog" data-act="itemToggle" data-v="${esc(key)}" role="button" aria-expanded="${!collapsed}"><span>${esc(s.title)}</span><i class="tog">${collapsed ? "▼ 展開" : "▲ 收合"}</i></h3>`
          : `<h3>${esc(s.title)}</h3>`}
        ${collapsed ? "" : `${s.transport ? `<div class="tr">${esc(s.transport)}</div>` : ""}
        ${s.notes ? `<div class="nt">💡 ${esc(s.notes)}</div>` : ""}
        ${(() => {
          const pCat = getEventPhraseCat(s);
          if (!pCat) return "";
          return `<div class="ev-phr-bar"><button class="ev-phr-btn" data-act="jumpPhrase" data-v="${esc(pCat)}">🗣️ 實用韓語手指卡・${esc(PHRASE_CAT_MAP[pCat])}</button></div>`;
        })()}
        ${mapsHTML(s.korean_name)}`}
      </article>
    </div>`;
  }).join("");

  const addBtn = `<button class="add-ev-btn" data-act="openAdd">➕ 新增 ${d.date.slice(5).replace("-", "/")} 行程（自動依時間排序）</button>`;
  return head + `<div>${items}</div>` + addBtn + `<div class="foot">時間以韓國時區（UTC+9）自動排序與判斷進度</div>`;
}

/* ================= 🚌 交通接駁頁（一般旅遊與機場往返） ================= */
function route(title, badge, badgeCls, steps, note) {
  return `<div class="card route">
    <div class="rt-h"><b>${title}</b><span class="badge ${badgeCls || ""}">${badge}</span></div>
    <ol class="steps">${steps.map(s => `<li><span class="ic">${s[0]}</span><b>${s[1]}</b>${s[2] ? `<small>${s[2]}</small>` : ""}</li>`).join("")}</ol>
    ${note ? `<div class="rnote">${note}</div>` : ""}
  </div>`;
}

// 場館交通：只列重要資訊（方式／地點／時間／費用）
function kvCard(title, badge, cls, rows, note) {
  return `<div class="card route">
    <div class="rt-h"><b>${title}</b><span class="badge ${cls || ""}">${badge}</span></div>
    ${rows.map(r => `<div class="kv"><span>${r[0]}</span><span>${r[1]}</span></div>`).join("")}
    ${note ? `<div class="rnote">${note}</div>` : ""}
  </div>`;
}
function venueTransitHTML() {
  const seg = store.get("seg", "go") === "back" ? "back" : "go";
  const segBar = `<div class="seg">
    <button class="${seg === "go" ? "on" : ""}" data-act="seg" data-v="go">➡️ 場館去程</button>
    <button class="${seg === "back" ? "on" : ""}" data-act="seg" data-v="back">⬅️ 散場回程</button></div>`;
  let body;
  if (seg === "go") {
    body =
      `<div class="sub" style="padding:0 4px">雲西站／飯店 → INSPIRE Arena，建議開演前 2.5 小時出發</div>` +
      kvCard("① 公演專線＋AREX", "免費接駁・最推薦", "rec", [
        ["AREX", "雲西站往仁川機場方向 1 站，約 4 分鐘、₩1,550"],
        ["下車", "機場貨物廳舍站（공항화물청사역）2 號出口"],
        ["接駁車", "公演免費接駁，約 15 分鐘一班，車程約 15 分鐘（僅演唱會日行駛）"]
      ]) +
      kvCard("② 常規線渡假村接駁", "免費接駁", "", [
        ["AREX", "雲西站搭 2 站至仁川機場 T1，約 7 分鐘、₩1,550"],
        ["乘車處", "T1 1 樓 2C／14C；每 30 分鐘一班（2C :00、:30）"],
        ["車程", "約 15–20 分鐘"]
      ]) +
      kvCard("③ 計程車／叫車（最省時）", "₩17,000–21,000", "pay", [
        ["叫車", "Kakao T 或 Uber，目的地輸入「인스파이어 아레나」"],
        ["車程", "約 15–20 分鐘；尖峰塞車約 ₩22,000 內"]
      ], "💡 可出示「🗣️ 韓文大字卡」或「🆘 獨旅安心卡」給司機看。");
  } else {
    body =
      `<div class="alert"><b>⚠️ 11/27（五）晚場 AREX 末班車</b><br>
        機場貨物廳舍站 → 雲西站：<b>23:42</b>（往首爾站）／00:00（往數碼媒體城站）<br>
        仁川機場 T1 → 雲西站：23:38（往首爾站）／23:56（往數碼媒體城站）<br>
        排隊過長或接近末班，直接叫 Kakao T／Uber。</div>` +
      kvCard("① 公演接駁＋AREX（首選）", "免費接駁・最省力", "rec", [
        ["接駁車", "散場後依指標到專用乘車處，搭至機場貨物廳舍站；持續發車至約 23:30"],
        ["AREX", "往首爾站方向 1 站到雲西站，約 4 分鐘"]
      ]) +
      kvCard("② 備用：常規接駁", "免費接駁", "", [
        ["至 T2", "末班 23:00（每小時 :00、:30）"],
        ["至 T1", "末班 22:15（每小時 :15、:45）"],
        ["之後", "轉搭 AREX 回雲西站，注意 AREX 末班"]
      ]) +
      kvCard("③ 叫車回飯店（獨旅夜間最安心）", "₩18,000–23,000", "pay", [
        ["叫車", "Kakao T 或 Uber（有完整行車軌跡紀錄）"],
        ["集合點", "散場前 10 分鐘先走到渡假村主大廳（Main Lobby）外圍，現場計程車排隊人潮極多"],
        ["車程", "約 15–20 分鐘"]
      ], "💡 可至「🆘 獨旅安心卡」出示飯店韓文大字卡。");
  }
  return segBar + body;
}

const TRANSIT_SUBS = [{ key: "air", label: "✈️ 航班與機場移動" }, { key: "venue", label: "🎤 演唱會場館交通" }];
function tsubGet() { const t = store.get("tsub", "air"); return t === "venue" ? "venue" : "air"; }

function transitHTML() {
  return tsubGet() === "venue" ? venueTransitHTML() : airTransitHTML();
}

function airTransitHTML() {
  return `<div class="card"><h2 class="h2">✈️ 航班資訊</h2>
    <div class="kv"><span>去程 LJ188</span><span>11/26 18:30 台中 T1 → 22:15 仁川 T2</span></div>
    <div class="kv"><span>回程 LJ187</span><span>11/30 15:35 仁川 T2 → 17:30 台中 T1</span></div>
    <div class="kv"><span>時區</span><span>韓國比台灣快 1 小時</span></div>
  </div>` +
  route("11/26 抵達：LJ188 → 汗蒸幕過夜", "夜間過夜", "rec", [
    ["🛬", "22:15 抵達仁川機場 T2", "出關領行李約 23:00"],
    ["🍔", "T2 1 樓 24H Lotteria 或 CU 買宵夜", "T2 美食街 22:00 打烊，1 樓中央有 24 小時店"],
    ["🛁", "T2 地下 1 樓西側：SPA at Home T2（스파앳홈）", "24 小時營業；夜間 6 小時約 ₩25,000–28,000／12 小時約 ₩35,000–38,000"],
    ["🔒", "護照與錢包鎖入個人置物櫃", "備妥耳塞、眼罩；入場可免費寄放 1 件大型行李"]
  ], "T2 客滿：到 T2 3 樓出境層搭免費航廈接駁（深夜每 20–30 分鐘一班，約 15–20 分鐘）前往 T1 的 SPA at Home（T1 地下 1 樓東側）。") +
  route("11/27 早上：機場 → 飯店寄放行李", "₩1,550", "pay", [
    ["🚇", "B1 交通中心搭 AREX 普通列車（往首爾站方向）到雲西站", "T2 出發約 11 分鐘；T1 出發約 7 分鐘"],
    ["🚶", "步行約 8 分鐘到 Sky Top 飯店", "可說：체크인 전 짐 보관 부탁드립니다（免費提前寄放行李）"],
    ["🏨", "15:00 後入住", "無法提早進房"]
  ]) +
  route("11/30 離境：飯店 → 仁川機場 T2", "₩1,550", "pay", [
    ["🏨", "11:00 前退房", "12:30–13:00 從飯店出發（起飛前約 2.5–3 小時抵達機場）"],
    ["🚇", "雲西站搭 AREX 普通列車往仁川機場方向，到仁川機場第二航廈站", "車程約 11 分鐘，每小時約 5–6 班"],
    ["🛫", "T2 報到、退稅、候機", "15:35 起飛 LJ187"]
  ]) +
  `<div class="card"><h2 class="h2">🚇 AREX 一般搭乘口訣</h2>
    <ul class="tips">
      <li><b>搭普通列車</b>（雲西站有停；機場快線直達車不停雲西）。</li>
      <li><b>去機場</b>：搭往「仁川機場」方向 → 雲西到 T2 約 11 分鐘、到 T1 約 7 分鐘，約 ₩1,550。</li>
      <li><b>回雲西</b>：從機場搭往「首爾站」方向，坐到雲西站下車。</li>
    </ul>
  </div>`;
}

/* ================= 🎤 演唱會資訊頁（場次、專屬接駁、散場末班車與注意事項） ================= */
function concertHTML() {
  const sessions = `<div class="card"><h2 class="h2">🎫 演唱會場次與位置（INSPIRE Arena 인스파이어 아레나）</h2>
    <table class="tbl"><tr><th>日期</th><th>開演</th><th>位置</th><th>出發</th><th>預估散場</th></tr>
      <tr><td>11/27 五</td><td><b>19:00</b></td><td><span class="seat-chip">309 A3</span></td><td>16:30</td><td>21:30–22:00<br><span class="sub">緊湊，留意末班</span></td></tr>
      <tr><td>11/28 六</td><td><b>17:00</b></td><td><span class="seat-chip">308 K33</span></td><td>14:30</td><td>19:30–20:00<br><span class="sub">充裕</span></td></tr>
      <tr><td>11/29 日</td><td><b>16:00</b></td><td><span class="seat-chip">311 K1</span></td><td>13:30</td><td>18:30–19:00<br><span class="sub">極充裕</span></td></tr></table></div>`;
  const daily = `<div class="card"><h2 class="h2">📅 各場當日提醒</h2>
    <ul class="tips">
      <li><b>11/27（五）</b>：早上搭 AREX 到雲西站，先到 Sky Top 免費寄放行李；15:00 入住後午睡 40–60 分鐘並檢查應援物；散場後可到雲西站 1 號出口 Puradak 吃炸雞宵夜（營業至 01:00）。</li>
      <li><b>11/28（六）</b>：上午咖啡廳慢活；12:30–14:30 回飯店午睡、洗澡，並幫手機與行動電源補電；14:30 出發；散場後去玉大醬吃大醬鍋，回飯店幫手燈與手機充電。</li>
      <li><b>11/29（日）</b>：最後一場，可睡到自然醒；Olive Young（營業至 22:30）與樂天超市（營業至 23:00）做最後採買，保留所有收據與退稅單據；散場後去三山會館吃慶功餐，再整理行李（接「🎒 清單 → 行李整理」）。</li>
    </ul></div>`;
  const carry = `<div class="ck-wrap">${checklistHTML("concert")}</div>`;
  const tips = `<div class="card"><h2 class="h2">💡 演唱會交通與入場口訣</h2>
    <ul class="tips">
      <li><b>入場前確認</b>：場館禁帶物與包袋尺寸規定（以官方公告為準）。</li>
      <li><b>場館交通</b>：去程／散場回程與末班車資訊，請看「🚌 交通接駁」。</li>
    </ul></div>`;
  return sessions + carry + daily + tips;
}

/* ================= 🆘 獨旅安心卡（純緊急聯絡、飯店地址卡、手指書、退稅） ================= */
function safetyHTML() {
  const hk = TRIP.base_hotel.korean_name, ha = TRIP.base_hotel.address;
  return `
  <div class="hotelcard">
    <div class="lb">🚕 計程車救星・飯店地址卡</div>
    <div class="hk">${esc(hk)}</div>
    <div class="ha">${esc(ha)}</div>
    <div class="hz">Sky Top 仁川機場飯店（Incheon Airport Sky Top Hotel）・雲西站步行約 8 分鐘</div>
    <div class="hbtns">
      <button class="bigbtn" data-act="hotelBig">🔍 全螢幕放大給司機看</button>
      <div class="hbtns2">
        <a class="sbtn" href="${naverUrl(hk)}" target="_blank" rel="noopener">Naver Map</a>
        <a class="sbtn" href="${googleUrl(hk)}" target="_blank" rel="noopener">Google Maps</a>
        <button class="sbtn" data-act="copyHotel" id="copyBtn">📋 複製地址</button>
      </div>
    </div>
  </div>

  <div class="card" id="phraseBookCard">
    <div class="row" style="align-items:center;margin-bottom:6px">
      <h2 class="h2" style="margin:0">🗣️ 韓文手指書（點卡片全螢幕放大）</h2>
      <div style="display:flex;gap:4px">
        <button class="mini-btn" data-act="phrAll" data-v="1">全展開</button>
        <button class="mini-btn" data-act="phrAll" data-v="0">全收合</button>
      </div>
    </div>
    <div class="sub" style="margin-bottom:10px">點擊類別標題可展開或收合，內含中、韓、英與羅馬拼音對照</div>
    ${(() => {
      const phrOpen = store.get("incheon_phr_open", {});
      return PHRASES.map((grp, gi) => {
        const isOpen = phrOpen[grp.id] !== false;
        return `
          <div class="phr-sec" id="phr-grp-${esc(grp.id)}">
            <button class="phr-cat-btn" data-act="togglePhr" data-v="${esc(grp.id)}" aria-expanded="${isOpen}">
              <span>${esc(grp.cat)} <small class="gcount">(${grp.items.length}句)</small></span>
              <span class="phr-arr">${isOpen ? "▲ 收合" : "▼ 展開"}</span>
            </button>
            ${isOpen ? `<div class="phr">${grp.items.map((p, pi) => `<button class="ph" data-act="phrase" data-v="${gi}_${pi}">
              <span class="z">${esc(p.zh)}</span>
              <span class="k">${esc(p.kr)}</span>
              <span class="e">${esc(p.en)}</span>
              <span class="r">${esc(p.ro)}</span>
            </button>`).join("")}</div>` : ""}
          </div>
        `;
      }).join("");
    })()}
  </div>

  <div class="card"><h2 class="h2">📞 緊急聯絡（點一下撥號）</h2>
    <a class="tel" href="tel:1330"><span class="n">1330</span><span class="d"><b>韓國觀光公社旅遊諮詢熱線</b><br>24 小時，提供中文服務</span><span class="go">📞</span></a>
    <a class="tel" href="tel:112"><span class="n">112</span><span class="d"><b>報警</b></span><span class="go">📞</span></a>
    <a class="tel" href="tel:119"><span class="n">119</span><span class="d"><b>救護車／消防</b></span><span class="go">📞</span></a>
    <a class="tel" href="tel:+821090802761"><span class="n s">+82-10-9080-2761</span><span class="d"><b>駐韓國台北代表部</b><br>緊急聯絡電話</span><span class="go">📞</span></a>
    <div class="rnote">電話號碼出發前請再到外交部領事事務局官網確認一次，並截圖存起來。</div>
  </div>

  <div class="card"><h2 class="h2">🧾 仁川機場 T2 退稅口訣</h2>
    <ul class="tips">
      <li>Olive Young 雲西站店支援現場退稅：結帳時出示<b>護照</b>。</li>
      <li>所有退稅單據與護照<b>集中放隨身包</b>，不要放進託運行李。</li>
      <li>11/30 約 13:00 前抵達 T2，退稅、報到、候機都留足時間（15:35 起飛）。</li>
      <li>辦理流程與櫃檯位置以機場現場指標和店家說明為準；不確定時用手指書：<b>세금 환급 부탁드립니다</b>。</li>
    </ul></div>`;
}

/* ================= 🎒 清單：按天分類的完整準備清單管理器 =================
   儲存鍵（localStorage，皆以 incheon_ck_v3_ 開頭）：
   checked 勾選狀態｜custom 自訂項目｜edits 預設項目改名｜deleted 預設項目隱藏｜open 展開/收合｜hidedone 只看未完成｜tab 目前分頁 */
const CKK = {
  checked: "incheon_ck_v3_checked",
  custom: "incheon_ck_v3_custom",
  edits: "incheon_ck_v3_edits",
  del: "incheon_ck_v3_deleted",
  open: "incheon_ck_v3_open",
  hide: "incheon_ck_v3_hidedone",
  tab: "incheon_ck_v3_tab"
};
const CK_TAB_KEYS = CHECKLIST_TABS.map(t => t.key);
let ckEditing = null;

function ckState() {
  return {
    checked: store.get(CKK.checked, {}),
    custom: store.get(CKK.custom, {}),
    edits: store.get(CKK.edits, {}),
    del: store.get(CKK.del, {}),
    open: store.get(CKK.open, {}),
    hide: store.get(CKK.hide, false)
  };
}
function ckGetTab() {
  const t = store.get(CKK.tab, CK_TAB_KEYS[0]);
  return CK_TAB_KEYS.indexOf(t) >= 0 ? t : CK_TAB_KEYS[0];
}
// 某類別目前「看得到」的項目：預設項目（排除已刪除、套用改名）＋自訂項目
function ckVisibleItems(g, st) {
  const base = (g.items || []).filter(i => !st.del[i.id]).map(i => ({
    id: i.id, text: st.edits[i.id] != null ? st.edits[i.id] : i.text, custom: false, kr: i.kr || "", note: i.note || ""
  }));
  const cus = (st.custom[g.id] || []).map(c => ({ id: c.id, text: c.text, custom: true }));
  return base.concat(cus);
}
function ckTabStats(key, st) {
  let total = 0, done = 0;
  CHECKLIST_DATA[key].forEach(g => ckVisibleItems(g, st).forEach(i => {
    total++; if (st.checked[i.id]) done++;
  }));
  return { total, done };
}

// 目前操作的清單 key：演唱會資訊頁內嵌清單固定為 concert，其餘為清單分頁目前的分頁
function ckCurKey() { return tab === "concert" ? "concert" : ckGetTab(); }
const CONCERT_CK_META = { title: "🎒 要帶出門的物品（可勾選）", doneLabel: "已備妥" };

function checklistHTML(forceKey) {
  const st = ckState();
  const key = forceKey || ckGetTab();
  const meta = forceKey ? CONCERT_CK_META : (CHECKLIST_TABS.find(t => t.key === key) || CHECKLIST_TABS[0]);
  const { total, done } = ckTabStats(key, st);
  const pct = total ? Math.round(done / total * 100) : 0;



  const progress = `<div class="cl-title">${esc(meta.title)}
      <div class="cl-stat">${esc(meta.doneLabel || "已完成")} ${done} / ${total} 項（${pct}%）</div>
      <div class="bar"><i style="width:${pct}%"></i></div></div>`;

  const tools = `<div class="ck-tools">
      <button class="ck-tbtn" data-act="ckExpand">全部展開</button>
      <button class="ck-tbtn" data-act="ckCollapse">全部收合</button>
      <button class="ck-tbtn ck-sw ${st.hide ? "on" : ""}" data-act="ckHide" aria-pressed="${st.hide}">僅未完成</button>
      <button class="ck-tbtn warn" data-act="ckReset">重置勾選</button>
    </div>`;

  const row = (it, gid) => {
    if (ckEditing === it.id) {
      return `<div class="ck-row editing">
        <input class="field ck-edit" data-ck-edit="${esc(it.id)}" type="text" value="${esc(it.text)}" maxlength="120">
        <button class="pbtn" data-act="ckSave" data-v="${esc(it.id)}">儲存</button>
        <button class="ck-ib" data-act="ckCancel" aria-label="取消">✕</button>
      </div>`;
    }
    const on = !!st.checked[it.id];
    const extra = (it.note || it.kr)
      ? `<div class="ck-food">${it.note ? `<div class="ck-note">${esc(it.note)}</div>` : ""}${mapsHTML(it.kr)}</div>` : "";
    return `<div class="ck-item ${on ? "is-done" : ""}"><div class="ck-row ${on ? "is-done" : ""}">
      <label class="chk">
        <input type="checkbox" data-ck="${esc(it.id)}" ${on ? "checked" : ""}>
        <span class="t">${esc(it.text)}</span>
      </label>
      <button class="ck-ib" data-act="ckEdit" data-v="${esc(it.id)}" aria-label="編輯項目" title="編輯">✏️</button>
      <button class="ck-ib del" data-act="ckDel" data-v="${esc(it.id)}" data-cat="${esc(gid)}" aria-label="刪除項目" title="刪除">🗑️</button>
    </div>${extra}</div>`;
  };

  const noteHTML = g => (g.notes || []).map(n => `<div class="ck-info">${esc(n)}</div>`).join("");
  const groups = CHECKLIST_DATA[key].map(g => {
    if (g.info) {   // 純文字提醒群組：不勾選、不編輯
      return `<div class="group"><div class="group-h"><h3>${esc(g.group)}</h3></div><div class="group-b">${noteHTML(g)}</div></div>`;
    }
    const o = st.open[g.id] !== false;
    const items = ckVisibleItems(g, st);
    const gDone = items.filter(i => st.checked[i.id]).length;
    const shown = st.hide ? items.filter(i => !st.checked[i.id]) : items;
    let body = shown.map(i => row(i, g.id)).join("");
    if (!shown.length) {
      body = `<div class="ck-empty">${items.length ? "🎉 此類別已全部完成" : "此類別目前沒有項目，可在下方新增"}</div>`;
    }
    const add = `<div class="cat-add">
      <input class="field" data-cat-inp="${esc(g.id)}" type="text" placeholder="＋ 新增到此類別..." maxlength="80">
      <button class="pbtn" data-act="ckAdd" data-cat="${esc(g.id)}">新增</button>
    </div>`;
    return `<div class="group">
      <div class="group-h" data-act="acc" data-v="${esc(g.id)}">
        <h3>${esc(g.group)} <small class="gcount">${gDone}/${items.length}</small></h3>
        <span>${o ? "▲ 收合" : "▼ 展開"}</span>
      </div>
      ${o ? `<div class="group-b">${body}${add}${noteHTML(g)}</div>` : ""}
    </div>`;
  }).join("");

  return progress + tools + groups;
}

function ckFindCustom(id) {
  const all = store.get(CKK.custom, {});
  for (const gid in all) {
    const idx = (all[gid] || []).findIndex(c => c.id === id);
    if (idx >= 0) return { all, gid, idx };
  }
  return null;
}
function ckAllIds(key) {
  const st = ckState(), ids = [];
  CHECKLIST_DATA[key].forEach(g => ckVisibleItems(g, st).forEach(i => ids.push(i.id)));
  return ids;
}
function ckSetTab(key) {
  store.set(CKK.tab, key);
  ckEditing = null;
}
function ckAdd(gid) {
  const inp = document.querySelector(`[data-cat-inp="${CSS.escape(gid)}"]`);
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  const all = store.get(CKK.custom, {});
  (all[gid] = all[gid] || []).push({ id: "cu_" + Date.now() + "_" + Math.floor(Math.random() * 1000), text });
  store.set(CKK.custom, all);
  render(true);
  const again = document.querySelector(`[data-cat-inp="${CSS.escape(gid)}"]`);
  if (again) again.focus();
}
function ckStartEdit(id) {
  ckEditing = id;
  render(true);
  const el = document.querySelector(`[data-ck-edit="${CSS.escape(id)}"]`);
  if (el) { el.focus(); el.select(); }
}
function ckSaveEdit(id) {
  const el = document.querySelector(`[data-ck-edit="${CSS.escape(id)}"]`);
  if (!el) return;
  const text = el.value.trim();
  if (!text) { alert("項目名稱不可空白"); return; }
  const c = ckFindCustom(id);
  if (c) {
    c.all[c.gid][c.idx].text = text;
    store.set(CKK.custom, c.all);
  } else {
    const edits = store.get(CKK.edits, {});
    edits[id] = text;
    store.set(CKK.edits, edits);
  }
  ckEditing = null;
  render(true);
}
function ckDelete(id) {
  if (!confirm("確定刪除這個項目？")) return;
  const c = ckFindCustom(id);
  if (c) {
    c.all[c.gid].splice(c.idx, 1);
    store.set(CKK.custom, c.all);
  } else {
    const del = store.get(CKK.del, {});
    del[id] = true;
    store.set(CKK.del, del);
  }
  const k = store.get(CKK.checked, {});
  delete k[id];
  store.set(CKK.checked, k);
  if (ckEditing === id) ckEditing = null;
  render(true);
}

/* ================= 韓文大字卡 ================= */
function showBig(o) {
  $("#bigBody").innerHTML =
    (o.zh ? `<div class="big-zh">${esc(o.zh)}</div>` : "") +
    `<div class="big-kr">${esc(o.kr)}</div>` +
    (o.en ? `<div class="big-ro">${esc(o.en)}</div>` : "") +
    (o.addr ? `<div class="big-addr">${esc(o.addr)}</div>` : "") +
    (o.ro ? `<div class="big-ro">${esc(o.ro)}</div>` : "") +
    (o.driver ? `<div class="big-go">여기까지 가주세요</div><div class="big-gz">（請載我到這裡）</div>` : "");
  $("#big").classList.remove("hidden");
  $("#big").scrollTop = 0;
}
function closeBig() { $("#big").classList.add("hidden"); }

function copyText(t, btn) {
  const ok = () => {
    if (btn) { const o = btn.textContent; btn.textContent = "✅ 已複製"; setTimeout(() => btn.textContent = o, 1500); }
  };
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(ok, () => fallback());
      return;
    }
  } catch (e) {}
  fallback();
  function fallback() {
    try {
      const ta = document.createElement("textarea");
      ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); ok();
    } catch (e) {
      if (btn) btn.textContent = "請手動長按複製";
    }
  }
}

/* ================= 主渲染 ================= */
let day = 0, tab = "itinerary";

function render(keepScroll) {
  const y = window.scrollY;
  BIGS.length = 0;
  ["itinerary", "transit", "checklist", "safety", "concert"].forEach(t => $("#nav-" + t).className = "nav-btn" + (tab === t ? " active" : ""));
  const showSubNav = (tab === "itinerary" || tab === "checklist" || tab === "transit");
  $("#daynavWrap").classList.toggle("hidden", !showSubNav);
  if (tab === "itinerary") {
    $("#daynav").innerHTML = TRIP.days.map((d, i) => `<button class="day-btn ${i === day ? "active" : ""}" data-act="day" data-v="${i}">${d.date.slice(5).replace("-", "/")}</button>`).join("");
    const a = document.querySelector(".day-btn.active");
    if (a) a.scrollIntoView({ inline: "center", block: "nearest" });
  } else if (tab === "transit") {
    const cur = tsubGet();
    $("#daynav").innerHTML = TRANSIT_SUBS.map(t => `<button class="day-btn ck-sub ${t.key === cur ? "active" : ""}" data-act="tsub" data-v="${t.key}"><span>${t.label}</span></button>`).join("");
  } else if (tab === "checklist") {
    const st = ckState();
    const curKey = ckGetTab();
    $("#daynav").innerHTML = CHECKLIST_TABS.map(t => {
      const s = ckTabStats(t.key, st);
      const label = t.short.split(" ")[0];
      return `<button class="day-btn ck-sub ${t.key === curKey ? "active" : ""}" data-act="ckTab" data-v="${t.key}"><span>${esc(label)}</span><small>${s.done}/${s.total}</small></button>`;
    }).join("");
    const a = document.querySelector(".day-btn.active");
    if (a) a.scrollIntoView({ inline: "center", block: "nearest" });
  }
  const m = $("#main");
  if (tab === "itinerary") m.innerHTML = dayHTML(day);
  else if (tab === "transit") m.innerHTML = transitHTML();
  else if (tab === "checklist") m.innerHTML = checklistHTML();
  else if (tab === "safety") m.innerHTML = safetyHTML();
  else m.innerHTML = concertHTML();
  if (keepScroll) window.scrollTo({ top: y });
}

function goto(t) {
  tab = t; store.set("tab", t); render(false); window.scrollTo({ top: 0 });
}

/* ================= 新增行程表單邏輯 ================= */
function openAddModal() {
  $("#addTitle").value = "";
  $("#addKr").value = "";
  $("#addTr").value = "";
  $("#addNt").value = "";
  $("#addModal").classList.remove("hidden");
  setTimeout(() => $("#addTitle").focus(), 120);
}
function closeAddModal() {
  $("#addModal").classList.add("hidden");
}
function saveNewEvent() {
  const start = $("#addStart").value.trim();
  const end = $("#addEnd").value.trim();
  const title = $("#addTitle").value.trim();
  if (!start || !title) {
    alert("請填寫「開始時間」與「行程名稱」");
    return;
  }
  const timeStr = end ? `${start} - ${end}` : start;
  const newEv = {
    _uid: "ev_" + Date.now(),
    time: timeStr,
    title: title,
    korean_name: $("#addKr").value.trim(),
    category: $("#addCat").value,
    transport: $("#addTr").value.trim(),
    notes: $("#addNt").value.trim()
  };
  const customAll = store.get("customEvents", {});
  if (!customAll[day]) customAll[day] = [];
  customAll[day].push(newEv);
  store.set("customEvents", customAll);
  closeAddModal();
  render(true);
}

/* ================= 全域事件委派 ================= */
document.addEventListener("click", e => {
  if (e.target.id === "addModal") { closeAddModal(); return; }
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const a = t.dataset.act, v = t.dataset.v;

  switch (a) {
    case "tab": goto(v); break;
    case "day": day = +v; store.set("day", day); render(false); window.scrollTo({ top: 0 }); break;
    case "done": {
      const d = store.get("done", {});
      if (d[v]) delete d[v]; else d[v] = true;
      const ex = store.get("exp", {}); delete ex[v]; store.set("exp", ex);   // 勾選／取消時回到預設狀態
      store.set("done", d); render(true); break;
    }
    case "itemToggle": {
      const ex = store.get("exp", {});
      if (ex[v]) delete ex[v]; else ex[v] = true;
      store.set("exp", ex); render(true); break;
    }
    case "openAdd": openAddModal(); break;
    case "closeAdd": closeAddModal(); break;
    case "saveEvent": saveNewEvent(); break;
    case "delEvent": {
      if (!confirm("確定刪除此自訂行程？")) break;
      const customAll = store.get("customEvents", {});
      if (customAll[day]) {
        customAll[day] = customAll[day].filter(x => x._uid !== v);
        store.set("customEvents", customAll);
      }
      const d = store.get("done", {}); delete d[v]; store.set("done", d);
      render(true); break;
    }
    case "big": showBig(BIGS[+v]); break;
    case "closeBig": closeBig(); break;
    case "hotelBig":
      showBig({ kr: TRIP.base_hotel.korean_name, zh: "Sky Top 仁川機場飯店", addr: TRIP.base_hotel.address, driver: true });
      break;
    case "copyHotel":
      copyText(TRIP.base_hotel.korean_name + "\n" + TRIP.base_hotel.address, t);
      break;
    case "phrase": {
      const [gi, pi] = String(v).split("_").map(Number);
      const p = PHRASES[gi] && PHRASES[gi].items[pi];
      if (p) showBig({ kr: p.kr, zh: p.zh, en: p.en, ro: p.ro });
      break;
    }
    case "togglePhr": {
      const o = store.get("incheon_phr_open", {});
      o[v] = (o[v] === false);
      store.set("incheon_phr_open", o);
      render(true);
      break;
    }
    case "phrAll": {
      const o = {};
      const openVal = (v === "1");
      PHRASES.forEach(g => { o[g.id] = openVal; });
      store.set("incheon_phr_open", o);
      render(true);
      break;
    }
    case "jumpPhrase": {
      const o = store.get("incheon_phr_open", {});
      o[v] = true;
      store.set("incheon_phr_open", o);
      tab = "safety";
      store.set("tab", "safety");
      render(false);
      setTimeout(() => {
        const target = document.getElementById("phr-grp-" + v);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.classList.add("phr-flash");
          setTimeout(() => target.classList.remove("phr-flash"), 1600);
        }
      }, 60);
      break;
    }
    case "seg": store.set("seg", v); render(true); break;
    case "ckTab": {
      ckSetTab(v);
      render(false); window.scrollTo({ top: 0 });
      break;
    }
    case "acc": {
      const o = store.get(CKK.open, {});
      o[v] = (o[v] === false);
      store.set(CKK.open, o); render(true); break;
    }
    case "ckExpand": case "ckCollapse": {
      const o = store.get(CKK.open, {});
      CHECKLIST_DATA[ckCurKey()].forEach(g => { if (!g.info) o[g.id] = (a === "ckExpand"); });
      store.set(CKK.open, o); render(true); break;
    }
    case "ckHide": store.set(CKK.hide, !store.get(CKK.hide, false)); render(true); break;
    case "ckReset": {
      if (!confirm("清空本頁所有勾選？（不會刪除或修改任何項目）")) break;
      const k = store.get(CKK.checked, {});
      ckAllIds(ckCurKey()).forEach(id => delete k[id]);
      store.set(CKK.checked, k); render(true); break;
    }
    case "ckAdd": ckAdd(t.dataset.cat); break;
    case "ckEdit": ckStartEdit(v); break;
    case "ckSave": ckSaveEdit(v); break;
    case "ckCancel": ckEditing = null; render(true); break;
    case "ckDel": ckDelete(v); break;
    case "tsub": store.set("tsub", v); render(false); window.scrollTo({ top: 0 }); break;
    case "fx": openFx(true); break;
  }
});

document.addEventListener("change", e => {
  const el = e.target;
  if (!el.matches("[data-ck]")) return;
  const k = store.get(CKK.checked, {});
  if (el.checked) k[el.dataset.ck] = true; else delete k[el.dataset.ck];
  store.set(CKK.checked, k); render(true);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeBig(); closeAddModal(); openFx(false);
    if (ckEditing) { ckEditing = null; render(true); }
  }
  if (e.key === "Enter") {
    if (e.target.dataset.catInp) ckAdd(e.target.dataset.catInp);
    else if (e.target.dataset.ckEdit) ckSaveEdit(e.target.dataset.ckEdit);
  }
});

/* ================= 雙時區時鐘 ================= */
function tick() {
  const n = Date.now();
  const tw = new Date(n + 8 * 3600000), kr = new Date(n + 9 * 3600000);
  $("#tw").textContent = p2(tw.getUTCHours()) + ":" + p2(tw.getUTCMinutes());
  $("#kr").textContent = p2(kr.getUTCHours()) + ":" + p2(kr.getUTCMinutes());
}
setInterval(tick, 1000); tick();

let lastStatus = JSON.stringify(computeStatus());
setInterval(() => {
  const s = JSON.stringify(computeStatus());
  if (s !== lastStatus) { lastStatus = s; if (tab === "itinerary") render(true); }
}, 30000);

/* ================= 匯率換算 ================= */
const fmt = n => Math.round(n).toLocaleString("en-US");
function calc() {
  const rate = parseFloat($("#rate").value) || 0;
  const krw = parseFloat($("#krw").value) || 0;
  $("#twd").textContent = "NT$ " + fmt(krw * rate);
  $("#twdSub").textContent = krw ? `₩${fmt(krw)} × ${rate}` : "輸入韓元即時換算";
  const t = parseFloat($("#twdIn").value) || 0;
  $("#krwOut").textContent = "₩ " + (rate ? fmt(t / rate) : 0);
  if (rate > 0) store.set("rate", rate);
}
function setRateStatus(msg) { const el = $("#rateStatus"); if (el) el.textContent = msg; }

async function autoRate(force) {
  if (!force && store.get("rateManual", false)) return;
  if (!navigator.onLine) {
    const t = store.get("rateTime", "");
    setRateStatus(t ? `離線中，沿用 ${t} 的匯率` : "離線中，使用預設匯率（可手動微調）");
    return;
  }
  try {
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch("https://open.er-api.com/v6/latest/KRW", { signal: ctrl.signal });
    clearTimeout(to);
    const j = await r.json();
    const v = j && j.rates && j.rates.TWD;
    if (!(v > 0)) throw new Error("no rate");
    const rate = Math.round(v * 100000) / 100000;
    const t = new Date();
    const stamp = (t.getMonth() + 1) + "/" + t.getDate() + " " + p2(t.getHours()) + ":" + p2(t.getMinutes());
    $("#rate").value = rate; store.set("rateManual", false); store.set("rateTime", stamp);
    calc(); setRateStatus(`已自動更新（${stamp}）`);
  } catch (e) {
    const t = store.get("rateTime", "");
    setRateStatus(t ? `更新失敗，沿用 ${t} 的匯率` : "更新失敗，使用預設匯率（可手動微調）");
  }
}

function openFx(o) {
  $("#mask").classList.toggle("hidden", !o);
  if (o) { autoRate(false); setTimeout(() => $("#krw").focus(), 150); }
}

(function initFx() {
  { const r = parseFloat(store.get("rate", 0.0225)); $("#rate").value = r > 0 ? r : 0.0225; }
  $("#presets").innerHTML = [5000, 10000, 25000, 50000].map(v => `<button data-v="${v}">₩${fmt(v)}</button>`).join("");
  $("#presets").addEventListener("click", e => { const v = e.target.dataset.v; if (v) { $("#krw").value = v; calc(); } });
  ["krw", "twdIn"].forEach(id => $("#" + id).addEventListener("input", calc));
  $("#rate").addEventListener("input", () => { store.set("rateManual", true); setRateStatus("已手動設定匯率"); calc(); });
  $("#rateRefresh").addEventListener("click", () => autoRate(true));
  $("#closeFx").addEventListener("click", () => openFx(false));
  $("#mask").addEventListener("click", e => { if (e.target.id === "mask") openFx(false); });
  calc();
  if (store.get("rateManual", false)) setRateStatus("已手動設定匯率"); else autoRate(false);
  window.addEventListener("online", () => autoRate(false));
})();

/* ================= 左右滑動切換日期／清單分頁 ================= */
(function initSwipe() {
  const el = $("#main");
  let sx = 0, sy = 0, st = 0, ok = false;
  const blocked = t => t.closest && t.closest("input,textarea,select,.field,.tbl-wrap,.seg,.presets,.ck-edit");
  el.addEventListener("touchstart", e => {
    if (e.touches.length !== 1 || blocked(e.target) || (typeof ckEditing !== "undefined" && ckEditing)) { ok = false; return; }
    ok = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, { passive: true });
  el.addEventListener("touchend", e => {
    if (!ok) return; ok = false;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6 || Date.now() - st > 700) return;
    const dir = dx < 0 ? 1 : -1;            // 左滑 → 下一天；右滑 → 前一天
    let moved = false;
    if (tab === "itinerary") {
      const n = day + dir;
      if (n >= 0 && n < TRIP.days.length) { day = n; store.set("day", day); moved = true; }
    } else if (tab === "transit") {
      const ks = TRANSIT_SUBS.map(t => t.key), n = ks.indexOf(tsubGet()) + dir;
      if (n >= 0 && n < ks.length) { store.set("tsub", ks[n]); moved = true; }
    } else if (tab === "checklist") {
      const i = CK_TAB_KEYS.indexOf(ckGetTab()), n = i + dir;
      if (i >= 0 && n >= 0 && n < CK_TAB_KEYS.length) {
        const key = CK_TAB_KEYS[n];
        ckSetTab(key);
        moved = true;
      }
    }
    if (!moved) return;
    render(false); window.scrollTo({ top: 0 });
    el.classList.remove("sw-l", "sw-r"); void el.offsetWidth;
    el.classList.add(dir > 0 ? "sw-l" : "sw-r");
  }, { passive: true });
  el.addEventListener("touchcancel", () => { ok = false; }, { passive: true });
})();

/* ================= 離線 Service Worker 註冊 ================= */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  // 新版 SW 接手後自動重新載入一次，避免手機停在舊版畫面
  const hadCtl = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadCtl || reloaded) return;
    reloaded = true; location.reload();
  });
  navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then(reg => {
    reg.update().catch(() => {});
    document.addEventListener("visibilitychange", () => { if (!document.hidden) reg.update().catch(() => {}); });
  }).catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
}

/* ================= 啟動 ================= */
(function init() {
  const st = computeStatus();
  const t = store.get("tab", "itinerary");
  tab = ["itinerary", "transit", "checklist", "safety", "concert"].indexOf(t) >= 0 ? t : "itinerary";
  const k = st.cur || st.next;
  if (k && st.curDi != null) {
    day = st.curDi;
  } else {
    const kr = new Date(Date.now() + 9 * 3600000);
    const ds = kr.getUTCFullYear() + "-" + p2(kr.getUTCMonth() + 1) + "-" + p2(kr.getUTCDate());
    const idx = TRIP.days.findIndex(d => d.date === ds);
    const s = store.get("day", 0);
    day = idx >= 0 ? idx : ((typeof s === "number" && s >= 0 && s < TRIP.days.length) ? s : 0);
  }
  render(false);
  if (k && tab === "itinerary") {
    const el = document.querySelector(`.item[data-key="${CSS.escape(k)}"]`);
    if (el) el.scrollIntoView({ block: "center" });
  }
})();
