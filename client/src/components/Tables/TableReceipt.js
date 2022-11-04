import React, {useState, useEffect} from 'react';
import EditableTable from "../EditableTable";

const TableReceipt = () => {
    const [data, getData] = useState([])

    useEffect(() => {
        fetch('/api/table/receipt')
            .then((res) =>
                res.json())
            .then((response) => getData(response));
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
        <>
            <EditableTable columns={columns} rows={data} actions/>
        </>
    );
}

export default TableReceipt;