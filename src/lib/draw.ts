import {
	Chart,
	CategoryScale,
	LinearScale,
	LineController,
	PointElement,
	LineElement,
	Legend,
} from "chart.js";
import type { TransformedData } from "./types";

export function draw(ctx: CanvasRenderingContext2D, transformed_data: TransformedData) {
	Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

	return new Chart(ctx, {
		type: "line",
		data: {
			labels: transformed_data.steps,
			datasets: [
				{
					label: "Training Loss",
					data: transformed_data.train_loss,
					borderColor: "blue",
					fill: false,
				},
				{
					label: "Validation Loss",
					data: transformed_data.valid_loss,
					borderColor: "red",
					fill: false,
				},
			],
		},
		plugins: [Legend],
		options: {
			animation: {
				duration: 500,
			},
			scales: {
				x: { beginAtZero: true },
				y: { beginAtZero: true },
			},
			layout: {
				padding: 10,
			},
			plugins: {
				legend: {
					display: true,
					position: "top",
					labels: {
						boxWidth: 40,
					},
				},
			},
		},
	});
}
