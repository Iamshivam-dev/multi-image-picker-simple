var removeImageFromMultiPic;

function multiImagePickerSimple(options) {

    const defaultOptions = {
        inputId: 'imageInput',
        addBtnText: '+ Add Files',
        debug: false,
        containerClass: 'upload-file-container',
        uploadFileBtnClass: 'upload-file-btn',
        imageContainerClass: 'uploaded-image',
        removeBtnClass: 'remove-btn'
    }
    if (typeof options == "string") {
        let temp = options
        options = { inputId: temp }
    }

    options = { ...defaultOptions, ...options }
    const imageInput = document.getElementById(options.inputId);

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
    removeImageFromMultiPic = function (uniqueId, dtIndex) {
        document.getElementById(uniqueId).remove()

        dataTransfer.items.remove(dtIndex)
        imageInput.files = dataTransfer.files

        // update indexes on btns
        Array.from(document.querySelectorAll("[data-dtIndex]")).forEach(each => {
            each.dataset.dtIndex = parseInt(each.dataset.dtIndex) - 1
        })
    }
    imageInput.style.visibility = 'hidden'
    imageInput.style.position = "absolute"
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
                reader.onload = function (e) {
                    document.getElementById(uniqueId).insertAdjacentHTML('afterbegin', `<img src="${e.target.result}"/>`)
                }
                reader.readAsDataURL(eachFile);
            })
            imageInput.files = dataTransfer.files;
        }
    }
}