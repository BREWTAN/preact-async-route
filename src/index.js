import { h, Component } from 'preact';

class AsyncRoute extends Component {
	constructor() {
		super();
		this.state = {
			componentData: null
		};
	}
	componentDidMount(){
		const componentData = this.props.component(this.props.url, ({component}) => {
            // Named param for making callback future proof
			if (component) {
				this.setState({
					componentData: component
				});
			}
		});

		// In case returned value was a promise
		if (componentData && componentData.then) {
			componentData.then(component => {
				this.setState({
					componentData: component
				});
			});
		}
	}
	render(){

		if (this.state.componentData) {
			return h(this.state.componentData, { url: this.props.url, matches: this.props.matches });
		} else if (this.props.loading) {
			const loadingComponent = this.props.loading();
			return loadingComponent;
		}

		return null;
	}
}

export default AsyncRoute;