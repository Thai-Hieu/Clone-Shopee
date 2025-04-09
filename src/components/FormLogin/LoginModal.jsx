import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin, onSwitchToRegister, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (!validateEmail(email)) {
            setError("Email không hợp lệ");
            return;
        }

        try {
            setIsLoading(true);
            // Giả lập thời gian xử lý
            await new Promise((resolve) => setTimeout(resolve, 500));
            const result = onLogin({ email, name: email.split("@")[0], password });
            if (result?.success) {
                onSuccess?.(); // 👈 gọi hàm onSuccess nếu đăng nhập thành công
            } else {
                setError("Sai thông tin đăng nhập");
            }
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng thử lại.");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Đăng nhập</h2>
                    <button onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            disabled={isLoading}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="modal-footer">
                    <p>
                        Chưa có tài khoản?{" "}
                        <button
                            className="switch-button"
                            onClick={onSwitchToRegister}
                            disabled={isLoading}
                        >
                            Đăng ký
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
