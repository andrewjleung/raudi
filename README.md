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
need to supply a client ID and key within a `.env` file within `packages/server`.

You can apply for these credentials with your Freesound account
[here](https://freesound.org/apiv2/apply/).

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
