import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;

export const UserPreview = React.createClass({
	propTypes: {
		user: PropTypes.object,
		noBadge: PropTypes.bool,
		handleFollowCreate: PropTypes.func,
		handleFollowDestroy: PropTypes.func,
		isFollowing: PropTypes.bool,
	},

	calculateLinkCount: function(user) {
		const lastRead = (user.Follow && user.Follow.lastRead) || new Date(1970).toISOString();
		return user.links.reduce((previousVal, current) => {
			if (current.createdAt > lastRead) {
				return previousVal + 1;	
			}
			return previousVal;
		}, 0);
	},

	handleFollowClick: function() {
		if (this.props.isFollowing) {
			this.props.handleFollowDestroy(this.props.user.id);
		} else {
			this.props.handleFollowCreate(this.props.user.id);
		}
	},

	render: function() {
		const user = this.props.user || {};
		const newLinkCount = this.props.noBadge ? 0 : this.calculateLinkCount(user);


		return (
			<div style={styles.container}>
				<Link to={'/' + user.username} style={styles.link}>
					<img style={styles.image} src={user.image} alt={'user'} />
					<div style={styles.name}>{user.name}</div>
					{!!newLinkCount && 
						<div style={styles.count}>{newLinkCount}</div>
					}
				</Link>
				{this.props.handleFollowCreate && this.props.handleFollowDestroy &&
					<div style={styles.followButton} onClick={this.handleFollowClick}>
						{this.props.isFollowing
							? 'Following'
							: 'Follow'
						}
					</div>
				}
			</div>
		);
	}

});

export default UserPreview;

styles = {
	container: {
		position: 'relative',
		display: 'inline-block',
		width: 'calc(150px + 2em)',
		margin: '1em 0em',
	},
	link: {
		textDecoration: 'none',
	},
	image: {
		width: '150px',
		display: 'block',
		margin: '0 auto',
	},
	name: {
		width: 'calc(100% - 1em)',
		padding: '0.25em 0.5em 0em 0.5em',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		textAlign: 'center',
		color: '#555',
	},
	count: {
		position: 'absolute',
		backgroundColor: 'black',
		color: 'white',
		padding: '.25em .5em',
		borderRadius: '10em',
		lineHeight: '1em',
		fontSize: '0.85em',
		top: '-0.25em',
		right: '0.75em',
		boxShadow: '0px 0px 20px white',
	},
	followButton: {
		position: 'absolute',
		textAlign: 'center',
		width: 'calc(150px - 2em)',
		backgroundColor: 'rgba(0,0,0,0.85)',
		color: 'white',
		padding: '.5em 1em',
		cursor: 'pointer',
		lineHeight: '1em',
		fontSize: '0.85em',
		top: 'calc(150px - 2em + 1px)',
		left: 'calc(50% - 75px)',
		boxShadow: '0px 0px 20px white',
	}
};
