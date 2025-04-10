import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartModal.css";

const CartModal = ({ cart, setCart, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            setIsProcessing(true);

            const checkoutData = {
                items: cart,
                subtotal: totalAmount,
                shippingFee: totalAmount >= 500000 ? 0 : 30000,
                discount: 0,
                total: totalAmount + (totalAmount >= 500000 ? 0 : 30000),
                coupon: null,
            };

            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
            handleClose();
            navigate("/checkout", { state: checkoutData });
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleContinueShopping = () => {
        handleClose();
        navigate("/");
    };

    return (
        <div
            className={`cart-modal-overlay ${isClosing ? "closing" : ""}`}
            onClick={handleClose}
        >
            <div
                className={`cart-modal ${isClosing ? "closing" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="cart-modal-header">
                    <h3>Giỏ hàng</h3>
                    <button className="close-button" onClick={handleClose}>
                        ×
                    </button>
                </div>
                <div className="cart-modal-content">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fas fa-shopping-cart"></i>
                            <p>Giỏ hàng trống</p>
                            <button
                                onClick={handleContinueShopping}
                                className="continue-shopping-button"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="item-image"
                                />
                                <div className="item-details">
                                    <div className="item-info">
                                        <div className="item-name-section">
                                            <h4>{item.name}</h4>
                                            {item.variation && (
                                                <div className="item-variation">
                                                    Phân loại: {item.variation}
                                                </div>
                                            )}
                                            <div className="item-wrapper">
                                                <div className="item-price">
                                                    ₫{item.price.toLocaleString()}
                                                </div>
                                                <div className="item-quantity">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        disabled={isProcessing}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        disabled={isProcessing}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => removeFromCart(item.id)}
                                        disabled={isProcessing}
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="cart-modal-footer">
                        <div className="cart-total">
                            <span>Tổng tiền:</span>
                            <span className="total-amount">
                                ₫{totalAmount.toLocaleString()}
                            </span>
                        </div>
                        <button
                            className="checkout-button"
                            onClick={handleCheckout}
                            disabled={isProcessing}
                        >
                            {isProcessing
                                ? "Đang xử lý..."
                                : `Thanh toán (${cart.length})`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
