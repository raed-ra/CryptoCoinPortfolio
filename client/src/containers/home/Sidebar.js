import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { withRouter } from "react-router";
import '../../Pages/layout/public/style/Dashboard.css'
import axios from "axios";
import moment from "moment"
import API from './../../utils/API'

function Sidebar() {

    const [news, setNews] = useState([])

    const fetchnews = async () => {
        try {
            console.log("test1");
            let response = await API.homeSideBarNews()
            console.log(response)
            setNews(response.data.Data.slice(14))
        } catch (err) {
        if (err.response.status === 401) {
        }
    }
}
// call post api to load all the data in page
useEffect(() => {
    fetchnews()
}, [])

return (
    <Container style={{ pading: 2 }}>
        <Row>.</Row> <Row>.</Row> <Row>.</Row> <Row>.</Row>

        {news.map((newsItem) => (
            <Row key={newsItem.id}>
                <Col xs={3}></Col>
                <Col className="align-middle" xs={6}>
                    <Row><img className="image" width="150" height="150" href={`${newsItem.guid}`} src={`${newsItem.imageurl}`} /></Row>
                    <Row>News Headlines:</Row><Row><a href={`${newsItem.guid}`}>{newsItem.title}</a></Row>
                    <Row>Published Date:<a href={`${newsItem.guid}`}>{moment.tz(newsItem.published_on, "Australia/Perth").format('YYYY-MM-DD')}</a></Row>
                </Col>
                <Col xs={3}></Col>
            </Row>
        ))}
        <Row>.</Row>
        <Row>.</Row>
        <Row>.</Row>
    </Container>
);
};

export default Sidebar
