# veyro.wtf

The bot's product site. Static HTML, no framework — the pages are
hand-written and served straight off Cloudflare Workers assets.

| | |
| --- | --- |
| `site/index.html` | the site |
| `site/alt.html` | second direction, kept for reference |
| `DESIGN.md` | the design system both are built on |

Corporate and fundraising live separately at **veyro.casa**
(`veyro-real/veyro-landing-page`). The footer links to it.

## Deploy

```
wrangler deploy
```

No build. `site/` is uploaded as-is and `veyro.wtf` is attached as a custom
domain, so Cloudflare manages the record and the certificate.

## Claims

The trending ticker is real: eight Solana mints, live from DexScreener, real
logos and real 24h change. Nothing on the page invents a number — where data
is missing it shows an em dash.

`Watches X` and `Follows wallets` describe work that is **not wired yet**.
They are on the page because they came from the mockup. Fix the copy or ship
the features before treating this as finished marketing.
