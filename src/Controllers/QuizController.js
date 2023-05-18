const QuizModel = require('../Models/Quiz/QuizModel');
const Score = require('../Models/Quiz/QuizScoreModel');
const { sendResponse } = require('../services/helperServices')
const User = require('../Models/Auth/UserModel');
const Coins = require('../Models/Quiz/CoinsModel');

class QuizController {
    constructor() {

    }
    async createQuiz(req, res) {
        // title,questions , createdBy
        try {
            const { title, questions } = req.body;
            const existQuiz = await QuizModel.findOne({
                title: title
            })
            if (existQuiz) {
                await QuizModel.findOneAndUpdate({
                    title: title
                }, { $push: { questions: questions } })
                res.status(200).json({ msg: "quiz questions Added " })
            } else {
                await QuizModel.create({
                    title: title,
                    questions: questions,
                    createdBy: req.user._id
                })
                res.status(200).json({ msg: "New quiz Created " })
            }

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async createAnswersQuiz(req, res) {
        // title,questions , createdBy
        try {
            const { answers } = req.body;
            let quiz = await QuizModel.findById({
                _id: req.params.id
            })
            // console.log(quiz)
            let scores = 0;
            quiz.questions.forEach((val, index) => {
                console.log(answers[index] === val.answer)
                if (answers[index] === val.answer)
                    scores++;
            })
            const alreadyScore = await Score.findOne({
                $and: [{ user: req.user._id }, { quizID: req.params.id }]
            }).populate("user", "name").populate("quizID", "title")

            if (!alreadyScore) {
                let scoreData = await Score.create({
                    scores: scores,
                    user: req.user._id,
                    quizID: req.params.id
                })
                res.status(200).json(scoreData)
            } else {
                res.status(200).json({ msg: "Your record already stored" })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async getQuiz(req, res) {
        // title,questions , createdBy
        try {
            const score = await Score.findOne({
                $and: [{ user: req.user._id }, { quizID: req.params.id }]
            }).populate("user", "name").populate("quizID", "title")

            sendResponse(res, 200, score)
        } catch (error) {
            sendResponse(res, 500, error.stack)
        }
    }
    async allLeaderBoardQuizData(req, res) {
        // title,questions , createdBy
        try {
            const leaderBoard = await Score.find({ quizID: req.params.id })
                .sort({ score: 1 })
                .limit(10)
                .populate('user', 'name')
                .lean();
            let firstPrize = 100;
            let secondPrize = 50;
            let thirdPrize = 30;
            let leaderBoardLength = leaderBoard.length
            let length = leaderBoardLength === 1 || 2 ? leaderBoard.length : 3
            for (let i = 0; i < length; i++) {
                const coins = await Coins.findOne({ $and: [{ user: leaderBoard[i].user }, { quiz: leaderBoard[i].quizID }] });
                if (!coins) {
                    let coins = 0;
                    if (i === 0) {
                        coins = firstPrize;
                    } else if (i === 1) {
                        coins = secondPrize;
                    } else if (i === 2) {
                        coins = thirdPrize;
                    }
                    await Coins.create({
                        coins: coins,
                        user: leaderBoard[i].user,
                        quiz: leaderBoard[i].quizID,
                        rank: i + 1
                    })
                }
            }
            sendResponse(res, 200, leaderBoard)
        } catch (error) {
            sendResponse(res, 500, error.stack)
        }
    }
    async totalUserCoins(req, res) {
        // title,questions , createdBy
        try {
            const coins = await Coins.find({ user: req.user._id });
            const totalCoins = coins.reduce((acc, coin) => acc + coin.coins, 0);

            sendResponse(res, 200, totalCoins)
        } catch (error) {
            sendResponse(res, 500, error.stack)
        }
    }
}
const Quiz = new QuizController();
module.exports = Quiz