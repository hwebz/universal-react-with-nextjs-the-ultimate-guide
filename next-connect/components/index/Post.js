import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Comment from "@material-ui/icons/Comment";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from 'next/link';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Comments from './Comments';

class Post extends React.PureComponent {
  state = {
    isLiked: false,
    numLikes: 0,
    comments: []
  };

  componentDidMount() {
    const { post } = this.props;
    this.setState({
      isLiked: this.checkLiked(post.likes),
      numLikes: post.likes.length,
      comments: post.comments
    });
  }

  componentDidUpdate(prevProps) {
    const { post } = this.props;
    console.log('props have been updated!');
    if (prevProps.post.likes.length !== post.likes.length) {
      console.log('post likes have been updated!');
      this.setState({
        isLiked: this.checkLiked(post.likes),
        numLikes: post.likes.length
      });
    }

    if (prevProps.post.comments.length !== post.comments.length) {
      this.setState({
        comments: post.comments
      })
    }
  }

  checkLiked = likes => likes.includes(this.props.auth.user._id);

  formatTimeCreated = time => distanceInWordsToNow(time, {
    includeSeconds: true,
    addSuffix: true
  }); 

  render() {
    const { isLiked, numLikes, comments } = this.state;
    const { classes, post, auth, isDeletingPost, handleDeletePost, handleToggleLike, handleAddComment, handleDeleteComment } = this.props;
    const isPostedCreator = post.postedBy._id === auth.user._id;
    
    return <Card className={classes.card}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar src={post.postedBy.avatar} />}
        action={
          isPostedCreator && (
            <IconButton
              disabled={isDeletingPost}
              onClick={() => handleDeletePost(post)}
            >
              <DeleteTwoTone color="secondary" />
            </IconButton>
          )
        }
        title={<Link href={`/profile/${post.postedBy._id}`}><a>{post.postedBy.name}</a></Link>}
        subheader={this.formatTimeCreated(post.createdAt)}
        className={classes.cardHeader}
      />
      <CardContent
        className={classes.cardContent}
      >
        <Typography variant="body1" className={classes.text}>
          {post.text}
        </Typography>
        {/* Post Image */}
        {post.image && (
          <div className={classes.imageContainer}>
            <img className={classes.image} src={post.image} />
          </div>
        )}

        {/* Post Actions */}
        <CardActions>
          <IconButton onClick={() => handleToggleLike(post)} className={classes.button}>
            <Badge badgeContent={numLikes} color="secondary">
              {isLiked ? (
                <Favorite className={classes.favoriteIcon} />
              ) : (
                <FavoriteBorder className={classes.favoriteIcon} />
              )}
              
            </Badge>
          </IconButton>
          <IconButton className={classes.button}>
            <Badge badgeContent={comments.length} color="primary">
              <Comment className={classes.commentIcon} />
            </Badge>
          </IconButton>
        </CardActions>

        <Divider />

        {/* Comments Area */}
        <Comments
          auth={auth}
          postId={post._id}
          comments={comments}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      </CardContent>
    </Card>;
  }
}

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3
  },
  cardContent: {
    backgroundColor: "white"
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  imageContainer: {
    textAlign: "center",
    padding: theme.spacing.unit
  },
  image: {
    height: 200
  },
  favoriteIcon: {
    color: theme.palette.favoriteIcon
  },
  commentIcon: {
    color: theme.palette.commentIcon
  }
});

export default withStyles(styles)(Post);
