/**
 * Helper function to interpolate missing values
 * @param data Array of numbers and nulls
 * @returns Array of numbers with interpolated values
 */
export function interpolate_missing_values(data: number[]): number[] {
	const result = [];
	let prev = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i] === null) {
			result.push(prev);
		} else {
			result.push(data[i]);
			prev = data[i];
		}
	}
	return result;
}

/**
 * Helper function to apply moving average
 * @param data Array of numbers
 * @param window_size Size of the window to apply moving average
 * @returns Array of numbers with moving average applied
 */
export function moving_average(data: number[], window_size: number): number[] {
	const result = [];
	for (let i = 0; i < data.length; i++) {
		const start = Math.max(0, i - Math.floor(window_size / 2));
		const end = Math.min(data.length, i + Math.floor(window_size / 2));
		const subset = data.slice(start, end);
		const avg = subset.reduce((a, b) => a + b, 0) / subset.length;
		result.push(avg);
	}
	return result;
}
