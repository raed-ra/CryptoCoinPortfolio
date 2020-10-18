import React from "react";

// import { Button } from 'react-native-elements';
import { Button, Table } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

const Styles = styled.div`
.canvas-container {
    position: relative;
    margin: auto;
    height: 10vh;
    width: 5vw;
  }
    `;

function DashboardTable({data, onRowEdit, chartSelectCoin, tableType}) {

    console.log(data)
    console.log(tableType)
    return (
        <Styles>
            <Table striped bordered hover variant="light">
                <tr></tr>
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">Coin</th>
                        <th className="align-middle">Price</th>
                        <th className="align-middle">Total Value</th>
                        <th className="align-middle">Profit/Loss</th>
                        <th className="align-middle">Change</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row._id}>
                            <td className="align-middle">{index + 1}</td>
                            <td 
                            className="align-middle" 
                            onClick={e => chartSelectCoin(row)}>
                                <img
                                    className="image"
                                    width="35"
                                    src={`https://cryptocompare.com${row.imageURL}`}
                                />
                                {"  " + row.coin + "        "}
                                { tableType ==="transaction" ? <Button     
                                    className="float-right"
                                    variant="warning"
                                    label="Submit"
                                    // buttonStyle={{ borderRadius: 50, display: 'flex', justifyContent: 'right' }}
                                    style={{ borderRadius: 50 }}
                                    onClick={()=> onRowEdit(row)}
                                >
                                    <FontAwesome
                                        className='super-crazy-colors'
                                        name='edit'
                                        size='1x'
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Button> : ""} 
                            </td>
                            <td className="align-middle">${row.currentPrice}</td>
                            <td className="align-middle">${row.totalValue}</td>
                            <td className="align-middle">${row.profitLoss}</td>
                            <td className="align-middle">{row.change}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Styles>
    );
}
export default DashboardTable;