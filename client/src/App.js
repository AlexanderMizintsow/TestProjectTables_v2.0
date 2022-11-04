import React from 'react';
import TableReceipt from "./components/Tables/TableReceipt";
import TableSales from "./components/Tables/TableSales";
import ButtonTable from "./components/button/ButtonTable";
import Snow from "./components/Snow/HappyNew";
import './App.css';

function App() {
    return (
        <div className="App">
            <Snow/>
            <header className="App-header">
                <ButtonTable  name={"Sales"} table={<TableSales/>}/>
                <ButtonTable name={"Receipt"} table={<TableReceipt/>}/>
            </header>
        </div>
    );
}
export default App;
