import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import uuid from "react-uuid";
import styles from "./TableSelected.module.css"

const TableSelected = ({id}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`/api/table/${id}`)
            .then((res) =>
                res.json())
            .then((response) => setData(response));
    }, [])

    const columns = [
        {fieldName: '#'},
        {fieldName: 'Название товара'},
        {fieldName: 'Форма выпуска'},
        {fieldName: 'Производитель'},
        {fieldName: 'Кол-во проданного товара'},
        {fieldName: 'Сумма продажи'},
        {fieldName: 'Ставка НДС'},
        {fieldName: 'Срок годности'},
    ];

    return (
        <div className={styles.modal}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={uuid()}>{column.fieldName}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => {
                    return <tr key={uuid()}>
                        <td>
                            {++index}
                        </td>
                        <td>
                            {row.Drug}
                        </td>
                        <td>
                            {row.Form}
                        </td>
                        <td>
                            {row.Fabr}
                        </td>
                        <td>
                            {row.SumRoznWNDS}
                        </td>
                        <td>
                            {row.UQuantity}
                        </td>
                        <td>
                            {row.NDS}
                        </td>
                        <td>
                            {row.SrokG.slice(2,10)}
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
}
export default TableSelected;