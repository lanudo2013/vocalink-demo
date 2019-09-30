import { ReactWrapper, mount } from "enzyme";
import React from 'react';
import BeersTable from "../components/beers-table/BeersTable";
import BeersContext, { InitialState } from "../components/BeersContext";
import { BeersContext as BCtx} from "../classes/interfaces/beers-context.interface";
import beersService from "../services/beers.service";
import { TableRow, TableBody, TableCell, TablePagination, TableFooter, CircularProgress } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { beersData } from "../util/mocks";

jest.mock('react-i18next', () => ({
    withTranslation: () => (comp: React.ComponentType<any>) => {
      comp.defaultProps = { ...comp.defaultProps, t: (s: string) => s };
      return comp;
    }
}));

describe('BeersTable component', () => {
    let changePageFn = jest.fn();
    let changePerPageFn = jest.fn();
    let root: ReactWrapper;
    let thisContext: BCtx;

    const getMonth = (month: string): string => {
        return month.indexOf('/') > 0 ? month : '01/' + month;
    };

    const getPagButtons = (): ReactWrapper[] => {
        const footer: ReactWrapper = root.find(TableFooter).update();
        const pagination = footer.find(TablePagination);
        const actions: ReactWrapper = pagination.first()
                        .find('div.MuiTablePagination-actions');
        const perPageSelect: ReactWrapper = pagination.first()
                        .find('div.MuiTablePagination-selectRoot select');
        const backButton: ReactWrapper = actions.childAt(0);
        const nextButton: ReactWrapper = actions.childAt(1);
        return [backButton, nextButton, perPageSelect];
    };

    const checkRows = (fromRow: number, toRow: number) => {
        const rowCount = toRow - fromRow;
        const list: ReactWrapper = root.update().find(TableBody).find(TableRow);
        const matchingData = beersData.slice(fromRow, toRow);
        expect(list.length).toEqual(thisContext.list.length);
        expect(list.length).toEqual(rowCount);
        const rs = thisContext.list;
        for (let i = 0; i < list.length; i++) {
            const el = list.at(i);
            const cells = el.find(TableCell);
            expect(cells.length).toEqual(3);
            expect(cells.at(0).text()).toEqual(rs[i].name);
            expect(cells.at(1).text()).toEqual(rs[i].description);
            expect(cells.at(2).text()).toEqual(getMonth(rs[i].first_brewed));

            expect(cells.at(0).text()).toEqual(matchingData[i].name);
            expect(cells.at(1).text()).toEqual(matchingData[i].description);
            expect(cells.at(2).text()).toEqual(getMonth(matchingData[i].first_brewed));
        }
    };

    beforeEach((dn) => {
        changePageFn = jest.fn().mockImplementation((value) => {
            return new Promise(res => {
                beersService.getBeersByFood(value, thisContext.perPage, '').subscribe((list) => {
                    thisContext.list = list;
                    thisContext.page = value;
                    res(thisContext);
                });
            });
        });
        changePerPageFn = jest.fn((pp) => {
            return new Promise(res => {
                beersService.getBeersByFood(1, pp, '').subscribe((list) => {
                    thisContext.list = list;
                    thisContext.page = 1;
                    thisContext.perPage = pp;
                    res(thisContext);
                });
            });
        });
        thisContext = {
            ...InitialState,
            perPage: 4,
            page: 1,
            list: []
        };
        beersService.getBeersByFood(thisContext.page, thisContext.perPage, '').subscribe((list) => {
            thisContext.list = list;
            root = mount(<BeersTable onChangePage={changePageFn} loading={false} onChangePerPage={changePerPageFn} isLastPage={false}/>,
                {
                    wrappingComponent: BeersContext.Provider,
                    wrappingComponentProps: { value: thisContext }
                });
            dn();
        });

    });

    test('Load table with faked beers', () => {
        checkRows(0, 4);
    });

    test('Load table, change page  with faked beers', (dn) => {
        const [backButton, nextButton] = getPagButtons();
        expect((backButton.props() as ButtonProps).disabled).toBeTruthy();
        expect((nextButton.props() as ButtonProps).disabled).toBeFalsy();
        nextButton.simulate('click');
        setTimeout(() => {
            expect(changePageFn).toHaveBeenCalled();
            (changePageFn.mock.results[0].value as Promise<BCtx>).then(ctx => {
                root.getWrappingComponent().setProps({
                    value: ctx
                });
                checkRows(4, 8);
                expect(ctx.page).toEqual(2);
                dn();
            });
        });

    });

    test('Loading state', () => {
        root.setProps({
            loading: true
        });
        const list: ReactWrapper = root.update().find(TableBody).find(TableRow);
        expect(list.length).toEqual(1);
        const cells = list.first().find(TableCell);
        expect(cells.length).toEqual(1);
        expect(cells.first().find(CircularProgress).length).toEqual(1);
    });

    test('Table with last page property', () => {
        root.setProps({
            isLastPage: true
        });
        const [backButton, nextButton, perPageSelect] = getPagButtons();
        expect((backButton.props() as ButtonProps).disabled).toBeTruthy();
        expect((nextButton.props() as ButtonProps).disabled).toBeTruthy();
    });

    test('Load table, change page and then change rows per page', (dn) => {
        const newPerPageValue = 25;
        const [backButton, nextButton, perPageSelect] = getPagButtons();
        nextButton.simulate('click');
        setTimeout(() => {
            expect(changePageFn).toHaveBeenCalled();
            (changePageFn.mock.results[0].value as Promise<BCtx>).then(ctx => {
                expect(ctx.page).toEqual(2);
                const eventObj = {target: {value: newPerPageValue.toString()}};
                perPageSelect.simulate('change', eventObj);
                setTimeout(() => {
                    expect(changePerPageFn).toHaveBeenCalled();
                    (changePerPageFn.mock.results[0].value as Promise<BCtx>).then(ctx => {
                        root.getWrappingComponent().setProps({
                            value: ctx
                        });
                        checkRows(0, beersData.length);
                        expect(ctx.perPage).toEqual(newPerPageValue);
                        expect(ctx.page).toEqual(1);
                        dn();
                    });
                });
            });
        });

    });
});
