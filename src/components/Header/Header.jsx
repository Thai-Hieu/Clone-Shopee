import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import CartModal from "../Cart/CartModal";
import LoginModal from "../FormLogin/LoginModal";
import RegisterModal from "../FormRegister/RegisterModal";
import SidebarMenu from "../SiderBarMenu/SidebarMenu";
const Header = ({ cart, setCart }) => {
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [notification, setNotification] = useState(null);
    const [language, setLanguage] = useState("vi");
    const [isOpen, setIsOpen] = useState(false);
    // Load user from localStorage
    // useEffect(() => {
    //     const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    //     if (savedUser) {
    //         setUser(savedUser); // không parse thêm nữa
    //     }
    // }, []);

    useEffect(() => {
        const savedUserRaw = localStorage.getItem("user");

        try {
            const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
            if (savedUser) {
                setUser(savedUser);
            }
        } catch (error) {
            console.error("Dữ liệu user trong localStorage bị lỗi:", error);
            localStorage.removeItem("user"); // xóa nếu lỗi
        }
    }, []);

    // Save user to localStorage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const handleLogin = (userData) => {
        setUser(userData);
        setShowLogin(false);
        setNotification({ type: "success", message: "Đăng nhập thành công!" });
    };

    const handleRegister = (userData) => {
        setUser(userData);
        setShowRegister(false);
        setNotification({ type: "success", message: "Đăng ký thành công!" });
    };

    const handleLogout = () => {
        setUser(null);
        setNotification({ type: "info", message: "Đã đăng xuất!" });
    };
    const switchToLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const switchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const languages = [
        { code: "vi", name: "Tiếng Việt" },
        { code: "en", name: "English" },
    ];

    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) setLanguage(savedLang);
    }, []);

    const handleLanguageChange = (code) => {
        setLanguage(code);
        localStorage.setItem("language", code);
    };

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleSidebarClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <header className="header">
                <SidebarMenu
                    isOpen={isOpen}
                    onClose={handleSidebarClose}
                    onLogin={setShowLogin}
                    onRegister={setShowRegister}
                    user={user}
                    onLogout={handleLogout}
                    onHandleToRegister={handleRegister}
                    onHandleToLogin={handleLogin}
                    onSwitchToLogin={switchToLogin}
                    onSwitchToRegister={switchToRegister}
                />

                <div className="header-top">
                    <div className="header-top-container">
                        <div className="header-top-left">
                            <Link to="/seller-channel" className="header-link">
                                <i className="fas fa-store"></i>
                                Kênh Người Bán
                            </Link>
                            <Link to="/download" className="header-link">
                                <i className="fas fa-download"></i>
                                Tải ứng dụng
                            </Link>
                            <div className="header-link">
                                <span>Kết nối</span>
                                <a href="https://facebook.com" className="social-link">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://instagram.com" className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://zalo.me" className="social-link">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1024px-Icon_of_Zalo.svg.png"
                                        alt="Zalo"
                                        width="13"
                                        height="13"
                                    />
                                </a>
                                <a href="https://m.me" className="social-link">
                                    <i class="fab fa-facebook-messenger"></i>
                                </a>
                            </div>
                        </div>

                        <div className="header-top-right">
                            <Link to="/notification" className="header-link">
                                <i className="far fa-bell"></i>
                                Thông Báo
                            </Link>
                            <Link to="/support" className="header-link">
                                <i className="far fa-question-circle"></i>
                                Hỗ Trợ
                            </Link>

                            <div className="language-dropdown">
                                <button className="dropdown-toggle">
                                    <i class="fas fa-globe"></i>
                                    {
                                        languages.find((lang) => lang.code === language)
                                            .name
                                    }
                                </button>
                                <ul className="dropdown-menu">
                                    {languages.map((lang) => (
                                        <li key={lang.code}>
                                            <button
                                                onClick={() =>
                                                    handleLanguageChange(lang.code)
                                                }
                                            >
                                                <i class="fas fa-globe"></i>
                                                {lang.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {user ? (
                                <div className="header-link">
                                    <i className="far fa-user"></i>
                                    <Link to="/profile">
                                        <span>{user.name}</span>
                                    </Link>
                                    <button
                                        className="header-link"
                                        onClick={handleLogout}
                                    >
                                        <i class="fas fa-sign-out-alt"></i>
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="auth-links">
                                    <button
                                        className="header-link"
                                        onClick={() => setShowRegister(true)}
                                    >
                                        <i class="fas fa-user-plus"></i>
                                        Đăng ký
                                    </button>
                                    <button
                                        className="header-link"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        <i class="fas fa-sign-in-alt"></i>
                                        Đăng nhập
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="header-main">
                    <button className="toggle-sidebar" onClick={handleToggleSidebar}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="header-main-container">
                        <Link to="/" className="logo">
                            <img src="https://placehold.co/20x20" alt="Shopee" />
                        </Link>

                        <div className="search-container">
                            <div className="search-box">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Tìm sản phẩm, thương hiệu và tên shop"
                                />
                                <button className="search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <div className="search-suggestions">
                                <Link to="/search?q=baby" className="suggestion-link">
                                    Baby Tee Ôm Eo
                                </Link>
                                <Link to="/search?q=quan" className="suggestion-link">
                                    Quần Hot Trend Nữ
                                </Link>
                                <Link to="/search?q=ao" className="suggestion-link">
                                    Áo Khoác Hot
                                </Link>
                                <Link
                                    to="/search?q=tai-nghe"
                                    className="suggestion-link"
                                >
                                    Tai Nghe Bluetooth Rẻ 1k
                                </Link>
                                <Link to="/search?q=banh" className="suggestion-link">
                                    Bánh Phơi Sương Nhiều Bơ
                                </Link>
                                <Link to="/search?q=cap" className="suggestion-link">
                                    Cặp Xinh
                                </Link>
                                <Link to="/search?q=dep" className="suggestion-link">
                                    Dép Nam
                                </Link>
                                <Link to="/search?q=do-da" className="suggestion-link">
                                    Đồ Đá Banh 1k
                                </Link>
                            </div>
                        </div>

                        <button
                            className="cart-button"
                            onClick={() => setShowCart(true)}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            {totalItems > 0 && (
                                <span className="cart-count">{totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {showCart && (
                <CartModal
                    cart={cart}
                    setCart={setCart}
                    onClose={() => setShowCart(false)}
                />
            )}

            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onLogin={handleLogin}
                    onSwitchToRegister={switchToRegister}
                />
            )}

            {showRegister && (
                <RegisterModal
                    onClose={() => setShowRegister(false)}
                    onRegister={handleRegister}
                    onSwitchToLogin={switchToLogin}
                />
            )}

            {notification && (
                <div
                    className={`notification ${notification.type}`}
                    onAnimationEnd={() => setNotification(null)}
                >
                    {notification.message}
                </div>
            )}
        </>
    );
};

export default Header;
