import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import NewPost from './NewPost';
import Post from './Post';
import { addPost, getPostFeed, deletePost, likePost, unlikePost } from '../../lib/api';

class PostFeed extends React.Component {
  state = {
    posts: [],
    text: '',
    image: '',
    isAddingPost: false,
    isDeletingPost: false
  };

  componentDidMount() {
    this.postData = new FormData();
    this.getPosts();
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
      })
  }

  render() {
    const { classes, auth } = this.props;
    const { text, image, isAddingPost, posts, isDeletingPost } = this.state;

    return <div className={classes.root}>
      <Typography variant="h4" component="h1" align="center" color="primary" className={classes.title}>
        Post Feed
      </Typography>
      <NewPost
        auth={auth}
        text={text}
        image={image}
        isAddingPost={isAddingPost}
        handleChange={this.handleChange}
        handleAddPost={this.handleAddPost}
      />

      {/* Post List */}
      {posts.map(post => (
        <Post
          key={post._id}
          auth={auth}
          post={post}
          isDeletingPost={isDeletingPost}
          handleDeletePost={this.handleDeletePost}
          handleToggleLike={this.handleToggleLike}
        />
      ))}
    </div>;
  }
}

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(PostFeed);
