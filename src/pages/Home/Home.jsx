import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCart/ProductCard";
import "../../components/ProductCart/ProductCard.css";
import "./Home.css";

const Home = () => {
    // State for managing application data
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [flashSaleEndTime, setFlashSaleEndTime] = useState(null);
    const [loading, setLoading] = useState(true);

    // Banner images
    const bannerImages = [
        "https://picsum.photos/800/300?random=1",
        "https://picsum.photos/800/300?random=2",
        "https://picsum.photos/800/300?random=3",
    ];

    // Generate categories
    useEffect(() => {
        const categoryNames = [
            "Điện thoại & Phụ kiện",
            "Máy tính & Laptop",
            "Máy ảnh & Máy quay phim",
            "Đồng hồ thông minh",
            "Thiết bị gia đình",
            "Thời trang nam",
            "Thời trang nữ",
            "Giày dép nam",
            "Giày dép nữ",
            "Túi ví nam",
            "Túi ví nữ",
            "Mẹ & Bé",
            "Nhà cửa & Đời sống",
            "Sức khỏe",
            "Làm đẹp",
            "Thực phẩm",
            "Thể thao & Du lịch",
            "Ô tô & Xe máy & Xe đạp",
            "Sách, Văn phòng phẩm",
            "Đồ chơi, Sở thích & Mô hình",
        ];

        const generatedCategories = categoryNames.map((name, index) => ({
            id: index + 1,
            name,
            image: `https://picsum.photos/200/200?random=${index}`,
        }));

        setCategories(generatedCategories);
    }, []);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                // Transform API data to match our product structure
                const transformedProducts = data.map((product) => ({
                    id: product.id,
                    name: product.title,
                    price: Math.floor(product.price * 25000), // Convert USD to VND
                    originalPrice: Math.floor(product.price * 35000),
                    discount: Math.floor(Math.random() * 50),
                    rating: product.rating.rate,
                    sold: Math.floor(Math.random() * 2000),
                    image: product.image,
                    description: product.description,
                    category: product.category,
                    location: Math.random() > 0.5 ? "Hà Nội" : "TP. Hồ Chí Minh",
                    freeShipping: Math.random() > 0.6,
                }));

                setProducts(transformedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
                // Fallback to mock data if API fails
                generateMockProducts();
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Generate mock products if API fails
    const generateMockProducts = () => {
        const mockProducts = Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            name: `Sản phẩm ${index + 1} ${
                index % 3 === 0 ? "Hot" : index % 5 === 0 ? "Sale" : ""
            }`,
            price: Math.floor(Math.random() * 10 + 1) * 100000,
            originalPrice: Math.floor(Math.random() * 15 + 5) * 100000,
            discount: Math.floor(Math.random() * 50),
            rating: (Math.random() * 3 + 2).toFixed(1),
            sold: Math.floor(Math.random() * 2000),
            image: `https://picsum.photos/400/400?random=${index}`,
            description:
                "Mô tả chi tiết sản phẩm. Sản phẩm chất lượng cao, được sản xuất từ nguyên liệu tốt nhất. Phù hợp với nhiều dịp sử dụng khác nhau.",
            category: "Danh mục mẫu",
            location: Math.random() > 0.5 ? "Hà Nội" : "TP. Hồ Chí Minh",
            freeShipping: Math.random() > 0.6,
        }));

        setProducts(mockProducts);
    };

    // Handle banner slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerImages.length]);

    // Handle flash sale countdown
    useEffect(() => {
        const endTime = new Date();
        endTime.setHours(23, 59, 59);
        setFlashSaleEndTime(endTime);

        const timer = setInterval(() => {
            const now = new Date();
            if (now >= endTime) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format countdown time
    const formatCountdown = () => {
        if (!flashSaleEndTime) return "00:00:00";
        const now = new Date();
        const diff = flashSaleEndTime - now;
        if (diff <= 0) return "00:00:00";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
        );
    };
    return (
        <div className="home">
            <main>
                {/* Banner Section */}

                <section className="banner-section">
                    <div className="banner-container">
                        <div
                            className="banner-slider"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {bannerImages.map((image, index) => (
                                <div key={index} className="banner-slide">
                                    <img src={image} alt={`Banner ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <div className="banner-controls">
                            <button className="prev-button" onClick={prevSlide}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="next-button" onClick={nextSlide}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2>Danh mục</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link
                                to={`/category/${category.id}`}
                                key={category.id}
                                className="category-item"
                            >
                                <img src={category.image} alt={category.name} />
                                <span>{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="featured-products">
                    <h2>Sản phẩm nổi bật</h2>
                    <div className="products-grid">
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Flash Sale Section */}
                <section className="flash-sale">
                    <div className="flash-sale-header">
                        <h2>Flash Sale</h2>
                        <div className="countdown">
                            <span>Kết thúc trong:</span>
                            <span className="countdown-time">{formatCountdown()}</span>
                        </div>
                    </div>
                    <div className="products-grid">
                        {products.slice(8, 16).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    price: Math.floor(product.price * 0.7),
                                    discount: 30,
                                }}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
