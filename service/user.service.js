const XLSX = require("xlsx");
const db = require("../models/index");
const userDataSource=require("../data-source/user.data");
const message=require("../utills/message")
class UserService {
  static uploadCsv = async (buffer) => {
    try {
      let workbook = XLSX.read(buffer);
      let data = [];
      workbook.SheetNames.forEach((sheetName) => {
        let worksheet = workbook.Sheets[sheetName];
        const jsonRow = XLSX.utils.sheet_to_json(worksheet);
        jsonRow.forEach((res) => {
          let email = res.hasOwnProperty("email");
          if (email) {
            res.name=res.first_name+" "+res.last_name;
            data.push(res);
          }
        });
      });
      let totalLength = data.length;
      let successCase = 0;
      let dataToInsert=[];
      let errorCase = 0;
      for (let i = 0; i < totalLength; i++) {
        let alreadyExist = await db.users.findOne({
          where: { email: data[i].email },
        });
        const checkDuplicate = obj => obj.email ==data[i].email;
        if (!alreadyExist && !dataToInsert.some(checkDuplicate)) {
          dataToInsert.push(data[i]);
        } else {
          errorCase++;
        }
      }
      if (dataToInsert) {
        let t = await db.users.bulkCreate(dataToInsert);
        let u= await db.user_details.bulkCreate(dataToInsert);
      }
      successCase = totalLength - errorCase;
      return { successCase, errorCase };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static getUserDetail = async (email) => {
    try {
     const userData=await userDataSource.getUserDetails(email);
      if(!userData) throw new Error (message.invalidUser)
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  
}
module.exports = UserService;
