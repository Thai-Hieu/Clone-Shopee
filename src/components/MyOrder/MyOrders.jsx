import React, { useState, useEffect } from "react";
import "./MyOrders.css";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy dữ liệu đơn hàng từ localStorage
        const loadOrders = () => {
            try {
                const savedOrders = localStorage.getItem("orders");
                const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
                // Sắp xếp đơn hàng mới nhất lên đầu
                const sortedOrders = parsedOrders.sort(
                    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
                );
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Error loading orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("vi-VN", options);
    };

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Get status text and color
    const getStatusInfo = (status) => {
        switch (status) {
            case "pending":
                return { text: "Chờ xác nhận", color: "#ff9800" };
            case "confirmed":
                return { text: "Đã xác nhận", color: "#2196f3" };
            case "shipping":
                return { text: "Đang giao", color: "#00bcd4" };
            case "delivered":
                return { text: "Đã giao", color: "#4caf50" };
            case "cancelled":
                return { text: "Đã hủy", color: "#f44336" };
            default:
                return { text: "Không xác định", color: "#757575" };
        }
    };

    if (loading) {
        return (
            <div className="my-orders-container">
                <div className="loading">Đang tải đơn hàng...</div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="my-orders-container">
                <div className="empty-orders">
                    <i className="fas fa-box-open"></i>
                    <h2>Chưa có đơn hàng nào</h2>
                    <p>Bạn chưa có đơn hàng nào trong lịch sử mua sắm</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-orders-container">
            <h1>Đơn hàng của tôi</h1>

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.orderId} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-id">
                                    Đơn hàng: {order.orderId}
                                </span>
                                <span className="order-date">
                                    Ngày đặt: {formatDate(order.orderDate)}
                                </span>
                            </div>
                            <div
                                className="order-status"
                                style={{ color: getStatusInfo(order.status).color }}
                            >
                                {getStatusInfo(order.status).text}
                            </div>
                        </div>

                        <div className="order-items">
                            {order.items.map((item) => (
                                <div key={item.id} className="order-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://via.placeholder.com/100x100?text=Image+Not+Found";
                                        }}
                                    />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-quantity">
                                            Số lượng: {item.quantity}
                                        </p>
                                        <p className="item-price">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="shipping-info">
                                <h4>Thông tin giao hàng:</h4>
                                <p>Người nhận: {order.shippingInfo.fullName}</p>
                                <p>Số điện thoại: {order.shippingInfo.phone}</p>
                                <p>Địa chỉ: {order.shippingInfo.address}</p>
                                {order.shippingInfo.note && (
                                    <p>Ghi chú: {order.shippingInfo.note}</p>
                                )}
                            </div>

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Tạm tính:</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Phí vận chuyển:</span>
                                    <span>
                                        {order.shippingFee === 0
                                            ? "Miễn phí"
                                            : formatPrice(order.shippingFee)}
                                    </span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="summary-row discount">
                                        <span>Giảm giá:</span>
                                        <span>-{formatPrice(order.discount)}</span>
                                    </div>
                                )}
                                <div className="summary-row total">
                                    <span>Tổng cộng:</span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
