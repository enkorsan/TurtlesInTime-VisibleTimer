let currentRomsetId = ROMSETS[0].id;
let state = {};

function resetState() {
  const romset = getRomset(currentRomsetId);
  state = {};
  romset.files.forEach(f => {
    state[f.id] = { file: null, bytes: null, validOriginal: false };
  });
}

const logEl = () => document.getElementById("log");
const applyBtn = () => document.getElementById("applyBtn");
const filesEl = () => document.getElementById("files");
const romsetSelectorEl = () => document.getElementById("romsetSelector");
const compatibleSetsEl = () => document.getElementById("compatibleSets");
const statusEl = (fileId) => document.getElementById(`status-${fileId}`);

function log(msg, isError = false) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className = isError ? "log-error" : "log-info";
  logEl().appendChild(el);
}

function clearLog() {
  logEl().innerHTML = "";
}

function setStatus(fileId, text, kind) {
  const el = statusEl(fileId);
  if (!el) return;
  el.textContent = text;
  el.className = "file-status" + (kind ? ` ${kind}` : "");
}

function renderCompatibleSets() {
  compatibleSetsEl().innerHTML = "";
  ROMSETS.forEach(romset => {
    const group = document.createElement("p");
    group.className = "subtitle compatible-set";

    const title = document.createElement("strong");
    title.textContent = `${romset.label}`;
    group.appendChild(title);
    group.appendChild(document.createElement("br"));

    romset.files.forEach((f, idx) => {
      const line = document.createElement("span");
      line.textContent = `${f.label}: CRC32 ${f.before.crc32}`;
      group.appendChild(line);
      if (idx < romset.files.length - 1) group.appendChild(document.createElement("br"));
    });

    compatibleSetsEl().appendChild(group);
  });
}

function renderRomsetSelector() {
  romsetSelectorEl().innerHTML = "";
  ROMSETS.forEach(romset => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "romset-btn" + (romset.id === currentRomsetId ? " active" : "");
    btn.textContent = romset.label;
    btn.addEventListener("click", () => {
      if (currentRomsetId === romset.id) return;
      currentRomsetId = romset.id;
      clearLog();
      resetState();
      renderRomsetSelector();
      renderFileBlocks();
      updateApplyButtonState();
    });
    romsetSelectorEl().appendChild(btn);
  });
}

function renderFileBlocks() {
  filesEl().innerHTML = "";
  const romset = getRomset(currentRomsetId);
  romset.files.forEach(f => {
    const block = document.createElement("div");
    block.className = "file-block";

    const label = document.createElement("label");
    label.textContent = f.label;
    label.setAttribute("for", `input-${f.id}`);

    const input = document.createElement("input");
    input.type = "file";
    input.id = `input-${f.id}`;

    const status = document.createElement("span");
    status.id = `status-${f.id}`;
    status.className = "file-status";

    block.appendChild(label);
    block.appendChild(input);
    block.appendChild(status);
    filesEl().appendChild(block);

    input.addEventListener("change", e => handleFileSelect(f.id, e.target));
  });
}

function updateApplyButtonState() {
  const romset = getRomset(currentRomsetId);
  const allLoaded = romset.files.every(f => state[f.id].validOriginal);
  applyBtn().disabled = !allLoaded;
}

async function handleFileSelect(fileId, inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  setStatus(fileId, "Checking...", "");

  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const checksums = await computeChecksums(bytes);
    const errors = validateOriginal(checksums, currentRomsetId, fileId);

    if (errors.length > 0) {
      state[fileId].file = null;
      state[fileId].bytes = null;
      state[fileId].validOriginal = false;
      setStatus(fileId, "Invalid \u26A0", "error");
      errors.forEach(err => log(`[${fileId}] ${err}`, true));
    } else {
      state[fileId].file = file;
      state[fileId].bytes = bytes;
      state[fileId].validOriginal = true;
      setStatus(fileId, "Valid \u2713", "ok");
      log(`[${fileId}] Original file validated successfully (CRC32 ${checksums.crc32}).`);
    }
  } catch (err) {
    state[fileId].file = null;
    state[fileId].bytes = null;
    state[fileId].validOriginal = false;
    setStatus(fileId, "Error \u26A0", "error");
    log(`[${fileId}] Error reading/checking the file: ${err.message}`, true);
  }

  updateApplyButtonState();
}

async function fetchIpsBytes(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load patch: ${path}`);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

function downloadBytes(filename, bytes) {
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function applyAllPatches() {
  clearLog();
  const romset = getRomset(currentRomsetId);

  const allLoaded = romset.files.every(f => state[f.id].validOriginal);
  if (!allLoaded) {
    log("Load and validate all files before continuing.", true);
    return;
  }

  for (const f of romset.files) {
    const s = state[f.id];
    let buffer = s.bytes;

    try {
      log(`[${f.id}] Applying patch...`);
      const ipsBytes = await fetchIpsBytes(f.patch);
      buffer = applyIPS(buffer, ipsBytes);
    } catch (err) {
      log(`[${f.id}] Error applying patch: ${err.message}`, true);
      continue;
    }

    const finalChecksums = await computeChecksums(buffer);
    const errors = validatePatched(finalChecksums, currentRomsetId, f.id);

    if (errors.length > 0) {
      errors.forEach(err => log(`[${f.id}] ${err}`, true));
      log(`[${f.id}] The result does not match what was expected. Not downloaded.`, true);
      continue;
    }

    log(`[${f.id}] Result validated -> size: ${finalChecksums.size}, SHA1: ${finalChecksums.sha1}, CRC32: ${finalChecksums.crc32}`);
    downloadBytes(f.file, buffer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("gameTitle");
  if (titleEl) titleEl.textContent = GAME_TITLE;

  const repoLink = document.getElementById("repoLink");
  if (repoLink) repoLink.href = GAME_REPO_URL;

  renderCompatibleSets();
  resetState();
  renderRomsetSelector();
  renderFileBlocks();
  updateApplyButtonState();
  applyBtn().addEventListener("click", applyAllPatches);
});
