/**
 * @file Obtained from {@link https://bahai-library.com/zamir/realbookmarks2-json.html}.
 */

/**
 * @typedef {{
 *   short_name: string,
 *   keyword: string,
 *   url: string
 * }} SearchEngine
 */

/* eslint-disable camelcase -- Original source */
const searchEngines = /** @type {SearchEngine[]} */ ([
  {
    short_name: 'Days of Remembrance',
    keyword: 'dor',
    url: 'https://bahai-library.com/compilation_days_remembrance#sec%s'
  },
  {
    short_name: 'Bahai.org/library redirect by ID',
    keyword: 'br',
    url: 'https://bahai.org/r/%s'
  },
  {
    short_name: 'Bahai9.com',
    keyword: 'b9',
    url: 'https://bahai9.com/wiki/%s'
  },
  {
    short_name: 'Bahai9.com search',
    keyword: 'b9s',
    url: 'https://bahai9.com/index.php?search=insource%3A%s&title=Special%3ASearch&go=Go'
  },
  {
    short_name: 'Bahaipedia.org',
    keyword: 'bpedia',
    url: 'https://bahaipedia.org/%s'
  },
  {
    short_name: 'Bahaipedia.org search',
    keyword: 'bpedias',
    url: 'https://bahaipedia.org/index.php?search=insource%3A%s&title=Special%3ASearch&fulltext=Search'
  },
  {
    short_name: 'Bahai.works',
    keyword: 'bworks',
    url: 'https://bahai.works/%s'
  },
  {
    short_name: 'Bahai.works search',
    keyword: 'bworkss',
    url: 'https://bahai.works/index.php?search=insource%3A%s&title=Special%3ASearch&fulltext=Search'
  },
  {
    short_name: 'Bahaipedia.org random category',
    keyword: 'bpediarandcat',
    url: 'https://bahaipedia.org/Special:RandomInCategory/%s'
  },
  {
    short_name: 'Bahai9.com random category',
    keyword: 'b9randcat',
    url: 'https://bahai9.com/wiki/Special:RandomInCategory/%s'
  },
  {
    short_name: 'Bahai.works random category',
    keyword: 'worksrandcat',
    url: 'https://bahai.works/Special:RandomInCategory/%s'
  },
  {
    short_name: 'Bahai.media random category',
    keyword: 'mediarandcat',
    url: 'https://bahai.media/Special:RandomInCategory/%s'
  },
  {
    short_name: 'Star of the West',
    keyword: 'sow',
    url: 'https://bahai-library.com/jumpto2.php?booklist=https%3A%2F%2Fbahai.works%2FStar_of_the_West%2FVolume_%2B%2B%2B%2FIssue_%40%40%40%2FText%23pg~~~&search=%s'
  },
  {
    short_name: 'Star of the West search',
    keyword: 'sows',
    url: 'https://bahai.works/index.php?search=%s+prefix%3AStar_of_the_West%2F&ns0=1&ns4000=1&ns4010=1&ns4020=1'
  },
  {
    short_name: "Bahá'í News",
    keyword: 'bnews',
    url: 'https://bahai-library.com/jumpto2.php?booklist=https%3A%2F%2Fbahai.works%2FBaha%27i_News%2FIssue_%2B%2B%2B%2FText%23pg%40%40%40&search=%s'
  },
  {
    short_name: "Bahá'í News search",
    keyword: 'bnewss',
    url: 'https://bahai.works/index.php?search=%s+prefix%3ABaha%27i_News%2F&ns0=1&ns4000=1&ns4010=1&ns4020=1'
  },
  {
    short_name: 'Bahai.media',
    keyword: 'bcommons',
    url: 'https://bahai.media/%s'
  },
  {
    short_name: 'Bahai.media search',
    keyword: 'bcommonss',
    url: 'https://bahai.media/index.php?search=insource%3A%s&title=Special%3ASearch&fulltext=Search'
  },
  {
    short_name: 'Wikipedia',
    keyword: 'w',
    url: 'https://en.wikipedia.org/wiki/%s'
  },
  {
    short_name: 'Wikipedia search',
    keyword: 'ws',
    url: 'https://en.wikipedia.org/w/index.php?search=insource%3A%s&title=Special%3ASearch&go=Go&ns0=1'
  },
  {
    short_name: "Baha'i Library Search",
    keyword: 'bls',
    url: 'https://www.google.com/search?q=site%3Abahai-library.com+%s&ie=utf-8&oe=utf-8&client=firefox-b-1-ab&gfe_rd=cr&dcr=0&ei=4Pp-WrqUF8uhX5DPrvAL'
  },
  {
    short_name: "Baha'i Library Search",
    keyword: 'b',
    url: 'https://www.google.com/search?q=site%3Abahai-library.com+%s&ie=utf-8&oe=utf-8&client=firefox-b-1-ab&gfe_rd=cr&dcr=0&ei=4Pp-WrqUF8uhX5DPrvAL'
  },
  {
    short_name: "Bahá'í Stories search",
    keyword: 'bstorys',
    url: 'https://www.bahaistories.com/index.php/search/node?keys=%s'
  },
  {
    short_name: "Bahá'í Writings search",
    keyword: 'bws',
    url: 'https://www.bahai.org/library/authoritative-texts/search?q=%s'
  },
  {
    short_name: 'Bahai.org Other Literature Search',
    keyword: 'bos',
    url: 'https://www.bahai.org/library/other-literature/search?q=%s'
  },
  {
    short_name: 'Universal House of Justice Search',
    keyword: 'uhjs',
    url: 'https://www.google.com/search?client=firefox-b-d&q=site%3Auniversalhouseofjustice.bahai.org+%s'
  },
  {
    short_name: "'Abdu'l-Baha in London",
    keyword: 'abl',
    url: 'https://bahai-library.com/writings/abdulbaha/abl/abdulbahalondon.html#%s'
  },
  {
    short_name: 'Advent of Divine Justice',
    keyword: 'adj',
    url: 'https://bahai-library.com/writings/shoghieffendi/adj/adj.html#%s'
  },
  {
    short_name: "'Abdu'l-Baha on Divine Philosophy",
    keyword: 'adp',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fabdul-baha_divine_philosophy%26chapter%3D%2B%2B%2B%23%40%40%40&search=%s'
  },
  {
    short_name: 'Messages to the Antipodes',
    keyword: 'man',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fshoghieffendi%2Fantipodes%2Fantipodes.html%23%40%40%40&search=%s'
  },
  {
    short_name: 'Messages to the Antipodes Year',
    keyword: 'manyear',
    url: 'https://bahai-library.com/writings/shoghieffendi/antipodes/%s.html'
  },
  {
    short_name: 'Arohanui',
    keyword: 'aro',
    url: 'https://bahai-library.com/writings/shoghieffendi/arohanui/aro.html#%s'
  },
  {
    short_name: "Baha'i Administration",
    keyword: 'ba',
    url: 'https://bahai-library.com/writings/shoghieffendi/ba/ba-all.html#%s'
  },
  {
    short_name: 'Bible Passage',
    keyword: 'bib',
    url: 'https://bible.gospelcom.net/cgi-bin/bible?passage=%s'
  },
  {
    short_name: 'Bible Search',
    keyword: 'bibs',
    url: 'https://bible.gospelcom.net/cgi-bin/bible?SearchType=AND&language=english&version=NIV&searchpage=0&search=%s&x=0&y=0'
  },
  {
    short_name: 'Blue Letter Bible',
    keyword: 'blb',
    url: 'https://www.blueletterbible.org/search/preSearch.cfm?Criteria=%s'
  },
  {
    short_name: 'Blue Letter Bible Search',
    keyword: 'blbs',
    url: 'https://www.blueletterbible.org/search/search.cfm?Criteria=%s&t=KJV#s=s_primary_0_1'
  },
  {
    short_name: "Baha'i Library",
    keyword: 'bl',
    url: 'https://bahai-library.com/%s'
  },
  {
    short_name: 'Century of Light',
    keyword: 'cl',
    url: 'https://bahai-library.com/uhj_century_light&chapter=all#pg%s'
  },
  {
    short_name: 'Japan Will Turn Ablaze!',
    keyword: 'blaze',
    url: 'https://bahai-library.com/compilation_japan_turn_ablaze&chapter=all#pg%s'
  },
  {
    short_name: "Baha'i Library Online Search",
    keyword: 'blg',
    url: 'https://www.google.com/custom?q=%s&sa=++Go%21+&cof=LW%3A561%3BBIMG%3Abahai-library.com%2Fback015.gif%3BL%3Abahai-library.com%2Fgraphics%2Flogo.gif%3BLC%3A%23004834%3BLH%3A44%3BAH%3Acenter%3BVLC%3A%23BF1000%3BGL%3A0%3BS%3Abahai-library.com%3BAWFID%3Af35eea7fb2567a11%3B&domains=bahai-library.com&sitesearch=bahai-library.com'
  },
  {
    short_name: "Baha'i Library Online Tag Search",
    keyword: 'btag',
    url: 'https://bahai-library.com/tags/%s'
  },
  {
    short_name: "Baha'i Library Online Location Search",
    keyword: 'bloc',
    url: 'https://bahai-library.com/locations/%s'
  },
  {
    short_name: "Baha'i Library Online Chronology Search",
    keyword: 'chron',
    url: 'https://bahai-library.com/tags/%s#1'
  },
  {
    short_name: "Baha'i Library Online Canada Chronology Search",
    keyword: 'cchron',
    url: 'https://bahai-library.com/tags/%s#2'
  },
  {
    short_name: "Baha'i Library Online Catalog Search",
    keyword: 'cat',
    url: 'https://bahai-library.com/tags/%s#3'
  },
  {
    short_name: "Baha'i Library Online Date Search",
    keyword: 'bdate',
    url: 'https://bahai-library.com/date/%s'
  },
  {
    short_name: "Baha'i Library Online Author Search",
    keyword: 'bauthor',
    url: 'https://bahai-library.com/author/%s'
  },
  {
    short_name: "Baha'i Library Online Title Search",
    keyword: 'btitle',
    url: 'https://bahai-library.com/title/%s'
  },
  {
    short_name: "Baha'u'llah and the New Era",
    keyword: 'bne',
    url: 'https://bahai-library.com/books/new.era/bne.html#%s'
  },
  {
    short_name: "Baha'i News",
    keyword: 'bng',
    url: 'https://bahai-library.com/books/bahainews.guardian/index.html#%s'
  },
  {
    short_name: "Baha'i Prayers",
    keyword: 'bp',
    url: 'https://bahai-library.com/compilations/prayers/bp.html#%s'
  },
  {
    short_name: "Baha'i Scriptures",
    keyword: 'bs',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fcompilations%2Fbahai.scriptures%2F%2B%2B%2B.html%23%40%40%40&search=%s'
  },
  {
    short_name: "Baha'i Scriptures sel.",
    keyword: 'bss',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fcompilations%2Fbahai.scriptures%2F%2B%2B%2B.html%23no%40%40%40&search=%s'
  },
  {
    short_name: "Baha'i World Faith",
    keyword: 'bwf',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fcompilations%2Fbwf%2Fbwf%2B%2B%2B.html%23%40%40%40&search=%s'
  },
  {
    short_name: 'Bahiyyih Khanum',
    keyword: 'bk',
    url: 'https://bahai-library.com/books/bahiyyih.khanum/bkall.html#%s'
  },
  {
    short_name: 'Citadel of Faith',
    keyword: 'cf',
    url: 'https://bahai-library.com/writings/shoghieffendi/cf/cfall.html#%s'
  },
  {
    short_name: 'Dawn-Breakers',
    keyword: 'db',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fbooks%2Fdawnbreakers%2Fchapters%2F%2B%2B%2B.html%23%40%40%40&search=%s'
  },
  {
    short_name: "Developing Distinctive Baha'i Communities",
    keyword: 'ddbc',
    url: 'https://bahai-library.com/nsa_developing_distinctive_communities&chapter=1#%s'
  },
  {
    short_name: 'Directives from the Guardian',
    keyword: 'dg',
    url: 'https://bahai-library.com/writings/shoghieffendi/dg/dgall.html#%s'
  },
  {
    short_name: 'Dawn of a New Day',
    keyword: 'dnd',
    url: 'https://bahai-library.com/writings/shoghieffendi/dnd/dndall.html#%s'
  },
  {
    short_name: 'Epistle to the Son of the Wolf',
    keyword: 'esw',
    url: 'https://bahai-library.com/bahaullah_epistle_son_wolf#%s'
  },
  {
    short_name: 'Foundations of World Unity',
    keyword: 'fwu',
    url: 'https://bahai-library.com/writings/abdulbaha/fwu/fwu.html#%s'
  },
  {
    short_name: 'Gems of Divine Mysteries',
    keyword: 'gdm',
    url: 'https://bahai-library.com/bahaullah_gems_divine_mysteries#%s'
  },
  {
    short_name: 'God Passes By',
    keyword: 'gpb',
    url: 'https://bahai-library.com/writings/shoghieffendi/gpb/gpball.html#%s'
  },
  {
    short_name: "Gleanings from the Writings of Baha'u'llah",
    keyword: 'gwb',
    url: 'https://bahai-library.com/writings/bahaullah/gwb/gleaningsall.html#%s'
  },
  {
    short_name: "Gleanings from the Writings of Baha'u'llah Section",
    keyword: 'gwbs',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fbahaullah%2Fgwb%2F%40%40%40.html&search=%s'
  },
  {
    short_name: 'High Endeavours',
    keyword: 'he',
    url: 'https://bahai-library.com/writings/shoghieffendi/he/index.html#%s'
  },
  {
    short_name: 'Hidden Words (page)',
    keyword: 'hw',
    url: 'https://bahai-library.com/writings/bahaullah/hw/hw-all.html#%s'
  },
  {
    short_name: 'Hidden Words Arabic No.',
    keyword: 'hwa',
    url: 'https://bahai-library.com/writings/bahaullah/hw/arabic/%s.html'
  },
  {
    short_name: 'Hidden Words Persian No.',
    keyword: 'hwp',
    url: 'https://bahai-library.com/writings/bahaullah/hw/persian/%s.html'
  },
  {
    short_name: 'Kitab-i-Aqdas (page)',
    keyword: 'ka',
    url: 'https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#%s'
  },
  {
    short_name: 'Kitab-i-Aqdas Notes',
    keyword: 'kan',
    url: 'https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#note%s'
  },
  {
    short_name: 'Kitab-i-Aqdas Paragraph',
    keyword: 'kap',
    url: 'https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#par%s'
  },
  {
    short_name: 'Kitab-i-Aqdas Question and Answers',
    keyword: 'kaq',
    url: 'https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#q%s'
  },
  {
    short_name: 'Kitab-i-Iqan',
    keyword: 'ki',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fbahaullah%2Fiqan%2Fiq-%2B%2B%2B.htm%23%40%40%40&search=%s'
  },
  {
    short_name: 'Kitab-i-Iqan Paragraph',
    keyword: 'kip',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fbahaullah%2Fiqan%2Fiq-%2B%2B%2B.htm%23p%40%40%40&search=%s'
  },
  {
    short_name: 'Letters from the Guardian to Australia and New Zealand',
    keyword: 'lanz',
    url: 'https://bahai-library.com/writings/shoghieffendi/lanz/index.html#%s'
  },
  {
    short_name: 'Light of Divine Guidance, volume 1',
    keyword: 'ldg1',
    url: 'https://bahai-library.com/writings/shoghieffendi/ldg/ldg1.html#%s'
  },
  {
    short_name: 'Light of Divine Guidance, volume 2',
    keyword: 'ldg2',
    url: 'https://bahai-library.com/writings/shoghieffendi/ldg/ldg2.html#%s'
  },
  {
    short_name: 'Lights of Guidance (by number)',
    keyword: 'logn',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fhornby_lights_guidance%26chapter%3D%2B%2B%2B%23n%40%40%40&search=%s'
  },
  {
    short_name: 'Lights of Guidance (by page)',
    keyword: 'log',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fhornby_lights_guidance%26chapter%3D%2B%2B%2B%23%40%40%40&search=%s'
  },
  {
    short_name: 'Messages to America',
    keyword: 'ma',
    url: 'https://bahai-library.com/writings/shoghieffendi/ma/maall.html#%s'
  },
  {
    short_name: "Messages to the Baha'i World",
    keyword: 'mbw',
    url: 'https://bahai-library.com/writings/shoghieffendi/mbw/mbwall.html#%s'
  },
  {
    short_name: 'Messages to Canada 1965 edition',
    keyword: 'mc',
    url: 'https://bahai-library.com/writings/shoghieffendi/mc/mcall.html#%s'
  },
  {
    short_name: 'Messages to Canada 1999 edition',
    keyword: 'mc2',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fshoghi-effendi_messages_canada_1999%23%40%40%40&search=%s'
  },
  {
    short_name: 'Messages to the Indian Subcontinent',
    keyword: 'msei',
    url: 'https://bahai-library.com/shoghi-effendi_messages_indian_subcontinent#pg%s'
  },
  {
    short_name: 'Memorials of the Faithful',
    keyword: 'mf',
    url: 'https://bahai-library.com/writings/abdulbaha/mf/mf.html#%s'
  },
  {
    short_name: "Passing of 'Abdu'l-Baha",
    keyword: 'pass',
    url: 'https://bahai-library.com/books/passing.html#%s'
  },
  {
    short_name: "Proclamation of Baha'u'llah",
    keyword: 'pb',
    url: 'https://bahai-library.com/writings/bahaullah/pb/pball.html#%s'
  },
  {
    short_name: 'Promised Day Is Come',
    keyword: 'pdc',
    url: 'https://bahai-library.com/writings/shoghieffendi/pdc/pdicall.html#%s'
  },
  {
    short_name: 'Promised Day Is Come Paragraph',
    keyword: 'pdcp',
    url: 'https://bahai-library.com/writings/shoghieffendi/pdc/pdicall.html#par%s'
  },
  {
    short_name: 'Prayers and Meditations',
    keyword: 'pm',
    url: 'https://bahai-library.com/writings/bahaullah/pm/pm.html#%s'
  },
  {
    short_name: 'Prayers and Meditations Section',
    keyword: 'pms',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fbahaullah%2Fpm%2F%40%40%40.html&search=%s'
  },
  {
    short_name: 'Paris Talks',
    keyword: 'pt',
    url: 'https://bahai-library.com/writings/abdulbaha/pt/pt.html#%s'
  },
  {
    short_name: 'Promulgation of Universal Peace',
    keyword: 'pup',
    url: 'https://bahai-library.com/writings/abdulbaha/pup/pup.html#%s'
  },
  {
    short_name: "Qur'an",
    keyword: 'qur',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fquran%2F%2B%2B%2B.html%23Paragraph%2520%40%40%40&search=%s'
  },
  {
    short_name: "Qur'an search",
    keyword: 'qurs',
    url: 'https://www.google.com/search?newwindow=1&rlz=1C5CHFA_enUS736HK737&ei=R2T5X6WPIIT6wQOzvqeoBw&q=site%3Abahai-library.com+inurl%3A%22writings%2Fquran%22+%s&oq=site%3Abahai-library.com+inurl%3A%22writings%2Fquran%22+God&gs_lcp=CgZwc3ktYWIQA1DyK1jcLmCPO2gAcAB4AIAB5waIAdMQkgEJMy0xLjIuMC4xmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwjlzpHTso7uAhUEfXAKHTPfCXUQ4dUDCA0&uact=5'
  },
  {
    short_name: 'Some Answered Questions (Old version)',
    keyword: 'saq',
    url: 'https://bahai-library.com/writings/abdulbaha/saq/saqall.html#%s'
  },
  {
    short_name: 'Some Answered Questions Chapter',
    keyword: 'saqc',
    url: 'https://bahai-library.com/abdul-baha_some_answered_questions#chapter%s'
  },
  {
    short_name: 'Some Answered Questions Paragraph',
    keyword: 'saqp',
    url: 'https://bahai-library.com/abdul-baha_some_answered_questions#par%s'
  },
  {
    short_name: 'Secret of Divine Civilization',
    keyword: 'sdc',
    url: 'https://bahai-library.com/abdul-baha_secret_divine_civilization#%s'
  },
  {
    short_name: 'Summons of the Lord of Hosts',
    keyword: 'slh',
    url: 'https://bahai-library.com/writings/bahaullah/slh/slh.html#%s'
  },
  {
    short_name: 'Seven Valleys and the Four Valleys',
    keyword: 'sv',
    url: 'https://bahai-library.com/writings/bahaullah/sv/sv.toc.html#%s'
  },
  {
    short_name: "Selections from the Writings of 'Abdu'l-Baha",
    keyword: 'swab',
    url: 'https://bahai-library.com/writings/abdulbaha/swab/swaball.html#%s'
  },
  {
    short_name: "Selections from the Writings of 'Abdu'l-Baha Section",
    keyword: 'swabs',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fabdulbaha%2Fswab%2F%40%40%40.html&search=%s'
  },
  {
    short_name: 'Selections from the Writings of the Bab',
    keyword: 'swb',
    url: 'https://bahai-library.com/writings/bab/swb/swball.html#%s'
  },
  {
    short_name: 'Synopsis and Codification of the Kitab-i-Aqdas',
    keyword: 'syn',
    url: 'https://bahai-library.com/bahaullah_synopsis_codification#%s'
  },
  {
    short_name: 'Tabernacle of Unity',
    keyword: 'tu',
    url: 'https://bahai-library.com/bahaullah_tabernacle_unity#pg%s'
  },
  {
    short_name: "Tablets of 'Abdu'l-Baha Abbas, vol. 1-3",
    keyword: 'tab',
    url: 'https://bahai-library.com/jumpto2.php?booklist=http%3A%2F%2Fbahai-library.com%2Fwritings%2Fabdulbaha%2Ftab%2F%2B%2B%2B.html%23%40%40%40&search=%s'
  },
  {
    short_name: 'Tablet to Auguste Forel',
    keyword: 'taf',
    url: 'https://bahai-library.com/writings/abdulbaha/taf/%s.html'
  },
  {
    short_name: "Tablets of Baha'u'llah",
    keyword: 'tb',
    url: 'https://bahai-library.com/writings/bahaullah/tb/tb.html#%s'
  },
  {
    short_name: 'Tablets of the Divine Plan',
    keyword: 'tdp',
    url: 'https://bahai-library.com/writings/abdulbaha/tdp/tdpall.html#%s'
  },
  {
    short_name: 'This Decisive Hour',
    keyword: 'tdh',
    url: 'https://bahai-library.com/shoghi-effendi_this_decisive_hour#%s'
  },
  {
    short_name: "Traveller's Narrative",
    keyword: 'tn',
    url: 'https://bahai-library.com/abdul-baha_travellers_narrative#%s'
  },
  {
    short_name: 'Unfolding Destiny',
    keyword: 'ud',
    url: 'https://bahai-library.com/shoghi-effendi_unfolding_destiny#%s'
  },
  {
    short_name: "World Order of Baha'u'llah",
    keyword: 'wob',
    url: 'https://bahai-library.com/writings/shoghieffendi/wob/woball.html#%s'
  },
  {
    short_name: "Will and Testament of 'Abdu'l-Baha",
    keyword: 'wt',
    url: 'https://bahai-library.com/writings/abdulbaha/wt/wtall.html#%s'
  }
]);

export {searchEngines};
