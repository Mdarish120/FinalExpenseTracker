

const AuthModel = (sequelize, DataTypes) => {
    const Auth = sequelize.define('Auth', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetToken: {
        type: DataTypes.STRING, // You can adjust the data type as needed
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
      },

    });
  
    return Auth;
  };
  
  export default AuthModel;
  