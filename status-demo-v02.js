(() => {
  const root = document.querySelector('#sample-report');
  const scenario = root.querySelector('#report-scenario');
  const copy = {
    ja: {title:'営業情報', note:'※ 架空の表示例です。実際の情報ではなく、自動更新されません。', hours:'営業時間（架空）：8:30〜16:30', updated:'更新時刻（架空の例）：8:00', choose:'表示例を切り替える', scenarios:['通常の例','強風の例','混雑の例'], weather:'天気', snow:'積雪', parking:'駐車場', sunny:'晴れ', windy:'強風', spaces:'空きあり', busy:'混雑', lifts:'リフト', courses:'コース', names:['① しらかばコース','② 樹氷パノラマコース','③ 八沢スカイラインコース','④ 八沢エクストリームコース'], running:'運行中', stopped:'運休', open:'滑走可', closed:'クローズ', notice:'お知らせ（表示例）', mapLink:'地図でリフトの位置を見る →', messages:['すべてのリフト・コースが利用できる例です。','強風の例：リフト２基（L2・L3）とコース３本（②〜④）が休止。','駐車場が混雑している例です。']},
    en: {title:'Operating information', note:'Fictional sample only. This is not live information and is not automatically updated.', hours:'Opening hours (fictional): 8:30–16:30', updated:'Example update time (fictional): 8:00', choose:'Choose a sample scenario', scenarios:['Normal conditions','High winds','Busy parking'], weather:'Weather', snow:'Snow depth', parking:'Parking', sunny:'Sunny', windy:'High winds', spaces:'Spaces available', busy:'Busy', lifts:'Lifts', courses:'Courses', names:['① Shirakaba Course','② Rime Panorama Course','③ Yasawa Skyline Course','④ Yasawa Extreme Course'], running:'Operating', stopped:'Closed', open:'Open', closed:'Closed', notice:'Notice (sample)', mapLink:'See lift locations on the map →', messages:['Sample: all lifts and courses are open.','High-wind sample: 2 lifts (L2 and L3) and 3 courses (②–④) are closed.','Sample: the car park is busy.']},
    'zh-Hans': {title:'营业信息', note:'虚构示例，非实时信息，不会自动更新。', hours:'营业时间（虚构）：8:30–16:30', updated:'示例更新时间（虚构）：8:00', choose:'切换示例情景', scenarios:['正常情况','强风情况','停车繁忙'], weather:'天气', snow:'积雪', parking:'停车场', sunny:'晴', windy:'强风', spaces:'有空位', busy:'繁忙', lifts:'缆车', courses:'雪道', names:['① 白桦雪道','② 树冰全景雪道','③ 八泽天际线雪道','④ 八泽极限雪道'], running:'运行中', stopped:'停运', open:'开放', closed:'关闭', notice:'通知（示例）', mapLink:'在地图上查看缆车位置 →', messages:['示例：所有缆车和雪道均开放。','强风示例：2条缆车（L2、L3）和3条雪道（②至④）关闭。','示例：停车场繁忙。']},
    ko: {title:'운영 안내', note:'가상의 예시입니다. 실제 정보가 아니며 자동으로 갱신되지 않습니다.', hours:'운영 시간 (가상): 8:30–16:30', updated:'예시 갱신 시각 (가상): 8:00', choose:'예시 상황 바꾸기', scenarios:['정상 상황','강풍 상황','주차장 혼잡'], weather:'날씨', snow:'적설량', parking:'주차장', sunny:'맑음', windy:'강풍', spaces:'여유 있음', busy:'혼잡', lifts:'리프트', courses:'코스', names:['① 시라카바 코스','② 상고대 파노라마 코스','③ 야사와 스카이라인 코스','④ 야사와 익스트림 코스'], running:'운행 중', stopped:'운휴', open:'활주 가능', closed:'폐쇄', notice:'공지 (예시)', mapLink:'지도에서 리프트 위치 보기 →', messages:['예시: 모든 리프트와 코스를 이용할 수 있습니다.','강풍 예시: 리프트 2개(L2·L3)와 코스 3개(②~④)를 운영하지 않습니다.','예시: 주차장이 혼잡합니다.']}
  };
  const q = (sel) => root.querySelector(sel);
  const set = (sel, text) => { q(sel).textContent = text; };
  function render() {
    const t = copy[window.siteLanguage] || copy.ja;
    const wind = scenario.value === 'wind', busy = scenario.value === 'busy';
    set('#status-title', t.title); set('.sample-note', t.note); set('.status-hours', t.hours); set('.report-meta span', t.updated);
    set('.sample-controls label', t.choose);
    Array.from(scenario.options).forEach((o,i) => o.textContent = t.scenarios[i]);
    const headings = root.querySelectorAll('.report-grid dt'); [t.weather,t.snow,t.parking].forEach((v,i)=>headings[i].textContent=v);
    set('#report-weather',wind ? t.windy : t.sunny); set('#report-parking',busy ? t.busy : t.spaces);
    const cols = root.querySelectorAll('.report-columns h3'); cols[0].textContent=t.lifts; cols[1].textContent=t.courses;
    root.querySelectorAll('.report-columns section:nth-child(2) li span').forEach((el,i)=>el.textContent=t.names[i]);
    for (let i=1;i<=3;i++) { const el=q('#lift-'+i); el.textContent=wind && i>1 ? t.stopped : t.running; el.classList.toggle('stopped',wind && i>1); }
    for (let i=1;i<=4;i++) { const el=q('#course-'+i); el.textContent=wind && i>1 ? t.closed : t.open; el.classList.toggle('stopped',wind && i>1); }
    set('.report-map-link a',t.mapLink); set('.report-notice strong',t.notice); set('#report-message',t.messages[wind ? 1 : busy ? 2 : 0]);
  }
  root.querySelector('.sample-controls').hidden=false;
  q('#report-message').setAttribute('aria-live','polite');
  scenario.addEventListener('change',render);
  document.querySelector('#language').addEventListener('change',render);
  render();
})();
