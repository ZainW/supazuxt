import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/utils/schema.ts',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:./main.db',
  },
  verbose: true,
  strict: true,
})
