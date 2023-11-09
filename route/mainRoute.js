const express = require('express')
const router = express.Router()
const mainController = require('../controller/mainController')

router.route('/')
    .get(mainController.fetchData)
    .post(mainController.addData)
    .patch(mainController.updateData)
    .delete(mainController.deleteData)

module.exports = router
