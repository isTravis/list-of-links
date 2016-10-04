import React from 'react';
import { Link } from 'react-router';

let styles;

export const AppFooter = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<a href={'http://docs.listoflinks.co'} className={'link'} style={styles.item}>API</a>
				<a href={'https://github.com/isTravis/list-of-links'} className={'link'} style={styles.item}>Github</a>
				{/* <Link to={'/about'} className={'link'} style={styles.item}>About</Link> */}
				<a href={'mailto:hello@listoflinks.co'} className={'link'} style={styles.item}>Contact</a>
			</div>
		);
	}

});

export default AppFooter;

styles = {
	container: {
		borderTop: '1px solid #888',
		margin: '1em 0em',
		paddingTop: '1em',
		textAlign: 'center',
	},
	item: {
		display: 'inline-block',
		padding: '0em 1em',
		color: '#888',
		fontSize: '0.9em',
	},
};
