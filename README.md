# Nunn Corporation Website

Public front door for `nunncorporation.com`.

## Current Surface

- Home: outcome-first executive operating systems
- Executive Assessment: `/assessment/`
- Executive Solutions: `/solutions/`
- Executive Library: `/library/`
- Deal Execution Engine: `/deal-execution/`
- OwnerFi: `/ownerfi/`
- Executive Desk: `/executive-desk/`
- Assessment intake: Netlify-compatible `executive-assessment` form

## Local Commands

```sh
npm run build
npm run dev
npm run preview
```

`npm run build` copies the static public site into `dist`.

## Deployment Notes

Publish `dist` for production. The Executive Assessment form is present as a
static Netlify-compatible form and posts to `/success/`. Public calls to action
route through the non-sensitive assessment workflow.
