# Fountation Web - GEMINI Context

This document provides essential context and instructions for AI agents working on the **Fountation Web** project.

## Project Overview
**Fountation Web** is a modern web application built with **Vue 3**, **TypeScript**, and **Vite**. It is designed as a cross-platform application using **Capacitor** to target Android and iOS devices.

### Main Technologies
- **Frontend Framework:** Vue 3 (Composition API with `<script setup>`)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia (with `pinia-plugin-persistedstate` for persistence)
- **Routing:** Vue Router (with role-based access control)
- **Internationalization:** Vue I18n (Support for `en`, `id`, `cn`)
- **Mobile Integration:** Capacitor (Android & iOS)
- **API Client:** Axios
- **Form Validation:** Vee-validate & Yup
- **UI Framework:** Bootstrap 5, FontAwesome
- **Testing:** Playwright

## Directory Structure
- `src/features/`: Feature-encapsulated logic (API, hooks, components).
- `src/views/`: Page-level components corresponding to routes.
- `src/components/`: Reusable, global UI components.
- `src/stores/`: Pinia state management modules.
- `src/composables/`: Reusable Vue composition logic.
- `src/services/`: API and external service integrations.
- `src/layouts/`: Global application layouts (Header, Sidebar, Footer).
- `src/locales/`: Translation files (`en.json`, `id.json`, `cn.json`).
- `src/styles/`: Global styles and Sass configurations.
- `android/` & `ios/`: Capacitor-generated native mobile projects.

## Building and Running
The following commands are defined in `package.json`:

- **Development:** `npm run dev` (Starts Vite development server)
- **Build:** `npm run build` (Runs `vue-tsc` and `vite build`)
- **Preview:** `npm run preview` (Previews the production build)
- **Capacitor Sync:** `npx cap sync` (Syncs web build to native projects)

### Development Server
The development server is configured in `vite.config.ts` with a proxy for API requests:
- Proxy targets: `http://192.168.1.51:8080` (API, OAuth2, Login).
- Default ports: 80 (HTTP) or 443 (HTTPS) if configured.

## Development Conventions
- **SFC Style:** Use `<script setup lang="ts">` for all Vue components.
- **Styling:** Prefer **Vanilla CSS** or **Bootstrap classes**. SCSS is available for complex styling.
- **Routing:** New routes must be added to `src/router/index.ts`. Use `meta.requiresAuth` and `meta.roleAccess` for protected routes.
- **Role-Based Access:** Supported roles: `SUPER_ADMIN`, `ADMIN`, `MANAGER`, `USER`, `GUEST`.
- **State:** Use Pinia for shared state. Ensure persistent state is used sparingly via the persistence plugin.
- **Validation:** Use `yup` for schema definitions and `vee-validate` for form handling.
- **Aliases:** Use `~` as an alias for the `src` directory (e.g., `import X from '~/components/X.vue'`).

## Mobile Specifics
- **App ID:** `id.web.saka.fountation`
- **Native Directories:** `android/` and `ios/`. Do not modify native code unless absolutely necessary; prefer using Capacitor plugins.

---
*This file is managed by Gemini CLI. Update it as the project evolves.*
