const express = require('express')
const router = express.Router()
const { ensureAuthenticate }=require('../../config/auth')

const postmodel = require('../../Models/postM')


router.get('/', ensureAuthenticate,async(req, res) => {
    const all_post = await postmodel.find().sort({date:'desc'})
    // console.log(all_post)
    res.render('admin/index', { all_post: all_post })
})

//ADD POST:-
router.get('/add_post',ensureAuthenticate, (req, res) => {
    // const Postmodel=new postmodel()
    res.render('admin/add_post')
})

router.post('/add_post', async (req, res) => {
    const newpost = await new postmodel({
        
        title : req.body.title,
        desc : req.body.desc,
        // date : req.body.date
    })
    console.log(newpost)

    try {
        const a1 = await newpost.save()
        res.redirect('/admin/post')

    } catch (error) {
        console.error(error)

    }

})

/*__________DELETE_______________*/

// router.delete('/delete/:id',(req,res)=>{
//     const todelete=postmodel.findByIdAndDelete(req.params.id)
//     res.render('/admin/post')
// })

//FIND POST BY ID:-
router.get('/:id',ensureAuthenticate,async(req,res)=>{
        
        const grabbyid= await postmodel.findById(req.params.id)
        console.log(grabbyid)
        res.render('admin/selectedpost',{grabbyid:grabbyid})
    
})

//DELETE POST
router.delete('/delete/:id',async(req,res)=>{
    const todel=await postmodel.findByIdAndDelete(req.params.id)
    res.redirect('/admin/post')
})

//EDITING POST
router.get('/edit/:id',ensureAuthenticate,async(req,res)=>{
          
    const grabbyidforedit=await postmodel.findById(req.params.id)
    res.render('admin/editpost',{grabbyidforedit:grabbyidforedit})

})

router.post('/edit/:id',async(req,res)=>{

    const a1=await postmodel.findById(req.params.id)
    console.log(a1)

    const a2= {}
    a2.title=req.body.title
    a2.desc=req.body.desc
    // a2.date=req.body.date
    console.log(a2)

    try {
        const updatedpost=await postmodel.updateOne({_id:(req.params.id)},a2)
        console.log(updatedpost)
        res.redirect('/admin/post/')
        
    } catch (error) {
        console.error(error)
    }



})

module.exports=router

