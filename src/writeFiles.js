const fs = require('fs');
const path = `/home/aaron/aracred`
const write = (path, content) => {
    fs.writeFile(path, content, err => {
        if (err) {
            console.log(`Error writing file ${path}`, err)
        } else {
            console.log(`Sucessfully written to ${path}`)
        }
    })
}
write(`${path}/test.json`, "hello")

module.export = write