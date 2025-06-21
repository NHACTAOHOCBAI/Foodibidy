const convertDateFormat = (input: string) => {
    // Tách thời gian và ngày
    const [timeStr, dateStr] = input.split(' ');

    // Tách thành phần ngày
    const [day, month, year] = dateStr.split('-');

    // Tạo đối tượng Date
    const date = new Date(`${year}-${month}-${day}T${timeStr}`);

    // Mảng tháng viết tắt
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Lấy thông tin ngày giờ
    const dayNum = date.getDate();
    const monthName = monthNames[date.getMonth()];

    // Lấy giờ và phút, đảm bảo 2 chữ số
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Trả về chuỗi định dạng mới
    return `${dayNum} ${monthName}, ${hours}:${minutes}`;
}
export default convertDateFormat;
// Output: "23 May, 23:07"
