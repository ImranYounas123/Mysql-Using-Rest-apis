exports.CatchAsyncError = (controller) => {
    return function (req,res,next){
        controller(req, res, next).catch(next)
    }
}