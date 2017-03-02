const mockHandler = (originHandler) => {
    return (req, res, next) => {
        let mockLock = process.env.NODE_ENV === 'dev' && process.env.MOCK === 'yes';

        const send = (data) => {
            res.send(data)
        };

        if (mockLock) {
            try {
                let data = require(`.${req.originalUrl}`);
                return send(data)
            } catch (e) {
                console.warn(`mock 不存在：${req.originalUrl}`);
                return originHandler(req, res, next)
            }
        } else {
            return originHandler(req, res, next)
        }
    }

};

module.exports = {
    mockHandler
};