import path from 'node:path';
import { defineConfig } from 'vitest/config';

// Next.js turns image imports into { src, width, height } objects; mirror that shape in tests.
const staticImages = {
    name: 'static-images',
    enforce: 'pre',
    load(id) {
        if (/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(id)) {
            const src = JSON.stringify('/' + path.relative(__dirname, id));
            return `export default { src: ${src}, width: 100, height: 100 };`;
        }
    },
};

export default defineConfig({
    plugins: [staticImages],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    test: {
        globals: true,
    }
})
