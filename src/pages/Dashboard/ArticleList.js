import React, { Component } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import axios from "axios"
import PaginationComponent from "react-reactstrap-pagination";
import Article from "./Article"

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      articles: [],
      limit: 20,
      selectedPage: 1,
      locations: undefined,
    }
    this.onDeleteArticle = this.onDeleteArticle.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }
  componentDidMount() {
    this.getStatus()
  }
  getStatus(){
    let Error;
    let offset = this.state.offset
    let limit = 20
    axios.get("/api/articles?offset=" + offset +'&limit='+limit, {headers: {"Authorization": 'Bearer'
          + localStorage.getItem('token')}}).then(
      res=>{
        this.setState({
          articles: res.data.articles,
        });
      }
    ).catch(
      error=>{
        console.log("there is error",Error)
      }
    )
  }

  onDeleteArticle(status) {
    if (status) {
      this.getStatus();
    }
  }

  handleSelected(selectedPage) {
    console.log("selected", selectedPage);
    let perPage = selectedPage+1
    this.setState({
      selectedPage:  perPage,
      limit: this.state.limit+20,
      offset: this.state.offset+20
    },()=>{this.getStatus()});
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                      >
                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered"
                        >
                          <Thead>
                            <Tr>
                              <Th>#</Th>
                              <Th data-priority="1">Title</Th>
                              <Th data-priority="6">Author</Th>
                              <Th data-priority="6">Tags</Th>
                              <Th data-priority="3">Excerpt</Th>
                              <Th data-priority="1"></Th>
                              <Th data-priority="3">Created</Th>

                            </Tr>
                          </Thead>
                          <Tbody>
                            { this.state.articles !== undefined ? this.state.articles.map((item, index) =>{
                              return <Article article={item} index={index+this.state.offset} key={index} onDelete={this.onDeleteArticle} />
                            }): null}
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                    <PaginationComponent
                      totalItems={this.state.offset}
                      pageSize={this.state.limit}
                      onSelect={this.handleSelected}
                      className="d-flex justify-content-center"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ArticleList
