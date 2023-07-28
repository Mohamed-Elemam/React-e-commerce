import axios from "axios"
import { Navigate } from "react-router-dom";



export let UseCategory = async(Category)=>{
    try {
        const { data } = await axios.get(
          `http://localhost:1337/api/products?populate=*&filters[category][$eq]=${Category}`
        );
        console.log(data?.data);
       Navigate('/category/category')
      } catch (error) {
        console.error("Error fetching products:", error);
      }
}