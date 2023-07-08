const db = require("../db")
const {BadRequestError} = require('../utils/errors')

class Nutrition {

    static async createNutrition(data) {
        const requiredFields = ["name", "category", "calories", "image_url"] 

        requiredFields.forEach(field => {
            if(!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }})

        const query = await db.query(`
            INSERT INTO nutrition(
                name,
                category,
                calories,
                image_url,
                user_id
            )
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `, [data.name, data.category, data.calories, data.image_url, data.user_id])

        const insertedData = query.rows[0]

        return insertedData
    };

    static async getAllNutritionDataByID(id) {
        //check if the id exists
        if(!id) {
            throw new BadRequestError("No Id provided")
        }

        const query = db.query(`SELECT * FROM nutrition WHERE user_id = $1`, [id])

        const result = query.rows[0]
        return result
    }
}

module.exports = Nutrition 
