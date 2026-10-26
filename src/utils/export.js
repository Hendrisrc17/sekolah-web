import * as XLSX from 'xlsx';

function safeCell(value) {
  const text = String(value ?? '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

export function downloadCsv(rows, filename) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const quote = (value) => `"${safeCell(value).replaceAll('"', '""')}"`;
  const csv = [headers, ...rows.map((row) => headers.map((header) => row[header]))].map((row) => row.map(quote).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

export function downloadExcel(rows, filename) { const sheet = XLSX.utils.json_to_sheet(rows); const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Laporan'); XLSX.writeFile(book, filename); }
