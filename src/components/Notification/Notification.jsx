import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    // Thay API thật vào đây:
    const API_URL = "https://67e69f186530dbd31110c912.mockapi.io/notifications";

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setNotifications(data);
                setLoading(false);
                setApiError(false); // không lỗi
            })
            .catch((error) => {
                console.error("Lỗi khi fetch thông báo:", error);
                setLoading(false);
                setApiError(true); // báo lỗi
            });
    }, []);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
        // Gọi API nếu có
        // fetch(`${API_URL}/${id}/read`, { method: "POST" });
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));

        // Gọi API nếu có endpoint DELETE
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        }).catch((err) => console.error("Lỗi khi xóa thông báo:", err));
    };
    // Call Erorr API
    if (apiError) {
        return <NotFound />;
    }
    return (
        <div className="notification-center">
            <h2>🔔 Thông báo của bạn</h2>
            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <h2>Loading...</h2>
                </div>
            ) : notifications.length === 0 ? (
                <p>Không có thông báo nào.</p>
            ) : (
                <ul>
                    {notifications.map((noti) => (
                        <li
                            key={noti.id}
                            className={`notification-item ${
                                noti.read ? "read" : "unread"
                            }`}
                        >
                            <div className="notification-content">
                                <h4>{noti.title}</h4>
                                <p>{noti.content}</p>
                                <small>
                                    {new Date(noti.timestamp).toLocaleString()}
                                </small>
                            </div>
                            <div className="notification-actions">
                                {!noti.read && (
                                    <button
                                        className="mark-read-btn"
                                        onClick={() => markAsRead(noti.id)}
                                    >
                                        Đánh dấu đã đọc
                                    </button>
                                )}
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteNotification(noti.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;
