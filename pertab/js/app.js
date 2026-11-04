(function () {
  'use strict';

  var ELEMENTS = window.ELEMENTS;
  var CATEGORIES = window.CATEGORIES;
  var CAT_ORDER = ['alkali', 'alkaline', 'transition', 'lanthanide', 'actinide',
                   'post', 'metalloid', 'nonmetal', 'noble', 'unknown'];
  var DEFAULT_Z = 54;               // какой элемент показан в панели в состоянии покоя

  var root = document.documentElement;
  var BASE_TITLE = document.title;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrowQuery = window.matchMedia('(max-width: 900px)');
  var NBSP = ' ';

  function $(id) { return document.getElementById(id); }

  /* ---------------------------------------------------------------
   * Положение элемента в сетке (строка, столбец).
   * Строки 1–7 — основная таблица, 8 — пустой промежуток,
   * 9 и 10 — лантаноиды и актиноиды.
   * ------------------------------------------------------------- */
  function pos(z) {
    if (z === 1) return [1, 1];
    if (z === 2) return [1, 18];
    if (z <= 4) return [2, z - 2];
    if (z <= 10) return [2, z + 8];
    if (z <= 12) return [3, z - 10];
    if (z <= 18) return [3, z];
    if (z <= 36) return [4, z - 18];
    if (z <= 54) return [5, z - 36];
    if (z <= 57) return [6, z - 54];
    if (z <= 71) return [9, z - 54];
    if (z <= 86) return [6, z - 68];
    if (z <= 89) return [7, z - 86];
    if (z <= 103) return [10, z - 86];
    return [7, z - 100];
  }

  /* ---------- Форматирование ---------- */
  function fmtNum(v) {
    return String(v).replace('.', ',').replace('-', '−');
  }
  function fmtMass(m) {
    return (typeof m === 'string' ? m : fmtNum(m)) + NBSP + 'а. е. м.';
  }
  function fmtTemp(v) {
    if (typeof v === 'string') return v.replace(/-/g, '−');
    return fmtNum(v) + NBSP + '°C';
  }
  function massNumber(el) {
    if (typeof el.mass === 'string') return parseInt(el.mass.replace(/\D/g, ''), 10);
    return Math.round(el.mass);
  }
  function plural(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return n + ' элемент';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return n + ' элемента';
    return n + ' элементов';
  }
  function shellsOf(z) {
    return typeof window.electronShells === 'function' ? window.electronShells(z) : [];
  }

  /* ---------------------------------------------------------------
   * Тема
   * ------------------------------------------------------------- */
  var themeBtn = $('theme-toggle');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (metaTheme) metaTheme.setAttribute('content', t === 'dark' ? '#0f1115' : '#ffffff');
    var label = t === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.setAttribute('title', label);
    if (persist) {
      try { localStorage.setItem('theme', t); } catch (e) { /* хранилище недоступно */ }
    }
  }

  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);

  themeBtn.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  // Если пользователь не выбирал тему сам — следуем настройке системы
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystem = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
      if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystem);
    else if (mq.addListener) mq.addListener(onSystem);
  }

  /* ---------------------------------------------------------------
   * Состояние
   *   z      — выбранный элемент (0 = состояние покоя)
   *   group  — закреплённая группа (кнопка легенды)
   *   hover  — группа под курсором в легенде (временная подсветка)
   *   panelZ — элемент, который показан в панели
   * ------------------------------------------------------------- */
  var state = { z: 0, group: null, hover: null, panelZ: DEFAULT_Z, mode: 'element' };

  var tableEl = $('table');
  var infoEl = $('info');
  var groupEl = $('group');
  var cells = [];
  var chips = [];
  var grid = {};            // grid[row][col] = z

  function buildTable() {
    var frag = document.createDocumentFragment();
    ELEMENTS.forEach(function (el) {
      var p = pos(el.z);
      el.row = p[0];
      el.col = p[1];
      (grid[el.row] = grid[el.row] || {})[el.col] = el.z;

      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cell c-' + el.cat;
      b.dataset.z = el.z;
      b.tabIndex = -1;
      b.style.gridRow = String(el.row);
      // после 3-й группы в сетке стоит узкий зазор — сдвигаем столбцы
      b.style.gridColumn = String(el.col <= 3 ? el.col : el.col + 1);
      b.style.setProperty('--d', (el.row + el.col) * 16 + 'ms');
      b.setAttribute('aria-label', el.name + ', ' + el.sym + ', номер ' + el.z + ', ' + CATEGORIES[el.cat].name.toLowerCase());
      b.setAttribute('aria-pressed', 'false');
      b.title = el.name;
      b.innerHTML = '<span class="n">' + el.z + '</span><span class="s">' + el.sym + '</span><span class="nm">' + el.name + '</span>';
      cells.push(b);
      frag.appendChild(b);
    });
    tableEl.appendChild(frag);
  }

  function neighbor(el, dr, dc) {
    var r, c, best, bestD, row;
    if (dr === 0) {
      row = grid[el.row] || {};
      for (c = el.col + dc; c >= 1 && c <= 18; c += dc) if (row[c]) return ELEMENTS[row[c] - 1];
      return null;
    }
    for (r = el.row + dr; r >= 1 && r <= 10; r += dr) {
      row = grid[r];
      if (!row) continue;
      best = null; bestD = 99;
      for (c in row) {
        if (Math.abs(c - el.col) < bestD) { bestD = Math.abs(c - el.col); best = row[c]; }
      }
      if (best) return ELEMENTS[best - 1];
    }
    return null;
  }

  /* ---------- Подсветка группы ---------- */
  function activeCat() {
    if (state.hover) return state.hover;
    if (state.group) return state.group;
    if (state.z) return ELEMENTS[state.z - 1].cat;
    return null;           // состояние покоя — ничего не затемняем
  }

  function updateHighlight() {
    var cat = activeCat();
    var i;
    for (i = 0; i < cells.length; i++) {
      var c = cells[i];
      if (!cat) {
        c.classList.remove('dim');
        c.classList.remove('hl');
        continue;
      }
      var same = ELEMENTS[i].cat === cat;
      c.classList.toggle('dim', !same);
      c.classList.toggle('hl', same && state.z !== i + 1);
    }
    for (i = 0; i < chips.length; i++) {
      chips[i].setAttribute('aria-pressed', chips[i].dataset.cat === state.group ? 'true' : 'false');
    }
  }

  // единственная ячейка таблицы, на которую попадает Tab
  function syncTab() {
    var t = state.z ? state.z - 1 : 0;
    for (var i = 0; i < cells.length; i++) cells[i].tabIndex = i === t ? 0 : -1;
  }

  function deselect() {
    if (state.z && cells[state.z - 1]) {
      cells[state.z - 1].classList.remove('selected');
      cells[state.z - 1].setAttribute('aria-pressed', 'false');
    }
    state.z = 0;
  }

  function setHash(h) {
    try { history.replaceState(null, '', h ? '#' + h : location.pathname + location.search); } catch (e) { /* ignore */ }
  }

  /* ---------- Панель: элемент ---------- */
  function renderElement(el) {
    var cat = CATEGORIES[el.cat];
    state.panelZ = el.z;
    $('el-name').textContent = el.name;
    $('el-sym').textContent = el.sym;
    $('el-z').textContent = el.z;
    $('el-cat').textContent = cat.name;
    $('el-dot').className = 'dot c-' + el.cat;
    $('el-desc').textContent = el.info;
    $('p-sym').textContent = el.sym;
    $('p-mass').textContent = fmtMass(el.mass);

    // свойства без данных просто не показываем
    var hasMp = el.mp !== null && el.mp !== undefined && el.mp !== '';
    var hasBp = el.bp !== null && el.bp !== undefined && el.bp !== '';
    $('r-mp').hidden = !hasMp;
    $('r-bp').hidden = !hasBp;
    if (hasMp) $('p-mp').textContent = fmtTemp(el.mp);
    if (hasBp) $('p-bp').textContent = fmtTemp(el.bp);

    $('p-shells').textContent = shellsOf(el.z).join(', ');
    $('p-who').textContent = el.who;
    $('p-year').textContent = el.year;
    $('mass-note').hidden = typeof el.mass !== 'string';
  }

  /* ---------- Панель: группа ---------- */
  function renderGroup(cat) {
    var c = CATEGORIES[cat];
    var members = ELEMENTS.filter(function (e) { return e.cat === cat; });

    $('g-title').textContent = c.name;
    $('g-dot').className = 'dot c-' + cat;
    $('g-sub').textContent = 'Группа элементов';
    $('g-desc').textContent = c.desc;
    $('g-count').textContent = String(members.length);
    $('g-where').textContent = c.where;

    var traits = $('g-traits');
    traits.innerHTML = '';
    (c.traits || []).forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      traits.appendChild(li);
    });

    var list = $('g-list');
    list.innerHTML = '';
    members.forEach(function (e) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'member c-' + cat;
      b.title = e.name;
      b.setAttribute('aria-label', e.name + ', ' + e.sym);
      var sym = document.createElement('span');
      sym.textContent = e.sym;
      var num = document.createElement('small');
      num.textContent = String(e.z);
      b.appendChild(sym);
      b.appendChild(num);
      b.addEventListener('click', function () { select(e.z, { scroll: true }); });
      list.appendChild(b);
    });
  }

  function setMode(m) {
    state.mode = m;
    var show = m === 'group' ? groupEl : infoEl;
    var hide = m === 'group' ? infoEl : groupEl;
    hide.hidden = true;
    show.hidden = false;
    show.classList.remove('swap');
    void show.offsetWidth;                 // перезапуск анимации появления
    show.classList.add('swap');
    $('panel-body').scrollTop = 0;
  }

  function scrollToPanel() {
    if (narrowQuery.matches) {
      $('panel').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /* ---------- Действия ---------- */
  function select(z, opts) {
    opts = opts || {};
    var el = ELEMENTS[z - 1];
    if (!el) return;

    deselect();
    state.z = z;
    state.group = null;
    var cell = cells[z - 1];
    cell.classList.add('selected');
    cell.setAttribute('aria-pressed', 'true');
    syncTab();
    if (opts.focus) cell.focus();

    updateHighlight();
    renderElement(el);
    try { bohr.setElement(el); } catch (err) { if (window.console) console.error(err); }
    setMode('element');

    document.title = el.name + ' (' + el.sym + ') — ' + BASE_TITLE;
    if (opts.hash !== false) setHash(el.sym);
    if (opts.scroll) scrollToPanel();
  }

  function pinGroup(cat, opts) {
    opts = opts || {};
    if (state.group === cat) { rest(); return; }
    deselect();
    state.group = cat;
    syncTab();
    updateHighlight();
    renderGroup(cat);
    setMode('group');
    document.title = CATEGORIES[cat].name + ' — ' + BASE_TITLE;
    setHash('');
    if (opts.scroll) scrollToPanel();
  }

  // состояние покоя: ничего не выбрано, все цвета на месте
  function rest() {
    deselect();
    state.group = null;
    syncTab();
    updateHighlight();
    if (state.mode === 'group') setMode('element');
    document.title = BASE_TITLE;
    setHash('');
  }

  /* ---------- События таблицы ---------- */
  tableEl.addEventListener('click', function (e) {
    var cell = e.target.closest('.cell');
    if (!cell) return;
    select(+cell.dataset.z, { scroll: true });
  });

  tableEl.addEventListener('keydown', function (e) {
    var d = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
    if (!d) return;
    var from = e.target.closest ? e.target.closest('.cell') : null;
    var z = from ? +from.dataset.z : state.z;
    if (!z) return;
    var next = neighbor(ELEMENTS[z - 1], d[0], d[1]);
    if (next) {
      e.preventDefault();
      select(next.z, { focus: true });
    }
  });

  // клик по свободному месту и Esc возвращают таблицу в состояние покоя
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.cell, .chip, .panel, .theme-btn, a, button, input')) return;
    if (state.z || state.group) rest();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && (state.z || state.group)) rest();
  });

  /* ---------- Легенда ---------- */
  function buildLegend() {
    var ul = $('legend');
    CAT_ORDER.forEach(function (cat) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip c-' + cat;
      b.dataset.cat = cat;
      b.setAttribute('aria-pressed', 'false');
      var dot = document.createElement('span');
      dot.className = 'dot';
      var label = document.createElement('span');
      label.textContent = CATEGORIES[cat].name;
      b.appendChild(dot);
      b.appendChild(label);
      b.addEventListener('mouseenter', function () { state.hover = cat; updateHighlight(); });
      b.addEventListener('mouseleave', function () { state.hover = null; updateHighlight(); });
      b.addEventListener('focus', function () { state.hover = cat; updateHighlight(); });
      b.addEventListener('blur', function () { state.hover = null; updateHighlight(); });
      b.addEventListener('click', function () { pinGroup(cat, { scroll: true }); });
      chips.push(b);
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  // клик по названию группы в карточке элемента открывает карточку группы
  $('el-catbtn').addEventListener('click', function () {
    pinGroup(ELEMENTS[state.panelZ - 1].cat);
  });

  /* ---------------------------------------------------------------
   * Изменение ширины правой колонки
   * ------------------------------------------------------------- */
  (function () {
    var handle = $('resizer');
    var panel = $('panel');
    var MIN = 240;
    var dragging = false;

    function maxW() { return Math.min((root.clientWidth || window.innerWidth) * 0.6, 900); }
    function setW(px, persist) {
      px = Math.max(MIN, Math.min(maxW(), px));
      root.style.setProperty('--panel-w', px + 'px');
      if (persist) { try { localStorage.setItem('panelW', String(Math.round(px))); } catch (e) { /* ignore */ } }
      return px;
    }

    handle.addEventListener('pointerdown', function (e) {
      dragging = true;
      handle.classList.add('active');
      document.body.classList.add('resizing');
      try { handle.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      e.preventDefault();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      setW((root.clientWidth || window.innerWidth) - e.clientX, false);
    });
    function stop(e) {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('active');
      document.body.classList.remove('resizing');
      setW((root.clientWidth || window.innerWidth) - e.clientX, true);
    }
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', function () {
      dragging = false;
      handle.classList.remove('active');
      document.body.classList.remove('resizing');
    });

    handle.addEventListener('keydown', function (e) {
      var cur = panel.getBoundingClientRect().width;
      if (e.key === 'ArrowLeft') { e.preventDefault(); setW(cur + 24, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setW(cur - 24, true); }
    });

    handle.addEventListener('dblclick', function () {
      root.style.removeProperty('--panel-w');
      try { localStorage.removeItem('panelW'); } catch (e) { /* ignore */ }
    });
  })();

  /* ---------------------------------------------------------------
   * Анимированная модель Бора (canvas, псевдо-3D)
   * ------------------------------------------------------------- */
  function Bohr(canvas) {
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, dpr = 1;
    var shells = [];
    var nucleons = [];
    var nuclearR = 8;
    var hue = 200;
    var grey = false;
    var yaw = 0.5, pitch = 0.45, spin = 0;
    var vYaw = 0, vPitch = 0;           // скорость вращения после броска, рад/с
    var AUTO = 0.22;                    // медленное вращение «в покое»
    var appear = 0;
    var last = 0;
    var dragging = false, lx = 0, ly = 0, lt = 0;
    var running = false;

    function rng(seed) {
      var a = seed * 2654435761 >>> 0;
      return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }

    function layout() {
      var maxR = Math.min(w, h) / 2 - 10;
      var n = shells.length;
      var inner = nuclearR + 16;
      for (var i = 0; i < n; i++) {
        shells[i].r = n === 1 ? (nuclearR + maxR) / 2 : inner + i * (maxR - inner) / (n - 1);
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      layout();
      if (!running || reduceMotion) draw();
    }

    this.setElement = function (el) {
      var counts = shellsOf(el.z);
      var A = massNumber(el);
      var N = Math.max(1, Math.min(A, 48));
      var p = Math.max(1, Math.round(N * el.z / A));
      if (p > N) p = N;
      hue = CATEGORIES[el.cat].hue;
      grey = el.cat === 'unknown';
      if (grey) hue = 215;

      nuclearR = 5 + 1.7 * Math.cbrt(N);
      var rand = rng(el.z + 7);
      var types = [];
      var i;
      for (i = 0; i < N; i++) types.push(i < p ? 1 : 0);
      for (i = N - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var t = types[i]; types[i] = types[j]; types[j] = t;
      }
      nucleons = [];
      var nr = nuclearR * 0.9 / Math.cbrt(N) + 0.5;
      for (i = 0; i < N; i++) {
        var y = 1 - 2 * (i + 0.5) / N;
        var rad = Math.sqrt(Math.max(0, 1 - y * y));
        var phi = i * 2.399963;
        var m = (N === 1 ? 0 : (nuclearR - nr) * Math.cbrt((i + 0.5) / N));
        nucleons.push({ x: Math.cos(phi) * rad * m, y: y * m, z: Math.sin(phi) * rad * m, r: nr, proton: types[i] === 1 });
      }

      shells = counts.map(function (c, k) {
        return {
          count: c,
          r: 0,
          tiltX: 1.0 + k * 0.62,
          tiltZ: k * 1.05,
          phase: rand() * Math.PI * 2,
          speed: 1.5 / Math.pow(k + 1, 0.75) * (k % 2 ? -1 : 1)
        };
      });
      appear = reduceMotion ? 1 : 0;
      layout();
      if (!running || reduceMotion) draw();
    };

    /* поворот точки и перспективная проекция */
    function project(x, y, z, s) {
      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      var x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      var cp = Math.cos(pitch), sp = Math.sin(pitch);
      var y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      var f = 1 / (1 - z2 / (Math.min(w, h) * 1.6));
      s.x = w / 2 + x1 * f;
      s.y = h / 2 + y1 * f;
      s.z = z2;
      s.f = f;
    }

    function ease() { var a = 1 - appear; return 1 - a * a * a; }

    function orbitPoint(sh, ang, out) {
      var e = ease();
      var x = sh.r * Math.cos(ang) * e;
      var y = sh.r * Math.sin(ang) * e;
      var cx = Math.cos(sh.tiltX), sx = Math.sin(sh.tiltX);
      var y1 = y * cx, z1 = y * sx;
      var cz = Math.cos(sh.tiltZ), sz = Math.sin(sh.tiltZ);
      project(x * cz - y1 * sz, x * sz + y1 * cz, z1, out);
    }

    function draw() {
      if (!w) return;
      var dark = root.getAttribute('data-theme') === 'dark';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var items = [];
      var tmp = { x: 0, y: 0, z: 0, f: 1 };
      var i, k, sh, e = ease();

      // орбиты
      ctx.lineWidth = 1;
      ctx.strokeStyle = dark ? 'rgba(220,226,245,.28)' : 'rgba(40,48,70,.26)';
      for (i = 0; i < shells.length; i++) {
        sh = shells[i];
        ctx.beginPath();
        for (k = 0; k <= 72; k++) {
          orbitPoint(sh, k / 72 * Math.PI * 2, tmp);
          if (k === 0) ctx.moveTo(tmp.x, tmp.y); else ctx.lineTo(tmp.x, tmp.y);
        }
        ctx.stroke();
      }

      // электроны
      var eColor = 'hsl(' + hue + ',' + (grey ? 20 : 88) + '%,' + (dark ? 66 : 48) + '%)';
      for (i = 0; i < shells.length; i++) {
        sh = shells[i];
        var er = Math.max(1.6, Math.min(3.6, (2 * Math.PI * sh.r) / sh.count / 2.5));
        for (k = 0; k < sh.count; k++) {
          orbitPoint(sh, sh.phase + k / sh.count * Math.PI * 2, tmp);
          items.push({ x: tmp.x, y: tmp.y, z: tmp.z, r: er * tmp.f, kind: 'e' });
        }
      }

      // нуклоны
      var cs = Math.cos(spin), ss = Math.sin(spin);
      for (i = 0; i < nucleons.length; i++) {
        var n = nucleons[i];
        project((n.x * cs + n.z * ss) * e, n.y * e, (-n.x * ss + n.z * cs) * e, tmp);
        items.push({ x: tmp.x, y: tmp.y, z: tmp.z, r: n.r * tmp.f * (0.4 + 0.6 * e), kind: n.proton ? 'p' : 'n' });
      }

      items.sort(function (a, b) { return a.z - b.z; });

      for (i = 0; i < items.length; i++) {
        var it = items[i];
        var depth = Math.max(0.55, Math.min(1, 0.8 + it.z / (Math.min(w, h) * 1.2)));
        ctx.globalAlpha = depth;
        var base, light;
        if (it.kind === 'e') { base = eColor; light = '#ffffff'; }
        else if (it.kind === 'p') { base = dark ? '#ff6b6b' : '#e5383b'; light = '#ffd0d0'; }
        else { base = dark ? '#7aa2ff' : '#4a6fe3'; light = '#d6e0ff'; }
        var g = ctx.createRadialGradient(it.x - it.r * .35, it.y - it.r * .35, it.r * .1, it.x, it.y, it.r);
        g.addColorStop(0, light);
        g.addColorStop(0.35, base);
        g.addColorStop(1, base);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(it.x, it.y, Math.max(0.6, it.r), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame(t) {
      if (!running) return;
      var dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      // пока панель с атомом скрыта (открыта карточка группы) — не рисуем
      if (canvas.offsetParent !== null) {
        if (!dragging) {
          yaw += (AUTO + vYaw) * dt;
          pitch += vPitch * dt;
          var damp = Math.exp(-2.2 * dt);   // затухание «броска»
          vYaw *= damp;
          vPitch *= damp;
        }
        spin += 0.6 * dt;
        appear = Math.min(1, appear + dt / 0.7);
        for (var i = 0; i < shells.length; i++) shells[i].phase += shells[i].speed * dt;
        draw();
      }
      requestAnimationFrame(frame);
    }

    this.start = function () {
      if (reduceMotion || running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    };

    /* вращение: схватить мышью или пальцем и повернуть в любую сторону */
    function clampV(v) { return Math.max(-9, Math.min(9, v)); }

    canvas.addEventListener('pointerdown', function (e) {
      dragging = true;
      lx = e.clientX; ly = e.clientY; lt = performance.now();
      vYaw = 0; vPitch = 0;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var now = performance.now();
      var dtm = Math.max(0.004, (now - lt) / 1000);
      var dyaw = (e.clientX - lx) * 0.011;
      var dpitch = (e.clientY - ly) * 0.011;
      yaw += dyaw;
      pitch += dpitch;
      vYaw = clampV(0.6 * vYaw + 0.4 * (dyaw / dtm));
      vPitch = clampV(0.6 * vPitch + 0.4 * (dpitch / dtm));
      lx = e.clientX; ly = e.clientY; lt = now;
      if (!running) draw();
    });
    function endDrag() {
      dragging = false;
      if (performance.now() - lt > 90) { vYaw = 0; vPitch = 0; }   // остановились перед отпусканием
      if (!running) { vYaw = 0; vPitch = 0; }
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    // пересчёт размера (в том числе при изменении ширины колонки)
    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    resize();

    // перерисовка при смене темы (если анимация выключена)
    new MutationObserver(function () { if (!running) draw(); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  }

  var bohr = new Bohr($('bohr'));

  /* ---------------------------------------------------------------
   * Запуск
   * ------------------------------------------------------------- */
  buildTable();
  buildLegend();
  syncTab();

  function fromHash() {
    var h = decodeURIComponent(location.hash.replace(/^#/, '')).trim().toLowerCase();
    if (!h) return 0;
    if (/^\d+$/.test(h)) { var n = +h; return n >= 1 && n <= ELEMENTS.length ? n : 0; }
    for (var i = 0; i < ELEMENTS.length; i++) {
      if (ELEMENTS[i].sym.toLowerCase() === h || ELEMENTS[i].name.toLowerCase() === h) return ELEMENTS[i].z;
    }
    return 0;
  }

  // Состояние покоя: в панели показан элемент по умолчанию, но таблица не выделена.
  var startZ = fromHash();
  if (startZ) {
    select(startZ, { hash: false });
  } else {
    var def = ELEMENTS[DEFAULT_Z - 1];
    renderElement(def);
    bohr.setElement(def);
  }
  bohr.start();

  window.addEventListener('hashchange', function () {
    var z = fromHash();
    if (z && z !== state.z) select(z, { hash: false });
    else if (!z && !location.hash) rest();
  });
})();
