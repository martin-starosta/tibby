import type { CaseCard } from '@/game/reducer'

export const CASES: CaseCard[] = [
  {
    id: 'case_bodor',
    act: 1,
    title: 'Podnikateľ Bödör',
    prompt: 'Podnikateľ Bödör ponúka 50 000 € za nevyšetrovanie.',
    accept: { money: 50000, risk: 20 },
    refuse: { money: 0, risk: 0 },
    fact: {
      text: 'V skutočnosti ide o verejne známu líniu kauze Očistec, o ktorej písali investigatívne médiá.',
      sourceName: 'Denník N',
      sourceUrl:
        'https://dennikn.sk/5134387/korupcny-newsfilter-gasparov-ocistec-sa-pomaly-meni-na-peklo/',
    },
  },
  {
    id: 'case_lustracia',
    act: 1,
    title: 'Lustrovanie opozície',
    prompt: 'Lustrovanie opozície. Máme sledovať politického oponenta?',
    accept: { money: 30000, risk: 15 },
    refuse: { money: 0, risk: 0 },
    fact: {
      text: 'V skutočnosti politické zneužívanie polície patrí k dokumentovaným vzorcom v kauze.',
      sourceName: 'Pluska',
      sourceUrl:
        'https://www1.pluska.sk/spravy/fico-udrel-pre-kauzu-mom-iek-21-miliona-eur-je-len-vrchol-ladovca',
    },
  },
  {
    id: 'case_ocistec_file',
    act: 1,
    title: 'Spis Očistec',
    prompt: 'Spis Očistec leží na stole. Zmizne za 80 000 €.',
    accept: { money: 80000, risk: 25 },
    refuse: { money: 0, risk: 0 },
    fact: {
      text: 'V skutočnosti pojednávania v kauze Očistec prebiehajú na Špecializovanom trestnom súde.',
      sourceName: 'STVR',
      sourceUrl:
        'https://spravy.stvr.sk/spravy-po-minute/na-banskobystrickom-pracovisku-specializovaneho-trestneho-sudu-pokracuje-pojednavanie-v-kauze-ocistec/',
    },
  },
]
