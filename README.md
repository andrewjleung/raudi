# Raudi

Raudi is a tiny wrapper around [Freesound](https://freesound.org/)'s
[random sound functionality](https://freesound.org/browse/random/). It is meant to be an inspiration
tool for audio creatives to quickly cycle through random pieces of audio to use in or maybe even
jumpstart their next project.

The philosophy of this tool is to help remove all the cruft, noise, and second guessing behind
starting new ideas. Inspiration should be simple. You find a sound, you like it, you use it. Don't
like it? Skip it and never see it again, no second thought. You commit to a tiny starting point and
go from there, no overthinking allowed!

## How to Run Raudi

Raudi depends on the Freesound API to fetch and download sounds. In order for this to work, you will
need to supply a client ID and key within a `.env` file within `packages/server`. You can apply for
these credentials with your Freesound account [here](https://freesound.org/apiv2/apply/).

For the OAuth flow to then work properly, you will then need to specify a callback URL for your
credential. Set this to `http://localhost:3000/auth/callback`.

After all this has been setup, you may run the Raudi client and server in two separate terminals
using the following commands:

### Client

```bash
npm --prefix packages/client run dev
```

### Server

```bash
npm --prefix packages/server run start
```

You can then visit the client at `http://localhost:5173/`.

## Note on Rate Limits

A single unique client for the Freesound API has the following limits
(via [docs](https://freesound.org/docs/api/overview.html#throttling)):

- 60 requests per minute
- 2000 requests per day

Due to the slow speed of requests to Freesound, Raudi prefetches a set amount of sounds ahead of
time to keep things as smooth as possible for the end user. This makes it somewhat easy to blow over
the daily limit of requests if kept unchecked.

A flag called `USE_MOCK` is available within the
[`useSounds`](https://github.com/andrewjleung/raudi/blob/main/packages/client/src/hooks/useSounds.ts)
hook to mitigate the amount of requests made in development. Setting this to `true` will defer to
the usage of mock data rather than fetching sounds on the fly.
