const CRC32_TABLE = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
})();

function crc32(uint8arr) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < uint8arr.length; i++) {
    crc = CRC32_TABLE[(crc ^ uint8arr[i]) & 0xFF] ^ (crc >>> 8);
  }
  crc = (crc ^ 0xFFFFFFFF) >>> 0;
  return crc.toString(16).toUpperCase().padStart(8, "0");
}

async function sha1(uint8arr) {
  const digest = await crypto.subtle.digest("SHA-1", uint8arr);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function computeChecksums(uint8arr) {
  return {
    size: uint8arr.length,
    sha1: await sha1(uint8arr),
    crc32: crc32(uint8arr)
  };
}
