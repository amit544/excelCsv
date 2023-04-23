const db= require("../models/index")
const { QueryTypes } = require("sequelize");
class userDataSource {
  static getUserDetails = async (email) => {
    try {
        let query = `select u.id,u.email,phone,first_name,last_name,name,ip_address from users u 
        join user_details ud 
        on u.email =ud.email 
        where u.email =:email `;
       return await db.sequelize.query(query,{
        type: QueryTypes.SELECT,
        plain:true,
        replacements: { email},
      });     
    } catch (error) {
      throw new Error(error.errors[0].message);
    }
  };

}
module.exports = userDataSource;
