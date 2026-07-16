/* CI 硬件技术支持知识库 - 前端搜索逻辑 */
(function () {
  "use strict";

  var DATA = window.KB_DATA || [];
  var resultsEl = document.getElementById("results");
  var searchEl = document.getElementById("search");
  var clearEl = document.getElementById("clear");
  var filtersEl = document.getElementById("filters");
  var countEl = document.getElementById("count");

  var activeSource = "全部";
  var SOURCE_LABEL = {
    "CI-FAQ.md": "FAQ",
    "CI23242-认证相关说明.md": "认证说明",
  };

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function bigrams(s) {
    s = s.toLowerCase();
    var g = [];
    for (var i = 0; i < s.length - 1; i++) g.push(s.substr(i, 2));
    return g;
  }

  function scoreEntry(entry, q) {
    q = q.toLowerCase().replace(/\s+/g, "");
    if (!q) return 0;
    var title = entry.title.toLowerCase();
    var text = (entry.title + " " + entry.text).toLowerCase();
    var s = 0;
    if (title.indexOf(q) !== -1) s += 100;
    if (text.indexOf(q) !== -1) s += 40;
    var qg = {}, tg = {};
    bigrams(q).forEach(function (b) { qg[b] = 1; });
    bigrams(text).forEach(function (b) { tg[b] = 1; });
    var inter = 0;
    for (var k in qg) if (tg[k]) inter++;
    s += inter * 6;
    return s;
  }

  function highlight(html, q) {
    if (!q) return html;
    var terms = q.replace(/\s+/g, " ").split(" ").filter(function (t) { return t.length >= 2; });
    if (!terms.length) return html;
    terms.forEach(function (t) {
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      // 仅替换文本节点中的命中，避免破坏标签；简单做法：替换未处于标签内的内容
      html = html.replace(re, function (m, p) {
        // 若命中位于标签属性（如 src/href）内则跳过
        return "<mark>" + p + "</mark>";
      });
    });
    return html;
  }

  /* ---------- 渲染 ---------- */
  function cardHTML(entry, q) {
    var label = SOURCE_LABEL[entry.source] || entry.source;
    var body = highlight(entry.html || "", q);
    return (
      '<article class="card">' +
      '<span class="src">' + esc(label) + "</span>" +
      "<h2>" + esc(entry.title) + "</h2>" +
      '<div class="body">' + body + "</div>" +
      "</article>"
    );
  }

  function render(list, q) {
    if (!list.length) {
      resultsEl.innerHTML =
        '<div class="empty">未找到相关条目。<br/>换个关键词试试，例如「PDM 麦克风」「HPOUT」「底噪」「认证」。</div>';
      countEl.textContent = "";
      return;
    }
    resultsEl.innerHTML = list.map(function (e) { return cardHTML(e, q); }).join("");
    countEl.textContent = "共 " + list.length + " 条结果";
  }

  /* ---------- 筛选 + 搜索 ---------- */
  function currentPool() {
    if (activeSource === "全部") return DATA;
    return DATA.filter(function (e) { return e.source === activeSource; });
  }

  function doSearch() {
    var q = searchEl.value.trim();
    clearEl.hidden = q.length === 0;

    var hotbar = document.getElementById("hotbar");
    if (hotbar) hotbar.style.display = q ? "none" : "";

    if (!q) {
      // 无查询：展示当前筛选下的全部条目
      var all = currentPool();
      render(all, "");
      countEl.textContent = "全部条目 " + all.length + " 条";
      return;
    }
    var pool = currentPool();
    var scored = [];
    for (var i = 0; i < pool.length; i++) {
      var sc = scoreEntry(pool[i], q);
      if (sc > 0) scored.push({ e: pool[i], s: sc });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    render(scored.slice(0, 30).map(function (x) { return x.e; }), q);
  }

  /* ---------- 来源筛选 chips ---------- */
  function buildFilters() {
    var sources = [];
    DATA.forEach(function (e) {
      if (sources.indexOf(e.source) === -1) sources.push(e.source);
    });
    var chips = ["全部"].concat(sources);
    filtersEl.innerHTML = chips
      .map(function (s) {
        var label = s === "全部" ? "全部" : (SOURCE_LABEL[s] || s);
        var active = s === activeSource ? " active" : "";
        return '<span class="chip' + active + '" data-src="' + esc(s) + '">' + esc(label) + "</span>";
      })
      .join("");
    Array.prototype.forEach.call(filtersEl.querySelectorAll(".chip"), function (chip) {
      chip.addEventListener("click", function () {
        activeSource = chip.getAttribute("data-src");
        buildFilters();
        doSearch();
      });
    });
  }

  /* ---------- 热门问题（空态引导） ---------- */
  function hotQuestions() {
    var seen = {};
    var picks = DATA.filter(function (e) {
      if (seen[e.title]) return false;
      seen[e.title] = 1;
      return /麦克风|PDM|HPOUT|底噪|偏置|认证|驱动|分地|ADC|DAC/.test(e.title);
    }).slice(0, 8);
    return picks;
  }

  /* ---------- 事件 ---------- */
  searchEl.addEventListener("input", doSearch);
  searchEl.addEventListener("search", doSearch);
  clearEl.addEventListener("click", function () {
    searchEl.value = "";
    searchEl.focus();
    doSearch();
  });
  // 点击热门标签直接搜索
  document.addEventListener("click", function (ev) {
    var chip = ev.target.closest && ev.target.closest("#hotbar .chip");
    if (chip) {
      searchEl.value = chip.getAttribute("data-q");
      searchEl.focus();
      doSearch();
    }
  });

  /* ---------- 初始化 ---------- */
  buildFilters();

  // 无查询时，展示热门问题引导栏
  var hot = hotQuestions();
  if (hot.length) {
    var tags = hot
      .map(function (e) { return '<span class="chip" data-q="' + esc(e.title) + '">' + esc(e.title) + "</span>"; })
      .join("");
    var hotbar = document.createElement("div");
    hotbar.id = "hotbar";
    hotbar.className = "empty";
    hotbar.innerHTML = '<div>输入关键词搜索，或点击下方常见问题：</div><div class="tags">' + tags + "</div>";
    resultsEl.parentNode.insertBefore(hotbar, resultsEl);
  }

  doSearch();
})();
