var removeImageFromMultiPic;


const svgDocument = fileName => `

<!-- sample rectangle -->
<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 512 600" xml:space="preserve">
	<g>
		<g>
			<path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434
				c0,28.001,22.781,50.783,50.783,50.783h320.547c28.002,0,50.783-22.781,50.783-50.783V134.253
				C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753
				c-5.643-5.643-8.752-13.148-8.751-21.131V35.679z M446.158,461.217c0,16.479-13.406,29.885-29.884,29.885H95.726
				c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021
				c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018V461.217z"/>
		</g>
	</g>
	<g>
		<g>
			<path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h4.678
				c5.77,0,10.449-4.678,10.449-10.449S280.862,351.492,275.092,351.492z"/>
		</g>
	</g>
	<g>
		<g>
			<path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449H236.61
				c5.77,0,10.449-4.678,10.449-10.449S242.381,351.492,236.61,351.492z"/>
		</g>
	</g>
	<g>
		<g>
			<path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
				c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"/>
		</g>
	</g>
	<g>
		<g>
			<path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
				c5.77,0,10.449-4.678,10.449-10.449C387.331,260.678,382.652,256,376.882,256z"/>
		</g>
	</g>
	<g>
		<g>
			<path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
				c5.77,0,10.449-4.678,10.449-10.449S382.652,208.255,376.882,208.255z"/>
		</g>
	</g>
  <text y="590" x="50%"  text-anchor="middle" font-size="70">${fileName ?? ''}</text>
</svg>
`

const trimFileName = (fileName, maxLength = 11)=>{
    // Split the file name into name and extension
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === 0) return fileName; // No extension or hidden file, return as is

    const name = fileName.slice(0, dotIndex);
    const extension = fileName.slice(dotIndex);

    // Calculate available space for the trimmed name
    const totalNameLength = maxLength - extension.length;
    if (totalNameLength <= 3) {
        // Not enough space for "..." and part of the name, return "..."
        return `...${extension}`;
    }

    // Allocate space to preserve more of the start and end of the name
    const startLength = Math.ceil((totalNameLength - 3) * 0.6); // More space for start
    const endLength = totalNameLength - 3 - startLength; // Remaining space for the end
    const startPart = name.slice(0, startLength);
    const endPart = name.slice(-endLength);

    // Construct the trimmed file name
    return `${startPart}...${endPart}${extension}`;
}

function multiImagePickerSimple(options) {

    const defaultOptions = {
        inputId: 'imageInput',
        addBtnText: '+ Add Files',
        debug: false,
        containerClass: 'upload-file-container',
        uploadFileBtnClass: 'upload-file-btn',
        imageContainerClass: 'uploaded-image',
        removeBtnClass: 'remove-btn',
        existingFiles: []
    }
    if (typeof options == "string") {
        let temp = options
        options = { inputId: temp }
    }

    options = { ...defaultOptions, ...options }
    const imageInput = document.getElementById(options.inputId);

    let deletedFilesInput = null;
    if(options.existingFiles?.length > 0){
        imageInput.parentElement.insertAdjacentHTML('afterbegin', `<input type="hidden" name="deleted_files" value="">`)
        deletedFilesInput = document.querySelector("[name=deleted_files")

    }

    imageInput.parentElement.insertAdjacentHTML('beforeend', `
        <label class="${options.uploadFileBtnClass}" for="${options.inputId}">${options.addBtnText}</label>
        <div id="multiImagePickerContainer" class="${options.containerClass}">
        </div>
    `)

    const container = document.getElementById("multiImagePickerContainer")
    const dataTransfer = new DataTransfer();
    if (options.debug) {
        globalThis.dataTransfer = dataTransfer;
    }
    removeImageFromMultiPic = function (uniqueId, dtIndex, realId = null) { // if realId is defined, then its an existing file
        document.getElementById(uniqueId).remove()
        if(realId) {
            console.log({realId})
            let values = deletedFilesInput.value
            values = values.length > 0 ? values.split(','): []
            values.push(realId)
            deletedFilesInput.value = values.join(',')
        }else{
            dataTransfer.items.remove(dtIndex)
            imageInput.files = dataTransfer.files

            // update indexes on btns
            Array.from(document.querySelectorAll("[data-dtIndex]")).forEach(each => {
                each.dataset.dtIndex = parseInt(each.dataset.dtIndex) - 1
            })
        }
    }
    imageInput.style.visibility = 'hidden'
    imageInput.style.position = "absolute"
    if(options.existingFiles?.length > 0){
        options.existingFiles.forEach(file => {
            const uniqueId = (Math.random() + 1).toString(36).substring(7);
            const img = `
            <div class="${options.imageContainerClass}" id="${uniqueId}">
                <button class="${options.removeBtnClass}" data-dtIndex="${dataTransfer.items.length - 1}" onclick="removeImageFromMultiPic('${uniqueId}', this.dataset.dtIndex, '${file.id}')">X</button>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', img);
            if(file.media_type == "image"){
                document.getElementById(uniqueId).insertAdjacentHTML('afterbegin', `<img src="${file.url}"/>`)
            }else{
                document.getElementById(uniqueId).insertAdjacentHTML('afterbegin', svgDocument( trimFileName(file.original_name)))
            }


        })
    }
    imageInput.onchange = function (event) {
        if (event.target.files?.length > 0) {
            Array.from(event.target.files).forEach(eachFile => {
                const uniqueId = (Math.random() + 1).toString(36).substring(7);
                eachFile.id = uniqueId
                dataTransfer.items.add(eachFile)
                const reader = new FileReader();
                const img = `
                <div class="${options.imageContainerClass}" id="${uniqueId}">
                    <button class="${options.removeBtnClass}" data-dtIndex="${dataTransfer.items.length - 1}" onclick="removeImageFromMultiPic('${uniqueId}', this.dataset.dtIndex)">X</button>
                </div>
                `;
                container.insertAdjacentHTML('beforeend', img);
                console.log({eachFile}, eachFile.type.startsWith('image/'))
                if(eachFile.type.startsWith('image/')){
                    reader.onload = function (e) {
                        document.getElementById(uniqueId).insertAdjacentHTML('afterbegin', `<img src="${e.target.result}"/>`)
                    }
                    reader.readAsDataURL(eachFile);
                }else{
                    document.getElementById(uniqueId).insertAdjacentHTML('afterbegin', svgDocument( trimFileName(eachFile.name)))
                }
            })
            imageInput.files = dataTransfer.files;
        }
    }
}
