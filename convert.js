const fs = require("fs")
const path = require("path")

const convert = (file) => {
    if (!file) return console.log("You must specify a file to convert!")
    fs.readFile(path.join(__dirname, file), {encoding: "utf8"}, (error, data) => {
        if (error) return console.error(error)
        const lines = data.split("\r\n")
        const headers = lines[0].split(",")
        const output = actualConvert(headers, lines)
        fs.writeFileSync(path.join(__dirname, "output.json"), output)
        console.log("Converted! JSON data written to 'output.json'.")
    })
}

const actualConvert = (headers, lines) => {
    let output = []
    let c = 0
    lines.forEach((line) => {
        if (c > 0 && c < lines.length - 1) {
            const values = line.split(",")
            let item = {}
            for (i = 0; i < 10; i++) {
                item[headers[i]] = values[i]
            }
            output.push(item)
        }
        c++
    })
    return JSON.stringify(output, null, 4)
}

convert(process.argv[2])