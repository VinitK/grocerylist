const fs = require('fs');

exports.add = async (item, qty, price) => {
    const lowerItem = item.toLowerCase();
    if (typeof item !== "string" || isNaN(Number(qty)) || isNaN(Number(price))) {
        return { message: "Incorrect values", status: 500 }
    }
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        if (data) { // if file there

            let jsonData = JSON.parse(data); // string to json object

            let hasItem = false; // check for if item exists
            jsonData.some(obj => {
                if (obj.item === lowerItem) { // if item exists
                    hasItem = true;
                    obj.qty += qty; // increase qty
                    obj.price += price; // increase price
                }
            });

            if (!hasItem) { // if item does not exist
                jsonData.push({ item: lowerItem, qty: qty, price: price }); // add item
            }

            try {
                fs.writeFileSync('./grocerylist.txt', JSON.stringify(jsonData)); // write back to file
                return { message: "success", status: 201 }; // end success
            } catch (err) {
                console.error("Error while updating file"); // end failed
            }
        } else { // else if file is blank
            try {
                fs.writeFileSync('./grocerylist.txt', JSON.stringify([{ item: lowerItem, qty: qty, price: price }])); // write to file first object
                return { message: "success", status: 201 }; // end success
            } catch (err) {
                console.error("Error while writing to file"); // end failed
            }
        }
    } catch (err) { // else if file not there
        try {
            fs.writeFileSync('./grocerylist.txt', JSON.stringify([{ item: item, qty: qty, price: price }])); // write to file first object
            return { message: "success", status: 201 }; // end success
        } catch (err) {
            console.error("Error while creating file"); // end failed
        }
    }
}

exports.remove = (item, qty) => {
    const lowerItem = item.toLowerCase();
    if (typeof item !== "string" || isNaN(Number(qty))) {
        return { message: "Incorrect values", status: 500 }
    }
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        if (data) { // if file there
            console.log(data);
            let jsonData = JSON.parse(data); // string to json object
            console.log(jsonData);

            const index = jsonData.findIndex(obj => {
                return obj.item === lowerItem;
            });
            if (index !== -1) {
                const obj = jsonData[index];
                const subPrice = obj.price / (obj.qty / qty);
                obj.qty -= qty; // deduct qty
                obj.price -= subPrice; // deduct from price
                if (obj.qty < 1) {
                    jsonData.splice(index, 1);
                }
                try {
                    fs.writeFileSync('./grocerylist.txt', JSON.stringify(jsonData)); // write back to file
                    return { message: "success", status: 200 }; // end success
                } catch (err) {
                    console.error("Error while updating file"); // end failed
                }
            }

            return { message: "success", status: 200 }; // end success

        } else { // else if file is blank
            return { message: "success", status: 200 }; // end success
        }
    } catch (err) { // else if file not there
        return { message: "File does not exist", status: 500 }; // end failed
    }
}

exports.get = () => {
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        return data;
    } catch (err) {
        return { message: "File does not exist", status: 500 }; // end failed
    }
}