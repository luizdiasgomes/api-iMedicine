const fs = require('fs');

module.exports = {

    async getImageByName(req, res) {
        const imageName = req.params.imageName;
        const imagePath = `src/images/${imageName}`;

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.status(404).send('Imagem não encontrada');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    },
}