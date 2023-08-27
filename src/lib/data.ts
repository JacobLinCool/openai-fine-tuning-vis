import Papa from "papaparse";
import { interpolate_missing_values, moving_average } from "./helper";
import type { StepMetric, TransformedData } from "./types";

export function parse_file(file: File): Promise<Papa.ParseResult<StepMetric>> {
	return new Promise((resolve, reject) => {
		Papa.parse<StepMetric>(file, {
			header: true,
			worker: true,
			dynamicTyping: true,
			complete: (results) => resolve(results),
			error: (err) => reject(err),
		});
	});
}

export function parse_url(url: string): Promise<Papa.ParseResult<StepMetric>> {
	return new Promise((resolve, reject) => {
		Papa.parse<StepMetric>(url, {
			header: true,
			download: true,
			dynamicTyping: true,
			complete: (results) => resolve(results),
			error: (err) => reject(err),
		});
	});
}

export function transform_data(data: StepMetric[]): TransformedData {
	const steps = data.map((row) => row.step);
	const train_loss = moving_average(
		data.map((row) => row.train_loss),
		10,
	);
	const valid_loss = interpolate_missing_values(data.map((row) => row.valid_loss));
	return { steps, train_loss, valid_loss };
}
