import React from "react";
import "./Support.css";

const Support = () => {
    return (
        <div className="support-container">
            <h2 className="support-title">Hỗ Trợ Khách Hàng</h2>
            <p className="support-desc">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn qua nhiều kênh khác nhau.
            </p>

            <ul className="support-list">
                <li>
                    💬 <strong>Chat trực tiếp:</strong>{" "}
                    <button className="chat-btn">Bắt đầu trò chuyện</button>
                </li>
                <li>
                    📞 <strong>Hotline:</strong>{" "}
                    <a href="tel:19001234" className="link">
                        1900 1234
                    </a>
                </li>
                <li>
                    📧 <strong>Email:</strong>{" "}
                    <a href="mailto:hotro@webcuaban.vn" className="link">
                        hotro@webcuaban.vn
                    </a>
                </li>
            </ul>

            <div className="social-support">
                <h3>Kết nối với chúng tôi</h3>
                <div className="social-icons">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon facebook"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://zalo.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon zalo"
                    >
                        Zalo
                    </a>
                    <a
                        href="https://m.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon messenger"
                    >
                        Messenger
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon instagram"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Support;
