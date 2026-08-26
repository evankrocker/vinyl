document.addEventListener('DOMContentLoaded', () => {
  const records = window.RECORDS;

  // Top stats
  const artists = new Set(records.map(r => r.artist));
  const genres  = new Set(records.map(r => r.genre).filter(Boolean));
  const years   = records.map(r => r.year).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  document.getElementById('statTotal').textContent   = records.length;
  document.getElementById('statArtists').textContent = artists.size;
  document.getElementById('statGenres').textContent  = genres.size;
  document.getElementById('statYears').textContent   = `${minYear}–${maxYear}`;

  // By Artist
  const artistMap = {};
  records.forEach(r => { artistMap[r.artist] = (artistMap[r.artist] || 0) + 1; });
  const artistRows = Object.entries(artistMap).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const artistBody = document.getElementById('artistStatsBody');
  artistRows.forEach(([name, count]) => {
    const pct = Math.round((count / records.length) * 100);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-col="artist" data-val="${name}">
        <a href="${artistUrl(name)}" class="text-decoration-none">${name}</a>
      </td>
      <td data-col="count" data-val="${count}" class="text-end">
        <div class="d-flex align-items-center justify-content-end gap-2">
          <div class="progress flex-grow-1" style="height:6px;max-width:80px;">
            <div class="progress-bar bg-primary" style="width:${pct}%"></div>
          </div>
          <span class="badge bg-primary">${count}</span>
        </div>
      </td>`;
    artistBody.appendChild(tr);
  });
  makeSortable('artistTable');

  // By Genre
  const genreMap = {};
  records.forEach(r => {
    const g = r.genre || 'Unknown';
    genreMap[g] = (genreMap[g] || 0) + 1;
  });
  const genreRows = Object.entries(genreMap).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const genreBody = document.getElementById('genreStatsBody');
  const genreColors = ['success', 'info', 'warning', 'danger', 'primary', 'secondary'];
  genreRows.forEach(([name, count], i) => {
    const pct = Math.round((count / records.length) * 100);
    const color = genreColors[i % genreColors.length];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-col="genre" data-val="${name}">${name}</td>
      <td data-col="count" data-val="${count}" class="text-end">
        <div class="d-flex align-items-center justify-content-end gap-2">
          <div class="progress flex-grow-1" style="height:6px;max-width:80px;">
            <div class="progress-bar bg-${color}" style="width:${pct}%"></div>
          </div>
          <span class="badge bg-${color}">${count}</span>
        </div>
      </td>`;
    genreBody.appendChild(tr);
  });
  makeSortable('genreTable');

  // By Year
  const yearMap = {};
  records.forEach(r => {
    const y = r.year || 'Unknown';
    if (!yearMap[y]) yearMap[y] = [];
    yearMap[y].push(r);
  });
  const yearRows = Object.entries(yearMap).sort((a, b) => {
    if (a[0] === 'Unknown') return 1;
    if (b[0] === 'Unknown') return -1;
    return Number(a[0]) - Number(b[0]);
  });
  const maxYearCount = Math.max(...yearRows.map(([, rs]) => rs.length));
  const yearBody = document.getElementById('yearStatsBody');
  yearRows.forEach(([year, rs]) => {
    const pct = Math.round((rs.length / maxYearCount) * 100);
    const titles = rs.map(r =>
      `<a href="${albumUrl(r.id)}" class="text-decoration-none me-2">${r.title}</a>`
    ).join('');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-col="year" data-val="${year === 'Unknown' ? 0 : year}"><strong>${year}</strong></td>
      <td data-col="count" data-val="${rs.length}" class="text-end">
        <div class="d-flex align-items-center justify-content-end gap-2">
          <div class="progress flex-grow-1" style="height:6px;max-width:120px;">
            <div class="progress-bar bg-warning" style="width:${pct}%"></div>
          </div>
          <span class="badge bg-warning text-dark">${rs.length}</span>
        </div>
      </td>
      <td class="small text-muted">${titles}</td>`;
    yearBody.appendChild(tr);
  });
  makeSortable('yearTable');
});
