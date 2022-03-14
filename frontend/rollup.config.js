import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { config } from "dotenv";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

config();

const production = !process.env.ROLLUP_WATCH;

function serve(port) {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev", "--host 0.0.0.0", `--port ${port}`],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

<<<<<<< HEAD
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": process.env.NODE_ENV,
			// globalThis: {
			// 	"process.env.NODE_ENV": process.env.NODE_ENV
			// },
			process: JSON.stringify({
				hello: 'world',
				SERVER_URL: 'hello',
				FRONT_URL: 'hello',
				env: {
					SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000',
					FRONT_PORT: process.env.FRONT_PORT || '3000',
					NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
					// FRONT_URL: Process.env.FRONT_URL,
				}
			}),
		}),
=======
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    replace({
      preventAssignment: true,
      process: JSON.stringify({
        hello: "world",
        SERVER_URL: "hello",
        FRONT_URL: "hello",
        env: {
          SERVER_URL: process.env.SERVER_URL,
          FRONT_PORT: process.env.FRONT_PORT,
          // FRONT_URL: Process.env.FRONT_URL,
        },
      }),
    }),
>>>>>>> 12fd108 (changes to dashboard and profile)

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(process.env.FRONT_PORT),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
