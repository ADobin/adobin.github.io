---
title: Anyone need more fediverse?
date: 2023/01/08
draft: false
description: Running a single user Mastodon instance can be lonely. But it doesn't have to be!
tags:
  - mastodon
  - fediverse
  - homelab
  - selfhosted
---

I've been running a single user Mastodon instance for a few months now. It's been running smoothly and has let me interact with the exodus of users from the bird site. But it can be lonely on a single user instance. Discovery can be hard, following #hashtags only shows you posts from 
people you already follow, and you can't easily just browse the public timeline of some of the larger instances. I had read about [public relays](https://tool.motoretta.ca/2022/11/11/active-mastodon-relays/) but that seemed more like a firehose approach with too much content of questionable quality. I wanted something more curated.

## Enter GetMoarFediverse
While looking for a solution I stumbled upon [GetMoarFediverse](https://github.com/g3rv4/GetMoarFediverse#you-can-run-it-on-docker) by [@g3rv4@mastodonte.tech](https://mastodonte.tech/@g3rv4). It utilizes another one of @g3rv4's projects [FakeRelay](https://github.com/g3rv4/FakeRelay/) to allow you to follow hashtags, separately from your Mastodon followed hashtags, and automatically import posts. 

### Running GetMoarFediverse
There are a few different steps, spread across a few containers, to be able to run a fully selfhosted version of GetMoarFediverse. There are several different options on how to run each step but in the spirit of self-hosting my own Mastodon instance, I wanted to run everything myself. The steps are as follows:

1. Configure and run FakeRelay
2. Add an authorized instance to FakeRelay
3. Add FakeRelay to your Mastodon instance
4. Configure and run GetMoarFediverse
5. Configure GetMoarFediverse to run on a schedule

### Configuring and running FakeRelay
[FakeRelay](https://github.com/g3rv4/FakeRelay/) has pretty good documentation in it's README but you have to make sure to follow the guide for [I want to run it myself!](https://github.com/g3rv4/FakeRelay/#i-want-to-run-this-myself). I use [Traefik](https://doc.traefik.io/traefik/) as my reverse proxy as well, so my `docker-compose.yaml` looks like this:

```yaml:docker-compose.yaml
fakerelay:
    image: 'ghcr.io/g3rv4/fakerelay:latest'
    command: web
    hostname: fakerelay
    container_name: fakerelay
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ASPNETCORE_URLS=http://+:5000
      - CONFIG_PATH=/data/config.json
    restart: unless-stopped
    volumes:
      - '/mnt/data/appdata/fakerelay:/data'
    ports:
      - 5000:5000
    labels:
      traefik.http.routers.fakerelay.rule: Host(`fakerelay.alexdobin.com`)
  cli:
    image: 'ghcr.io/g3rv4/fakerelay:latest'
    volumes:
      - '/mnt/data/appdata/fakerelay:/data'
    labels:
      - traefik.enable=false
```
‼️ Do not immediately run `docker-compose up`. You need to configure the `config.json` file first using the `cli` container! You will want to run the following command to generate a new `config.json` file:

```bash
docker-compose run --rm cli config your-relay-host.example.com
```

You should now be able to start the main `fakerelay` container with `docker-compose up -d`. You should now be able to access the FakeRelay web interface at `http://fakerelay.alexdobin.com` (or whatever you set your hostname to).

### Adding an authorized instance to FakeRelay
You can use the `cli` container to interact with FakeRelay. FakeRelay can be used with multiple instances and requires authorization for each Mastodon instance you want to use it with. This is easy enough with our single instance, just run the following command:

```bash
docker-compose run --rm cli instance add social.alexdobin.com
```

You will now see an API key for your instance. Copy this to a safe place, you will need it later on to configure GetMoarFediverse.

### Adding FakeRelay to your Mastodon instance
Now that we have our FakeRelay instance running and authorized, we need to add it to our Mastodon instance. This is done by navigating to the admin portal on your Mastodon instance (/admin/relays). You will be prompted to add a new relay and should use the configured domain for your fake relay followed by `/inbox` (e.g. `http://fakerelay.alexdobin.com/inbox`). After submitting and waiting a few seconds, you should see the status update to `Enabled` next to your relay.

### Configuring and running GetMoarFediverse
There are several options for how to run `GetMoarFediverse`, including utilizing GitHub actions. Instead we will follow the docker-compose method outlined in the [README](https://github.com/g3rv4/GetMoarFediverse#you-can-run-it-on-docker) to keep everything running on our own server. The `docker-compose.yaml` file looks like this:

```yaml:docker-compose.yaml
  getmoarfediverse:
    container_name: getmoarfediverse
    image: 'ghcr.io/g3rv4/getmoarfediverse:latest'
    volumes:
      - '/mnt/data/appdata/getmoarfediverse:/data'
```

Before running, you will want to create the configuration file `config.json` needed for `GetMoarFediverse`. Below is an example configuration that I have used, placing it in `/mnt/data/appdata/getmoarfediverse` or wherever you have locate the volume for your container.

```json:config.json
{
  "FakeRelayUrl": "https://fakerelay.alexdobin.com",
  "FakeRelayApiKey": "YOUR_API_KEY_HERE",
  "Tags": [
    "javascript",
    "typescript",
    "svelte",
    "sveltekit",
    "100DaysOfHomeLab"
  ],
  "Instances": [
    "hachyderm.io",
    "mastodon.social",
    "fosstodon.org"
  ]
}
```

You should replace `YOUR_API_KEY_HERE` with the API key that you received earlier when registering your instance with FakeRelay. There are several options for configuring `GetMoarFediverse` but for now this has done a good job at bringing in new content that I might want without overwhelming me or my server.

### Configuring GetMoarFediverse to run on a schedule
GetMoarFediverse works great when it runs but it does not have any scheduling built in. I am using [Chadburn](https://github.com/PremoWeb/chadburn) which is a fork of [Ofelia](https://github.com/mcuadros/ofelia) with several quality of life fixes. I will cover setting Chadburn up in a separate blog post but adding the below to my Chadburn configuration was all I needed to run it with relative frequency.

```ini
[job-run "getmoarfediverse"]
schedule = @every 10m
container = getmoarfediverse
```
