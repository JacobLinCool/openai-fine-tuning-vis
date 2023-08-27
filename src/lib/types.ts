export interface StepMetric {
	step: number;
	train_loss: number;
	train_accuracy: number;
	valid_loss: number;
	valid_mean_token_accuracy: number;
}

export interface TransformedData {
	steps: number[];
	train_loss: number[];
	valid_loss: number[];
}
