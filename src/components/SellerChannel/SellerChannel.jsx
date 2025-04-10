import React from "react";
import "./SellerChannel.css";

const SellerChannel = () => {
    return (
        <div className="seller-channel">
            <div className="seller-header">
                <img
                    src="https://placehold.co/80x80"
                    alt="Seller Avatar"
                    className="seller-avatar"
                />
                <div className="seller-info">
                    <h3 className="seller-name">Shop ABC Official</h3>
                    <p className="seller-email">abcshop@gmail.com</p>
                </div>
            </div>

            <div className="seller-actions">
                <div className="seller-card">
                    📦 <span>Quản lý đơn hàng</span>
                </div>
                <div className="seller-card">
                    🛍️ <span>Quản lý sản phẩm</span>
                </div>
                <div className="seller-card">
                    💰 <span>Doanh thu</span>
                </div>
                <div className="seller-card">
                    💬 <span>Chat với khách</span>
                </div>
            </div>

            <div className="seller-support">
                <h4>Hỗ trợ & Tài liệu</h4>
                <ul>
                    <li>
                        📘{" "}
                        <a
                            href="https://example.com/guide"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Hướng dẫn người bán
                        </a>
                    </li>
                    <li>
                        📞 <a href="tel:19001234">Hotline hỗ trợ</a>
                    </li>
                    <li>
                        📧 <a href="mailto:seller-support@example.com">Email hỗ trợ</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SellerChannel;
