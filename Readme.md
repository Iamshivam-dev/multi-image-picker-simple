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


If you are interested feel free to contribute to this project

Happy coding  :D

> What's New v 1.0.1

Added Support for non image files, now its `multi-file-picker-simple` :)