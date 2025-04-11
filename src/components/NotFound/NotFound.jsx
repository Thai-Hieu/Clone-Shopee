import React from "react";
import "./NotFound.css"; // Đừng quên tạo file CSS
import errorImage from "../../assets/img/404Error.png";

const NotFound = () => {
    return (
        <div className="not-found">
            <img src={errorImage} alt="404 Not Found" className="not-found-image" />
        </div>
    );
};

export default NotFound;
