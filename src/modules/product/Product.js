import React, { Component } from 'react';
import { getAll } from '../../services/product.service';
import Alert from 'react-s-alert';
import { Pagination } from 'react-bootstrap';
import { debounce, separatorComma } from "../../utils/helper"

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                page: 0,
                size: 2,
                keyword: ''
            },
            total_pages: '',
            list: []
        }

        this.search = () => { };
    }

    fetchList() {
        getAll(this.state.query)
            .then(response => {
                this.setState({
                    list: response.content,
                    total_pages: response.totalPages
                })
            }).catch(error => {
                this.setState({
                    list: []
                })
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    componentDidMount() {
        this.fetchList();
        let me = this;
        this.search = debounce(async function (value) {
            await me.setState({
                query: {
                    ...me.state.query,
                    keyword: value
                }
            })
            me.fetchList();
        }, 400);
    }

    async changePage(nextPage) {
        await this.setState({
            query: {
                ...this.state.query,
                page: this.state.query.page + nextPage
            }
        })
        this.fetchList();
    }

    render() {
        return (
            <div className="home-container">
                <div className="container">
                    <div className="col-md-6">
                        <div className="form-group has-search">
                            <input type="text" className="form-control" placeholder="Search" onChange={(e) => this.search(e.target.value)} />
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Desc</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((el, i) =>
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{separatorComma(el.price || 0)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <button className="btn btn-primary profile-button" type="button" disabled={this.state.query.page === 0} onClick={() => this.changePage(-1)}>Prev</button>
                        <button className="btn btn-primary profile-button" type="button" disabled={this.state.query.page === (this.state.total_pages - 1)} onClick={() => this.changePage(1)}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;