document.addEventListener('DOMContentLoaded', () => {
  const records = window.RECORDS;

  // Build artist map: name -> { count, genres }
  const map = {};
  records.forEach(r => {
    if (!map[r.artist]) map[r.artist] = { count: 0, genres: {} };
    map[r.artist].count++;
    const g = r.genre || 'Unknown';
    map[r.artist].genres[g] = (map[r.artist].genres[g] || 0) + 1;
  });

  const artists = Object.entries(map).map(([name, data]) => {
    const primaryGenre = Object.entries(data.genres)
      .sort((a, b) => b[1] - a[1])[0][0];
    return { name, count: data.count, primaryGenre };
  }).sort((a, b) => a.name.localeCompare(b.name));

  document.getElementById('artistCount').textContent = artists.length + ' artists';

  const tbody = document.getElementById('artistsBody');
  artists.forEach(a => {
    const tr = document.createElement('tr');
    tr.className = 'artist-row';
    tr.innerHTML = `
      <td data-col="artist" data-val="${a.name}">
        <a href="${artistUrl(a.name)}" class="text-decoration-none fw-semibold">
          <i class="bi bi-person-circle me-2 text-muted"></i>${a.name}
        </a>
      </td>
      <td data-col="count" data-val="${a.count}" class="text-center">
        <span class="badge bg-primary rounded-pill">${a.count}</span>
      </td>
      <td data-col="genre" data-val="${a.primaryGenre}">${a.primaryGenre}</td>
    `;
    tr.addEventListener('click', e => {
      if (!e.target.closest('a')) window.location = artistUrl(a.name);
    });
    tbody.appendChild(tr);
  });

  makeSortable('artistsTable');
  bindSearch('artistSearch', 'artistsTable');
});
