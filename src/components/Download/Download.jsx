import React from "react";
import "./Download.css";

const Download = () => {
    return (
        <div className="download-page">
            <h2>Tải Ứng Dụng Shopee</h2>
            <div className="download-content">
                <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/e82a7ab18aeae26e.png"
                    alt="QR Code"
                    className="qr-code"
                />
                <div className="download-links">
                    <a
                        href="https://apps.apple.com/vn/app/shopee/id959841449"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/apple-store-1868945-1583149.png"
                            alt="App Store"
                        />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.shopee.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                            alt="Google Play"
                        />
                    </a>
                    <a
                        href="https://appgallery.huawei.com/#/app/C10132067"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://consumer.huawei.com/etc/designs/huawei-cbg-site/clientlib-campaign-v4/common-v4/images/logo.svg"
                            alt="AppGallery"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Download;
