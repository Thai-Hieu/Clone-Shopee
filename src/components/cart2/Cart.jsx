import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load cart from localStorage when component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Handle item selection
    const handleItemSelect = (itemId) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(itemId)) {
            newSelectedItems.delete(itemId);
        } else {
            newSelectedItems.add(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    // Handle select all items
    const handleSelectAll = () => {
        if (selectedItems.size === cart.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(cart.map((item) => item.id)));
        }
    };

    // Handle quantity change
    const handleQuantityChange = (itemId, amount) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + amount;
                if (newQuantity > 0 && newQuantity <= 99) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCart(updatedCart);
    };

    // Handle remove item
    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
        const newSelectedItems = new Set(selectedItems);
        newSelectedItems.delete(itemId);
        setSelectedItems(newSelectedItems);
    };

    // Apply coupon
    const handleApplyCoupon = () => {
        // Mock coupon validation
        const validCoupons = {
            SHOPEE10: 10,
            SHOPEE20: 20,
            SHOPEE30: 30,
        };

        if (validCoupons[couponCode]) {
            setAppliedCoupon({
                code: couponCode,
                discount: validCoupons[couponCode],
            });
            setCouponCode(""); // Clear input after applying
        } else {
            alert("Mã giảm giá không hợp lệ!");
        }
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cart
            .filter((item) => selectedItems.has(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Calculate shipping fee
    const calculateShippingFee = () => {
        const subtotal = calculateSubtotal();
        if (subtotal >= 500000) return 0;
        return 30000;
    };

    // Calculate discount
    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        const subtotal = calculateSubtotal();
        return (subtotal * appliedCoupon.discount) / 100;
    };

    // Calculate total
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shippingFee = calculateShippingFee();
        const discount = calculateDiscount();
        return subtotal + shippingFee - discount;
    };

    // Handle checkout
    const handleCheckout = async () => {
        if (selectedItems.size === 0) {
            alert("Vui lòng chọn sản phẩm để thanh toán!");
            return;
        }

        try {
            setIsProcessing(true);

            // Chuẩn bị dữ liệu cho checkout
            const checkoutData = {
                items: cart.filter((item) => selectedItems.has(item.id)),
                subtotal: calculateSubtotal(),
                shippingFee: calculateShippingFee(),
                discount: calculateDiscount(),
                total: calculateTotal(),
                coupon: appliedCoupon,
            };

            // Lưu thông tin checkout vào localStorage
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

            // Giả lập xử lý thanh toán
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Chuyển hướng đến trang checkout
            navigate("/checkout", { state: checkoutData });

            // Cập nhật giỏ hàng (loại bỏ các sản phẩm đã chọn)
            const remainingItems = cart.filter((item) => !selectedItems.has(item.id));
            setCart(remainingItems);
            localStorage.setItem("cart", JSON.stringify(remainingItems));
            setSelectedItems(new Set());
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!");
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle buy now for a single item
    const handleBuyNow = async (item) => {
        try {
            setIsProcessing(true);

            const checkoutData = {
                items: [item],
                subtotal: item.price * item.quantity,
                shippingFee: item.price * item.quantity >= 500000 ? 0 : 30000,
                discount: 0,
                total:
                    item.price * item.quantity +
                    (item.price * item.quantity >= 500000 ? 0 : 30000),
                coupon: null,
            };

            // Lưu thông tin checkout vào localStorage
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

            // Giả lập xử lý
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Chuyển hướng đến trang checkout
            navigate("/checkout", { state: checkoutData });
        } catch (error) {
            console.error("Buy now error:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                </div>
                <h2>Giỏ hàng trống</h2>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <button className="continue-shopping" onClick={() => navigate("/")}>
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Giỏ hàng của tôi</h1>
                <div className="cart-summary">
                    {selectedItems.size} sản phẩm được chọn
                </div>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    <div className="cart-item-header">
                        <label className="select-all">
                            <input
                                type="checkbox"
                                checked={selectedItems.size === cart.length}
                                onChange={handleSelectAll}
                            />
                            Chọn tất cả
                        </label>
                        <div className="item-info">Sản phẩm</div>
                        <div className="item-price">Đơn giá</div>
                        <div className="item-quantity">Số lượng</div>
                        <div className="item-total">Thành tiền</div>
                        <div className="item-actions">Thao tác</div>
                    </div>

                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-select">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.has(item.id)}
                                    onChange={() => handleItemSelect(item.id)}
                                />
                            </div>
                            <div className="item-info">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <div className="item-name">{item.name}</div>
                                    {item.selectedVariants && (
                                        <div className="item-variants">
                                            {Object.entries(item.selectedVariants).map(
                                                ([type, value]) => (
                                                    <span
                                                        key={type}
                                                        className="variant-tag"
                                                    >
                                                        {type}: {value}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="item-price">{formatPrice(item.price)}</div>
                            <div className="item-quantity">
                                <div className="quantity-control">
                                    <button
                                        className="quantity-button"
                                        onClick={() =>
                                            handleQuantityChange(item.id, -1)
                                        }
                                        disabled={isProcessing}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-value">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        disabled={isProcessing}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="item-total">
                                {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="item-actions">
                                <button
                                    className="buy-now-button"
                                    onClick={() => handleBuyNow(item)}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "Đang xử lý..." : "Mua ngay"}
                                </button>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveItem(item.id)}
                                    disabled={isProcessing}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary-section">
                    <div className="coupon-section">
                        <input
                            type="text"
                            placeholder="Nhập mã giảm giá"
                            value={couponCode}
                            onChange={(e) =>
                                setCouponCode(e.target.value.toUpperCase())
                            }
                            disabled={isProcessing}
                        />
                        <button
                            className="apply-coupon-button"
                            onClick={handleApplyCoupon}
                            disabled={!couponCode || appliedCoupon || isProcessing}
                        >
                            Áp dụng
                        </button>
                    </div>

                    {appliedCoupon && (
                        <div className="applied-coupon">
                            <span>Mã giảm giá: {appliedCoupon.code}</span>
                            <span>-{appliedCoupon.discount}%</span>
                            <button
                                className="remove-coupon-button"
                                onClick={() => setAppliedCoupon(null)}
                                disabled={isProcessing}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}

                    <div className="price-summary">
                        <div className="summary-row">
                            <span>Tạm tính</span>
                            <span>{formatPrice(calculateSubtotal())}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span>
                                {calculateShippingFee() === 0
                                    ? "Miễn phí"
                                    : formatPrice(calculateShippingFee())}
                            </span>
                        </div>
                        {appliedCoupon && (
                            <div className="summary-row discount">
                                <span>Giảm giá</span>
                                <span>-{formatPrice(calculateDiscount())}</span>
                            </div>
                        )}
                        <div className="summary-row total">
                            <span>Tổng cộng</span>
                            <span>{formatPrice(calculateTotal())}</span>
                        </div>
                    </div>

                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={selectedItems.size === 0 || isProcessing}
                    >
                        {isProcessing
                            ? "Đang xử lý..."
                            : `Mua hàng (${selectedItems.size})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
