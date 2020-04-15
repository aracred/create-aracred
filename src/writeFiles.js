fs.writeFile(
    `/home/${userName}/.aragon/mainnet_key.json`,
    fileContent(),
    err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully setup keys')
        }
    },
)