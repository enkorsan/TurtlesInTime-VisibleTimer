// ipsPatcher.js
function applyIPS(romBytes, ipsBytes) {
  const HEADER = "PATCH";
  const FOOTER = "EOF";
  const dec = (arr, start, len) => String.fromCharCode(...arr.slice(start, start + len));

  if (dec(ipsBytes, 0, 5) !== HEADER) {
    throw new Error("Invalid .ips file: PATCH header not found.");
  }

  const out = new Uint8Array(romBytes); // copia mutable
  let i = 5;

  function ensureCapacity(neededLen) {
    if (neededLen <= out.length) return out;
    const grown = new Uint8Array(neededLen);
    grown.set(out);
    return grown;
  }

  let buffer = out;

  while (i < ipsBytes.length) {
    if (dec(ipsBytes, i, 3) === FOOTER) {
      i += 3;
      break;
    }
    const offset = (ipsBytes[i] << 16) | (ipsBytes[i+1] << 8) | ipsBytes[i+2];
    i += 3;
    const size = (ipsBytes[i] << 8) | ipsBytes[i+1];
    i += 2;

    if (size === 0) {
      const rleLen = (ipsBytes[i] << 8) | ipsBytes[i+1];
      i += 2;
      const value = ipsBytes[i];
      i += 1;
      buffer = ensureCapacity(offset + rleLen);
      buffer.fill(value, offset, offset + rleLen);
    } else {
      const chunk = ipsBytes.slice(i, i + size);
      i += size;
      buffer = ensureCapacity(offset + size);
      buffer.set(chunk, offset);
    }
  }

  return buffer;
}
