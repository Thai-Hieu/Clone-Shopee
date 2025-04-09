import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/cart2/Cart";
import Checkout from "./components/Checkout/Checkout";
import LoginModal from "./components/FormLogin/LoginModal";
import RegisterModal from "./components/FormRegister/RegisterModal";
import SidebarMenu from "./components/SiderBarMenu/SidebarMenu";
import MyOrders from "./components/MyOrder/MyOrders";
import Profile from "./components/Profile/Profile";
import "./App.css";
import "./components/Notification.css";

function App() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });

        setNotification({
            type: "success",
            message: "Đã thêm sản phẩm vào giỏ hàng",
        });
    };

    return (
        <div className="app">
            <Header cart={cart} setCart={setCart} />
            <SidebarMenu />
            {/* <Profile /> */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/product/:id"
                        element={<ProductDetail onAddToCart={handleAddToCart} />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<LoginModal />} />
                    <Route path="/register" element={<RegisterModal />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
            <Footer />
            {notification && (
                <div
                    className={`notification ${notification.type}`}
                    onAnimationEnd={() => setNotification(null)}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default App;
