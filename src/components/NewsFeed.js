import React, { Component } from 'react'

import Pagination from 'react-js-pagination'

import fetchNewsFeed from '../utils/fetchNewsFeed'

import BarLoader from 'react-spinners/BarLoader'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// require('bootstrap/less/bootstrap.less')

export default class NewsFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stories: [],
			hasError: false,
			hasLoaded: false,
		}
	}

	getNewsFeed(endpoint, interests) {
		fetchNewsFeed(endpoint, interests)
			.then((response) => {
				this.setState({ stories: response.stories, hasError: false, hasLoaded: true })
			})
			.catch((error) => {
				this.setState({ hasError: true })
			})
	}

	componentDidMount() {
		this.getNewsFeed('cityfalcon', ['Google, Apple, Tesla'])
	}

	handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`)
		this.setState({ activePage: pageNumber })
	}

	render() {
		const { hasError, hasLoaded, stories } = this.state

		if (hasError) {
			return (
				<Container>
					<Row>
						<Col className='mt-5'>
							<p>Error fetching the API, Please try again later.</p>
						</Col>
					</Row>
				</Container>
			)
		}

		if (!hasLoaded) {
			return (
				<Container>
					<Row>
						<Col className='mt-5'>
							<BarLoader css='display: flex; justify-content: center; margin-left:auto; margin-right:auto;' color={'#2E3030'} size={5} />
						</Col>
					</Row>
				</Container>
			)
		} else {
			return (
				<Container>
					<Row>
						<Col className='mt-5'>
							{stories.map((news) => {
								return (
									<Card key={news.uuid} className='card_news text-center justify-content-center mx-auto mb-1' style={{ width: '98%' }}>
										<Card.Body className='card_news_body'>
											<Row>
												<Col xs={2} sm={2} md={2} lg={2} xl={1} className='text-left justify-content-left mr-3 mr-xl-2'>
													<img src={news.source.imageUrls.thumb} alt={news.source.brandName} />
												</Col>
												<Col xs={8} sm={8} md={8} lg={8} xl={1} className='mb-2 text-left justify-content-left mr-xl-2'>
													<Row>
														<a href={`https://${news.source.name}`} style={{ fontSize: '0.7rem' }}>
															{news.source.brandName}
														</a>
													</Row>
													<Row style={{ fontSize: '0.7rem', marginTop: '-1%' }} className='text-muted '>
														{news.publishTime.slice(0, 10)}
													</Row>
												</Col>
												<Col xs={12} sm={12} md={12} lg={12} xl={9}>
													<Row className='text-left mx-auto justify-content-left'>
														<a style={{ color: 'black', fontSize: '0.8rem' }} href={news.url}>
															{news.title}
														</a>
													</Row>
													<Row className='text-left mx-auto justify-content-left' style={{ fontSize: '0.7rem' }}>
														{news.description}
													</Row>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								)
							})}
							<Pagination
								hideFirstLastPages
								pageRangeDisplayed={10}
								activePage={this.state.activePage}
								itemsCountPerPage={10}
								totalItemsCount={100}
								onChange={this.handlePageChange.bind(this)}
								itemClass='page-item'
								linkClass='page-link'
							/>
						</Col>
					</Row>
				</Container>
			)
		}
	}
}
