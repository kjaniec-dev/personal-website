# Audyt strony — 2026-09-23

Trzy audyty (design/UX, SEO, wydajność) na stanie roboczym z niezacommitowanymi zmianami w `app/Main.tsx`, `app/layout.tsx`, `components/Footer.tsx`, `components/Hero.tsx`, `components/ProjectShowcase.tsx`, `components/Services.tsx`, `css/tailwind.css`.

**Werdykt:** wizualnie strona jest dopracowana. Największy zysk dają konwersja (kontakt, spójna oferta, dowody efektów), rozmiar JS i luki w SEO.

## Co już jest dobre

- Spójne tokeny designu, kontrast muted text ok. 5.9:1.
- Focus-visible ringi, touch targety 44–48px, animacje `motion-safe`, skip link.
- Brak framer-motion, animacje tylko w CSS, `next/font` z `display: "optional"`, LCP na stronie głównej to tekst.
- Poprawne `metadataBase`, template tytułu, canonical na każdej stronie, robots.txt z sitemapą, social card 1200x630, OG dla artykułów, breadcrumb schema, Person + WebSite schema, RSS globalny i per tag.

## Pomiar JS (build produkcyjny, suma chunków gzip)

| Route | JS (gzip) |
|---|---|
| `/` | 264 KB |
| `/about` | 266 KB |
| `/blog` | 271 KB |
| `/projects` | 265 KB |
| `/faq` | 259 KB |
| post na blogu | 266 KB |

## Najwyższy wpływ

1. **Cała biblioteka UI na każdej stronie.** `components/ClientUI.tsx:1` ma `'use client'` i re-eksportuje ok. 150 komponentów z `@kjaniec-dev/ui` (jeden plik `dist/index.js`, 354 KB). Wychodzi z tego chunk ok. 54 KB gzip (charts, DataTable, DatePicker, CommandPalette, ColorPicker) na każdej stronie.
   - **Poprawka:** importuj komponenty bezpośrednio z `@kjaniec-dev/ui` i dodaj paczkę do `optimizePackageImports` w `next.config.js:117`. Lepiej: publikuj kit jako osobne pliki per komponent.
   - **Zysk:** ok. 40–50 KB gzip na stronę.
2. **Kontakt tylko przez `mailto:`** (`components/Hero.tsx:64`, `app/Main.tsx:126`, `components/Services.tsx:39`, `components/ContactCTA.tsx:36`). Kto nie ma klienta poczty, trafia w ślepy zaułek.
   - **Poprawka:** przycisk „Copy email” z potwierdzeniem przy każdym CTA albo formularz / link do umówienia rozmowy.
3. **Niespójna oferta.** `components/Hero.tsx:33-36` mówi „Open to part-time opportunities / Availability depends on scope and timing”, a `app/Main.tsx:119` „full-stack engineer to scale your product”.
   - **Poprawka:** jeden jasny komunikat (np. „Available for B2B contracts from <miesiąc>”) w hero i we wszystkich CTA.
4. **Brak dowodów efektów.** Trust strip w hero (`components/Hero.tsx:128-146`) pokazuje pracodawców, nie wyniki. Karty w `components/ProjectShowcase.tsx` mają tylko opis.
   - **Poprawka:** jedna linia na projekt: problem, twoja rola, wynik. Jeśli możliwe: opinia klienta albo jedno case study.
5. **Sitemap pomija strony.** `app/sitemap.ts:32` zawiera tylko `""`, `blog`, `tags`. Brakuje `/about`, `/projects`, `/faq` i wszystkich `/tags/[tag]`. `lastModified` to `new Date()` przy każdym buildzie.
   - **Poprawka:** dodaj brakujące route'y, zmapuj klucze z `app/tag-data.json` na URL-e tagów, ustaw prawdziwą datę ostatniej zmiany.

## Średni wpływ

6. **kbar w początkowym JS.** `components/SearchButton.tsx:3` importuje `useKBar` bezpośrednio i wciąga kbar (28 KB gzip), co niweczy leniwe ładowanie w `SearchProviderWrapper`.
   - **Poprawka:** ładuj `SearchButton` przez `next/dynamic` z `ssr: false` albo wysyłaj event, którego słucha provider.
7. **BlogPosting JSON-LD nie kwalifikuje się do rich results** (`contentlayer.config.ts:166`). `image` to ścieżka względna, brakuje `publisher` i `mainEntityOfPage`, autor bez `url`.
   - **Poprawka:** poprzedź `image` wartością `siteUrl`, dodaj `publisher` (Person z logo) i `mainEntityOfPage: { "@type": "WebPage", "@id": url }`.
8. **Posty bez własnych obrazków OG.** Wszystkie 23 posty w `data/blog/*.mdx` nie mają `images:`, więc dzielą `social-card.png`.
   - **Poprawka:** `app/blog/[...slug]/opengraph-image.tsx` generujący kartę z tytułu posta.
9. **Powtarzające się meta description.** `app/seo.tsx:20` używa domyślnego opisu strony; About, Projects, Blog i FAQ (`app/about/page.tsx:17`, `app/projects/page.tsx:8`, `app/blog/page.tsx:8`, `app/faq/page.tsx:8`) nie podają własnego. Tagi mają cienki opis „kjaniec.dev X tagged content” (`app/tags/[tag]/page.tsx:20`). Blok `twitter` nie ma `description`.
   - **Poprawka:** unikalny opis 150–160 znaków na stronę, plus `description` w bloku `twitter`.
10. **Strony paginacji bez metadanych.** `app/blog/page/[page]/page.tsx` i `app/tags/[tag]/page/[page]/page.tsx` dziedziczą goły tytuł „kjaniec.dev”.
    - **Poprawka:** `generateMetadata` z tytułem typu „Blog – Page N”.
11. **Post kończy się bez drogi do kontaktu.** `layouts/PostLayout.tsx:149` ma tylko linki poprzedni/następny.
    - **Poprawka:** `ContactCTA` albo blok „Related projects” pod postem.
12. **Za dużo głównych przycisków.** „Launch App” na kartach (`components/ProjectShowcase.tsx:59-69`) daje do 4 przycisków primary między hero a kontaktem.
    - **Poprawka:** „Launch App” jako secondary/outline; primary tylko dla kontaktu.
13. **Zduplikowana sekcja kontaktu.** `app/Main.tsx:101-166` reimplementuje CTA, a about/projects używają `ContactCTA`.
    - **Poprawka:** wariant „large” w `ContactCTA` i użycie go wszędzie.
14. **Wiersz usługi to jeden duży link `mailto`** (`components/Services.tsx:38-43`). Kliknięcie gdziekolwiek otwiera pocztę, a `aria-label` nadpisuje treść dla czytników ekranu.
    - **Poprawka:** statyczna treść z jednym linkiem „Discuss”, bez `aria-label`.
15. **`components/Header.tsx:1` jest kliencki tylko dla `buttonVariants`/`cn`.**
    - **Poprawka:** komponent serwerowy; interaktywne części (MobileNav, ThemeSwitch, SearchButton) jako małe komponenty klienckie.
16. **Za krótkie / za długie summary postów.** `wsl.mdx` i `keycloak.mdx` ok. 45 znaków; `about_this_website_template.mdx` kończy się „;)”; `dark-souls-systems-design.mdx` ok. 300, `how-to-use-ai-for-development.mdx` ok. 250.
    - **Poprawka:** 140–160 znaków.
17. **Brak schematu Person na About** (`app/about/page.tsx`).
    - **Poprawka:** `ProfilePage` z Person jako `mainEntity`, wspólne `@id` z Person na stronie głównej.

## Szybkie i tanie

- **Martwy kod:** `components/HeroAnimationWrapper.tsx` nieużywany; `app/layout.css` (import w `app/Main.tsx:9`) ma reguły `.hero-animate*`, które nic nie trafiają; nieużywane tokeny `--animate-float/glow/gradient` w `css/tailwind.css:21-24`. Usuń.
- **Globalny selektor akordeonu z `!important`** (`css/tailwind.css:344-366`): zawęź przez atrybut `data-*`.
- **Preconnect do Google Fonts** (`app/layout.tsx:106-113`): usuń, `next/font` serwuje fonty z twojej domeny.
- **Warstwy tła** (`app/layout.tsx:147-157`): trzy stałe warstwy 384px `blur-2xl` z `willChange: opacity`, które nic nie animują. Usuń `willChange` albo zastąp statycznym radial-gradientem.
- **Cache obrazów** (`next.config.js:113`): `minimumCacheTTL: 60` → ok. `31536000`.
- **Konfiguracja** (`next.config.js:117`): usuń `react-icons` z `optimizePackageImports` (nie jest zależnością). Sprawdź, czy `'unsafe-eval'` w CSP jest potrzebne w produkcji.
- **`SearchAction`** w `app/Main.tsx:40-46` wskazuje na `/tags/{term}`, a to nie jest wyszukiwarka (Google i tak wycofał sitelinks search box). Usuń.

## Sugerowana kolejność

1. Punkt 1 — mniej JS na każdej stronie.
2. Punkty 2–4 — konwersja.
3. Punkty 5, 7, 9, 10 — mechaniczne poprawki SEO.
4. Sekcja „Szybkie i tanie” — przy okazji.
