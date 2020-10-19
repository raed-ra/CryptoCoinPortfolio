
import React, { useState, useEffect, Component } from "react";
import { Col, Row, Container, Form, Button, Jumbotron, Table } from 'react-bootstrap'
import axios from "axios";
import { Line } from 'react-chartjs-2';
import moment from 'react-moment'
import 'moment-timezone';
import { truncate } from "fs";


function Chart(props) {

    const [chartData, setChartData] = useState([])
    const [chartDisplayData, setChartDisplayData] = useState([])
    const index = props.index
    let baseURL
    process.env.NODE_ENV === 'development' ? baseURL = 'http://localhost:3001' : baseURL = ''

    async function fetchdata() {
        try {
            // console.log(index)
            const response = await axios.post( baseURL + '/api/cryptocompare/chart', { index }, {
                withCredentials: true,
            })
            // console.log(response.data.Data.Data)
            let updated_chart_data = [];
            let updated_chart_label = [];
            response.data.Data.Data.forEach(function (d, i) {
                // console.log(d.time);
                // console.log(i);
                let x = Date(d.time)
                // console.log(x)
                let y = (d.low + d.high) / 2;

                updated_chart_data.push(y);
                updated_chart_label.push(x);
                // console.log(updated_chart_data)
            })
            let chartData = {
                labels: updated_chart_label,
                datasets: [
                    {
                        data: updated_chart_data,
                    }
                ]
            }
            // console.log(chartData)
            setChartData(chartData)

        } catch (err) {
            console.log("there is an error" + err)
        }
    }
    // call post api to load the charts
    useEffect(() => {
        fetchdata();
    }, [])


    // text area
    return (
        <Line
            data={chartData}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                          },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                          },
                        ticks: {
                            display: false
                        }
                    }]

                },
                title: {
                    display: true,
                    //   text:'Largest Cities In '+this.props.location,
                    //   fontSize:25
                },
                legend: {
                    display: false,
                    //   position:this.props.legendPosition
                }
            }}
        />

    );
}
export default Chart;