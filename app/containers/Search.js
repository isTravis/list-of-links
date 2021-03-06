import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { search } from '../actions/search';
import { UserPreview } from '../components/UserPreview';
import { Loader } from '../components/Loader';
import { createFollow, destroyFollow } from '../actions/follow';

let styles;

export const Search = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		searchData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			search: '',
		};
	},
	
	searchUpdate: function(evt) {
		this.setState({ search: evt.target.value });
		this.props.dispatch(search(evt.target.value));	
	},

	handleFollowCreate: function(followeeID) {
		const loginData = this.props.appData.loginData || {};
		if (!loginData.id) { return browserHistory.push('/login'); }
		
		const follower = this.props.appData.loginData.id;
		return this.props.dispatch(createFollow(follower, followeeID, undefined));
	},

	handleFollowDestroy: function(followeeID) {
		const follower = this.props.appData.loginData.id;
		this.props.dispatch(destroyFollow(follower, followeeID));
	},

	render() {

		const loginData = this.props.appData.loginData || {};
		const followingArray = loginData.following || [];
		const followingIDs = followingArray.map((followee)=> {
			return followee.id;
		});
		const searchResults = this.props.searchData.searchResults || [];
		return (
			<div>
				<Helmet title={'Search · List of Links'} />
				
				<input id={'search'} name={'search'} type="text" placeholder={'Search for Users'} style={styles.searchBar} value={this.state.search} onChange={this.searchUpdate} />

				{this.state.search && !!searchResults.length &&
					<div className={'previews-container'}>
						{searchResults.filter((thisUser)=> {
							return thisUser.id !== loginData.id;
						}).map((thisUser, index)=> {
							return (
								<UserPreview 
									key={'follwerUser-' + index} 
									user={thisUser} 
									noBadge={true} 
									handleFollowCreate={this.handleFollowCreate}
									handleFollowDestroy={this.handleFollowDestroy}
									isFollowing={followingIDs.includes(thisUser.id)} />
							); 
						})}
					</div>
				}
				
				{!this.state.search && 
					<div style={styles.noLinks}>
						Type a query above to search for users
					</div>
				}

				{!this.props.searchData.loading && searchResults.length === 0 && this.state.search && 
					<div style={styles.noLinks}>
						No users match that query
					</div>
				}

				{this.props.searchData.loading && searchResults.length === 0 && 
					<Loader />
				}

			</div>

		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app,
		searchData: state.search,
	};
}

export default connect(mapStateToProps)(Search);

styles = {
	searchBar: {
		width: 'calc(100% - 2em)',
		fontSize: '1.5em',
		padding: '.5em 1em',
	},
	noLinks: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
		textAlign: 'center',
		padding: '3em 0em',
	},
};
