var mongoose = require('mongoose')

var recettesSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    nameRecette: String,
    typeRecette: String,
    recette: String,
    
})

var recettesModel = mongoose.model('recettes', recettesSchema)

module.exports = recettesModel

