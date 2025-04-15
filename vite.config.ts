import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { crx } from 'vite-plugin-crx-mv3'
import {crx} from "@crxjs/vite-plugin"
import manifest from './public/manifest.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})
