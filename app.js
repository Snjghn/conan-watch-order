const LEGACY_STORAGE_KEY = "conan-tving-watch-state-v1";
const CONAN_STORAGE_KEY = "conan-tving-watch-state-v2";
const KAITO_STORAGE_KEY = "kaito-tving-watch-state-v1";
const NINJAGO_STORAGE_KEY = "ninjago-netflix-watch-state-v1";
const ACTIVE_LIBRARY_KEY = "conan-tving-active-library-v1";
const HISTORY_LIMIT = 50;
const LEGACY_INSERT_SHIFT_AFTER_NO = 68;
const LEGACY_INSERT_SHIFT_COUNT = 3;
const THEATER_MOVIE_FILTER = "__theater_movies__";
const BLACK_ORG_FILTER = "__black_organization__";
const KAITO_KID_FILTER = "__kaito_kid__";
const ORIGINAL_SOURCE_FILTER = "__original_source__";
const ANIME_ORIGINAL_FILTER = "__anime_original__";
const SOURCE_GROUP_FILTERS = new Set([
  THEATER_MOVIE_FILTER,
  BLACK_ORG_FILTER,
  KAITO_KID_FILTER,
  ORIGINAL_SOURCE_FILTER,
  ANIME_ORIGINAL_FILTER,
]);
const MARK_WATCHED = "O";
const MARK_SKIPPED = "X";
const STORED_SKIPPED_VALUE = "x";

function numberRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const THEATER_MOVIE_CODES = new Set([
  "M000377856",
  "M000378462",
  "M000379863",
  "M000371574",
  "M000369266",
  "M000153633",
  "M000369265",
  "M000360290",
  "M000125309",
  "M000360289",
  "M000165637",
  "M000223334",
  "M000361846",
  "M000125288",
  "M000369746",
  "M000153634",
  "M000358033",
  "M000360293",
  "M000125285",
  "M000146339",
  "M000150735",
  "M000361938",
  "M000255135",
  "M000360237",
  "M000364801",
  "M000370665",
  "M000374738",
  "M000376658",
  "M000377287",
  "M000377908",
  "M000379298",
]);

const BLACK_ORG_OFFICIAL_NOS = new Set([
  1,
  52,
  54,
  68,
  128,
  129,
  ...numberRange(176, 178),
  ...numberRange(230, 231),
  272,
  ...numberRange(289, 290),
  ...numberRange(307, 311),
  345,
  418,
  425,
  435,
  ...numberRange(462, 465),
  ...numberRange(491, 504),
  ...numberRange(579, 581),
  ...numberRange(667, 668),
  ...numberRange(671, 675),
  681,
  683,
  ...numberRange(700, 706),
  723,
  734,
  739,
  751,
  ...numberRange(770, 771),
  ...numberRange(779, 783),
  792,
  813,
  ...numberRange(863, 864),
  ...numberRange(866, 867),
  ...numberRange(941, 942),
  953,
  995,
  1004,
  1018,
  1035,
  ...numberRange(1045, 1046),
  1072,
  ...numberRange(1077, 1079),
]);

const BLACK_ORG_CODES = new Set([
  "M000369266",
  "M000361846",
  "M000361847",
  "M000360293",
  "M000146339",
  "M000361938",
  "M000360237",
  "M000370665",
  "M000374738",
  "M000376658",
  "M000379122",
  "M000379298",
]);

const KAITO_KID_OFFICIAL_NOS = new Set([
  76,
  ...numberRange(132, 134),
  219,
  356,
  ...numberRange(394, 396),
  ...numberRange(469, 470),
  473,
  479,
  515,
  ...numberRange(537, 538),
  571,
  ...numberRange(585, 587),
  ...numberRange(627, 628),
  ...numberRange(701, 704),
  ...numberRange(724, 725),
  ...numberRange(746, 747),
  766,
  780,
  804,
  ...numberRange(887, 888),
  928,
  ...numberRange(983, 984),
  ...numberRange(1071, 1072),
  ...numberRange(1105, 1106),
  ...numberRange(1150, 1151),
  ...numberRange(1193, 1194),
]);

const KAITO_KID_CODES = new Set([
  "M000379863",
  "M000360290",
  "M000360289",
  "M000125288",
  "M000358033",
  "M000125285",
  "M000255135",
  "M000377287",
  "M000377908",
]);

const KAITO_KID_ITEM_NOS = new Set([228.1, 390.1, 480.1, 633.1]);

const JAPAN_SPLIT_GROUPS = [
  { officialNo: 11, items: [11, 12] },
  { officialNo: 52, items: [53, 54] },
  { officialNo: 76, items: [79, 80] },
  { officialNo: 96, items: [100, 101, 102, 103] },
  { officialNo: 118, items: [126, 127] },
  { officialNo: 129, items: [138, 139, 140, 141] },
  { officialNo: 162, items: [175, 176] },
  { officialNo: 174, items: [188, 189, 190, 191] },
  { officialNo: 184, items: [201, 202] },
  { officialNo: 208, items: [227, 228] },
  { officialNo: 219, items: [239, 240, 241, 242] },
  { officialNo: 263, items: [287, 288, 289, 290] },
  { officialNo: 304, items: [332, 333, 334, 335] },
  { officialNo: 342, items: [374, 375] },
  { officialNo: 345, items: [378, 379, 380, 381, 382] },
  { officialNo: 356, items: [393, 394] },
  { officialNo: 383, items: [422, 423, 424, 425] },
  { officialNo: 425, items: [468, 469, 470, 471, 472] },
  { officialNo: 449, items: [497, 498] },
  { officialNo: 452, items: [501, 502] },
  { officialNo: 479, items: [530, 531, 532, 533] },
  { officialNo: 487, items: [541, 542] },
  { officialNo: 488, items: [543, 544] },
  { officialNo: 489, items: [545, 546] },
  { officialNo: 490, items: [547, 548] },
  { officialNo: 515, items: [574, 575] },
  { officialNo: 516, items: [576, 577] },
  { officialNo: 521, items: [580, 581] },
  { officialNo: 522, items: [582, 583] },
  { officialNo: 651, items: [716, 717] },
  { officialNo: 734, items: [802, 803] },
  { officialNo: 804, items: [876, 877] },
  { officialNo: 805, items: [878, 879] },
  { officialNo: 1187, items: [1266, 1267] },
];

const JAPAN_SPLIT_BY_ITEM_NO = new Map();
for (const group of JAPAN_SPLIT_GROUPS) {
  group.items.forEach((itemNo, index) => {
    JAPAN_SPLIT_BY_ITEM_NO.set(itemNo, {
      officialNo: group.officialNo,
      isFirst: index === 0,
    });
  });
}

const HOUR_SPECIAL_ITEM_NOS = new Set(JAPAN_SPLIT_GROUPS.flatMap((group) => group.items));

const JAPAN_OFFICIAL_RANGES_BY_CODE = new Map([
  ["M000365014", { start: 927, end: 928 }],
  ["M000366877", { start: 965, end: 968 }],
  ["M000366879", { start: 1000, end: 1001 }],
  ["M000379122", { start: 1164, end: 1167 }],
]);

const JAPAN_FORCED_OFFICIAL_NO_BY_ITEM_NO = new Map([
  [579, 520],
  [968, 893],
  [975, 899],
]);

const JAPAN_UNNUMBERED_TVA_ITEM_NOS = new Set([
  1154,
  1283,
]);

const LIBRARIES = {
  conan: {
    id: "conan",
    title: "티빙 코난 시청 순서",
    switchLabel: "목록 선택",
    cover:
      "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0400/ko/20241114/0538/P001682448.jpg/dims/resize/500",
    items: Array.isArray(window.CONAN_ITEMS) ? window.CONAN_ITEMS : [],
    storageKey: CONAN_STORAGE_KEY,
    alternateTitleHeader: "일본어 제목",
    sourceHeader: "티빙 작품명",
    originalHeader: "원작",
    sourceFieldLabel: "작품",
  },
  kaito: {
    id: "kaito",
    title: "티빙 괴도키드 시청 순서",
    switchLabel: "목록 선택",
    cover:
      "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0400/ko/20250511/2005/P001771267.jpg/dims/resize/500",
    items: Array.isArray(window.KAITO_ITEMS) ? window.KAITO_ITEMS : [],
    storageKey: KAITO_STORAGE_KEY,
    alternateTitleHeader: "일본어 제목",
    sourceHeader: "티빙 작품명",
    originalHeader: "원작",
    sourceFieldLabel: "작품",
  },
  ninjago: {
    id: "ninjago",
    title: "닌자고 전체 시청 순서",
    switchLabel: "목록 선택",
    cover:
      "https://occ-0-4796-993.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSAYeCxdkezjQgTN6DctXEORWq8_8gDnnL13Ag5qAP3DVluFtLtJ3ZeRAoAXvn2YWf4tCD0L4TkcXF9VmoYrWVMg_dnBWLJu921N.jpg?r=87a",
    items: Array.isArray(window.NINJAGO_ITEMS) ? window.NINJAGO_ITEMS : [],
    storageKey: NINJAGO_STORAGE_KEY,
    alternateTitleHeader: "영어 제목",
    sourceHeader: "작품명",
    originalHeader: "공개일",
    sourceFieldLabel: "시즌/작품",
  },
};

let activeLibraryId = readInitialLibraryId();
let items = activeLibrary().items;
let orderMeta = buildOrderMeta(items, activeLibraryId);
let displayNumbers = orderMeta.displayNumbers;
let rangeBounds = orderMeta.rangeBounds;
let tvaItemCount = orderMeta.maxOrderNo;
const libraryStates = {};
let state = getLibraryState(activeLibraryId);

const els = {
  appTitle: document.querySelector("#appTitle"),
  libraryToggle: document.querySelector("#libraryToggle"),
  libraryDialog: document.querySelector("#libraryDialog"),
  libraryDialogClose: document.querySelector("#libraryDialogClose"),
  libraryChoices: [...document.querySelectorAll(".library-choice")],
  coverImage: document.querySelector("#coverImage"),
  watchedCount: document.querySelector("#watchedCount"),
  totalCount: document.querySelector("#totalCount"),
  visibleCount: document.querySelector("#visibleCount"),
  progressFill: document.querySelector("#progressFill"),
  searchInput: document.querySelector("#searchInput"),
  sourceFilter: document.querySelector("#sourceFilter"),
  sourceFieldLabel: document.querySelector("#sourceFieldLabel"),
  alternateTitleHeader: document.querySelector("#alternateTitleHeader"),
  sourceHeader: document.querySelector("#sourceHeader"),
  originalHeader: document.querySelector("#originalHeader"),
  segments: [...document.querySelectorAll(".segment")],
  bulkStart: document.querySelector("#bulkStart"),
  bulkEnd: document.querySelector("#bulkEnd"),
  bulkWatch: document.querySelector("#bulkWatch"),
  bulkClear: document.querySelector("#bulkClear"),
  clearAll: document.querySelector("#clearAll"),
  undoAction: document.querySelector("#undoAction"),
  redoAction: document.querySelector("#redoAction"),
  orderBody: document.querySelector("#orderBody"),
  emptyState: document.querySelector("#emptyState"),
  toast: document.querySelector("#toast"),
};

init();

function init() {
  syncLibraryChrome();
  populateSources();
  bindEvents();
  render();
}

function activeLibrary() {
  return LIBRARIES[activeLibraryId] || LIBRARIES.conan;
}

function readInitialLibraryId() {
  try {
    const saved = localStorage.getItem(ACTIVE_LIBRARY_KEY);
    return saved && LIBRARIES[saved] ? saved : "conan";
  } catch {
    return "conan";
  }
}

function getLibraryState(libraryId) {
  if (!libraryStates[libraryId]) {
    libraryStates[libraryId] = {
      watched: loadWatched(libraryId),
      undoStack: [],
      redoStack: [],
      query: "",
      source: "all",
      status: "all",
    };
  }
  return libraryStates[libraryId];
}

function switchLibrary(libraryId) {
  if (!LIBRARIES[libraryId] || activeLibraryId === libraryId) return;
  hideMarkMenu();
  activeLibraryId = libraryId;
  items = activeLibrary().items;
  orderMeta = buildOrderMeta(items, activeLibraryId);
  displayNumbers = orderMeta.displayNumbers;
  rangeBounds = orderMeta.rangeBounds;
  tvaItemCount = orderMeta.maxOrderNo;
  state = getLibraryState(activeLibraryId);
  localStorage.setItem(ACTIVE_LIBRARY_KEY, activeLibraryId);
  syncLibraryChrome();
  populateSources();
  render();
  showToast(activeLibrary().title);
}

function openLibraryDialog() {
  if (!els.libraryDialog) return;
  els.libraryChoices.forEach((choice) => {
    const selected = choice.dataset.library === activeLibraryId;
    choice.classList.toggle("is-active", selected);
    choice.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  els.libraryDialog.hidden = false;
  document.body.classList.add("modal-open");
  els.libraryDialogClose?.focus();
}

function closeLibraryDialog() {
  if (!els.libraryDialog) return;
  els.libraryDialog.hidden = true;
  document.body.classList.remove("modal-open");
  els.libraryToggle.focus();
}

function syncLibraryChrome() {
  const library = activeLibrary();
  document.body.dataset.library = library.id;
  document.title = library.title;
  els.appTitle.textContent = library.title;
  els.coverImage.src = library.cover;
  els.coverImage.alt = `${library.title} 표지`;
  els.libraryToggle.title = library.switchLabel;
  els.libraryToggle.setAttribute("aria-label", library.switchLabel);
  els.alternateTitleHeader.textContent = library.alternateTitleHeader;
  els.sourceHeader.textContent = library.sourceHeader;
  els.originalHeader.textContent = library.originalHeader;
  els.sourceFieldLabel.textContent = library.sourceFieldLabel;
  els.libraryChoices.forEach((choice) => {
    const selected = choice.dataset.library === library.id;
    choice.classList.toggle("is-active", selected);
    choice.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  els.totalCount.textContent = String(items.length);
  els.searchInput.value = state.query;
  els.segments.forEach((segment) =>
    segment.classList.toggle("is-active", segment.dataset.filter === state.status),
  );
}

function buildOrderMeta(list, libraryId = "conan") {
  if (libraryId !== "conan") {
    const numbers = new Map();
    const bounds = new Map();
    let maxOrderNo = 0;
    for (const item of list) {
      numbers.set(item.no, item.no);
      bounds.set(item.no, { start: item.no, end: item.no });
      maxOrderNo = Math.max(maxOrderNo, item.no);
    }
    return { displayNumbers: numbers, rangeBounds: bounds, maxOrderNo };
  }

  const numbers = new Map();
  const bounds = new Map();
  let officialNo = 0;
  let maxOrderNo = 0;

  for (const item of list) {
    const officialRange = JAPAN_OFFICIAL_RANGES_BY_CODE.get(contentCode(item));
    if (officialRange) {
      numbers.set(item.no, rangeLabel(officialRange));
      bounds.set(item.no, officialRange);
      officialNo = Math.max(officialNo, officialRange.end);
      maxOrderNo = Math.max(maxOrderNo, officialRange.end);
      continue;
    }

    if (isNonTvaItem(item)) {
      const between = officialNo + 0.5;
      numbers.set(item.no, "");
      bounds.set(item.no, { start: between, end: between });
      continue;
    }

    if (JAPAN_UNNUMBERED_TVA_ITEM_NOS.has(item.no)) {
      const between = officialNo + 0.5;
      numbers.set(item.no, "");
      bounds.set(item.no, { start: between, end: between });
      continue;
    }

    const split = JAPAN_SPLIT_BY_ITEM_NO.get(item.no);
    if (split) {
      numbers.set(item.no, split.isFirst ? split.officialNo : "");
      bounds.set(item.no, { start: split.officialNo, end: split.officialNo });
      officialNo = Math.max(officialNo, split.officialNo);
      maxOrderNo = Math.max(maxOrderNo, split.officialNo);
      continue;
    }

    officialNo = JAPAN_FORCED_OFFICIAL_NO_BY_ITEM_NO.get(item.no) ?? officialNo + 1;
    numbers.set(item.no, officialNo);
    bounds.set(item.no, { start: officialNo, end: officialNo });
    maxOrderNo = Math.max(maxOrderNo, officialNo);
  }

  return { displayNumbers: numbers, rangeBounds: bounds, maxOrderNo };
}

function rangeLabel(range) {
  return range.start === range.end ? String(range.start) : `${range.start}-${range.end}`;
}

function displayNo(item) {
  return displayNumbers.get(item.no) ?? item.no;
}

function orderRange(item) {
  return rangeBounds.get(item.no) ?? { start: item.no, end: item.no };
}

function storageKeyForLibrary(libraryId = activeLibraryId) {
  return LIBRARIES[libraryId]?.storageKey || CONAN_STORAGE_KEY;
}

function loadWatched(libraryId = activeLibraryId) {
  const current = readStorageObject(storageKeyForLibrary(libraryId));
  if (current) return current;

  if (libraryId !== "conan") return {};

  const legacy = readStorageObject(LEGACY_STORAGE_KEY);
  if (!legacy) return {};

  const migrated = {};
  for (const [key, value] of Object.entries(legacy)) {
    if (value !== true) continue;
    const legacyNo = Number(key);
    if (!Number.isInteger(legacyNo)) continue;
    const currentNo =
      legacyNo > LEGACY_INSERT_SHIFT_AFTER_NO ? legacyNo + LEGACY_INSERT_SHIFT_COUNT : legacyNo;
    const item = getItemByNo(currentNo);
    if (item) migrated[itemKey(item)] = true;
  }
  if (Object.keys(migrated).length > 0) {
    localStorage.setItem(storageKeyForLibrary(libraryId), JSON.stringify(migrated));
  }
  return migrated;
}

function readStorageObject(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    return saved && typeof saved === "object" ? saved : null;
  } catch {
    return null;
  }
}

function saveWatched() {
  localStorage.setItem(storageKeyForLibrary(), JSON.stringify(state.watched));
}

function populateSources() {
  const sourceFirstNo = new Map();
  for (const item of items) {
    if (!sourceFirstNo.has(item.source)) {
      sourceFirstNo.set(item.source, item.no);
    }
  }
  const sources = [...sourceFirstNo.keys()].sort((a, b) => compareSources(a, b, sourceFirstNo));
  els.sourceFilter.innerHTML = "";
  els.sourceFilter.append(new Option("전체", "all"));
  if (activeLibraryId === "conan") {
    els.sourceFilter.append(new Option("극장판 모음", THEATER_MOVIE_FILTER));
    els.sourceFilter.append(new Option("검은조직 모음", BLACK_ORG_FILTER));
    els.sourceFilter.append(new Option("괴도키드 모음", KAITO_KID_FILTER));
    els.sourceFilter.append(new Option("원작 모음", ORIGINAL_SOURCE_FILTER));
    els.sourceFilter.append(new Option("애니 오리지널 모음", ANIME_ORIGINAL_FILTER));
  }
  for (const source of sources) {
    els.sourceFilter.append(new Option(source, source));
  }
  if (![...els.sourceFilter.options].some((option) => option.value === state.source)) {
    state.source = "all";
  }
  els.sourceFilter.value = state.source;
}

function compareSources(a, b, sourceFirstNo) {
  const keyA = sourceSortKey(a, sourceFirstNo.get(a));
  const keyB = sourceSortKey(b, sourceFirstNo.get(b));
  if (keyA.group !== keyB.group) return keyA.group - keyB.group;
  if (keyA.order !== keyB.order) return keyA.order - keyB.order;
  return a.localeCompare(b, "ko");
}

function sourceSortKey(source, firstNo = 999999) {
  const movieNo = theaterMovieSourceNo(source);
  if (movieNo !== null) return { group: 0, order: movieNo };

  const unreleasedNo = unreleasedSourceNo(source);
  if (unreleasedNo !== null) return { group: 1, order: unreleasedNo };

  const tvaNo = tvaSourceNo(source);
  if (tvaNo !== null) return { group: 2, order: tvaNo };

  return { group: 3, order: Number(firstNo) || 999999 };
}

function theaterMovieSourceNo(source) {
  if (source.includes("세기말의 마술사")) return 3;
  if (source.includes("척안의 잔상")) return 28;

  const match = source.match(/극장판\s*(\d+)기/);
  return match ? Number(match[1]) : null;
}

function unreleasedSourceNo(source) {
  const match = source.match(/미공개\s*(?:X파일|사건)\s*(\d+)?/);
  if (!match) return null;
  return match[1] ? Number(match[1]) : 1;
}

function tvaSourceNo(source) {
  if (source === "명탐정 코난 (자막)") return 1;

  const seasonMatch = source.match(/^명탐정 코난\s+(\d+)기\s*\(자막\)$/);
  if (seasonMatch) return Number(seasonMatch[1]);

  const yearMatch = source.match(/^명탐정 코난\s+(20\d{2})\s*\(자막\)$/);
  if (yearMatch) return Number(yearMatch[1]);

  return null;
}

function bindEvents() {
  els.libraryToggle.addEventListener("click", openLibraryDialog);
  els.libraryDialogClose?.addEventListener("click", closeLibraryDialog);
  els.libraryDialog?.addEventListener("click", (event) => {
    if (event.target === els.libraryDialog) closeLibraryDialog();
  });
  els.libraryChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      switchLibrary(choice.dataset.library);
      closeLibraryDialog();
    });
  });

  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value.trim().toLowerCase();
    render();
  });

  els.sourceFilter.addEventListener("change", () => {
    state.source = els.sourceFilter.value;
    render();
  });

  for (const button of els.segments) {
    button.addEventListener("click", () => {
      state.status = button.dataset.filter;
      els.segments.forEach((segment) => segment.classList.toggle("is-active", segment === button));
      render();
      scrollToStatusBoundary(state.status);
    });
  }

  els.bulkWatch.addEventListener("click", () => setRangeWatched(true));
  els.bulkClear.addEventListener("click", () => setRangeWatched(false));
  els.undoAction.addEventListener("click", undoWatchedChange);
  els.redoAction.addEventListener("click", redoWatchedChange);

  els.clearAll.addEventListener("click", () => {
    const watchedCount = getWatchedCount();
    const skippedCount = getSkippedCount();
    const markedCount = getMarkedCount();
    if (markedCount === 0) {
      showToast("이미 모두 해제되어 있습니다.");
      return;
    }
    if (!confirm(`정말 전체 해제할까요?\n현재 O ${watchedCount}개, X ${skippedCount}개가 모두 해제됩니다.`)) return;
    const before = cloneWatched();
    state.watched = {};
    commitWatchedChange(before);
    showToast("전체 표시를 해제했습니다.");
  });

  els.orderBody.addEventListener("change", (event) => {
    const checkbox = event.target.closest("input[data-no]");
    if (!checkbox) return;
    setOne(Number(checkbox.dataset.no), checkbox.checked);
  });

  els.orderBody.addEventListener("contextmenu", (event) => {
    const control = event.target.closest(".watch-control");
    if (!control) return;
    event.preventDefault();
    showMarkMenu(Number(control.dataset.no), event.clientX, event.clientY);
  });

  document.addEventListener("click", (event) => {
    const menu = getMarkMenu(false);
    if (menu && !menu.contains(event.target)) hideMarkMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideMarkMenu();
      if (!els.libraryDialog?.hidden) closeLibraryDialog();
    }
  });
}

function setOne(no, watched) {
  setItemMark(no, watched ? MARK_WATCHED : "");
}

function setItemMark(no, mark) {
  const before = cloneWatched();
  const item = getItemByNo(no);
  if (!item) return;
  const key = itemKey(item);
  if (storedMarkToDisplay(before[key]) === mark) return;

  if (mark === MARK_WATCHED) state.watched[key] = true;
  else if (mark === MARK_SKIPPED) state.watched[key] = STORED_SKIPPED_VALUE;
  else delete state.watched[key];
  commitWatchedChange(before);
}

function getMarkMenu(create = true) {
  let menu = document.querySelector(".mark-menu");
  if (menu || !create) return menu;

  menu = document.createElement("div");
  menu.className = "mark-menu";
  menu.hidden = true;

  const skipped = document.createElement("button");
  skipped.type = "button";
  skipped.textContent = MARK_SKIPPED;
  skipped.addEventListener("click", () => {
    const no = Number(menu.dataset.no);
    hideMarkMenu();
    setItemMark(no, MARK_SKIPPED);
  });

  menu.append(skipped);
  document.body.append(menu);
  return menu;
}

function showMarkMenu(no, x, y) {
  if (!Number.isFinite(no)) return;
  const menu = getMarkMenu();
  menu.dataset.no = String(no);
  menu.hidden = false;
  menu.style.left = "0px";
  menu.style.top = "0px";

  const rect = menu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - rect.width - 8);
  const top = Math.min(y, window.innerHeight - rect.height - 8);
  menu.style.left = `${Math.max(8, left)}px`;
  menu.style.top = `${Math.max(8, top)}px`;
}

function hideMarkMenu() {
  const menu = getMarkMenu(false);
  if (menu) menu.hidden = true;
}

function setRangeWatched(watched) {
  const start = parseRangeValue(els.bulkStart.value);
  const end = parseRangeValue(els.bulkEnd.value);
  if (start === null || end === null) {
    showToast("from과 to를 입력해 주세요.");
    return;
  }

  const from = Math.min(start, end);
  const to = Math.max(start, end);
  const before = cloneWatched();
  let changed = 0;

  for (const item of items) {
    const range = orderRange(item);
    if (range.end < from || range.start > to) continue;
    const key = itemKey(item);
    const mark = storedMarkToDisplay(state.watched[key]);
    if (watched && mark !== MARK_WATCHED) {
      state.watched[key] = true;
      changed += 1;
    }
    if (!watched && mark !== "") {
      delete state.watched[key];
      changed += 1;
    }
  }

  els.bulkStart.value = String(from);
  els.bulkEnd.value = String(to);
  if (changed === 0) {
    showToast("변경할 항목이 없습니다.");
    return;
  }

  commitWatchedChange(before);
  showToast(`${from}번부터 ${to}번까지 ${watched ? "O로 표시" : "해제"}했습니다. 변경 ${changed}개.`);
}

function parseRangeValue(value) {
  if (String(value).trim() === "") return null;
  return clampNumber(Number(value), 1, tvaItemCount);
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function getWatchedCount() {
  return items.reduce((count, item) => count + (isWatchedItem(item) ? 1 : 0), 0);
}

function getSkippedCount() {
  return items.reduce((count, item) => count + (isSkippedItem(item) ? 1 : 0), 0);
}

function getMarkedCount() {
  return Object.keys(state.watched).length;
}

function getItemByNo(no) {
  return items[no - 1]?.no === no ? items[no - 1] : items.find((item) => item.no === no);
}

function itemKey(item) {
  return `${item.source}\u001f${item.title}`;
}

function itemMark(item) {
  return storedMarkToDisplay(state.watched[itemKey(item)]);
}

function storedMarkToDisplay(value) {
  if (value === true) return MARK_WATCHED;
  if (value === STORED_SKIPPED_VALUE || value === MARK_SKIPPED) return MARK_SKIPPED;
  return "";
}

function isWatchedItem(item) {
  return itemMark(item) === MARK_WATCHED;
}

function isSkippedItem(item) {
  return itemMark(item) === MARK_SKIPPED;
}

function cloneWatched(source = state.watched) {
  return { ...source };
}

function watchedEquals(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  return aKeys.length === bKeys.length && aKeys.every((key) => b[key] === a[key]);
}

function pushUndo(snapshot) {
  state.undoStack.push(snapshot);
  if (state.undoStack.length > HISTORY_LIMIT) state.undoStack.shift();
}

function commitWatchedChange(previousWatched) {
  if (watchedEquals(previousWatched, state.watched)) {
    updateHistoryButtons();
    return;
  }
  pushUndo(previousWatched);
  state.redoStack = [];
  saveWatched();
  render();
}

function undoWatchedChange() {
  if (state.undoStack.length === 0) {
    showToast("실행 취소할 작업이 없습니다.");
    return;
  }
  state.redoStack.push(cloneWatched());
  state.watched = state.undoStack.pop();
  saveWatched();
  render();
  showToast("실행 취소했습니다.");
}

function redoWatchedChange() {
  if (state.redoStack.length === 0) {
    showToast("실행 취소를 취소할 작업이 없습니다.");
    return;
  }
  pushUndo(cloneWatched());
  state.watched = state.redoStack.pop();
  saveWatched();
  render();
  showToast("실행 취소를 취소했습니다.");
}

function updateHistoryButtons() {
  els.undoAction.disabled = state.undoStack.length === 0;
  els.redoAction.disabled = state.redoStack.length === 0;
}

function scrollToStatusBoundary(status) {
  requestAnimationFrame(() => {
    const rows = els.orderBody.querySelectorAll ? [...els.orderBody.querySelectorAll("tr")] : [];
    let target = null;
    let align = "start";

    if (status === "unwatched") {
      target = rows[0];
    } else if (status === "watched") {
      target = rows[rows.length - 1];
      align = "end";
    } else if (status === "skipped") {
      target = rows[0];
    } else if (status === "all") {
      target = findNextUnwatchedBoundary(rows) || rows.find((row) => row.dataset.mark === "") || rows[rows.length - 1];
    }

    if (!target) return;
    scrollRowIntoPosition(target, align);
  });
}

function findNextUnwatchedBoundary(rows) {
  let hasWatchedBefore = false;
  for (const row of rows) {
    if (row.dataset.mark === MARK_SKIPPED) continue;
    if (row.dataset.mark === MARK_WATCHED) {
      hasWatchedBefore = true;
      continue;
    }
    if (hasWatchedBefore && row.dataset.mark === "") return row;
  }
  return null;
}

function scrollRowIntoPosition(row, align = "start") {
  const controlsHeight = document.querySelector(".controls")?.getBoundingClientRect().height || 0;
  const tableHeadHeight = document.querySelector("thead th")?.getBoundingClientRect().height || 0;
  const stickyOffset = controlsHeight + tableHeadHeight + 10;
  const rect = row.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const startTop = window.scrollY + rect.top - stickyOffset;
  const endTop = window.scrollY + rect.bottom - viewportHeight + 18;
  const top = align === "end" ? Math.max(startTop, endTop) : startTop;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

function getFilteredItems() {
  const query = state.query.replace(/\s+/g, "");
  return items.filter((item) => {
    const mark = itemMark(item);
    if (state.status === "watched" && mark !== MARK_WATCHED) return false;
    if (state.status === "skipped" && mark !== MARK_SKIPPED) return false;
    if (state.status === "unwatched" && mark !== "") return false;
    if (state.source === THEATER_MOVIE_FILTER && !isTheaterMovie(item)) return false;
    if (state.source === BLACK_ORG_FILTER && !isBlackOrganizationItem(item)) return false;
    if (state.source === KAITO_KID_FILTER && !isKaitoKidItem(item)) return false;
    if (state.source === ORIGINAL_SOURCE_FILTER && !hasOriginalSource(item)) return false;
    if (state.source === ANIME_ORIGINAL_FILTER && !isAnimeOriginalTva(item)) return false;
    if (state.source !== "all" && !SOURCE_GROUP_FILTERS.has(state.source) && item.source !== state.source) return false;
    if (!query) return true;
    const haystack = `${item.no}${displayNo(item)}${displayItemTitle(item)}${item.jpTitle || ""}${displayItemSource(item)}${item.original || ""}${item.linkType}`
      .toLowerCase()
      .replace(/\s+/g, "");
    return haystack.includes(query);
  });
}

function isNonTvaItem(item) {
  return contentCode(item) !== "" || item.category === "missing-movie" || item.category === "ova";
}

function isTheaterMovie(item) {
  if (activeLibraryId !== "conan") return false;
  const code = contentCode(item);
  if (code && THEATER_MOVIE_CODES.has(code)) return true;
  if (item.category === "missing-movie") return true;
  const label = `${item.title || ""} ${item.source || ""}`;
  return label.includes("극장판") && !label.includes("TV스페셜");
}

function formatTheaterMovieLabel(value) {
  const movieNo = theaterMovieSourceNo(String(value || ""));
  if (movieNo === null) return "";

  const title = String(value || "")
    .replace(/\s*-\s*극장판\s*\d+기\s*$/, "")
    .replace(/^명탐정\s*코난\s*(?:극장판)?\s*[：:]?\s*/, "")
    .trim();

  return title ? `명탐정코난 : ${title} - ${movieNo}기` : "";
}

function displayItemTitle(item) {
  if (!isTheaterMovie(item)) return item.title;
  return formatTheaterMovieLabel(item.title) || item.title;
}

function displayItemSource(item) {
  if (!isTheaterMovie(item)) return item.source;
  return formatTheaterMovieLabel(item.source) || formatTheaterMovieLabel(item.title) || item.source;
}

function contentCode(item) {
  const match = String(item.url || "").match(/\/contents\/(M\d+)/);
  return match ? match[1] : "";
}

function rangeIntersectsSet(range, set) {
  const start = Math.ceil(range.start);
  const end = Math.floor(range.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return false;

  for (let no = start; no <= end; no += 1) {
    if (set.has(no)) return true;
  }
  return false;
}

function isBlackOrganizationItem(item) {
  if (activeLibraryId !== "conan") return false;
  return rangeIntersectsSet(orderRange(item), BLACK_ORG_OFFICIAL_NOS) || BLACK_ORG_CODES.has(contentCode(item));
}

function isKaitoKidItem(item) {
  if (activeLibraryId !== "conan") return false;
  return (
    rangeIntersectsSet(orderRange(item), KAITO_KID_OFFICIAL_NOS) ||
    KAITO_KID_CODES.has(contentCode(item)) ||
    KAITO_KID_ITEM_NOS.has(item.no)
  );
}

function isHourSpecialItem(item) {
  if (activeLibraryId !== "conan") return false;
  return HOUR_SPECIAL_ITEM_NOS.has(item.no);
}

function hasOriginalSource(item) {
  return String(item.original || "").trim() !== "";
}

function isAnimeOriginalTva(item) {
  return !isNonTvaItem(item) && !hasOriginalSource(item);
}

function rowThemeClasses(item) {
  return [
    isSkippedItem(item) ? "is-skipped" : "",
    isNonTvaItem(item) ? "is-non-tva" : "",
    isKaitoKidItem(item) ? "is-kaito-kid" : "",
    isHourSpecialItem(item) ? "is-hour-special" : "",
    isBlackOrganizationItem(item) ? "is-black-organization" : "",
  ].filter(Boolean);
}

function render() {
  const visible = getFilteredItems();
  const watchedCount = getWatchedCount();
  const percent = items.length ? (watchedCount / items.length) * 100 : 0;

  els.watchedCount.textContent = String(watchedCount);
  els.visibleCount.textContent = String(visible.length);
  els.progressFill.style.width = `${percent}%`;
  els.emptyState.hidden = visible.length !== 0;
  updateHistoryButtons();

  const fragment = document.createDocumentFragment();
  for (const item of visible) {
    fragment.append(renderRow(item));
  }

  els.orderBody.replaceChildren(fragment);
}

function renderRow(item) {
  const markValue = itemMark(item);
  const watched = markValue === MARK_WATCHED;
  const skipped = markValue === MARK_SKIPPED;
  const themeClasses = rowThemeClasses(item);
  const shownNo = displayNo(item);
  const tr = document.createElement("tr");
  tr.className = [watched ? "is-watched" : "", ...themeClasses].filter(Boolean).join(" ");
  tr.dataset.no = String(item.no);
  tr.dataset.mark = markValue;
  tr.dataset.watched = watched ? "true" : "false";

  const no = document.createElement("td");
  no.className = "row-no";
  no.textContent = shownNo === "" ? "" : String(shownNo);

  const checkCell = document.createElement("td");
  checkCell.className = "col-check";
  const label = document.createElement("label");
  label.className = ["watch-control", skipped ? "is-skipped" : ""].filter(Boolean).join(" ");
  label.dataset.no = String(item.no);
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = watched;
  input.dataset.no = String(item.no);
  input.setAttribute("aria-label", `${item.no}번 시청 체크`);
  const mark = document.createElement("span");
  mark.className = "watch-mark";
  mark.textContent = skipped ? MARK_SKIPPED : MARK_WATCHED;
  label.append(input, mark);
  checkCell.append(label);

  const titleCell = document.createElement("td");
  if (item.url) {
    const link = document.createElement("a");
    link.className = "title-link";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = displayItemTitle(item);
    titleCell.append(link);
  } else {
    const title = document.createElement("span");
    title.className = "title-link is-linkless";
    title.textContent = displayItemTitle(item);
    titleCell.append(title);
  }
  if (shownNo === "") titleCell.className = "non-tva-title";

  const jpTitle = document.createElement("td");
  jpTitle.className = "jp-title";
  jpTitle.textContent = item.jpTitle || "";

  const source = document.createElement("td");
  source.className = "source";
  source.textContent = displayItemSource(item);

  const original = document.createElement("td");
  original.className = "original";
  original.textContent = item.original || "";

  const kindCell = document.createElement("td");
  const kind = document.createElement("span");
  kind.className = item.linkType === "회차 링크" ? "kind" : "kind page";
  kind.textContent = item.linkType || "링크";
  kindCell.append(kind);

  tr.append(no, checkCell, titleCell, jpTitle, source, original, kindCell);
  return tr;
}

let toastTimer = 0;

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2400);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
