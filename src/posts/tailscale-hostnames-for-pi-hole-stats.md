---
title: Tailscale hostnames for Pi-hole stats
date: 2022/08/01
draft: false
description: Adding support for conditional forwarding to include your Tailscale hostnames in your Pi-hole statistics.
guid: 15e25870-ef9e-4769-aa32-3e9aec5608fd
tags:
  - tailscale
  - pi-hole
  - magicdns
---
[Tailscale](https://tailscale.com) is a fantastic secure mesh VPN that lets you connect all of your devices to each other, no matter where they are or if you've exposed them publicly to the internet. I use it extensively to use all my homelab services and run it on virtually every server. They have a very generous free tier and hope that enthusiasts enjoy it so much that they bring it to their workplace.

Tailscale publishes a great [article](https://tailscale.com/kb/1114/pi-hole/) on how to use a [Pi-hole](https://pi-hole.net/) as the DNS server on your tailnet, allowing you to fully control the DNS of your device no matter what network you are connected to while leveraging their Magic DNS to connect to the other devices on your tailnet. One thing it doesn't cover is how to reenable conditional forwarding for your Pi-hole so that your statistics are not full of your Tailscale assigned `100.x.x.x` addresses but instead show the machines hostname.

## Conditional forwarding
Pi-hole already supports conditional forwarding but the UI only lets you configure a single local network. If you are like me, you still want to get the statistics for your local network but also would like to get the statics for machines on your tailnet. Luckily, Pi-hole uses dnsmasq and it's easy enough to add our own configuration file to support this use case.

## Configuration
Pi-hole will load all configuration files for dnsmasq from `/etc/dnsmasq.d/`. To support looking up the Tailscale hostnames, we need to add our own configuration file to this directory.


```ini:/etc/dnsmasq.d/10-custom-rev-server.conf
rev-server=100.64.0.0/10,100.100.100.100
```

The IP address range `100.64.0.0/10` comes from the [Tailscale documentation](https://tailscale.com/kb/1015/100.x-addresses/). `100.100.100.100` is the IP address of the local Tailscale DNS server. You will see this address if you have [MagicDNS](https://tailscale.com/kb/1081/magicdns/) enabled, it will be listed as the DNS server for your tailnet.
