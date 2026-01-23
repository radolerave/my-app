export default class FsImageManipulations {
    constructor() {

    }

	async loadImageFromBlob(url) {

		return new Promise((resolve, reject) => {
	
			window.fetch(url)
			.then(resp => resp.blob())
			.then(blob => {
				const urlFromBlob = window.URL.createObjectURL(blob);
				resolve(urlFromBlob)
			})
	
		})
	
	}

    async resizeImage(imgToResize, newWidth = undefined, newHeight = undefined) {
		return new Promise((resolve, reject) => {
			imgToResize.onload = () => {
				try {
					let canvas = document.createElement("canvas");
					let context = canvas.getContext("2d");

					const originalWidth = imgToResize.width;
					const originalHeight = imgToResize.height;

					canvas.width = typeof newWidth != "undefined" ? newWidth : originalWidth;
					canvas.height = typeof newHeight != "undefined" ? newHeight : (newWidth * originalHeight) / originalWidth;

					console.log(canvas.width, canvas.height)

					
					context.drawImage(
						imgToResize,
						0,
						0,
						canvas.width,
						canvas.height
					);
					
					resolve(canvas.toDataURL())
				}
				catch(err) {
					reject(err)
				}
			}
		})
	}
}