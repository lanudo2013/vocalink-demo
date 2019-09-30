import { Beer } from './../classes/interfaces/beer.interface';
import { Observable, of } from 'rxjs';
import beersService from '../services/beers.service';

export const beersData: Beer[] = [
    {id: 1, name: 'Beer 1', description: 'Desc 1', first_brewed: '02/2012'},
    {id: 2, name: 'Beer 2', description: 'Desc 2', first_brewed: '02/2014'},
    {id: 3, name: 'Beer 3', description: 'Desc 3', first_brewed: '2015'},
    {id: 4, name: 'Beer 4', description: 'Desc 4', first_brewed: '05/2016'},
    {id: 5, name: 'Beer 5', description: 'Desc 5', first_brewed: '08/2015'},
    {id: 6, name: 'Beer 6', description: 'Desc 6', first_brewed: '02/2013'},
    {id: 7, name: 'Beer 7', description: 'Desc 7', first_brewed: '01/2019'},
    {id: 8, name: 'Beer 8', description: 'Desc 8', first_brewed: '2018'},
    {id: 9, name: 'Beer 9', description: 'Desc 9', first_brewed: '2017'},
    {id: 10, name: 'Beer 10', description: 'Desc 10', first_brewed: '12/2017'},
    {id: 11, name: 'Beer 11', description: 'Desc 11', first_brewed: '11/2013'},

];

jest.spyOn(beersService, 'getBeersByFood')
    .mockImplementation((page: number, perPage: number, food: string): Observable<Beer[]> =>  {
    return of(
        beersData.slice((page - 1) * perPage, page * perPage)
    );
});
