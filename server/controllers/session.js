const getSession = (req, res) => {
    res.send(req.session);
}

export default (app) => {
    app.get('/api/session/get/', getSession);
}
