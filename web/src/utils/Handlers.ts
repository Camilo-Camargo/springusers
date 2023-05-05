export async function handleUpload() {
	// TODO: add timeout to break the upload file
	return new Promise((resolve, reject) => {
		const fileInput: HTMLInputElement = document.createElement("input");
		fileInput.type = "file";
		let file = null;
		fileInput.onchange = (e) => {
			const target = e.target as any;
			file = target.files[0];
			resolve(file);
		};
		fileInput.click();
	})
}
