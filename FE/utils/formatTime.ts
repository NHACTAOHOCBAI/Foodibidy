export const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    try {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString(); // Customize format as needed, e.g., "MM/DD/YYYY, HH:MM"
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return 'Invalid Date';
    }
};
