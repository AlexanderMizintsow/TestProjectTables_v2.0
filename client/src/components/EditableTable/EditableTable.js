import {useEffect, useMemo, useState} from 'react';
import {Table} from "react-bootstrap";
import TablePagination from "../TablePagination";
import TableSelected from "../Tables/TableSelected";
import ButtonTable from "../button/ButtonTable";
import uuid from "react-uuid";
import './EditableTable.styles.scss';

const EditableTable = ({columns, rows}) => {
    const [rowsState, setRowsState] = useState(rows);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (currentPage >= rows.length / pageSize)
            setCurrentPage(0);
    }, [pageSize])

    useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        const newData = rows.slice(firstPageIndex, lastPageIndex);
        setRowsState(newData);
    }, [currentPage, pageSize]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={uuid()}>{column.fieldName}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {rowsState.map((row, index) => {
                    if (index < pageSize) {
                        return <tr key={uuid()}>
                            <td>
                                {++index}
                            </td>
                            <td>
                                {row.CreateDate || row.Drug}
                            </td>
                            <td>
                                {row.Branch || row.Form}
                            </td>
                            <td>
                                {row.DocType || row.Fabr}
                            </td>
                            <td>
                                {row.SumRoznWNDS || row.UQuantity}
                            </td>
                            <td>
                                {row.sumQuantity || row.SumRoznWNDS}
                            </td>
                            <td>
                                {row.posCount || row.NDS}
                            </td>
                            {row.SrokG ? <td>
                                    {row.SrokG.slice(0, 10)}
                                </td>
                                : null}
                            {row.NaklTitleRID ? <td>
                                    {row.NaklTitleRID}
                                    <ButtonTable
                                        name={"Чек"}
                                        table={<TableSelected id={row.NaklTitleRID}/>}/>
                                </td>
                                : null}
                        </tr>
                    }
                })}
                </tbody>
            </Table>
            <TablePagination
                totalCount={rows.length}
                pageSize={pageSize}
                changeItemsPerPage={page => setPageSize(page)}
                onPageChange={page => setCurrentPage(page)}
                currentPage={currentPage}
            />
        </>
    );
};

export default EditableTable;