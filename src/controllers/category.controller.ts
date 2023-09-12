import categoryModel from "../models/category.model";
import { Request, Response } from 'express';
import Text from '../text';
export default {
    create: async function (req: Request, res: Response) {
        // let data = JSON.parse(req.body.category);
        let newCategory = {
            ...req.body
        }
        console.log("newCategory", newCategory)
        try {
            let modelRes = await categoryModel.create(newCategory);
            console.log("modelRes", modelRes)
            modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message];
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    findMany: async function (req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    }
}