const yargs = require('yargs');
const shoppingList = require('./grocerylistmodule');

const command = yargs.argv._[0]
const { item, qty, price } = yargs.argv;

(async function execute() {
    if (command === "add") {

        if (item && qty && price) {
            const add = await shoppingList.add(item, qty, price);
            console.log("ADD COMPLETE: ", add);
            const data = await shoppingList.get(item, qty, price)
            console.log(data);
        } else {
            console.log("To add please provide item, qty, and price data.");
        }

    } else if (command === "remove") {

        if (item && qty) {
            const remove = await shoppingList.remove(item, qty, price);
            console.log("REMOVE COMPLETE: ", remove);
            const data = await shoppingList.get(item, qty, price)
            console.log(data);
        } else {
            console.log("To remove please provide item, and qty data.");
        }

    } else if (command === "get") {
        const data = await shoppingList.get(item, qty, price)
        console.log(data);
    } else {
        console.log("Invalid Input: Command should either be get, add, or remove");
    }
})();