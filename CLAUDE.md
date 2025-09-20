# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Architecture

This is a Vue 3 + Vite project using the Composition API with `<script setup>` syntax.

### Structure
- **Entry point**: `src/main.js` - Creates Vue app and mounts to `#app`
- **Root component**: `src/App.vue` - Main application layout
- **Components**: `src/components/` - Reusable Vue components
- **Styling**: `src/style.css` - Global styles, components use scoped styles

### Key Technologies
- **Vue 3** with Composition API and `<script setup>`
- **Vite** for build tooling and development server
- **Single File Components** (.vue files) with scoped styling

### Development Notes
- Uses ES modules (`type: "module"` in package.json)
- Components follow Vue 3 Composition API patterns with `<script setup>`
- No state management library - uses Vue's built-in reactivity
- No routing configured - single page application
- No testing framework configured