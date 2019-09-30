import puppeteer, { ElementHandle } from 'puppeteer';
import { beersData } from '../util/mocks';
import { InitialState } from '../components/BeersContext';
import beersService, { SERVER_DELAY } from '../services/beers.service';
import { Beer } from '../classes/interfaces/beer.interface';

jest.setTimeout(90000);

describe('E2E Whole Test', () => {
    let page: puppeteer.Page;
    let browser: puppeteer.Browser;
    const TIMEOUT = 5000;
    const baseUrl = 'http://localhost:4200';
    const apiUrl: string = beersService.getEndpointUrl();
    const ctx = InitialState;

    const getMonth = (month: string): string => {
        return month.indexOf('/') > 0 ? month : '01/' + month;
    };

    const matchesBeersRequestUrl = (request: puppeteer.Request | puppeteer.Response): boolean => {
        return request.url().indexOf(apiUrl) === 0;
    };

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            devtools: false,
            args: ['--lang=en']
        });
        page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on('request', (request: puppeteer.Request) => {
            if (matchesBeersRequestUrl(request)) {
                request.respond({
                    contentType: 'application/json',
                    headers: {"Access-Control-Allow-Origin": "*"},
                    body: JSON.stringify(beersData)
                });
            } else {
                request.continue();
            }
        });

    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.goto(baseUrl + '/');
    });

    test('components load correctly', async () => {
        await page.waitForSelector('.title', { timeout: TIMEOUT});
        await page.waitForSelector('div.meal-input', { timeout: TIMEOUT});
        const table = await page.waitForSelector('table.beers-table', { timeout: TIMEOUT});

        const html = await page.$eval('.title', e => e.textContent);
        expect(html.toLowerCase()).toContain('search a delicious beer with your favourite meal');

        const row = await table.$('tbody tr');
        const text = await row.$eval('div.one-row-cont', e => e.textContent);
        expect(text.toLowerCase()).toEqual('no results');
    });

    test('Load fake beers after meal input', async () => {
        const meal = 'Pizza';
        await page.type('input[id="meal-field"]', meal);

        await page.click('button[type="button"][id="search"]');

        await page.waitForResponse(req => matchesBeersRequestUrl(req), { timeout: TIMEOUT * 2});
        await page.waitFor(SERVER_DELAY * 1.2);
        const table = await page.$('table.beers-table');
        expect(table).toBeDefined();

        const rows: ElementHandle[] = await table.$$('tbody tr');
        expect(rows.length).toBe(ctx.perPage);

        const list: Beer[] = beersData.slice(0, ctx.perPage);

        for (let i = 0; i < rows.length; i++) {
            const x: ElementHandle = rows[i];
            const cells: ElementHandle[] = await x.$$('td');
            const name = await cells[0].$eval('span', e => e.textContent);
            const desc = await cells[1].$eval('span', e => e.textContent);
            const firstBrewed = await cells[2].$eval('span', e => e.textContent);
            expect(list[i].name).toEqual(name);
            expect(list[i].description).toEqual(desc);
            expect(getMonth(list[i].first_brewed)).toEqual(firstBrewed);
        }
    });

    test('fire beers search after pressing enter key on meal input', async () => {
        const meal = 'Hamburguers';
        await page.type('input[id="meal-field"]', meal);
        await page.keyboard.press('Enter');
        await page.waitForResponse(req => matchesBeersRequestUrl(req), { timeout: TIMEOUT * 2});
        await page.waitFor(SERVER_DELAY * 1.2);
    });

});
