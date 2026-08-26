document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const record = window.RECORDS.find(r => r.id === id);

  if (!record) {
    document.getElementById('notFound').classList.remove('d-none');
    return;
  }

  document.title = record.title + ' — ' + document.title;
  document.getElementById('albumDetail').classList.remove('d-none');

  // Breadcrumb
  const artistLink = document.getElementById('breadcrumbArtistLink');
  artistLink.textContent = record.artist;
  artistLink.href = artistUrl(record.artist);
  document.getElementById('breadcrumbAlbum').textContent = record.title;

  // Cover
  document.getElementById('coverWrap').innerHTML =
    record.cover
      ? `<img src="${record.cover}" alt="${record.title}" class="img-fluid rounded">`
      : vinylPlaceholder().replace('height:180px', 'height:280px');

  // Fields
  document.getElementById('albumTitle').textContent = record.title;
  const artistEl = document.getElementById('albumArtist');
  artistEl.innerHTML = `<a href="${artistUrl(record.artist)}" class="text-decoration-none text-muted">${record.artist}</a>`;

  document.getElementById('albumYear').textContent = record.year || '—';
  document.getElementById('albumGenre').textContent = record.genre || '—';

  if (record.notes) {
    document.getElementById('albumNotesWrap').classList.remove('d-none');
    document.getElementById('albumNotes').textContent = record.notes;
  }

  // Back button
  const backBtn = document.getElementById('backToArtist');
  backBtn.href = artistUrl(record.artist);
  document.getElementById('backArtistName').textContent = record.artist;
});
