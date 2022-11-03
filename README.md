# Raudi

https://raudi.xyz/

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
need to supply a client ID and key within a `.env` file within the root directory. You can apply for
these credentials with your Freesound account [here](https://freesound.org/apiv2/apply/).

When asked to specify a callback URL for the key, use the following:

```
http://localhost:80/api/auth/callback
```

Creating a `.env` file can be done with the following commmand:

```bash
cp .env.template .env
```

Raudi uses Docker to run its local environment. After all the above setup is done, you can run Raudi
via Docker `compose` with the following command:

```bash
yarn start
```

At this point, you can access Raudi at `http://localhost:80`.

## Note on Rate Limits

A single unique client for the Freesound API has the following limits
(via [docs](https://freesound.org/docs/api/overview.html#throttling)):

- 60 requests per minute
- 2000 requests per day

Due to the slow speed of requests to Freesound, Raudi prefetches a set amount of sounds ahead of
time to keep things as smooth as possible for the end user. This makes it possible to blow over the
daily limit of requests if kept unchecked. As of now there is no way I can think of to overcome this
daily limit for the application, so please reach out if you have any ideas!
