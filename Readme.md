# multi-image-picker-simple
> Very ***simple, lightweight, customizable*** multiple image picker using vanilla js

![text](preview.png)


I tried a lot of multiple image pickers but they are very heavy in size and contains a lot of features which are not even needed. I made this simple image picker so that for simple forms it can be used

In future i might add extensions to this in order to support image modal preview or ajax submission. But for now this is fine.


## How to install

Download this repo code or simply donwload/copy  `multi-image-picker-simple.js`. All css classes are exposed so you can customize as per your need or just copy the styles from `style.css`

## How to use

Make sure your image have `multiple` attribue, also for form submissions you might need to add `[]` after your input name
>HTML
```html
<input type="file" name="images[]" multiple id="imageInput">
```
>JS
```js
// pass id of your input
multiImagePickerSimple("imageInput")

```
 OR you can also pass options
```js
// pass id of your input
multiImagePickerSimple({inputId: "imageInput", ...otherOptions})
```

## Available options

| Property | Type | Default/Example |
| ------ | ------ | ------ |
| `inputId` | String | `imageInput` |
|`addBtnText`| String | `+ Add Files`
|`debug`| Boolean | `false`
|`containerClass`| String |`upload-file-container`
|`uploadFileBtnClass`| String |`upload-file-btn`
|`imageContainerClass`| String |`uploaded-image`
|`removeBtnClass`| String |`remove-btn`
|`existingFiles`| Array | `[{id, url, media_type, original_name}]`



## Editing Files

If you wish to use this library on edit form, you can have to pass `existingFiles` to options. This will create a hidden input with name of `deleted_files` consisting of **comma separated** `ids` of the deleted files. Note that you much follow below schema for existingFiles key in order to work properly. As usual if you want to can change variable names directly in library as per your need. 

```js

multiImagePickerSimple({
    [{
        id: 1, // this id will be added to deleted_files input
        url: 'http://example.com/myimage.jpg', // should be working url. Required in case of image
        media_type: 'image', // either image or anything else
        original_name: 'myimage.jpg', // required in case of non image file as on icon file name is shown, you can pass empty string if it fits your need
    }], ...otherOptions})
```

Logically you are supposed to do this for getting any deleted images by user which were existing. Using this hidden input `deleted_files`'s value on server side at form submit you can delete. This will be comma separated list of `id` attribute that you passed as option.

If you wish to add some custom logic for edit form, you can use [base version](https://github.com/Iamshivam-dev/multi-image-picker-simple/tree/base-library) of library


---

<br>
<br>

If you are interested feel free to contribute to this project

Happy coding  :D


# Versions 

> What's New v 1.0.2

Added Support for edit file as well. Refer to [Editing Files](#editing-files) for more information

> What's New v 1.0.1

Added Support for non image files, now its `multi-file-picker-simple` :)