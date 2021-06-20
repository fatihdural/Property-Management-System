
module.exports = {
    islemIsaret: (miktar, tip) => {
        if( tip == 'gelir' ){
            var result = "+ " + miktar
            return result
        }
        else if( tip == 'gider' ){
            var result = "- " + miktar
            return result
        }
    }
}