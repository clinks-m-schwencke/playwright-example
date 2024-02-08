import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	webServer: {
		command: 'npm run dev',
		port: 5173,
		reuseExistingServer: true,
	},

	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
		...devices['Desktop Chrome']
	},

	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: '初級',
			testDir: 'tests/01_simple',
		},
		{
			name: '中級',
			testDir: 'tests/02_intermediate',
		},
		{
			name: '上級',
			testDir: 'tests/03_advanced',
			use: {
				storageState: 'tests/auth/user.json',
			},
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

