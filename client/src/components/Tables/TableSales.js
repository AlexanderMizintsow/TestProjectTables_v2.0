import {useState, useEffect} from 'react';
import EditableTable from "../EditableTable";

function TableSales() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/api/table/sales')
            .then((res) =>
                res.json())
            .then((response) => setData(response));
    }, [])
    console.log(data)

    const columns = [
        {fieldName: '#'},
        {fieldName: 'Дата продажи'},
        {fieldName: 'Название филиала'},
        {fieldName: 'Тип документа'},
        {fieldName: 'Общая сумма чека'},
        {fieldName: 'Кол-во проданного товара'},
        {fieldName: 'Кол-во позиций в чеке'},
        {fieldName: 'id Чека'}
    ];

    return (
        <>
            <EditableTable columns={columns} rows={data} actions/>
        </>
    );
}

export default TableSales;