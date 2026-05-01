import { defineConfig } from 'vite'

const repositoryBase = '/Dead-Pixel-Check/'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? repositoryBase : '/',
})
