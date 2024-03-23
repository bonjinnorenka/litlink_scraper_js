# litlink_scraper_js
litlink scraper written by typescript

## How to use

```bash
$ npm install litlink_scraper_js
```

```typescript
import { litlink_scraper } from 'litlink_scraper_js';
(async()=>{
    const litlink = new litlink_scraper.litlink("UnoMochiya");//https://lit.link/UnoMochiya
    await litlink.get_full_data();
    console.log(JSON.stringify(litlink.litlink_data));
})()
```
