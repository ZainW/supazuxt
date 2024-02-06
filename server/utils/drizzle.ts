import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const client = createClient({ url: 'file:main.db', authToken: 'DATABASE_AUTH_TOKEN' })
export const db = drizzle(client)
