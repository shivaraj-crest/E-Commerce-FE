import { lazy } from "react";


//public imports
const LazyRegister = lazy(() => import("../pages/Register"));
const LazyLogin = lazy(() => import("../pages/Login"));
const LazyUnauthorized = lazy(()=> import('../pages/Unauthorized'))
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
const LazyAdminCategoryList = lazy(() => import('../pages/admin/category/CategoryList'));
// const LazyAdminCategoryCreate = lazy(() => import('../pages/admin/category/CreateCategory'));
// const LazyAdminCategoryEdit = lazy(() => import('../pages/admin/category/EditCategory'));
// const LazyAdminCategoryView = lazy(() => import('../pages/admin/category/ViewCategory'));

// // Brands Management
const LazyAdminBrandList = lazy(() => import('../pages/admin/brand/BrandList'));
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

//USER ROUTES

const LazyUserCart = lazy(() => import('../pages/user/Cart'));
const LazyUserLandingPage = lazy(() => import('../pages/user/LandingPage'));
const LazyUserProductListing = lazy(() => import('../pages/user/UserProductListing'));
const lazyUserViewProduct = lazy(()=> import('../pages/user/UserViewProduct'));
const LazyUserOrders = lazy(() => import('../pages/user/userOrders'));


export const userRoutes = [
    { path:"home", element:<LazyUserLandingPage/>},
    { path:"products", element:<LazyUserProductListing/>},
    { path:"product/:id/view", element:<lazyUserViewProduct/>},
    { path:"cart/:userId/view", element:<LazyUserCart/>},
    { path:"orders", element:<LazyUserOrders/>},

]






//Public Routes (No Login Required)
export const publicRoutes = [
    { path:"/register",  element:<LazyRegister/> },
    { path:"/login", element:<LazyLogin/> },
    { path :"*", element:<LazyUnauthorized/>}
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
export const adminRoutes = [
        { path: "product", element: <LazyAdminProductList /> },
        { path: "product/:id/view", element: <LazyAdminProductView /> },
        { path: "product/create", element: <LazyAdminProductCreate /> },
        { path: "product/:id/edit", element: <LazyAdminProductEdit /> },
      
        { path: "category/list", element: <LazyAdminCategoryList /> },
        // { path: "category/:id/view", element: <LazyAdminCategoryView /> },
        // { path: "category/create", element: <LazyAdminCategoryCreate /> },
        // { path: "category/:id/edit", element: <LazyAdminCategoryEdit /> },

    // //Brands Management
        { path: "brand/list", element:<LazyAdminBrandList/>},
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


];




