var FabricSdkService = require('./FabricSdkService');
module.exports = {
    userValidation: async (req, res, next) => {
        try {
            let usefabric = false;
            //if(!usefabric)
            //next();
            FabricSdkService.setUser(req.fabricClient, req.headers.username).then(
                (status) => {
                    if (status === true) {
                        next();
                    }
                }).catch((err) => {
                    next(err);
                    // return res.status(400).send({
                    //     status: false,
                    //     response: "Invalid user"
                    // });
                });
        } catch (e) {
            console.log('Error :', e);
            return res.status(400).send({
                status: false,
                response: "Invalid user"
            });
        }
    }
}