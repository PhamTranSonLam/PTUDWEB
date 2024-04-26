const { ObjectId } = require("mongodb");
class NhaxuatbanService {
    constructor(client) {
        this.Nhaxuatban = client.db().collection("nhaxuatban");
    }

// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
extractNhaxuatbanData(payload){
    const nhaxuatban = {
        manxb: payload.manxb,
        tennxb: payload.tennxb,
        diachi: payload.diachi,
        
    }; 
    // Remove undefined fields
    Object.keys(nhaxuatban).forEach(
        (key) => nhaxuatban[key]===undefined && delete nhaxuatban[key]
    ); console.log("thanh cong")
    return nhaxuatban;
}
async create(payload){
    const nhaxuatban = this.extractNhaxuatbanData(payload);
    const result = await this.Nhaxuatban.findOneAndUpdate(
        nhaxuatban,
        {
            $set: {}
        },
        {
            returnDocument: "after", upsert: true
        }
    );console.log("thanh cong")
    return result.value;
    } 
    async find (filter){
        const cursor = await this.Nhaxuatban.find(filter);
        return await cursor.toArray();
    }
    async findByname(name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
    async findById(id){
        return await this.Nhaxuatban.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaxuatbanData(payload);
        const result = await this.Nhaxuatban.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
            return result.value;
        }
        async delete(id) {
            const result = await this.Nhaxuatban.findOneAndDelete({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result;
            }
        async findFavorite() {
            return await this.find({ favorite: true });
            }
        async deleteAll() {
            const result = await this.Nhaxuatban.deleteMany({});
            return result.deletedCount;
         }
}

module.exports = NhaxuatbanService;
