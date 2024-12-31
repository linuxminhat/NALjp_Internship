const Promise = require('bluebird')
const bcrypt = require('../app').bcrypt
const bcryptPromise = Promise.promisifyAll(bcrypt) 
function hashPassword(employer){
    const SALT_FACTOR = 8;
    if(!employer.changed('password')){
        return;
    }
    return bcryptPromise
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcryptPromise.hashSync(employer.password, salt, null))
    .then(hash =>{
        employer.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) =>{
    const Employer  = sequelize.define('Employer', {
        company:{
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        representative: {
            type: DataTypes.STRING,
        },
        password:DataTypes.STRING

    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })

    Employer.associate = function(models){
        Employer.hasOne(models.EmployerProfile)
        Employer.hasMany(models.Job)
    }

    Employer.prototype.comparePassword = function(password){
        return bcryptPromise.compareAsync(password, this.password)
    }
  
    return Employer;
}