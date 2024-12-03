module.exports = fn => {
    return (req, res, next) => {

        fn(req, res, next).catch((e) => {
            console.log(e)
            return res.status(500).json({ error: true, message: 'Something went wrong' })
        })

    }
}