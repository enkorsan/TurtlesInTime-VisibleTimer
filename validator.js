function formatMismatch(label, expected, actual) {
  return `${label} doesn't match.\nExpected: ${expected}\nObtained: ${actual}`;
}

function validateAgainstSpec(checksums, spec, label) {
  const errors = [];
  if (checksums.size !== spec.size) {
    errors.push(formatMismatch(`${label} tamano`, spec.size, checksums.size));
  }
  if (checksums.sha1 !== spec.sha1) {
    errors.push(formatMismatch(`${label} SHA1`, spec.sha1, checksums.sha1));
  }
  if (checksums.crc32 !== spec.crc32) {
    errors.push(formatMismatch(`${label} CRC32`, spec.crc32, checksums.crc32));
  }
  return errors;
}

function getRomset(romsetId) {
  return ROMSETS.find(r => r.id === romsetId) || null;
}

function getFileSpec(romsetId, fileId) {
  const romset = getRomset(romsetId);
  if (!romset) return null;
  return romset.files.find(f => f.id === fileId) || null;
}

// Valida el archivo tal como lo carga el usuario (antes de parchear).
function validateOriginal(checksums, romsetId, fileId) {
  const spec = getFileSpec(romsetId, fileId);
  if (!spec) return [`Archivo desconocido: ${romsetId}/${fileId}`];
  return validateAgainstSpec(checksums, spec.before, spec.label);
}

// Valida el archivo resultante tras aplicar el parche IPS.
function validatePatched(checksums, romsetId, fileId) {
  const spec = getFileSpec(romsetId, fileId);
  if (!spec) return [`Archivo desconocido: ${romsetId}/${fileId}`];
  return validateAgainstSpec(checksums, spec.after, spec.label);
}
