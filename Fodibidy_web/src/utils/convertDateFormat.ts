const convertDateFormat = (input: string, locale: string = "en-US"): string => {
    try {
        // Tách giờ và ngày từ chuỗi đầu vào
        const [time, date] = input.trim().split(" ");
        const [hours, minutes, seconds] = time.split(":");
        const [day, month, year] = date.split("-");

        // Tạo chuỗi ISO hợp lệ
        const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        const dateTime = new Date(isoDate);
        if (isNaN(dateTime.getTime())) {
            throw new Error("Invalid date input");
        }

        const formatted = dateTime.toLocaleString(locale, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return formatted;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
};

export default convertDateFormat;