import { lazy } from "react";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";


//public imports
const LazyRegister = lazy(() => import("../pages/Register"));
const LazyLogin = lazy(() => import("../pages/Login"));
// const LazyCart = lazy(() => import("../pages/Cart"));
// const LazyUnauthorized = lazy(() => import("../pages/Unauthorized"));
// const LazyLandingPage = lazy(() => import("../pages/landingPage"));
// const LazyProductList = lazy(() => import("../pages/productList"));
// const LazyProductDetails = lazy(() => import("../pages/productDetails"));
// const LazyFavorites = lazy(() => import("../pages/favorites"));


//Protected Imports
// const LazyCheckout = lazy(() => import("../pages/checkout"));
// const LazyOrderSuccess = lazy(() => import("../pages/orderSuccess"));
// const LazyOrderHistory = lazy(() => import("../pages/orderHistory"));
// const LazyProfile = lazy(() => import("../pages/profile"));

//admin Imports 

// Products Management
const LazyAdminProductList = lazy(() => import('../pages/admin/product/ProductList'));
const LazyAdminProductView = lazy(() => import('../pages/admin/product/ViewProduct'));
const LazyAdminProductCreate = lazy(() => import('../pages/admin/product/CreateProduct'));
const LazyAdminProductEdit = lazy(() => import('../pages/admin/product/EditProduct'));


// Categories Management
// const LazyAdminCategoryList = lazy(() => import('./components/Admin/Category/CategoryList'));
// const LazyAdminCategoryView = lazy(() => import('./components/Admin/Category/CategoryView'));
// const LazyAdminCategoryCreate = lazy(() => import('./components/Admin/Category/CategoryCreate'));
// const LazyAdminCategoryEdit = lazy(() => import('./components/Admin/Category/CategoryEdit'));
// const LazyAdminCategoryDelete = lazy(() => import('./components/Admin/Category/CategoryDelete'));

// // Brands Management
// const LazyAdminBrandList = lazy(() => import('./components/Admin/Brand/BrandList'));
// const LazyAdminBrandView = lazy(() => import('./components/Admin/Brand/BrandView'));
// const LazyAdminBrandCreate = lazy(() => import('./components/Admin/Brand/BrandCreate'));
// const LazyAdminBrandEdit = lazy(() => import('./components/Admin/Brand/BrandEdit'));
// const LazyAdminBrandDelete = lazy(() => import('./components/Admin/Brand/BrandDelete'));

// // Users Management
// const LazyAdminUserList = lazy(() => import('./components/Admin/User/UserList'));
// const LazyAdminUserEdit = lazy(() => import('./components/Admin/User/UserEdit'));
// const LazyAdminUserDelete = lazy(() => import('./components/Admin/User/UserDelete'));

// // Orders Management
// const LazyAdminOrderList = lazy(() => import('./components/Admin/Order/OrderList'));


//Public Routes (No Login Required)
const publicRoutes = [
    { path:"/register",  element:<LazyRegister/> },
    { path:"/login", element:<LazyLogin/> },
    // { path: "/cart", element: <LazyCart /> },
    // { path: "/unauthorized", element: <LazyUnauthorized /> },
    // { path:"/", element:<LazyLandingPage/>},
    // { path:"/products", element:<LazyProductList/>},
    // { path:"/product/:id", element:<LazyProductDetails/>},
    // { path:"/favorites", element:<LazyFavorites/>},
    
];


//Routes for Users
// const userRoutes = [
//     { path:"/profile", element:<LazyProfile/>},
//     { path:"/checkout", element:<LazyCheckout/>},
//     { path:"/order-success", element:<LazyOrderSuccess/>},
//     { path:"/order-history", element:<LazyOrderHistory/>},
    
// ]

//Routes only for Admins
const adminRoutes = [
    //products management
    { path: "/admin/product/list", element: <AdminRoute><LazyAdminProductList /></AdminRoute> },
    { path: "/admin/product/view/:id", element: <AdminRoute><LazyAdminProductView /></AdminRoute> },
    { path: "/admin/product/create", element: <AdminRoute><LazyAdminProductCreate /></AdminRoute> },
    { path: "/admin/product/edit/:id", element: <AdminRoute><LazyAdminProductEdit /></AdminRoute> },

    // //Categories Management
    // { path:"/admin/category/list", element:<LazyAdminCategoryList/>},
    // { path:"/admin/category/view/:id", element:<LazyAdminCategoryView/>},
    // { path:"/admin/category/create", element:<LazyAdminCategoryCreate/>},
    // { path:"/admin/category/edit/:id", element:<LazyAdminCategoryEdit/>},
    // { path:"/admin/category/delete/:id", element:<LazyAdminCategoryDelete/>},

    // //Brands Management
    // { path: "/admin/brand/list", element:<LazyAdminBrandList/>},
    // { path:"/admin/brands/view/:id", element:<LazyAdminBrandView/>},
    // { path:"/admin/brands/view/:id", element:<LazyAdminBrandCreate/>},
    // { path: "/admin/brand/edit/:id", element:<LazyAdminBrandEdit/>},
    // { path: "/admin/brand/delete/:id", element:<LazyAdminBrandDelete/>},


    // //Users Management
    // { path: "/admin/user/list", element:<LazyAdminUserList/>},
    // { path: "/admin/user/edit/:id", element:<LazyAdminUserEdit/>},
    // { path: "/admin/user/delete/:id", element:<LazyAdminUserDelete/>},


    // //Orders management
    // {path:"/admin/order/list", element:<LazyAdminOrderList/>},
    // {path:"/admin/order/list", element:<LazyAdminOrderList/>},


]


const allRoutes = [...publicRoutes,...adminRoutes]

export default allRoutes;