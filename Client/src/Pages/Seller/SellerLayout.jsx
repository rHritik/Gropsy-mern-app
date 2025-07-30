import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";

const SellerLayout = () => {
   const{ isSeller , setIsSeller , navigate} = useContext(AppContext);

   

  

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
             <h1 className="text-2xl text-orange-600">Gropsy</h1>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button 
                    onClick={()=>{
                      setIsSeller(false);
                      navigate("/");
                    }}
                    className='border rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
                </div>
            </div>
          <div className="flex">
              <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink
                     to={item.path} 
                     key={item.name}
                     end ={item.path==="/seller"}
                      className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white "
                            }`}
            >
                    <img src={item.icon}alt="" className="w-7 h-7" />
                        
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet/>
          </div>
        </>
    );
};
export default SellerLayout