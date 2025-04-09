import React, { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ onClose, onRegister, onSwitchToLogin, onSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (!validateEmail(email)) {
            setError("Email không hợp lệ");
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            setIsLoading(true);
            // Giả lập thời gian xử lý
            await new Promise((resolve) => setTimeout(resolve, 500));
            const result = await onRegister({ name, email, password });

            // 👇 gọi onSuccess nếu đăng ký thành công
            if (result?.success) {
                onSuccess?.();
            }
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
            console.error("Registration error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Đăng ký</h2>
                    <button onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Họ tên</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập họ tên của bạn"
                            disabled={isLoading}
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            disabled={isLoading}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>
                <div className="modal-footer">
                    <p>
                        Đã có tài khoản?{" "}
                        <button
                            className="switch-button"
                            onClick={onSwitchToLogin}
                            disabled={isLoading}
                        >
                            Đăng nhập
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
