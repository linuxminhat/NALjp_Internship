module.exports = (sequelize) =>{
    const JobApplicant = sequelize.define('JobApplicant', {
    
    })

    JobApplicant.associate = function(models){
      JobApplicant.belongsTo(models.Job)
      JobApplicant.belongsTo(models.Jobseeker)
  }

    return JobApplicant;
}	  