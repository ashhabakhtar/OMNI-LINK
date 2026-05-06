document.addEventListener('DOMContentLoaded', () => {
    // Initial configuration
    const options = {
        width: 300,
        height: 300,
        type: 'svg',
        data: 'https://github.com/ashhab-akhtar',
        image: '',
        dotsOptions: {
            color: '#00f2ff',
            type: 'square'
        },
        backgroundOptions: {
            color: '#0a0a12',
        },
        cornersSquareOptions: {
            type: 'extra-rounded',
            color: '#00f2ff'
        },
        cornersDotOptions: {
            type: 'dot',
            color: '#00f2ff'
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10
        }
    };

    const qrCode = new QRCodeStyling(options);
    const canvas = document.getElementById('qr-canvas');
    qrCode.append(canvas);

    // DOM Elements
    const dataInput = document.getElementById('qr-data');
    const dotColorInput = document.getElementById('dot-color');
    const bgColorInput = document.getElementById('bg-color');
    const dotTypeInput = document.getElementById('dot-type');
    const cornerTypeInput = document.getElementById('corner-type');
    const logoInput = document.getElementById('logo-input');
    const downloadPngBtn = document.getElementById('download-png');
    const downloadSvgBtn = document.getElementById('download-svg');

    // Update Functions
    const updateQR = () => {
        qrCode.update({
            data: dataInput.value || ' ',
            dotsOptions: {
                color: dotColorInput.value,
                type: dotTypeInput.value
            },
            backgroundOptions: {
                color: bgColorInput.value
            },
            cornersSquareOptions: {
                type: cornerTypeInput.value,
                color: dotColorInput.value
            },
            cornersDotOptions: {
                color: dotColorInput.value
            }
        });
    };

    // Event Listeners
    dataInput.addEventListener('input', updateQR);
    dotColorInput.addEventListener('input', updateQR);
    bgColorInput.addEventListener('input', updateQR);
    dotTypeInput.addEventListener('change', updateQR);
    cornerTypeInput.addEventListener('change', updateQR);

    // Logo Handling
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                qrCode.update({
                    image: event.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Download Functions
    downloadPngBtn.addEventListener('click', () => {
        qrCode.download({ name: 'omni-link-qr', extension: 'png' });
    });

    downloadSvgBtn.addEventListener('click', () => {
        qrCode.download({ name: 'omni-link-qr', extension: 'svg' });
    });

    // Initial Trigger
    updateQR();
});
