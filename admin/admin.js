// Rotar Atelier — logo archive admin

const BUCKET = 'logos';
const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const configWarning = document.getElementById('configWarning');
const logoutBtn = document.getElementById('logoutBtn');
const adminUserEmail = document.getElementById('adminUserEmail');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const logoGrid = document.getElementById('logoGrid');
const archiveCount = document.getElementById('archiveCount');
const emptyState = document.getElementById('emptyState');

if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  configWarning.hidden = false;
  loginForm.querySelector('button').disabled = true;
}

const client = (window.SUPABASE_URL && window.SUPABASE_ANON_KEY)
  ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY)
  : null;

function showDashboard(session) {
  loginView.hidden = true;
  dashboardView.hidden = false;
  adminUserEmail.textContent = session.user.email;
  loadLogos();
}

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
}

async function init() {
  if (!client) return;
  const { data: { session } } = await client.auth.getSession();
  if (session) showDashboard(session);
}
init();

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const data = new FormData(loginForm);
  const { data: authData, error } = await client.auth.signInWithPassword({
    email: data.get('email'),
    password: data.get('password'),
  });
  if (error) {
    loginError.textContent = 'Autentificare eșuată — verifică email-ul și parola.';
    return;
  }
  showDashboard(authData.session);
});

logoutBtn.addEventListener('click', async () => {
  await client.auth.signOut();
  showLogin();
});

// ---------- upload ----------
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

async function handleFiles(fileList) {
  const files = Array.from(fileList);
  if (!files.length) return;
  uploadProgress.hidden = false;

  for (const file of files) {
    const row = document.createElement('div');
    row.className = 'upload-row';
    row.innerHTML = `<span>${file.name}</span><span>se încarcă...</span>`;
    uploadProgress.appendChild(row);

    const path = `${Date.now()}-${file.name}`;
    const { error } = await client.storage.from(BUCKET).upload(path, file);
    row.querySelector('span:last-child').textContent = error ? 'eroare' : 'gata';
    if (error) console.error(error);
  }

  setTimeout(() => { uploadProgress.hidden = true; uploadProgress.innerHTML = ''; }, 1500);
  fileInput.value = '';
  loadLogos();
}

// ---------- archive listing ----------
async function loadLogos() {
  const { data, error } = await client.storage.from(BUCKET).list('', {
    sortBy: { column: 'created_at', order: 'desc' },
  });
  if (error) { console.error(error); return; }

  const files = (data || []).filter(f => f.name !== '.emptyFolderPlaceholder');
  archiveCount.textContent = files.length ? `${files.length} fișiere` : '';
  emptyState.hidden = files.length !== 0;
  logoGrid.innerHTML = '';

  for (const file of files) {
    const ext = file.name.split('.').pop().toLowerCase();
    const { data: urlData } = client.storage.from(BUCKET).getPublicUrl(file.name);
    const publicUrl = urlData.publicUrl;
    const sizeKb = file.metadata?.size ? Math.round(file.metadata.size / 1024) : null;
    const date = file.created_at ? new Date(file.created_at).toLocaleDateString('ro-RO') : '';

    const card = document.createElement('div');
    card.className = 'logo-card';
    card.innerHTML = `
      <div class="logo-thumb">
        ${IMAGE_EXT.includes(ext)
          ? `<img src="${publicUrl}" alt="${file.name}" loading="lazy">`
          : `<span class="file-ext">.${ext}</span>`}
      </div>
      <p class="logo-name">${file.name}</p>
      <p class="logo-meta">${date}${sizeKb ? ' · ' + sizeKb + ' KB' : ''}</p>
      <div class="logo-actions">
        <a href="${publicUrl}" target="_blank" rel="noopener">Descarcă</a>
        <button class="delete-btn" data-name="${file.name}">Șterge</button>
      </div>
    `;
    logoGrid.appendChild(card);
  }

  logoGrid.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm(`Ștergi „${btn.dataset.name}"?`)) return;
      await client.storage.from(BUCKET).remove([btn.dataset.name]);
      loadLogos();
    });
  });
}
