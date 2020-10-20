export function CompressImage(image, dwidth) {
    // NOTE TO SELF: dwidth means desired width and you can guess the rest
    const promise = new Promise((resolve, reject) => {
        const fileName = image.name.split('.')[0]
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const elem = document.createElement('canvas');
                if (width > dwidth) {
                    const factor = width / dwidth;
                    const dheight = Math.round(height / factor);
                    elem.width = dwidth;
                    elem.height = dheight;
                    const ctx = elem.getContext("2d");
                    ctx.drawImage(img, 0, 0, dwidth, dheight);
                    ctx.canvas.toBlob((blob) => {
                        const file = new File([blob], `${fileName}_${dwidth}x${dheight}.jpg`, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        if (file) {
                            resolve(file);
                        } else {
                            reject('nope')
                        }
                    }, 'image/jpeg', 0.65);
                } else {
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    //toBlob polyfill
                    if (!HTMLCanvasElement.prototype.toBlob) {
                        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                            value: function (callback, type, quality) {
                                var dataURL = this.toDataURL(type, quality).split(',')[1];
                                setTimeout(function () {
                                    var binStr = atob(dataURL),
                                        len = binStr.length,
                                        arr = new Uint8Array(len);
                                    for (var i = 0; i < len; i++) {
                                        arr[i] = binStr.charCodeAt(i);
                                    }
                                    callback(new Blob([arr], { type: type || 'image/png' }));
                                });
                            }
                        });
                    }
                    ctx.canvas.toBlob((blob) => {
                        const file = new File([blob], `${fileName}_${width}x${height}.jpg`, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        if (file) {
                            resolve(file);
                        } else {
                            reject('nope')
                        }
                    }, 'image/jpeg', 0.65);
                }

            },
                reader.onerror = error => {
                    console.log(error)
                }
        }
    })
    return promise;
}

export default async function OptimizeImage(image) {
    const xlarge = await CompressImage(image, 2500);
    const large = await CompressImage(image, 2000);
    const nslarge = await CompressImage(image, 1500);
    const normal = await CompressImage(image, 1000);
    const medium = await CompressImage(image, 750);
    const small = await CompressImage(image, 500);
    const xsmall = await CompressImage(image, 300);

    return {
        xlarge,
        large,
        nslarge,
        normal,
        medium,
        small,
        xsmall
    }
}

