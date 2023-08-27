export default class Product{
    constructor(title, description, price, thumbnail, code, stock,status){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.status= status
        this.id = Product.agregarId()

    }

    static agregarId(){
        if(this.incrementoId){
            this.incrementoId++
        } 
        else{
            this.incrementoId = 1
        }
        return this.incrementoId
    }
    
}