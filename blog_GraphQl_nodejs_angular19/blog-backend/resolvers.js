const User = require('./model/User');
const Post = require('./model/Post');
const Comment = require('./model/Comment');


const resolvers = {
  Query: {

    users: async () => {
      try {
        const users = await User.find()
           return users;
        // Ensure comments is always an array
    
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
        
      }
    },

    posts: async () => {
      try {
        const posts = await Post.find()
          .populate('userId') // Ensure 'user' is populated correctly
          .populate({
            path: 'comments',
            options: { strictPopulate: false }, // Avoid strict population errors
          });
        //  return posts;
          console.log(posts);
          return posts;
        // Ensure comments is always an array
    
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },
    
    post: async (_, { id }) => {
      try {
        return await Post.findById(id).populate('userId');  // Correct population of 'userId'
      } catch (err) {
        console.error("Error fetching post:", err);
        return null;
      }
    },
    userByEmail: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error(`User with email ${email} not found`);
        }
        return user;
      } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Failed to fetch user by email');
      }
    },
    
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      return await user.save();
    },
    addPost: async (_, { title, content, userId, tags }) => {
      const post = new Post({ title, content, userId, tags });
      return await post.save();
    },
    addComment: async (_, { content, postId, userId }) => {
      const comment = new Comment({ content, postId, userId });
      return await comment.save();
    },
    likePost: async (_, { postId }) => {
      const post = await Post.findById(postId);
      post.likes += 1;
      return await post.save();
    },
    dislikePost: async (_, { postId }) => {
      const post = await Post.findById(postId);
      post.dislikes += 1;
      return await post.save();
    },
  },
  Post: {
    user: async (parent) => {
      return await User.findById(parent.userId);
    },
    // Here we need to fetch the comments based on the `postId`
    comments: async (parent) => {
      return await Comment.find({ postId: parent._id });  // Query Comment where postId matches
    },
  },
  Comment: {
    user: async (parent) => {
      return await User.findById(parent.userId);
    },
    post: async (parent) => {
      return await Post.findById(parent.postId);
    },
  },
};

module.exports = resolvers;
