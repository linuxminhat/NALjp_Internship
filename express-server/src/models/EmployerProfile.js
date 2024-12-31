module.exports = (sequelize, DataTypes) =>{
    const EmployerProfile = sequelize.define('EmployerProfile', {
          address:{
            type: DataTypes.STRING,
          },
          phone: {
            type: DataTypes.STRING,
          },
          website: {
            type: DataTypes.TEXT,
          },
          logo: {
            type: DataTypes.STRING,
          },
          coverphoto: {
            type: DataTypes.STRING,
          },
          slogan: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.TEXT,
          }

    })

    EmployerProfile.associate = function(models){
      EmployerProfile.belongsTo(models.Employer)
    }

    return EmployerProfile;
}