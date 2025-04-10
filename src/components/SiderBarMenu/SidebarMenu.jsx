import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "../FormRegister/RegisterModal";
import LoginModal from "../FormLogin/LoginModal";
import "./SidebarMenu.css";

const SidebarMenu = ({
    isOpen,
    onClose,
    onLogin,
    onRegister,
    user,
    onLogout,
    onHandleToLogin,
    onHandleToRegister,
    onSwitchToLogin,
    onSwitchToRegister,
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };
    // const handleRegisterClick = () => {
    //     setShowRegister(true);
    // };

    // const handleLoginClick = () => {
    //     setShowLogin(true);
    // };
    const handleLinkClick = () => {
        handleClose();
    };
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? "open" : ""} ${
                    isClosing ? "closing" : ""
                }`}
                onClick={handleClose}
            ></div>
            <div
                className={`sidebar-menu ${isOpen ? "open" : ""} ${
                    isClosing ? "closing" : ""
                }`}
            >
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <button className="close-sidebar" onClick={handleClose}>
                        ×
                    </button>
                </div>
                <ul className="sidebar-links">
                    <li>
                        <Link to="/" onClick={handleLinkClick}>
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/seller-channel" onClick={handleLinkClick}>
                            Kênh người bán
                        </Link>
                    </li>
                    <li>
                        <Link to="/download" onClick={handleLinkClick}>
                            Tải xuống
                        </Link>
                    </li>
                    <li>
                        <Link to="/notification" onClick={handleLinkClick}>
                            Thông báo
                        </Link>
                    </li>
                    <li>
                        <Link to="/support" onClick={handleLinkClick}>
                            Hỗ trợ
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-auth">
                    {user ? (
                        <div className="user-menu">
                            <img
                                src={user.avatar || "https://placehold.co/80x80"}
                                alt="Avatar"
                                className="user-avatar"
                            />
                            <span>{user.name}</span>
                            <div className="dropdown-menu">
                                <Link to="/profile" onClick={handleLinkClick}>
                                    Tài khoản của tôi
                                </Link>
                                <Link to="/my-orders" onClick={handleLinkClick}>
                                    Đơn hàng
                                </Link>
                                <button
                                    className="logout-button"
                                    onClick={() => {
                                        handleClose();
                                        onLogout();
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button
                                onClick={() => {
                                    // handleLoginClick();
                                    handleClose();
                                    onLogin();
                                    setShowLogin(true);
                                }}
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => {
                                    // handleRegisterClick();
                                    handleClose();
                                    onRegister();
                                    setShowRegister(true);
                                }}
                            >
                                Đăng ký
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* <RegisterModal onClose={handleClose} onRegister={onRegister} />
            <LoginModal onClose={handleClose} onLogin={onLogin} /> */}
            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onSuccess={() => setShowLogin(false)}
                    onLogin={onHandleToLogin}
                    onSwitchToRegister={onSwitchToRegister}
                />
            )}

            {showRegister && (
                <RegisterModal
                    onClose={() => setShowRegister(false)}
                    onSuccess={() => setShowRegister(false)}
                    onRegister={onHandleToRegister}
                    onSwitchToLogin={onSwitchToLogin}
                />
            )}
        </>
    );
};

export default SidebarMenu;
