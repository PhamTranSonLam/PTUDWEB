const { ObjectId } = require("mongodb");
class TheodoimuonsachService {
    constructor(client) {
        this.Theodoimuonsach = client.db().collection("theodoimuonsach");
    }

// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
extractTheodoimuonsachData(payload){
    const theodoimuonsach = {
        madocgia: payload.madocgia,
        masach: payload.sach,
        ngaymuon: payload.ngaymuon,
        ngaytra: payload.ngaytra,
    }; 
    // Remove undefined fields
    Object.keys(theodoimuonsach).forEach(
        (key) => theodoimuonsach[key]===undefined && delete theodoimuonsach[key]
    );
    return theodoimuonsach;
}
async create(payload){
    const theodoimuonsach = this.extractTheodoimuonsachData(payload);
    const result = await this.Theodoimuonsach.findOneAndUpdate(
        theodoimuonsach,
        {
            $set: { favorite: theodoimuonsach.favorite === true}
        },
        {
            returnDocument: "after", upsert: true
        }
    );
    return result.value;
    }
    async find (filter){
        const cursor = await this.Theodoimuonsach.find(filter);
        return await cursor.toArray();
    }
    async findByname(name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
    async findById(id){
        return await this.Theodoimuonsach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTheodoimuonsachData(payload);
        const result = await this.Theodoimuonsach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
            return result.value;
        }
        async delete(id) {
            const result = await this.Theodoimuonsach.findOneAndDelete({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result;
            }
        async findFavorite() {
            return await this.find({ favorite: true });
            }
        async deleteAll() {
            const result = await this.Theodoimuonsach.deleteMany({});
            return result.deletedCount;
         }
}

module.exports = TheodoimuonsachService;
