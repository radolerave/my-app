let fsConfig = {
    apiUrl: "https://server2.atria.local/findseller/api.php/records",
    patterns: {
        password: /.{1,}/g,
        email: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    cloudinary: {
        cloudName: "dtu8h2u98",
        uploadPreset: "ml_default",
        defaultTag: "fs",        
    },
    lightGallery: {
        licenseKey: "ABE7EA7B-5B1E-47FE-B473-F5F98AE41D9A"
    }
}

export { fsConfig }