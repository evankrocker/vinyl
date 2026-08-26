document.addEventListener('DOMContentLoaded', () => {
  const records = window.RECORDS;
  document.getElementById('totalBadge').textContent = records.length + ' records';

  // --- Table view ---
  const tbody = document.getElementById('tableBody');
  records.forEach(r => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td>${thumbImg(r.cover, r.title)}</td>
      <td data-col="title" data-val="${r.title}">
        <a href="${albumUrl(r.id)}" class="text-decoration-none fw-semibold">${r.title}</a>
      </td>
      <td data-col="artist" data-val="${r.artist}">
        <a href="${artistUrl(r.artist)}" class="text-decoration-none text-secondary">${r.artist}</a>
      </td>
      <td data-col="genre"  data-val="${r.genre}">${r.genre}</td>
      <td data-col="year"   data-val="${r.year}">${r.year}</td>
    `;
    tr.addEventListener('click', e => {
      if (!e.target.closest('a')) window.location = albumUrl(r.id);
    });
    tbody.appendChild(tr);
  });

  makeSortable('recordsTable');
  bindSearch('searchBox', 'recordsTable');

  // Apply search to grid too
  document.getElementById('searchBox').addEventListener('input', filterGrid);

  // --- Grid view ---
  const gridBody = document.getElementById('gridBody');
  records.forEach(r => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
    col.dataset.title = r.title.toLowerCase();
    col.dataset.artist = r.artist.toLowerCase();
    col.dataset.genre = (r.genre || '').toLowerCase();
    col.innerHTML = `
      <a href="${albumUrl(r.id)}" class="text-decoration-none text-dark">
        <div class="card record-card h-100">
          ${coverImg(r.cover, r.title)}
          <div class="card-body py-2 px-3">
            <h6 class="card-title mb-1 text-truncate">${r.title}</h6>
            <p class="card-text small text-muted mb-1">${r.artist}</p>
            <div class="small text-muted">${r.year}</div>
          </div>
        </div>
      </a>`;
    gridBody.appendChild(col);
  });

  // --- View toggle ---
  document.getElementById('viewTable').addEventListener('change', () => {
    document.getElementById('tableView').classList.remove('d-none');
    document.getElementById('gridView').classList.add('d-none');
  });
  document.getElementById('viewGrid').addEventListener('change', () => {
    document.getElementById('tableView').classList.add('d-none');
    document.getElementById('gridView').classList.remove('d-none');
  });

  function filterGrid() {
    const q = document.getElementById('searchBox').value.toLowerCase();
    document.querySelectorAll('#gridBody > div').forEach(col => {
      const match = col.dataset.title.includes(q) ||
                    col.dataset.artist.includes(q) ||
                    col.dataset.genre.includes(q);
      col.style.display = match ? '' : 'none';
    });
  }

  // Default sort by title asc
  document.querySelector('#recordsTable th[data-sort="title"]').click();
});
