import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul>
                        <li>
                            <Link to="/faq">Câu hỏi thường gặp</Link>
                        </li>
                        <li>
                            <Link to="/shipping">Hướng dẫn giao hàng</Link>
                        </li>
                        <li>
                            <Link to="/returns">Hướng dẫn đổi trả</Link>
                        </li>
                        <li>
                            <Link to="/payment">Phương thức thanh toán</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Về chúng tôi</h3>
                    <ul>
                        <li>
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to="/careers">Tuyển dụng</Link>
                        </li>
                        <li>
                            <Link to="/terms">Điều khoản</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Chính sách bảo mật</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Liên hệ</h3>
                    <ul>
                        <li>Email: support@example.com</li>
                        <li>Hotline: 1900-xxxx</li>
                        <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Theo dõi chúng tôi</h3>
                    <div className="social-links">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <div className="payment-methods">
                        <img src="https://placehold.co/80x80" alt="Visa" />
                        <img src="https://placehold.co/80x80" alt="Mastercard" />
                        <img src="https://placehold.co/80x80" alt="Momo" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Shop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
