import React, { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ onClose, onRegister, onSwitchToLogin, onSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateFields = () => {
        const newErrors = {};

        if (!name) newErrors.name = "Vui lòng nhập họ tên.";

        if (!email) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải từ 6 ký tự.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Mật khẩu không khớp.";
        }

        return newErrors;
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const newErrors = validateFields();
        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Đánh dấu tất cả trường đã "chạm"
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        const newErrors = validateFields();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            setIsLoading(true);
            await new Promise((res) => setTimeout(res, 500));
            const result = await onRegister({ name, email, password });

            if (result?.success) {
                onSuccess?.();
            } else {
                setErrors((prev) => ({
                    ...prev,
                    global: "Đăng ký thất bại. Vui lòng thử lại.",
                }));
            }
        } catch (err) {
            console.error(err);
            setErrors((prev) => ({
                ...prev,
                global: "Lỗi không xác định. Vui lòng thử lại.",
            }));
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
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Họ tên</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => handleBlur("name")}
                            onFocus={() => handleFocus("name")}
                            placeholder="Nhập họ tên của bạn"
                            disabled={isLoading}
                        />
                        {touched.name && (
                            <div
                                className={`error-message ${errors.name ? "show" : ""}`}
                            >
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlur("email")}
                            onFocus={() => handleFocus("email")}
                            placeholder="Nhập email của bạn"
                            disabled={isLoading}
                        />
                        {touched.email && (
                            <div
                                className={`error-message ${
                                    errors.email ? "show" : ""
                                }`}
                            >
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleBlur("password")}
                            onFocus={() => handleFocus("password")}
                            placeholder="Nhập mật khẩu"
                            disabled={isLoading}
                        />
                        {touched.password && (
                            <div
                                className={`error-message ${
                                    errors.password ? "show" : ""
                                }`}
                            >
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => handleBlur("confirmPassword")}
                            onFocus={() => handleFocus("confirmPassword")}
                            placeholder="Nhập lại mật khẩu"
                            disabled={isLoading}
                        />
                        {touched.confirmPassword && (
                            <div
                                className={`error-message ${
                                    errors.confirmPassword ? "show" : ""
                                }`}
                            >
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    {errors.global && (
                        <div className="error-message show">{errors.global}</div>
                    )}

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
