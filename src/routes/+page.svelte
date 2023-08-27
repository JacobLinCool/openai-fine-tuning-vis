<script lang="ts">
	import { t } from "svelte-i18n";
	import type { Chart } from "chart.js";
	import { parse_file, transform_data } from "$lib/data";
	import { draw } from "$lib/draw";
	import type { TransformedData } from "$lib/types";

	let files: FileList;
	let canvas: HTMLCanvasElement;
	let error: string | null = null;

	let running = false;
	let chart: Chart | null = null;

	function render(transformed_data: TransformedData) {
		if (chart) {
			chart.destroy();
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error($t("error.no-canvas"));
		}

		chart = draw(ctx, transformed_data);
	}

	async function show() {
		if (running) {
			return;
		}
		running = true;

		try {
			const file = files[0];
			if (!file) {
				throw new Error($t("error.no-file"));
			}
			const results = await parse_file(file);
			const transformed_data = transform_data(results.data);
			render(transformed_data);
			error = null;
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			}
		} finally {
			running = false;
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center p-4">
	<div class="w-full">
		<div class="form-control">
			<label class="label" for="file">
				<span class="label-text">
					{$t("select-file")}
				</span>
			</label>
			<div class="join">
				<input
					id="file"
					class="file-input join-item file-input-bordered"
					class:animate-pulse={running}
					type="file"
					accept=".csv"
					bind:files
					on:change={show}
					disabled={running}
				/>
			</div>
		</div>

		{#if error}
			<div class="text-error">{error}</div>
		{/if}

		<div class="divider" />
	</div>
	<div class="w-full flex-1">
		<canvas class="w-full" bind:this={canvas} />
	</div>
</div>
