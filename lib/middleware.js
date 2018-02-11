module.exports = function(req, res, next) {

    req.acceptTypes = req.get('Accept')
        .split(',')
        .map((mt) => {
            return {type: mt.trim()}
        });

    console.log(req.acceptTypes)    
}