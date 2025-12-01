import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 开发环境：将 /docs 路径映射到根目录的 docs 文件夹
    {
      name: 'serve-docs',
      configureServer(server) {
        server.middlewares.use('/docs', (req, res, next) => {
          const filePath = path.join(__dirname, 'docs', decodeURIComponent(req.url))

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath)
            const mimeTypes = {
              '.json': 'application/json',
              '.md': 'text/markdown; charset=utf-8',
            }
            res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain; charset=utf-8')
            res.end(fs.readFileSync(filePath, 'utf-8'))
          } else {
            next()
          }
        })
      },
    },
    // 构建时：复制 docs 目录到 dist
    viteStaticCopy({
      targets: [
        {
          src: 'docs/**/*',
          dest: 'docs',
        },
      ],
    }),
  ],
})
