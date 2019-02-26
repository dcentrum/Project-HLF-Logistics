var FabricSdkService =require('./FabricSdkService');
module.exports = {
    userValidation: async (req, res, next) => {
        try {
            let status = await FabricSdkService.setUser(req.fabricClient, req.headers.username);
            if (status === true) {
                next();
            }
        } catch (e) {
            console.log('Error :', e);
            return res.status(400).send({
                status: false,
                response: "Invalid user"
            });
        }
    }
}