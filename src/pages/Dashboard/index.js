import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Col,
  Container, Row
} from "reactstrap"


import ArticleList from "./ArticleList"

import Breadcrumbs from "../../components/Common/Breadcrumb"


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      token: ''
    }
  }
  componentDidMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
    document.body.style.backgroundColor = "#f8f8f8"
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Arvan Challenge | All Articles</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs
              breadcrumbItem="All Posts"
            />
            <Row>
              <Col xl="12">
                <ArticleList />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;
