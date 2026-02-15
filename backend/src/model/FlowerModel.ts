import { Sequelize , DataTypes , Model , Optional } from "sequelize";

interface FlowerAttributes{
  id:number;
  name : string;
  images:string;
  price:number;
  originalPrice:number;
  category:string;
  rating:number;
  reviews:number;
}


interface FlowerCreationAttributes extends Optional<FlowerAttributes , "id">{}

export class Flower extends Model<FlowerAttributes,FlowerCreationAttributes> implements FlowerAttributes{
  public id!:number;
  public name!:string;
  public images!:string;
  public price!:number;
  public originalPrice!:number;
  public category!:string;
  public rating!:number;
  public reviews!:number;
}
export const initFlowerModel = (sequelize : Sequelize)=>{
  Flower.init(
    {
      id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,

      },
      name:{
        type:DataTypes.STRING,
        allowNull:false,

      },
      images:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"",
      },
      price:{
        type:DataTypes.INTEGER,
        allowNull:false,
      }
      ,
      originalPrice:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
    ,category:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    rating:{
      type:DataTypes.FLOAT,
      allowNull:false,  
    },
    reviews:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
    },
    {
      sequelize,
      tableName:"flowers",
    }
  )
  return Flower;
}