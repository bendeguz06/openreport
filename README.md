# OpenReport

A small library for collecting anonymous reports. You bring your own storage backend — openreport handles the API and hashes IPs so you never store them raw.

## Install

```bash
npm install openreport
```

## Usage

```ts
import { createOpenReport } from "openreport";

const client = createOpenReport({
  adapter: yourAdapter, // SQLite, Supabase, whatever you wire up
  salt: process.env.HASH_SALT,
});

// Submit a report
await client.submit({ name: "Alice", reason: "Spam in the comments" });

// With IP (gets hashed automatically)
await client.submit({ name: "Alice", reason: "Spam", ip: req.ip });

// List all reports
const reports = await client.list();
```

## Adapters

openreport doesn't store anything on its own. You need to pass in an adapter that implements two methods:

```ts
interface ReportAdapter {
  save(report: Report): Promise<void>;
  list(): Promise<Report[]>;
}
```

SQLite and Supabase adapters are on the way. For now, write your own or use an in-memory one for testing.

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
