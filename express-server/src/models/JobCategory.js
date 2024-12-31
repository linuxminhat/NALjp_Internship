module.exports = (sequelize, DataTypes) =>{
    const JobCategory = sequelize.define('JobCategory', {
          name: {
             type: DataTypes.STRING,
          }
    })

    JobCategory.associate = function(models){
        JobCategory.hasMany(models.Job)
    }


    return JobCategory;
}