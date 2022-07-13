import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define('Users',{
    name : {
        type : DataTypes.STRING
    },

    email : {
        type : DataTypes.STRING
    },
    
    status : {
        type : DataTypes.BOOLEAN
    }
});


export default User;