// Shared utilities for the vinyl collection site

function vinylPlaceholder() {
  return `<div class="vinyl-placeholder"><div class="vinyl-disc"></div></div>`;
}

function coverImg(src, alt) {
  if (src) return `<img src="${src}" alt="${alt}" class="card-img-top" style="height:180px;object-fit:cover;">`;
  return vinylPlaceholder();
}

function thumbImg(src, alt) {
  if (src) return `<img src="${src}" alt="${alt}" class="thumb-cover" width="40" height="40">`;
  return `<div class="thumb-cover thumb-cover-placeholder"><i class="bi bi-vinyl"></i></div>`;
}

function artistSlug(name) {
  return encodeURIComponent(name);
}

function albumUrl(id) {
  return `${window.BASE_URL}/album.html?id=${encodeURIComponent(id)}`;
}

function artistUrl(name) {
  return `${window.BASE_URL}/artist.html?name=${artistSlug(name)}`;
}

// Get unique sorted list of artists with counts
function getArtists(records) {
  const map = {};
  records.forEach(r => {
    if (!map[r.artist]) map[r.artist] = 0;
    map[r.artist]++;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Makesortable tables
function makeSortable(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const headers = table.querySelectorAll('th[data-sort]');
  let currentCol = null, currentDir = 'asc';

  headers.forEach(th => {
    th.innerHTML += ' <span class="sort-icon"></span>';
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (currentCol === col) {
        currentDir = currentDir === 'asc' ? 'desc' : 'asc';
      } else {
        currentCol = col;
        currentDir = 'asc';
      }
      headers.forEach(h => h.classList.remove('asc', 'desc'));
      th.classList.add(currentDir);
      sortTable(table, col, currentDir);
    });
  });
}

function sortTable(table, col, dir) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const aVal = a.querySelector(`[data-col="${col}"]`)?.dataset.val ?? a.querySelector(`[data-col="${col}"]`)?.textContent ?? '';
    const bVal = b.querySelector(`[data-col="${col}"]`)?.dataset.val ?? b.querySelector(`[data-col="${col}"]`)?.textContent ?? '';
    const aNum = parseFloat(aVal), bNum = parseFloat(bVal);
    let cmp;
    if (!isNaN(aNum) && !isNaN(bNum)) {
      cmp = aNum - bNum;
    } else {
      cmp = String(aVal).localeCompare(String(bVal));
    }
    return dir === 'asc' ? cmp : -cmp;
  });
  rows.forEach(r => tbody.appendChild(r));
}

// Live search filter for tables
function bindSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}
