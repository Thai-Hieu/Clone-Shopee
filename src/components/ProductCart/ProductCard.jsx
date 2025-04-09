import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const {
        id,
        name,
        price,
        originalPrice,
        discount,
        rating,
        sold,
        image,
        location,
        freeShipping,
    } = product;

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <Link to={`/product/${id}`} className="product-card">
            <div className="product-image">
                <img src={image} alt={name} />
                {discount > 0 && <div className="discount-badge">-{discount}%</div>}
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <div className="product-price">
                    <span className="current-price">{formatPrice(price)}</span>
                    {originalPrice > price && (
                        <span className="original-price">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                </div>
                <div className="product-meta">
                    <div className="product-rating">
                        <span className="rating-score">{rating}</span>
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={
                                        i < Math.floor(rating) ? "star filled" : "star"
                                    }
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="product-sold">Đã bán {sold}</div>
                </div>
                <div className="product-wraper">
                    <div className="product-location">
                        <i className="fas fa-map-marker-alt"></i> {location}
                    </div>
                    {freeShipping && (
                        <div className="free-shipping">
                            <i className="fas fa-truck"></i> Miễn phí vận chuyển
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
