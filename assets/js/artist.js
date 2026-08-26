document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const artistName = params.get('name');

  if (!artistName) {
    showNotFound();
    return;
  }

  const albums = window.RECORDS.filter(r => r.artist === artistName);

  if (albums.length === 0) {
    showNotFound();
    return;
  }

  document.title = artistName + ' — ' + document.title;
  document.getElementById('artistName').textContent = artistName;
  document.getElementById('breadcrumbArtist').textContent = artistName;

  const genres = [...new Set(albums.map(r => r.genre))].filter(Boolean).join(', ');
  document.getElementById('artistMeta').textContent =
    `${albums.length} album${albums.length !== 1 ? 's' : ''} · ${genres}`;

  const grid = document.getElementById('albumsGrid');
  albums
    .sort((a, b) => (a.year || 0) - (b.year || 0))
    .forEach(r => {
      const col = document.createElement('div');
      col.className = 'col-6 col-md-4 col-lg-3';
      col.innerHTML = `
        <a href="${albumUrl(r.id)}" class="text-decoration-none text-dark">
          <div class="card record-card h-100">
            ${coverImg(r.cover, r.title)}
            <div class="card-body py-2 px-3">
              <h6 class="card-title mb-1 text-truncate">${r.title}</h6>
              <p class="card-text small text-muted mb-0">${r.year || '—'}</p>
            </div>
          </div>
        </a>`;
      grid.appendChild(col);
    });

  function showNotFound() {
    document.getElementById('albumsGrid').classList.add('d-none');
    document.getElementById('notFound').classList.remove('d-none');
    document.getElementById('artistName').textContent = 'Artist Not Found';
  }
});
