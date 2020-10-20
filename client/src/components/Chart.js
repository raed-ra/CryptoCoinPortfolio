
import React, { useState, useEffect, Component } from "react";
import { Col, Row, Container, Form, Button, Jumbotron, Table } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import 'moment-timezone';
import API from './../utils/API'


function Chart(props) {

    const [chartData, setChartData] = useState([])
    const index = props.index

    async function fetchdata() {
        try {
            let response = await API.componentChart(index)
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
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(30,102,102,0.4)',
                        borderColor: 'rgba(30,102,102,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(30,102,102,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(30,102,102,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
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