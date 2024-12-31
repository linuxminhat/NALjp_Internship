module.exports = (sequelize, DataTypes) =>{
    const Job = sequelize.define('Job', {
        jobTitle: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        job_ending: {
            type: DataTypes.DATE,
        },
    })

    Job.associate = function(models){
        Job.belongsTo(models.Employer)
        Job.belongsTo(models.JobCategory)
     }
   
    return Job;
}