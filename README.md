# OpenWhistle

A small library for collecting anonymous whistleblower submissions. You bring your own storage backend — openwhistle handles the API and hashes IPs so you never store them raw.

## Install

```bash
npm install openwhistle
```

## Usage

```ts
import { createOpenWhistle, SQLiteAdapter, SupabaseAdapter } from "openwhistle";

const client = createOpenWhistle({
  adapter: new SQLiteAdapter("whistles.db"),
  salt: process.env.HASH_SALT,
});

// Submit a whistle
await client.submit({ name: "Alice", reason: "Fraud in accounting" });

// With IP (gets hashed automatically)
await client.submit({ name: "Alice", reason: "Fraud in accounting", ip: req.ip });

// List all whistles
const whistles = await client.list();
```

## Adapters

### SQLite

```ts
import { SQLiteAdapter } from "openwhistle";

const adapter = new SQLiteAdapter("whistles.db");
```

Creates the `whistles` table automatically on first run.

### Supabase

```ts
import { SupabaseAdapter } from "openwhistle";

const adapter = new SupabaseAdapter();
```

Reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` from environment variables. Create a `whistles` table in your Supabase project with these columns:

| Column | Type |
|---|---|
| `id` | `text` (primary key) |
| `name` | `text` |
| `reason` | `text` |
| `ip_hash` | `text` (nullable) |
| `created_at` | `text` |

### Custom adapter

Implement the `WhistleAdapter` interface to use any other backend:

```ts
import type { WhistleAdapter, Whistle } from "openwhistle";

class MyAdapter implements WhistleAdapter {
  async save(whistle: Whistle): Promise<void> { ... }
  async list(): Promise<Whistle[]> { ... }
}
```

## Privacy

If you pass an IP address when submitting, it gets SHA256-hashed with your `HASH_SALT` before being stored. The raw IP is never saved. Set a strong, secret salt and keep it out of your repo.

```bash
# .env
HASH_SALT=some-long-random-string
```

## Build

```bash
npm run build
```
