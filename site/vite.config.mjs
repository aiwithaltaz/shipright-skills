import { defineConfig } from 'vite';
import { readFile, copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// Serve the released ChatGPT export unchanged. Its internal skill links are
// instructions for the model, rather than routes within this website.
const exportFile = new URL('../dist/shipright-chatgpt.md', import.meta.url);
let outputDirectory;
export default defineConfig({
  cacheDir: process.env.SHIPRIGHT_VITE_CACHE || 'node_modules/.vite',
  build: {
    outDir: process.env.SHIPRIGHT_SITE_OUT || 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        case: resolve(import.meta.dirname, 'case-study.html'),
      },
    },
  },
  plugins: [{
    name: 'released-chatgpt-download',
    configResolved(config) { outputDirectory = resolve(config.root, config.build.outDir); },
    configureServer(server) {
      server.middlewares.use('/downloads/shipright-chatgpt.md', async (_request, response, next) => {
        try {
          response.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          response.setHeader('Content-Disposition', 'attachment; filename="shipright-chatgpt.md"');
          response.end(await readFile(exportFile));
        } catch (error) { next(error); }
      });
    },
    async closeBundle() {
      try {
        await mkdir(resolve(outputDirectory, 'downloads'), { recursive: true });
        await copyFile(exportFile, resolve(outputDirectory, 'downloads/shipright-chatgpt.md'));
      } catch {
        // The short ChatGPT file is produced by scripts/release_skill.py. A site build does not require it.
      }
    }
  }]
});
