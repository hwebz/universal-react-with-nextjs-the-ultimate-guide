import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Edit from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";
import { getUser, getPostsByUser, likePost, unlikePost, addComment, deleteComment, deletePost } from '../lib/api';
import Link from 'next/link';
import FollowUser from "../components/profile/FollowUser";
import DeleteUser from "../components/profile/DeleteUser";
import ProfileTabs from '../components/profile/ProfileTabs';
import format from 'date-fns/format';

class Profile extends React.Component {
  state = {
    user: null,
    isAuth: false,
    isLoading: true,
    isFollowing: false,
    posts: [],
    isDeletingPost: false
  };

  componentDidMount() {
    const { userId, auth } = this.props;
    const isAuth = auth.user._id === userId;

    getUser(userId)
      .then(async user => {
        const isFollowing = this.checkFollow(auth, user);
        const posts = await getPostsByUser(userId);

        this.setState({
          user,
          isAuth,
          isFollowing,
          isLoading: false,
          posts
        })
      });
  }
  
  checkFollow = (auth, user) => {
    return user.followers.findIndex(follower => follower._id === auth.user._id) > -1;
  }

  toggleFollow = sendRequest => {
    const { userId } = this.props;
    const { isFollowing } = this.state;

    sendRequest(userId).then(() => {
      this.setState({
        isFollowing: !isFollowing
      })
    })
  }

  getPosts = () => {
    const { auth } = this.props;

    getPostFeed(auth.user._id)
      .then(posts => {
        this.setState({
          posts
        })
      }).catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    let inputValue;

    if (event.target.name === "image") {
      inputValue = event.target.files[0];
    } else {
      inputValue = event.target.value;
    }

    this.postData.set(event.target.name, inputValue);
    this.setState({ [event.target.name]: inputValue });
  }

  handleAddPost = () => {
    const { auth } = this.props;
    this.setState({
      isAddingPost: true
    });

    addPost(auth.user._id, this.postData)
      .then(post => {
        const updatedPosts = [post, ...this.state.posts];

        this.setState({
          posts: updatedPosts,
          isAddingPost: false,
          text: '',
          image: ''
        });

        this.postData.delete('image');
      }).catch(err => {
        console.log(err);
        this.setState({
          isAddingPost: false
        })
      })
  }

  handleDeletePost = post => {
    const { posts } = this.state;
    this.setState({
      isDeletingPost: true
    });

    deletePost(post._id)
      .then(deletedPost => {
        const postIndex = posts.findIndex(post => post._id === deletedPost._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          ...posts.slice(postIndex + 1)
        ];
        this.setState({
          isDeletingPost: false,
          posts: updatedPosts
        })
      }).catch(err => {
        console.log(err);
        this.setState({
          isDeletingPost: false
        })
      });
  }

  handleToggleLike = post => {
    const { posts } = this.state;
    const { auth } = this.props;

    const isPostLiked  = post.likes.includes(auth.user._id);
    const sendRequest =  isPostLiked ? unlikePost : likePost;

    sendRequest(post._id)
      .then(postData => {
        const postIndex = posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      }).catch(err => {
        console.log(err);
      });
  }

  handleAddComment = (postId, text) => {
    const { posts } = this.state;
    const comment = { text };
    addComment(postId, comment)
      .then(postData => {
        const postIndex = posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      }).catch(err => {
        console.log(err);
      });
  }

  handleDeleteComment = (postId, comment) => {
    const { posts } = this.state;
    
    deleteComment(postId,  comment)
      .then(postData => {
        const postIndex = posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1)
        ];
        this.setState({
          posts: updatedPosts
        });
      }).catch(err => {
        console.log(err);
      });
  }

  formatDate = date => format(date, "dddd, MMMM Do, YYYY"); 

  render() {
    const { classes, auth } = this.props;
    const { isLoading, user, isAuth, isFollowing, posts, isDeletingPost } = this.state;

    return <div>
      <Paper className={classes.root} elevation={4}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className={classes.title}
          gutterBottom
        >          
          Profile
        </Typography>
        {isLoading ? (
          <div className={classes.progressContainer}>
            <CircularProgress
              className={classes.progress}
              size={55}
              thickness={5}
            />
          </div>
        ) : (
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user.avatar} className={classes.bigAvatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />

              {/* Auth - Edit Buttons / UnAuth - Follow Buttons */}
              {isAuth ? (
                <ListItemSecondaryAction>
                  <Link href="/edit-profile">
                    <a>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </a>
                  </Link>
                  <DeleteUser user={user} />
                </ListItemSecondaryAction>
              ) : (
                <FollowUser
                  isFollowing={isFollowing}
                  toggleFollow={this.toggleFollow}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={user.about} secondary={`Joined: ${this.formatDate(user.createdAt)}`} />
            </ListItem>

            {/* Display User's Posts, Following and Followers */}
            <ProfileTabs
              auth={auth}
              posts={posts}
              user={user}
              isDeletingPost={isDeletingPost}
              handleDeletePost={this.handleDeletePost}
              handleToggleLike={this.handleToggleLike}
              handleAddComment={this.handleAddComment}
              handleDeleteComment={this.handleDeleteComment}
            />
          </List>
        )}
      </Paper>
    </div>;
  }
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: 600
    }
  },
  title: {
    color: theme.palette.primary.main
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
});

Profile.getInitialProps = authInitialProps(true);

export default withStyles(styles)(Profile);
