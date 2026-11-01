import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const config = window.SUPABASE_CONFIG || {};
const app = window.CONAN_WATCH_APP;
const els = {
  button: document.querySelector("#accountButton"),
  buttonText: document.querySelector("#accountButtonText"),
  dialog: document.querySelector("#accountDialog"),
  close: document.querySelector("#accountDialogClose"),
  form: document.querySelector("#loginForm"),
  email: document.querySelector("#loginEmail"),
  submit: document.querySelector("#loginSubmit"),
  signedInPanel: document.querySelector("#signedInPanel"),
  signedInEmail: document.querySelector("#signedInEmail"),
  syncStatus: document.querySelector("#syncStatus"),
  logout: document.querySelector("#logoutButton"),
  message: document.querySelector("#accountMessage"),
};

let supabase = null;
let currentUser = null;
let pushTimer = 0;
let applyingCloudState = false;
let lastCloudUpdate = "";

bindAccountUi();
initSync();

function bindAccountUi() {
  els.button?.addEventListener("click", openDialog);
  els.close?.addEventListener("click", closeDialog);
  els.dialog?.addEventListener("click", (event) => {
    if (event.target === els.dialog) closeDialog();
  });
  els.form?.addEventListener("submit", requestLoginLink);
  els.logout?.addEventListener("click", signOut);
  window.addEventListener("watch-state-changed", () => scheduleCloudPush());
  window.addEventListener("focus", () => pullCloudState(false));
}

async function initSync() {
  if (!app || !config.url || !config.anonKey) {
    setMessage("로그인 서버 설정이 필요합니다.");
    return;
  }

  supabase = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  const { data } = await supabase.auth.getSession();
  await applySession(data.session);
  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => applySession(session), 0);
  });
}

function openDialog() {
  if (!els.dialog) return;
  els.dialog.hidden = false;
  document.body.classList.add("modal-open");
  (currentUser ? els.logout : els.email)?.focus();
}

function closeDialog() {
  if (!els.dialog) return;
  els.dialog.hidden = true;
  document.body.classList.remove("modal-open");
  els.button?.focus();
}

async function requestLoginLink(event) {
  event.preventDefault();
  if (!supabase) {
    setMessage("로그인 서버에 연결되지 않았습니다.");
    return;
  }

  const email = els.email.value.trim();
  if (!email) return;
  setBusy(true);
  setMessage("로그인 링크를 보내는 중입니다.");
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  setBusy(false);
  setMessage(error ? readableError(error) : "이메일에서 로그인 링크를 열어 주세요.");
}

async function signOut() {
  if (!supabase) return;
  setBusy(true);
  const { error } = await supabase.auth.signOut();
  setBusy(false);
  if (error) setMessage(readableError(error));
}

async function applySession(session) {
  const nextUser = session?.user || null;
  const changedUser = nextUser?.id !== currentUser?.id;
  currentUser = nextUser;
  updateAccountUi();
  if (currentUser && changedUser) await pullCloudState(true);
}

function updateAccountUi() {
  const signedIn = Boolean(currentUser);
  els.form.hidden = signedIn;
  els.signedInPanel.hidden = !signedIn;
  els.buttonText.textContent = signedIn ? currentUser.email || "계정" : "로그인";
  els.signedInEmail.textContent = currentUser?.email || "";
  if (!signedIn) {
    els.syncStatus.textContent = "";
    setMessage("");
  }
}

async function pullCloudState(isInitialLogin) {
  if (!supabase || !currentUser || applyingCloudState) return;
  setSyncStatus("동기화 중");
  const { data, error } = await supabase
    .from("watch_progress")
    .select("payload, updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    setSyncStatus("동기화 오류");
    setMessage(readableError(error));
    return;
  }

  if (!data) {
    await pushCloudState();
    return;
  }

  if (!isInitialLogin && data.updated_at === lastCloudUpdate) {
    setSyncStatus("동기화됨");
    return;
  }

  applyingCloudState = true;
  try {
    app.applySnapshot(data.payload);
    lastCloudUpdate = data.updated_at || "";
  } finally {
    applyingCloudState = false;
  }
  setSyncStatus("동기화됨");
  setMessage("계정의 시청 기록을 불러왔습니다.");
}

function scheduleCloudPush() {
  if (!currentUser || applyingCloudState) return;
  clearTimeout(pushTimer);
  setSyncStatus("저장 중");
  pushTimer = window.setTimeout(pushCloudState, 600);
}

async function pushCloudState() {
  if (!supabase || !currentUser || applyingCloudState) return;
  const updatedAt = new Date().toISOString();
  const { error } = await supabase.from("watch_progress").upsert(
    {
      user_id: currentUser.id,
      payload: app.getSnapshot(),
      updated_at: updatedAt,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    setSyncStatus("동기화 오류");
    setMessage(readableError(error));
    return;
  }
  lastCloudUpdate = updatedAt;
  setSyncStatus("동기화됨");
}

function setBusy(busy) {
  els.submit.disabled = busy;
  els.logout.disabled = busy;
}

function setMessage(message) {
  els.message.textContent = message;
}

function setSyncStatus(message) {
  els.syncStatus.textContent = message;
}

function readableError(error) {
  return error?.message || "요청을 처리하지 못했습니다.";
}
