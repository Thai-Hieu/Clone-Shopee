import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        paymentMethod: "cod",
    });

    useEffect(() => {
        // TODO: Fetch cart items from API or local storage
        const mockCartItems = [
            {
                id: 1,
                name: "Sản phẩm 1",
                price: 500000,
                quantity: 2,
                image: "https://via.placeholder.com/100",
            },
            {
                id: 2,
                name: "Sản phẩm 2",
                price: 300000,
                quantity: 1,
                image: "https://via.placeholder.com/100",
            },
        ];

        setCartItems(mockCartItems);
        setLoading(false);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle order submission
        console.log("Order submitted:", {
            items: cartItems,
            shippingInfo: formData,
        });
        // Redirect to order confirmation page
        navigate("/my-orders");
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (loading) {
        return (
            <div className="checkout-container">
                <div className="loading">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Thanh toán</h1>
            <div className="checkout-content">
                <div className="checkout-form">
                    <h2>Thông tin giao hàng</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">Tỉnh/Thành phố</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="district">Quận/Huyện</label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ward">Phường/Xã</label>
                                <input
                                    type="text"
                                    id="ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phương thức thanh toán</label>
                            <div className="payment-methods">
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleInputChange}
                                    />
                                    Thanh toán khi nhận hàng (COD)
                                </label>
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={formData.paymentMethod === "bank"}
                                        onChange={handleInputChange}
                                    />
                                    Chuyển khoản ngân hàng
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="submit-order-btn">
                            Đặt hàng
                        </button>
                    </form>
                </div>
                <div className="order-summary">
                    <h2>Đơn hàng của bạn</h2>
                    <div className="order-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="order-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p className="item-price">
                                        {formatPrice(item.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <span>Tổng tiền:</span>
                        <span className="total-amount">
                            {formatPrice(calculateTotal())}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
