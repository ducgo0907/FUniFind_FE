const timestampConverter = (timestamp) => {
	const isoTimestamp = timestamp; // Replace this with your timestamp

	// Create a Date object from the ISO timestamp
	const date = new Date(isoTimestamp);

	// Extract the components of the date
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
	const year = date.getFullYear();

	// Create the formatted string
	const formattedTimestamp = `${hours}:${minutes} ${day}/${month}/${year}`;
	return formattedTimestamp;
};

export default timestampConverter;