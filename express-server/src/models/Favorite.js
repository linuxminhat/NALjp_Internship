module.exports = (sequelize) =>{
    const Favorite = sequelize.define('Favorite', {
       })

       Favorite.associate = function(models){
       Favorite.belongsTo(models.Job)
       Favorite.belongsTo(models.Jobseeker)
  }

    return Favorite;
}