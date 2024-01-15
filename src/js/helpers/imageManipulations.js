export default class FsImageManipulations {
    constructor() {

    }

    resizeImage(imgToResize, newWidth = undefined, newHeight = undefined) {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		const originalWidth = imgToResize.width;
		const originalHeight = imgToResize.height;

		const canvasWidth = typeof newWidth != undefined ? newWidth : originalWidth;
		const canvasHeight = typeof newHeight != undefined ? newHeight : (newWidth * originalWidth) / originalHeight;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		context.drawImage(
			imgToResize,
			0,
			0,
			canvasWidth,
			canvasHeight
		);

		return canvas.toDataURL();
	}
}