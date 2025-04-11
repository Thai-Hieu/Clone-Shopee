import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin, onSwitchToRegister, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
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
        setTouched({
            email: true,
            password: true,
        });
        setErrors({});
        const newErrors = validateFields();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));

            const result = await onLogin({
                email,
                name: email.split("@")[0],
                password,
            });

            if (result?.success) {
                onSuccess?.();
            } else {
                setErrors({ global: "Sai thông tin đăng nhập" });
            }
        } catch (err) {
            console.error("Login error:", err);
            setErrors({ global: "Đăng nhập thất bại. Vui lòng thử lại." });
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
                <form onSubmit={handleSubmit} noValidate>
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

                    {errors.global && (
                        <div className="error-message show">{errors.global}</div>
                    )}

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
