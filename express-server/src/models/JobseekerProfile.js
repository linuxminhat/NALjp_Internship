module.exports = (sequelize, DataTypes) =>{
    const JobseekerProfile = sequelize.define('JobseekerProfile', {
         photo: {
             type: DataTypes.STRING,
         },
          address:{
            type: DataTypes.STRING,
          },
          phone: {
            type: DataTypes.STRING,
          },
          gender: {
            type: DataTypes.STRING,
          },
          dob: {
            type: DataTypes.STRING,
          },
          bio: {
            type: DataTypes.STRING,
          },
          resume: {
            type: DataTypes.STRING,
          },
          coverletter: {
            type: DataTypes.TEXT,
          }
    })

    JobseekerProfile.associate = function(models){
        JobseekerProfile.belongsTo(models.Jobseeker)
    }

    return JobseekerProfile;
}