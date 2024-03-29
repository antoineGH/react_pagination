import React, { Component } from 'react'

import Pagination from 'react-js-pagination'
import { news } from '../utils/newsFeedJson'

import BarLoader from 'react-spinners/BarLoader'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default class NewsFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stories: [],
			currentItems: [],
			hasError: false,
			hasLoaded: false,
		}
	}

	getNewsFeed() {
		setTimeout(() => {
			this.setState({ stories: news, hasError: false, hasLoaded: true })
			this.handlePageChange(1)
		}, 500)
	}

	componentDidMount() {
		this.getNewsFeed()
	}

	handlePageChange(pageNumber) {
		const { stories } = this.state
		const totalItemsCount = stories.length
		const pageLimit = Math.ceil(totalItemsCount / 10)

		console.log(`active page is ${pageNumber}`)
		console.log(`total pages are ${totalItemsCount}`)
		console.log(`limit per page is ${pageLimit}`)

		const offset = (pageNumber - 1) * pageLimit
		const currentItems = stories.slice(offset, offset + pageLimit)
		console.log(currentItems)
		this.setState({ activePage: pageNumber, currentItems: currentItems })
	}

	render() {
		const { hasError, hasLoaded, currentItems } = this.state

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
		}

		if (!hasError && hasLoaded) {
			return (
				<Container>
					<Row>
						<Col className='mt-5'>
							{currentItems.map((news) => {
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
								totalItemsCount={this.state.stories.length}
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
