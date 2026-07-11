# Brian Gelvez — Portfolio

Portfolio personal de **Brian Gelvez**, Full Stack Developer (Córdoba, Argentina).
Construido como producto: dark UI premium, animaciones sutiles, contact form real y SEO ready.

**Live:** [briangelvez.vercel.app](https://briangelvez.vercel.app)

---

## Stack

| Capa            | Tecnologías                                                    |
| --------------- | -------------------------------------------------------------- |
| **Framework**   | Next.js 16 (App Router) · React 19                             |
| **Lenguaje**    | TypeScript 5 (strict)                                          |
| **Estilos**     | Tailwind CSS v4 · Design tokens en `globals.css`               |
| **Animaciones** | Framer Motion 12 · Lenis (smooth scroll)                       |
| **Iconos**      | Lucide React                                                   |
| **Email**       | Resend (API route + validación server-side + rate limit + honeypot) |
| **Deploy**      | Vercel                                                         |

---

## Estructura

```
brian-portfolio/
├─ app/
│  ├─ api/contact/route.ts     # Endpoint del formulario (Resend)
│  ├─ layout.tsx               # Metadata, fonts, providers
│  ├─ page.tsx                 # Home (compone las secciones)
│  ├─ sitemap.ts               # sitemap.xml dinámico
│  ├─ robots.ts                # robots.txt dinámico
│  └─ globals.css              # Design tokens + tailwind v4
├─ components/
│  ├─ layout/                  # Navbar, Footer
│  ├─ sections/                # Hero, About, Skills, Experience, Projects, Contact
│  └─ ui/                      # Primitives (AnimatedText, PhotoLightbox, LenisProvider, etc.)
├─ lib/
│  ├─ constants.ts             # Fuente única de verdad (info personal, experiencia, proyectos, skills)
│  ├─ site.ts                  # Resolución de la URL pública (env-aware)
│  └─ utils.ts                 # cn() helper
├─ types/index.ts              # Tipos compartidos
└─ public/                     # Imágenes y assets estáticos
```

---

## Setup local

```bash
# 1) Instalar dependencias
npm install

# 2) Copiar variables de entorno
cp .env.example .env.local
# → Editá .env.local con tu RESEND_API_KEY

# 3) Arrancar dev server
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

Ver [`.env.example`](./.env.example). Resumen:

| Variable               | Requerida | Descripción                                                            |
| ---------------------- | :-------: | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` |    Sí     | URL pública canónica (para OG, sitemap, canonical URL).                |
| `RESEND_API_KEY`       |    Sí     | API Key de [Resend](https://resend.com) para el formulario de contacto.|
| `CONTACT_EMAIL`        |    Sí     | Email destino de los mensajes del formulario.                          |
| `RESEND_FROM_EMAIL`    |    No     | Dirección `From`. Default: sandbox `onboarding@resend.dev`.            |

En **Vercel** configuralas en _Settings → Environment Variables_.

---

## Scripts

```bash
npm run dev     # dev server (Turbopack)
npm run build   # build de producción
npm run start   # servidor de producción
npm run lint    # ESLint
```

---

## Deploy en Vercel

1. Importá el repo en [vercel.com/new](https://vercel.com/new).
2. Configurá las env vars listadas arriba.
3. Deploy → listo.

---

## Licencia

MIT — Brian Gelvez.
