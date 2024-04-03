# NxAmplifyNext

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

### Inintial install

1. `npx create-nx-workspace@latest --preset=next --packageManager=yarn --defaultBase=main`

✔ Where would you like to create your workspace? · my-project-name
✔ Application name · my-next-app-name
✔ Would you like to use the App Router (recommended)? · Yes
✔ Would you like to use the src/ directory? · Yes
✔ Test runner to use for end to end (E2E) tests · cypress
✔ Default stylesheet format · css
✔ Do you want Nx Cloud to make your CI fast? · github

### TailwindCSS

1. Install and configure Tailwind in an Nx workspace
   `yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest`
2. Go to our Next.js application dir

- `cd apps/nx-react-monorepo/`
- `npx tailwindcss init -p`

That should generate both of the configuration files directly into the root of our Next.js application.

3. Make sure you adjust our `postcss.config.js` to properly point to our tailwind config file.

```js
// apps/nx-react-monorepo/postcss.config.js
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
```

4. Update config `tailwind.config.js`

```js
// apps/nx-react-monorepo/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      gridTemplateColumns: {
        gallery: 'repeat(auto-fit, minmax(250px, 1fr))',
        pages: 'repeat(auto-fit, minmax(350px, 1fr))',
      },
      fontFamily: {
        arOneSans: ['var(--font-ar-one-sans)', 'sans-serif'],
        albertSans: ['var(--font-albert-sans)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.5rem', '0.75rem'],
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};
```

5. update `styles.css` as per tw docs.

### How do we handle Tailwind config files in a monorepo at root level

So far we’ve placed the Tailwind config within our application directory `apps/nx-react-monorepo`. That makes sense as the app probably knows the Tailwind configs to be designed properly. However, you might also want some more global, cross-app configs.
To have a global Nx workspace-wide config we can leverage [Tailwind presets](https://tailwindcss.com/docs/presets). At the Nx workspace root we define a `tailwind-workspace-preset.js`.

example: Let’s add the Tailwind Typography package: `yarn add -D @tailwindcss/typography`;
Next, we add it to our monorepo rootDir - `tailwind-workspace-preset.js`

```js
// tailwind-workspace-preset.js
module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

- In order to use the Tailwind preset in our `apps/nx-react-monorepo` specific Tailwind config, we require the file and add it to the presets array of the config.

```js
// apps/nx-react-monorepo/tailwind.config.js

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  ...
};
```

### Troubleshoot

1. always before commit run

- $ `nx format:write`
- $ `nx affected -t lint test build e2e-ci`

it may show occasionally the failure related to such directories as

- `.nx` => if so run `nx reset` it will flush the old cached files
- `/apps/nx-react-monorepo/.next/...` or `/apps/nx-react-monorepo/out/...` - delete these directories and re-run the tests.

### E2E Cypress

- runs well locally in both dev/prod modes.
- Important to note: in CI pipeline run by gh actions, it randomly fails with visiting the page url, (see below)
  so far - the only remedy found is to clear cache and re-run the gh workflow jobs
- It may worth to consider to run clear cache job prior the workflow; to specify in CI `.yaml`

```yaml
  Running:  app.cy.ts                                                                       (1 of 1)


  my-happy-bunch-e2e
    1) "before each" hook for "should display welcome message"


  0 passing (279ms)
  1 failing

  1) my-happy-bunch-e2e
       "before each" hook for "should display welcome message":
     CypressError: `cy.visit()` failed trying to load:

http://localhost:3000/

The response we received from your web server was:

  > 404: Not Found

This was considered a failure because the status code was not `2xx`.
```

- Ref. above. There is a possible fix to that CI failure by changing:
  `yarn nx affected -t lint test build e2e-ci` to `yarn nx affected -t lint test build e2e`, because it seems that the
  command `e2e-ci` fails to start-up the application build version, so when the cy test tries to visit the page it doesn't find it.
  with the `yarn nx affected -t lint test build e2e` the CI pipeline runs ok.

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:

permissions:
  actions: read
  contents: read

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - uses: nrwl/nx-set-shas@v4

      - run: yarn nx-cloud record -- nx format:check
      - run: yarn nx affected -t lint test build e2e
```

- still workflow fails at random

### Components library

To add react components library

1. $ `nx g @nx/next:lib --directory=libs/ui-components`
   choose name `"components"` for example ( keep in mind this chosen name u're going to use to run the tests)
   choose plain CSS as styling
2. add testing with vitest

- `libs/ui-components/vite.config.ts`, `libs/ui-components/test-setup.ts`, update the directory paths for caching and coverage reports to rellect the `libs/ui-components`, if you're copying these from `apps/nx-react-monorepo`
- `libs/ui-components/test-setup.ts`
- then `project.json` to update the targets prop

```json
 // ...
 "targets": {
    "test": {
      "executor": "@nx/vite:test",
      "options": {
        "config": "libs/ui-components/vite.config.ts"
      },
      "configurations": {
        "watch": {
          "watch": true
        }
      }
    }
  }
```

- components library extend ts config, to include ts files in `__tests__` directory
  `libs/ui-components/tsconfig.lib.json`

```json
{
  // ...
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "__tests__/**/*.tsx", "__tests__/**/*.ts"]
}
```

- run $`nx test components`

### Setup ChadCN library

Need to follow the manual installation described here [chadCN manual install docs](https://ui.shadcn.com/docs/installation/manual)
with some additional tweaks

#### let us imagine this is our monorepo file structure:

```yaml
# other stuff...

- apps/
  - nx-react-monorepo/

- libs/
  - ui-components/
# other stuff...
```

1. add components library `nx g @nx/next:library ui-components`
2. go to this new `libs/ui-components` directory and delete `lib/` directory, and `server.ts` file
3. go to monorepo root dir and install packages:
   `yarn add clsx @radix-ui/react-icons && yarn add -D tailwindcss-animate class-variance-authority tailwind-merge`
4. in monorepo root dir, create tailwind preset file `tailwind-workspace-preset.js`, and add the chadCN settings that could be shared across the projects ( setting are from the [chadCN manual install docs](https://ui.shadcn.com/docs/installation/manual) )

```js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

5. go to both projects and update the local `tailwind.config.js` file to have the preset:

```js
// apps/nx-react-monorepo/tailwind.config.js
// libs/ui-components/tailwind.config.js

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  ...
};
```

6. go to your UI consumer application `apps/nx-react-monorepo`, and extend the CSS file to accommodate all these
   styles from chadCN:

`apps/nx-react-monorepo/src/styles/global.css`

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 47.4% 11.2%;
       /* ... rest */
      }

      .dark {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;

       /* ... rest */
      }
    }

    @layer base {
      * {
        @apply border-border;
      }
      body {
        @apply bg-background text-foreground;
        font-feature-settings: 'rlig' 1, 'calt' 1;
      }
    }
</style>

7. Add to `libs/ui-components/src/utils.ts`

```js
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

8. Go to monorepo root dir and ( stupid as it is 😄 ), you need to add `tsconfig.json`
   that is necessary for for chadcn cli to pick it up, unfortunately it doesn't read our `tsconfig.base.json`
   `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@my-project/ui-components": ["libs/ui-components/src/index.ts"],
      "@my-project/ui-components/*": ["libs/ui-components/src/*"]
    }
  }
}
```

9. In same monorepo root, create the `components.json`, and add:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tailwind": {
    "config": "apps/web/tailwind.config.js",
    "css": "apps/web/app/global.css",
    "baseColor": "stone",
    "cssVariables": true
  },
  "aliases": {
    "components": "@my-project/ui-components/components",
    "utils": "@my-project/ui-components/utils"
  }
}
```

10. It is set, now in nonorepo root directory, run:

`npx shadcn-ui@latest add button`

- it will add `libs/ui-components/src/components/ui/` directory with `button.tsx` file
- go to `libs/ui-components/src/components/ui/button.tsx` and update the import utils
  to `import { cn } from '../../utils';` - still need to tweak this import each time you add a chadcn component

##### 😜 it is pretty much set:

- the chadcn components will be in `libs/ui-components/src/components/ui/`,
- all components are barrel exported from `libs/ui-components/src/index.ts`
- unit tests for lib components are in `libs/ui-components/__tests__/` directory,
  😜 keep in mind chadcn components don't need to test, if not updated, just test your own code.

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `npx nx dev fe-next` to start the development server. Happy coding!

## Build for production

Run `npx nx build fe-next` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
