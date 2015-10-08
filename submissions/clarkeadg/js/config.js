 
 var Config = {
 	actions: {
 		comments: {
 			'addComment': '',
 			'addReply': ''
 		}
 	},
 	keys: {
 		ENTER_KEY: 13,
		ESCAPE_KEY: 27
 	},
	api: {
		host: '/js/api/',
		get: {
			me: 'me.json',
			user: 'user/{{id}}',
			articles: 'articles1.json',
			products: 'products1.json',
			videos: 'videos/music/{{id}}.json',
			playlist: 'playlist.json',
			playlists: 'playlists.json',
			artists: 'artists.json',
			leaderboards: 'leaderboards/{{id}}.json',
			achievements: 'achievements.json',
			notifications: 'notifications.json',
			activity: 'activity.json',
			users: 'users.json',
			friends: 'friends.json',
			following: 'following.json',
			followers: 'followers.json',
			favorites: {
				users: 'favorite-users.json'
			},
			servertime: 'time',
			pointevents: 'pointevents',
			comments: 'comments.json',
			discussions: 'discussions.json',
			messages: 'messages/{{id}}.json',
			albums: 'albums.json',
			photos: 'photos.json',
			games: 'games.json'
		},
		post: {
			login: '/app/signin-email',
			logout: '/app/signout',
			signup: '',
			'forgot-password': '',
			'reset-password': '',
			'confirm-email': ''
		}		
	},
	sidebar: {
		category: 'All',
		categories: ['All', 'Boys', 'Girls', 'Babies', 'Underwear'],
		brand: 'All',
		brands: ['All', 'Lima', 'Rach']		
	},
	sidebarVideos: {
		category: 'top-videos',
		categories: [
			{ title: 'Top Videos', slug: 'top-videos' },
			{ title: 'Alternative', slug: 'alternative' },
			{ title: 'Country', slug: 'country' },
			{ title: 'Dance', slug: 'dance' },
			{ title: 'Electronic', slug: 'electronic' },
			{ title: 'Latin', slug: 'latin' },
			{ title: 'Pop', slug: 'pop' },
			{ title: 'Rap', slug: 'rap' },
			{ title: 'RnB', slug: 'rnb' },
			{ title: 'Rock', slug: 'rock' }
		]			
	},	
	sidebarLeaderboards: {
		category: 'alltime',
		categories: ['All Time', 'This Month', 'This Week', 'Today'],			
	},
	sidebarMessages: {
		category: 'inbox',
		categories: [
			{ title: 'inbox', slug: 'inbox' },
			{ title: 'sent', slug: 'sent' },
			{ title: 'unread', slug: 'unread' },
			{ title: 'read', slug: 'read' }
		]
	}
};
