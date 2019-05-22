const Router = require('express').Router()
const UserController = require('../controllers/userController')
const QuestionController = require('../controllers/questionController')
const AnswerController = require('../controllers/answerController')
const image = require('../helpers/image')


Router.get('/', (req, res) => {res.status(200).json({message: 'Home'})})

Router.post('/register', image.multer.single('profilePic'), image.sendUploadToGCS, UserController.create)
Router.post('/login', UserController.login)

Router.get('/questions', QuestionController.findAll)
Router.post('/questions', QuestionController.create)
Router.get('/questions/:questionId', QuestionController.findOne)
Router.patch('/questions/:questionId/edit', QuestionController.patch)
Router.patch('/questions/:questionId/upvote', QuestionController.upVote)
Router.patch('/questions/:questionId/downvote', QuestionController.downVote)
Router.delete('/questions/:questionId', QuestionController.delete)

Router.get('/questions/:questionId/answers', AnswerController.findAll)
Router.post('/questions/:questionId/answers', AnswerController.create)
Router.get('/questions/:questionId/answers/:answerId', AnswerController.findOne)
Router.patch('/questions/:questionId/answers/:answerId/upvote', AnswerController.upVote)
Router.patch('/questions/:questionId/answers/:answerId/downvote', AnswerController.downVote)
Router.delete('/questions/:questionId/answers/:answerId', AnswerController.delete)


module.exports = Router