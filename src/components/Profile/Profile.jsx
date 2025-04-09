import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu user:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setNotification({ type: "info", message: "Đã đăng xuất!" });
    };
    if (!user) return null;

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="avatar"
                    className="profile-avatar"
                />
                <div className="profile-details">
                    <h2>{user.name}</h2>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Mật khẩu:</strong> {user.password}
                    </p>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </button>
            </div>
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
};

export default Profile;
