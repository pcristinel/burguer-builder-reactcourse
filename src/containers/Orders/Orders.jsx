import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		axios
			.get('/orders.json')
			.then((res) => {
				console.log(res);

				console.log(res.data);

				const fetchedOrders = [];

				for (const key in res.data) {
					if (res.data.hasOwnProperty(key)) {
						const element = res.data[key];
						fetchedOrders.push({ ...element, id: key });
					}
				}
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => {
					return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />;
				})}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
