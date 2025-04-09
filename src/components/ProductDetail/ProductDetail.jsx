import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = ({ onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    // Fetch product data from API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();

                // Transform API data to match our product structure
                const transformedProduct = {
                    id: data.id,
                    name: data.title,
                    price: Math.floor(data.price * 25000), // Convert USD to VND
                    originalPrice: Math.floor(data.price * 35000),
                    discount: Math.floor(Math.random() * 50),
                    rating: data.rating.rate,
                    sold: Math.floor(Math.random() * 2000),
                    image: data.image,
                    description: data.description,
                    category: data.category,
                    location: Math.random() > 0.5 ? "Hà Nội" : "TP. Hồ Chí Minh",
                    freeShipping: Math.random() > 0.6,
                    images: [
                        data.image,
                        `https://picsum.photos/400/400?random=${id}-1`,
                        `https://picsum.photos/400/400?random=${id}-2`,
                        `https://picsum.photos/400/400?random=${id}-3`,
                    ],
                    specifications: [
                        { label: "Thương hiệu", value: "Brand XYZ" },
                        { label: "Xuất xứ", value: "Việt Nam" },
                        { label: "Chất liệu", value: "Cotton" },
                        { label: "Kích thước", value: "M, L, XL" },
                    ],
                };

                setProduct(transformedProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
                // Fallback to mock data if API fails
                generateMockProduct();
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Generate mock product if API fails
    const generateMockProduct = () => {
        const mockProduct = {
            id: parseInt(id),
            name: `Sản phẩm ${id} ${id % 3 === 0 ? "Hot" : id % 5 === 0 ? "Sale" : ""}`,
            price: Math.floor(Math.random() * 10 + 1) * 100000,
            originalPrice: Math.floor(Math.random() * 15 + 5) * 100000,
            discount: Math.floor(Math.random() * 50),
            rating: (Math.random() * 3 + 2).toFixed(1),
            sold: Math.floor(Math.random() * 2000),
            location: Math.random() > 0.5 ? "Hà Nội" : "TP. Hồ Chí Minh",
            freeShipping: Math.random() > 0.6,
            description:
                "Mô tả chi tiết sản phẩm. Sản phẩm chất lượng cao, được sản xuất từ nguyên liệu tốt nhất. Phù hợp với nhiều dịp sử dụng khác nhau.",
            images: [
                `https://picsum.photos/400/400?random=${id}-1`,
                `https://picsum.photos/400/400?random=${id}-2`,
                `https://picsum.photos/400/400?random=${id}-3`,
                `https://picsum.photos/400/400?random=${id}-4`,
            ],
            specifications: [
                { label: "Thương hiệu", value: "Brand XYZ" },
                { label: "Xuất xứ", value: "Việt Nam" },
                { label: "Chất liệu", value: "Cotton" },
                { label: "Kích thước", value: "M, L, XL" },
            ],
        };
        setProduct(mockProduct);
    };

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Handle quantity change
    const handleQuantityChange = (amount) => {
        const newQuantity = quantity + amount;
        if (newQuantity > 0 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    // Add to cart
    const handleAddToCart = () => {
        if (!product) return;

        const productToAdd = {
            ...product,
            quantity,
        };
        onAddToCart(productToAdd);
        setNotification({ type: "success", message: "Đã thêm sản phẩm vào giỏ hàng!" });
        setTimeout(() => setNotification(null), 3000);
    };

    // Buy now
    const handleBuyNow = () => {
        if (!product) return;

        const productToAdd = {
            ...product,
            quantity,
        };
        onAddToCart(productToAdd);
        navigate("/checkout");
    };

    // Go back
    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return <div className="error-container">Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <button className="back-button" onClick={handleGoBack}>
                    <i className="fas fa-arrow-left"></i> Quay lại
                </button>
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.images[selectedImage]} alt={product.name} />
                    </div>
                    <div className="thumbnail-list">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${
                                    selectedImage === index ? "active" : ""
                                }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} - ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-stats">
                        <div className="rating">
                            <span className="rating-score">{product.rating}</span>
                            <div className="stars">
                                {"★".repeat(Math.floor(product.rating))}
                                {"☆".repeat(5 - Math.floor(product.rating))}
                            </div>
                        </div>
                        <div className="sold">{product.sold} đã bán</div>
                    </div>
                    <div className="product-price">
                        <div className="current-price">
                            {formatPrice(product.price)}
                        </div>
                        {product.originalPrice > product.price && (
                            <div className="original-price">
                                {formatPrice(product.originalPrice)}
                            </div>
                        )}
                        {product.discount > 0 && (
                            <div className="discount-badge">-{product.discount}%</div>
                        )}
                    </div>
                    <div className="shipping">
                        <h3>Vận chuyển</h3>
                        <div className="shipping-info">
                            <i className="fas fa-truck"></i>
                            <div>
                                <div>
                                    {product.freeShipping
                                        ? "Miễn phí vận chuyển"
                                        : "Phí vận chuyển: 30.000₫"}
                                </div>
                                <div>{product.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="quantity-selector">
                        <h3>Số lượng</h3>
                        <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange(-1)}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(1, parseInt(e.target.value) || 1)
                                    )
                                }
                                min="1"
                            />
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            <i className="fas fa-shopping-cart"></i>
                            Thêm vào giỏ hàng
                        </button>
                        <button className="buy-now" onClick={handleBuyNow}>
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
            <div className="product-details">
                <h2>CHI TIẾT SẢN PHẨM</h2>
                <div className="specifications">
                    {product.specifications.map((spec, index) => (
                        <div key={index} className="spec-row">
                            <div className="spec-label">{spec.label}</div>
                            <div className="spec-value">{spec.value}</div>
                        </div>
                    ))}
                </div>
                <h2>MÔ TẢ SẢN PHẨM</h2>
                <div className="description">{product.description}</div>
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
