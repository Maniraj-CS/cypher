# Cyphers

Cyphers is a dark, motion-focused portfolio landing page built to showcase creative web design. It combines bold typography, layered visuals, scroll-based animation, and interactive image effects in a responsive single-page experience.

## Features

- Animated hero section with the Cyphers title and mouse-follow movement
- Scroll-driven transitions and smooth scrolling
- WebGL image distortion effects powered by Three.js and React Three Fiber
- Multiple showcase sections, including project cards and visual content
- Custom loading screen, navigation, progress indicator, and footer
- Responsive layouts for desktop and mobile screens

## Built with

- React 19 and TypeScript
- Vite
- Tailwind CSS
- GSAP and ScrollTrigger
- Three.js and React Three Fiber
- Motion and Lenis

## Getting started

### Requirements

- Node.js (a current LTS release is recommended)
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite prints a local URL in the terminal after the server starts.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check the project and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  Animations/   Reusable text and marquee animations
  components/   Page sections, navigation, loader, and footer
  effects/      Three.js shaders and interactive image effects
  shaders/      GLSL shader source files
public/
  fonts/        Local font files
  imgs/         Images, video, and audio used by the page
```

## Assets

The page loads its visual assets from `public/`. Keep referenced files in their current folders when changing or replacing images, fonts, videos, or audio. The WebGL image effects use shader files from `src/shaders/`.

## Production build

Run `npm run build` to generate the optimized site in `dist/`. Deploy the contents of that folder to a static hosting service that supports single-page Vite sites.
