import express, { Response, Router } from 'express';
import { IUserRequest, Usermodel } from '../typings/user';
import {
  Feedbackmodel,
  Comment,
} from '../typings/feedback';
import User from '../models/User';
import Feedback from '../models/Feedback';
import auth from '../middleware/auth';
import Joi from '@hapi/joi';

const router: Router = express.Router();

const userUpdateSchema = {
  text: Joi.string()
    .min(3)
    .required()
    .error(() => {
      return 'feedback text is required';
    }),
  business: Joi.string()
    .required()
    .error(() => {
      return 'business is required';
    }),
};

const commentSchema = {
  text: Joi.string()
    .min(3)
    .required()
    .error(() => {
      return 'comment text is required';
    }),
};

// @route    POST api/feedbacks
// @desc     Create a feedback
// @access   Private
router.post('/', auth, async (req: IUserRequest, res: Response) => {
  const { error } = Joi.validate(req.body, userUpdateSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const user: Usermodel | null = await User.findById(req.user!.id).select(
      '-password',
    );

    const newFeedback: Feedbackmodel = new Feedback({
      text: req.body.text,
      user: req.user!.id,
      business: req.body.business,
      name: user!.name,
      avatar: user!.avatar,
    });

    await newFeedback.save();

    res.json(newFeedback);
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(500).send('Server Error');
  }
});

//might make this route public later

// @route    GET api/feedbacks
// @desc     Get all freedbacks
// @access   Private
router.get('/', auth, async (req: IUserRequest, res: Response) => {
  try {
    const feedbacks: Feedbackmodel[] = await Feedback.find().sort({
      created: -1,
    });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/feedbacks/:id
// @desc     Get feedback by ID
// @access   Private
router.get('/:id', auth, async (req: IUserRequest, res: Response) => {
  try {
    const feedback: Feedbackmodel | null = await Feedback.findById(
      req.params.id,
    );

    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/feedbacks/:id
// @desc     Delete a feedback
// @access   Private
router.delete('/:id', auth, async (req: IUserRequest, res: Response) => {
  try {
    const feedback: Feedbackmodel | null = await Feedback.findById(
      req.params.id,
    );

    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    // Check user
    if (feedback.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await feedback.remove();

    res.json({ msg: 'Feedback removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/feedbacks/like/:feedback_id
// @desc     Like a Feedback
// @access   Private
router.put(
  '/like/:feedback_id',
  auth,
  async (req: IUserRequest, res: Response) => {
    try {
      const feedback: Feedbackmodel | null = await Feedback.findById(
        req.params.feedback_id,
      );

      // Check if the post has already been liked
      if (
        feedback!.likes!.filter(like => like.user.toString() === req.user!.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Post already liked' });
      }

      feedback!.likes!.unshift({ user: req.user!.id });

      await feedback!.save();

      res.json(feedback!.likes);
    } catch (err) {
      console.error('Error: ', err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/posts/unlike/:feedback_id
// @desc     Like a post
// @access   Private
router.put('/unlike/:feedback_id', auth, async (req: IUserRequest, res: Response) => {
  try {
    const feedback: Feedbackmodel | null = await Feedback.findById(
      req.params.feedback_id,
    );

    // Check if the post has already been liked
    if (
      feedback!.likes!.filter(like => like.user.toString() === req.user!.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = feedback!.likes!
      .map(like => like.user.toString())
      .indexOf(req.user!.id);

    feedback!.likes!.splice(removeIndex, 1);

    await feedback!.save();

    res.json(feedback!.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/feedbacks/comment/:feedback_id
// @desc     Comment on a feedback
// @access   Private
router.post('/comment/:feedback_id', auth, async (req: IUserRequest, res: Response) => {
  const { error } = Joi.validate(req.body, commentSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const user: Usermodel | null = await User.findById(req.user!.id).select(
      '-password',
    );
    const feedback: Feedbackmodel | null = await Feedback.findById(
      req.params.feedback_id,
    );

    const newComment: Comment = {
      text: req.body.text,
      name: user!.name,
      avatar: user!.avatar,
      user: user!.id,
    };

    feedback!.comments!.unshift(newComment);

    await feedback!.save();

    res.json(feedback!.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/feedbacks/comment/:feedback_id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete(
  '/comment/:feedback_id/:comment_id',
  auth,
  async (req: IUserRequest, res: Response) => {
    try {
      const feedback: Feedbackmodel | null = await Feedback.findById(
        req.params.feedback_id,
      );

      // Pull out comment
      const comment: Comment | undefined = feedback!.comments!.find(
        comment => comment.id === req.params.comment_id,
      );

      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      // Check user
      if (comment.user.toString() !== req.user!.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get remove index
      const removeIndex = feedback!
        .comments!.map(comment => comment.id)
        .indexOf(req.params.comment_id);

      feedback!.comments!.splice(removeIndex, 1);

      await feedback!.save();

      res.json(feedback!.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
