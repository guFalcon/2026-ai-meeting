# CMS GUI - Copilot Instructions

## Project Overview

Vue 2.6.14 + TypeScript SPA for Central Management System - a monitoring and control system for industrial IoT applications with OPC UA integration, energy monitoring, safety analysis, and document management.

**Critical:** This project is locked to Node 18.20.4 and npm 8.3.0. Use `nvm use 18` to switch versions.

## Architecture

### Tech Stack

- **Framework:** Vue 2 (Options API) with TypeScript 3.9.10
- **UI:** Vuetify 2.7.2 (material design)
- **State:** Vuex 3 (modular store in `src/store/`)
- **Routing:** Vue Router 3 with lazy-loaded views
- **Auth:** Keycloak.js 25 with token storage in localStorage
- **Build:** Vue CLI 4 with Webpack 4, Babel 7
- **Testing:** Jest 26 with vue-jest, ts-jest

### Vue Component Patterns

- **Script language:** Components use `<script lang="js">` (not TypeScript), utilities use `.ts`
- **Style:** Options API with `mapGetters`, `mapActions` from Vuex
- **Imports:** Use `@/` alias for `src/` directory
- **Styling:** SCSS with global color/font variables auto-imported via `vue.config.js`

```vue
<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import { singleton as myService } from '@/utils/webservices/myService'

export default {
  data: () => ({ ... }),
  computed: {
    ...mapGetters(['someGetter'])
  },
  methods: {
    ...mapActions(['someAction'])
  }
}
</script>
```

### Service Layer (Singleton Pattern)

All utilities and API services follow a consistent singleton pattern:

```typescript
export class MyService {
  private static instanceField: MyService

  public static getInstance() {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new MyService())
    }
    return this.instanceField
  }

  // methods...
}

export const singleton = MyService.getInstance()
```

Import services with: `import { singleton as myService } from '@/utils/myService'`

**Why singletons?** Vue 2 + Vuetify 2 lack built-in DI, so singleton pattern provides consistent service access across components.

Examples: `keycloakService.ts`, `applicationService.ts`, all webservices in `src/utils/webservices/`
Webservices extend `ApplicationService` base class with shared axios/server config.

### Runtime Configuration (Critical)

Configuration is loaded **at runtime** from `public/config.js` and `public/version.js` (NOT baked into build):

1. Files are injected via `<script>` tags in `public/index.html`
2. Accessed via `src/utils/env.ts` singleton with fallback chain: `window.config` → `window.version` → `process.env.VUE_APP_*`
3. Each deployment folder (`deploy/`, `deploy-jku/`, etc.) has its own `config.js`

**Why:** Single Docker image deployed to multiple environments with different configs.

```typescript
import { singleton as env } from '@/utils/env'
const apiUrl = env.get('ADDRESS', 'localhost')
```

### Authentication Flow

1. Keycloak initialized in `main.ts` before Vue instantiation
2. Tokens stored/retrieved from localStorage via `keycloakUtils`
3. Store manages client roles: `$store.getters['keycloak/clientRoles']`
4. All API calls go through `axiosUtils.ts` with token injection

### Vuex Store Structure

- **gui/**: UI state (drawer, snackbar, modals, traffic lights, AI chat)
- **rest/**: API response caching
- **keycloak/**: Auth state and roles
- **preferences/**: User settings

Access: `$store.state.gui.drawerVisible` or use `mapGetters`

## Development Workflow

### Setup

```bash
nvm install 18.20.4
nvm use 18
npm install -g npm@8.3.0
npm install
```

### Run Commands

```bash
npm run serve          # Dev server at localhost:8080
npm run build          # Production build to dist/
npm run lint           # ESLint fix
npm run test           # Jest (runs serially with --runInBand)
```

### Docker Deployment

```bash
npm run build
docker build -t cms-gui .
# Deploy configs in deploy/*/ folders with docker-compose.yml
```

Dockerfile: Nginx serves static `dist/` folder. Config mounted at runtime.

## Key Conventions

### Import Patterns

- **Components:** `import NavDrawer from '@/components/NavDrawer.vue'`
- **Services:** `import { singleton as myService } from '@/utils/myService'`
- **Store:** `import { mapGetters } from 'vuex'`
- **Keycloak roles:** `this.$store.getters['keycloak/clientRoles']`

### Testing

- **Unit tests:** Jest 26 configured in `jest.config.js` with `@/` alias mapping
- **REST tests:** `.http` files with httpYak (for manual API testing)
- Mock files in `mocks/` for Vuetify CSS/JS to avoid test errors
- `transformIgnorePatterns` includes axios, vuetify, chroma-js

### Styling

- Vuetify theme customization in `src/plugins/vuetify.ts` with multiple themes
- Custom theme colors: `navDrawer`, `admin`, `adminBackground`
- SCSS setup exists but rarely used - most styling via Vuetify

### Component Factory Pattern

DisplayPage uses dynamic component rendering via factory pattern:

- `PagesControlFactory.vue` resolves element types to components
- Factory switches on type (IMAGE, DATAPOINT, TRAFFIC_LIGHT, POLYGON, etc.)
- Returns appropriate control component (PagesImageControl, PagesDatapointControl, etc.)
- Usage: `<PagesControlFactory :element="element" :page="page" />`

### Router

- Lazy-loaded views: `component: () => import('../views/MyView.vue')`
- Route paths match menu structure: `/monitoring/datasets`, `/tools/opcua_browser`
- Key on router-view: `:key="$route.fullPath"` forces reload on query param changes

## Common Tasks

### Add New API Service

1. Create in `src/utils/webservices/myService.ts` using singleton pattern
2. Extend from `ApplicationService` or use `axiosUtils` directly
3. Import with: `import { singleton as myService } from '@/utils/webservices/myService'`

### Add New Route

1. Add to `src/router/index.ts` with lazy-loaded component
2. Update menu in `App.vue` or `NavDrawer.vue` based on roles
3. Create view in `src/views/MyView.vue` with `<script lang="js">`

### Add Vuex Module

1. Create module in `src/store/myModule.ts` with state/mutations/actions/getters
2. Import in `src/store/index.ts`: `import myModule from '@/store/myModule'`
3. Register in modules: `modules: { gui, rest, keycloak, preferences, myModule }`

### Modify Build Config

- Vue CLI config: `vue.config.js` (transpile deps, webpack overrides, SCSS imports)
- Babel plugins: Required for optional chaining, nullish coalescing, class properties
- Webpack: `webpack.config.js` for test environment, `vue.config.js` for dev/build

## External Integrations

- **Google Maps:** API key in `main.ts` for GmapVue (event map view)
- **Google Charts:** Loaded async, stored in Vuex state `googleCharts`/`googleChartsLoaded`
- **Keycloak:** Multiple deployment configs (realm, client per environment)
- **OPC UA:** Backend integration for industrial device monitoring

## File Structure

- `public/`: Static assets, `index.html` with runtime script injection for config.js
- `src/components/`: Reusable components (DataTable, Graph, panels, dialogs)
  - `pages/controls/`: Factory pattern components for DisplayPage rendering
- `src/views/`: Route-level page components
- `src/utils/`: Services, utilities (all TypeScript with singleton pattern)
  - `webservices/`: API services extending ApplicationService base class
- `deploy-*/`: Per-environment configs (each has own config.js + docker-compose.yml)
- `test/`: Jest unit tests (limited coverage)
