const prompt = require('prompt-sync')();
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Customer = require('./models/customer.js')


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    await console.log('Connected to MongoDB.')
}


const queries = async () => {
    console.log('running queries')
}

const add = async () => {
    const name = prompt('Enter customer name: ');
    const age = parseInt(prompt('Enter customer age: '), 10);
    const customer = new Customer({ name, age });
    await customer.save();
    console.log('Customer Created')
}

const getAll = async() => {
    const customers = await Customer.find({})
    console.log(customers)

}

const update = async () => {
    const idee = prompt('Enter the ID of the customer you want to update: ')
    const newName = prompt('Enter the new name: ')
    const newAge = parseInt(prompt('Enter the new age: '), 10)
    const updatedCustomer = await Customer.findByIdAndUpdate(idee, {name: newName, age: newAge},{new: true})
    
    console.log('Customer Updated to:', updatedCustomer)
}

const deleteCustomer = async() => {
    const ident = prompt('Enter the customer ID: ')
    const customer = await Customer.findByIdAndDelete(ident)
    console.log('Customer Deleted')
    return customer

}

const app = async () => {
    
    console.log('Welcome to the CRM')
    connect()

    while (true) {
        console.log('1. Add 2. View All 3. Update 4. Delete 5. Quit')
        const choice = prompt('Enter your choice: ')

        switch (choice) {
            case '1':
                await add()
                break
            case '2':
                await getAll()
                break
            case '3':
                await update()
                break
            case '4':
                await deleteCustomer()
                break
            case '5':
                mongoose.connection.close()
                console.log('Exiting...')
                return
            default:
                console.log('Invalid choice, please try again.')
        }

    }
}

app()

