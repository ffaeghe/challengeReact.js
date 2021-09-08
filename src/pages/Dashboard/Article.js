import React, { Component } from "react"
import { Td, Th, Tr } from "react-super-responsive-table"
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import {Link} from 'react-router-dom';
import axios from "axios"

class Article extends Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.state = {
      drp_link: false
    }
  }

  deleteArticle() {
    axios.delete('/api/articles/' + this.props.article.slug, {headers: {"Authorization": 'Token '
          + localStorage.getItem('token')}}).then((res) => {
        console.log('deleted');
        this.props.onDelete(true);
    }).catch((e) => {
      console.log(e);
      this.props.onDelete(false);
    })
  }

  render() {
    return (
      <Tr>
        <Td>{this.props.index + 1}</Td>
        <Th>
          {}{" "}
          <span className="co-name">{this.props.article.title}</span>
        </Th>
        <Td>{this.props.article.author.username}</Td>
        <Td>
          <ul>
            {this.props.article.tagList.map((tag, index) => {
              return <li key={tag}>{tag}</li>
            })}</ul>
        </Td>
        <Td>{this.props.article.description}</Td>
        <Td>{this.props.article.createdAt}</Td>
        <Td>
          <ButtonDropdown
            isOpen={this.state.drp_link}
            toggle={() =>
              this.setState({ drp_link: !this.state.drp_link })
            }
          >
            <DropdownToggle caret color="secondary">
              ... <i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu id={this.props.index}>
              <DropdownItem>
                <Link to={"/editArticle/" + this.props.article.slug}>Edit</Link>
              </DropdownItem>
              <DropdownItem><Link to={this.deleteArticle}>Delete</Link></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>{" "}
        </Td>
      </Tr>
    )
  }
}
export default Article

