import React from 'react';
import axios from "axios"
import MetaTags from "react-meta-tags"
import { Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Swal from 'sweetalert2'

class EditArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      article: null,
      editFormData: {
        title: '',
        body: '',
        description: '',
      }
    }
    this.editData = this.editData.bind(this);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    axios.get('/api/articles/' + slug).then((res) => {
      this.setState({
        article: res.data.article,
        editFormData: {
          title: res.data.article.title,
          description: res.data.article.description,
          body: res.data.article.body
        }
      })
    })
  }
  editData(){
    const data = {
      article: {
        ...this.state.editFormData
      }
    }
    axios.patch('/api/articles/'+this.props.match.params.slug, data, {headers: {"Authorization": 'Token '
          + localStorage.getItem('token')}}).then(
            res=>{
              console.log(res);
              Swal.fire({
                title: 'Update Successfully',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.props.history.replace('/dashboard');
                }
              })
            }
    ).catch(
      err=>{
        console.log(err)
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>New Article</title>
          </MetaTags>
          <Container fluid={true}>
            <Breadcrumbs title="" breadcrumbItem="Edit Article" />
            {
              this.state.article != null && <Row>
                <Col lg="9" xl="9" xs="12">
                  <Card>
                    <CardBody>

                        <Row>
                          <Col lg="12">
                            <FormGroup className="mb-3">
                              <Label htmlFor="basicpill-firstname-input1">
                                title
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.editFormData.title}
                                onChange={(e) => this.setState(
                                  { editFormData: {...this.state.editFormData, title: e.target.value} })}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup className="mb-3">
                              <Label htmlFor="basicpill-phoneno-input3">
                                Description
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.editFormData.description}
                                onChange={(e) => this.setState(
                                  { editFormData: {...this.state.editFormData, description: e.target.value} })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup className="mb-3">
                              <Label htmlFor="basicpill-address-input1">
                                Body
                              </Label>
                              <textarea
                                className="form-control"
                                rows="2"
                                value={this.state.editFormData.body}
                                onChange={(e) =>
                                  this.setState(
                                    { editFormData: {...this.state.editFormData, body: e.target.value} })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <button
                              className="btn btn-secondary"
                              onClick={this.editData}
                            >
                              submit
                            </button>
                          </Col>
                        </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="3" xl="3" xs="12">
                  <Card>
                    <Form>
                      <CardTitle>

                        <Row>
                          <Col lg="12">
                            <FormGroup className="m-3">
                              <Label htmlFor="basicpill-firstname-input1">
                                Tags
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardTitle>
                      <CardBody className="border-1 border-dark">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            animation
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
                          >
                            dragon
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck3"
                          >
                            a
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck4"
                          >
                            d
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck5"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck5"
                          >
                            X
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck6"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck6"
                          >
                            S
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck7"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck7"
                          >
                            Y
                          </label>
                        </div>
                      </CardBody>
                    </Form>
                  </Card>
                </Col>
              </Row>
            }
          </Container>
        </div>
      </React.Fragment>
    )
  }

}

export default EditArticle;