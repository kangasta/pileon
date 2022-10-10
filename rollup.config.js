import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'
import { generateSW } from 'rollup-plugin-workbox';

import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;
const env = config().parsed;
const public_url = env.PUBLIC_URL

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		copy({
			targets: [
				{
					src: 'src/index.html',
					dest: 'public/',
					transform: (contents) => contents.toString().replace(/__PUBLIC_URL__/g, (public_url || ''))
				},
			],
		}),
		replace({
			process: JSON.stringify({
				env: {
					isProd: production,
					...env
				}
			}),
		}),
		generateSW({
			globDirectory: "public/",
			globPatterns: [
				"**/*.{css,js,png,html,json}"
			],
			swDest: "public/sw.js",
			navigateFallback: `${public_url}/index.html`,
		}),
		svelte({
			preprocess: autoPreprocess(),
		}),
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
