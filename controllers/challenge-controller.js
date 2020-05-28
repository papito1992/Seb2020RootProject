const getRandomNumber = (req, res, next) => {

    let luckyNumber = getRandomInt(1, 100);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    res.json({luckyNumber}) ;
};

exports.getRandomNumber = getRandomNumber;
