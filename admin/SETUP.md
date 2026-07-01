# Setup arhivă logo-uri (Supabase)

## 1. Creează proiectul
1. [supabase.com](https://supabase.com) → **New project** → nume, parolă DB, regiune → **Create**.
2. **Project Settings → API** → copiază **Project URL** și cheia **anon / public**.
3. Pune-le în `admin/config.js`:
   ```js
   window.SUPABASE_URL = "https://xxxxx.supabase.co";
   window.SUPABASE_ANON_KEY = "eyJhbGciOi...";
   ```

## 2. Creează bucket-ul de storage
**Storage → New bucket**
- Name: `logos`
- Public bucket: **ON** (permite afișarea/descărcarea fișierelor prin link public)

## 3. Politici de acces (RLS)
În **SQL Editor**, rulează:

```sql
create policy "Public read logos"
on storage.objects for select
using (bucket_id = 'logos');

create policy "Authenticated upload logos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'logos');

create policy "Authenticated update logos"
on storage.objects for update
to authenticated
using (bucket_id = 'logos');

create policy "Authenticated delete logos"
on storage.objects for delete
to authenticated
using (bucket_id = 'logos');
```

Asta face bucket-ul **citibil de oricine are link-ul**, dar **upload/ștergere doar pentru
utilizatori autentificați** — adică doar tu, din pagina `/admin`.

## 4. Creează-ți contul de admin
**Authentication → Users → Add user**
- Email + parolă (create manual, fără email de confirmare necesar)

Cu acest email/parolă te loghezi în `admin/index.html`.

## 5. Gata
Deschide `admin/index.html`, loghează-te și încarcă logo-urile. Ele apar imediat
în arhivă, cu link de descărcare și opțiune de ștergere.
