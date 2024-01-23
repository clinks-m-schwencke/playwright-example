import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: false,
	},
	// webServer: {
	// 	command: 'npm run build && npm run preview',
	// 	port: 4173
	// },
	// testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		...devices['Desktop Chrome']
	},
	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: 'simple',
			testDir: 'tests/01_simple',
		},
		{
			name: 'intermediate',
			testDir: 'tests/02_intermediate',
		},
		{
			name: 'advanced',
			testDir: 'tests/03_advanced',
			dependencies: ['setup'],
		}
		// {
		// 	name: 'chromium',
		// 	use: {
		// 		...devices['Desktop Chrome'],
		// 		storageState: 'tests/auth/user.json',
		// 	},
		// 	dependencies: ['setup'],
		// },
		// {
		// 	name: 'firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 		storageState: 'tests/auth/user.json',
		// 	},
		// 	dependencies: ['setup'],
		// },
		// {
		// 	name: 'webkit',
		// 	use: {
		// 		...devices['Desktop Safari'],
		// 		storageState: 'tests/auth/user.json',
		// 	},
		// 	dependencies: ['setup'],
		// },
	]
});

