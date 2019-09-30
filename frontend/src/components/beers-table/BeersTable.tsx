import React, { useContext } from "react";
import './BeersTable.scss';
import { WithTranslation, withTranslation } from "react-i18next";
import * as Context from "../BeersContext";
import { Table, TableRow, TableHead, TableBody, withStyles, TableCell, CircularProgress, Typography,
        TableFooter, TablePagination, Paper } from "@material-ui/core";
import { Beer } from "../../classes/interfaces/beer.interface";

interface BeersTableProps {
    loading: boolean;
    isLastPage: boolean;
    onChangePage: (newPage: number) => void;
    onChangePerPage: (newPerPage: number) => void;
}

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function BeersTable(props: BeersTableProps & WithTranslation) {
    const ctx = useContext(Context.default);
    const list: Beer[] = ctx.list;
    const {t, isLastPage} = props;

    const getMonth = (month: string): string => {
        return month.indexOf('/') > 0 ? month : '01/' + month;
    };

    const items = list.slice(0, ctx.perPage);

    return <Paper className="root">
    <div className="tableWrapper">
    <Table className="beers-table" stickyHeader>
        <TableHead>
            <TableRow className="row">
                <TableCell>{props.t('app.beerTable.header.name')}</TableCell>
                <TableCell>{props.t('app.beerTable.header.desc')}</TableCell>
                <TableCell>{props.t('app.beerTable.header.firstBrewed')}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                props.loading ?
                <TableRow>
                    <TableCell colSpan={3}>
                        <div className="one-row-cont"><CircularProgress color="primary" size={80}/></div>
                    </TableCell>
                </TableRow>
                : items.map((row: Beer) => (
                    <StyledTableRow key={row.id}>
                        <TableCell ><span>{row.name}</span></TableCell>
                        <TableCell ><span>{row.description}</span></TableCell>
                        <TableCell align="right"><span>{getMonth(row.first_brewed)}</span></TableCell>
                    </StyledTableRow>
                ))
            }
            {
                items.length === 0 && !props.loading &&
                <tr><td colSpan={3}>
                        <div className="one-row-cont">
                            <Typography variant="h3" component="h3" className="no-results">
                                {t('app.beerTable.noresults')}
                            </Typography>
                        </div>
                </td></tr>
            }
        </TableBody>
        <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={999999}
                labelDisplayedRows={({from, to, count}) => {
                    if (items.length > 0 && !props.loading) {
                        return <div>{from}-{isLastPage ? (from + items.length - 1) : to}</div>;
                    }
                    return <div>0-0</div>;
                }}
                rowsPerPage={ctx.perPage}
                page={ctx.page - 1}
                labelRowsPerPage={<div>{t('app.beersTable.caption.rowsPerPage')}</div>}
                SelectProps={{
                  native: true,
                }}
                nextIconButtonProps={
                    {disabled: isLastPage}
                }
                onChangePage={(_: any, newPage: number) => props.onChangePage(newPage+1)}
                onChangeRowsPerPage={(ev: any) => props.onChangePerPage(parseInt(ev.target.value, 10))}
              />
            </TableRow>
          </TableFooter>
    </Table>
    </div>
    </Paper>;
}

export default withTranslation()(BeersTable);
