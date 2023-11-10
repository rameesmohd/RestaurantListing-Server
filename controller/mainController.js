const db = require('../model/model')
const cloudinary = require('../config/clouidinary')
const fs = require('fs')

const fetchData =async(req,res)=>{
    try {
        db.query('SELECT * FROM restaurantTable',(error,result)=>{
            if(error){
                return res.status(500).json({message : 'Error while fetching data'})
            }else{
                return res.status(200).json({data : result})
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const addData=async(req,res)=>{
    try {
        const {name,address,contact} = req.body
        let imageURL;
        if(req.files.image.length){
            const image = req.files.image[0]
            if(image){
                try {
                    const upload = await cloudinary.uploader.upload(image.path);
                    imageURL = upload.secure_url;
                    fs.unlinkSync(image.path);
                  } catch (error) {
                    console.error('Error uploading to Cloudinary:', error);
                  }
            }
        }
        db.query(
            "INSERT INTO restaurantTable (name,address,contact,image) VALUES(?,?,?,?)",
            [name,address,contact,imageURL],(error,result)=>{
                if(error){
                    console.log('insertion error',error);
                }else{
                    const insertedId = result.insertId;
                    db.query(
                        "SELECT * FROM restaurantTable WHERE id = ?",
                        [insertedId],
                        (selectError, selectResult) => {
                        if (selectError) {
                            console.log('Error retrieving inserted data:', selectError);
                        } else {
                            const insertedData = selectResult[0];
                            console.log('Inserted data:', insertedData);
                            res.status(200).json({data : insertedData})
                        }
                        }
                    );
                }
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({})
    }
}

const updateData = async (req, res) => {
    try {
        const obj = req.body;
        let imageURL;
        
        if(req.files.image){
            const image = req.files.image[0];
            if (image) {
                const upload = await cloudinary.uploader.upload(image.path);
                imageURL = upload.secure_url;
                obj.image = imageURL;
                fs.unlinkSync(image.path);
            }
        }
        db.query('UPDATE restaurantTable SET ? WHERE id = ?', [obj, obj.id], (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Error while updating!!', error: error });
            }
            const insertedId = result.insertId;
            db.query(
                "SELECT * FROM restaurantTable WHERE id = ?",
                [insertedId],
                (selectError, selectResult) => {
                    if (selectError) {
                        return res.status(500).json({ message: 'Error retrieving inserted data', error: selectError });
                    }
                    const insertedData = selectResult[0];
                    return res.status(200).json({ data: insertedData, message: 'Updated successfully!!' });
                }
            )
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};


const deleteData=async(req,res)=>{
    try {
        const { id } = req.query
        db.query('DELETE FROM restaurantTable WHERE id = ?',[id],(error,result)=>{
            if(error){
                res.status(500).json({message : 'Error while deleting the data!'})
            }else{
                res.status(200).json({message : 'Successfully deleted!'})
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetchData,
    addData,
    updateData,
    deleteData
}