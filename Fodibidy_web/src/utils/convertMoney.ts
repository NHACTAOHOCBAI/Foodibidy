function formatVND(priceString: string): string {
    // Chuyển chuỗi sang số nguyên
    const amount = parseInt(priceString, 10);

    // Dùng Intl.NumberFormat để định dạng kiểu "500.000 ₫"
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}
export default formatVND