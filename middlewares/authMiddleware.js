export const checkEmail = (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("Email not Found in middleware");
        next();
    } catch (error) {
        res.send(error)
    }
}


export const checkName = (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) return res.send("Name not Found in middleware");
        next();
    } catch (error) {
        res.send(error)
    }
}