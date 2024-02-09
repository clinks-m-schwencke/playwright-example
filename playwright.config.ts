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
			name: '中級 firefox',
			testDir: 'tests/02_intermediate',
			use: {
				...devices['Desktop Firefox'],
			},
		},
		{
			name: '中級 webkit',
			testDir: 'tests/02_intermediate',
			use: {
				...devices['Desktop Safari'],
			},
		},
		{
			name: '上級',
			testDir: 'tests/03_advanced',
			dependencies: ['setup'],
			use: {
				storageState: 'tests/auth/user.json',
			},
		},
	]
});

