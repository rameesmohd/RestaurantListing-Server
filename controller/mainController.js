
const fetchData =async(req,res)=>{
    try {
        console.log('sdfsdf');
    } catch (error) {
        console.log(error);
    }
}

const addData=async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.file);
    } catch (error) {
        console.log(error);
    }
}

const updateData=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const deleteData=async(req,res)=>{
    try {
        
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