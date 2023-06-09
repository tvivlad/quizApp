import {Quiz} from '../models.js'
import ApiError from '../error/ApiError.js'
import * as uuid from 'uuid'
import path from 'path'
export function create(req, res) {
  try{  
      console.log('Запрос с фронта получен метод create', req.body)
      console.log('Файл полученный с клиента : ', req.files)
      const {imgFile} = req.files

      let filename=uuid.v4()+imgFile.name   
      const quizImagesPath=path.resolve(path.resolve(),'uploads/quizImages',filename)
      imgFile.mv(quizImagesPath)
      
      Quiz.create({
        name:req.body.quizName,
        quizImage: 'uploads/quizImages/' + filename,
        isTest: req.body.quizType,  
        createDate:new Date(),
        userId: req.body.userId,
        description: req.body.quizDescription,    
        showInList: req.body.visibleQuiz
      }).then(result=> {
        console.log('Созданная запись в базе', result)
        res.json(result)
      })
     // res.sendStatus(200)
  }catch (e){
    console.log('Ошибка на quizController', e)
  }
}

export function getAll(req, res){
  console.log('Запрос с параметром getAll: ', req.query.userId)  
  if (req.query.userId){      
      Quiz.findAll({
        where:{
          userId:req.query.userId
        },
        raw:true
        }).then(result=>{
      console.log("Результат запроса экзаменационных тестов :", result)
      res.send(result)
      })
  } else {
      Quiz.findAll({raw:true}).then(result=>{
      console.log("Результат запроса экзаменационных тестов :", result)
      res.send(result)
      })
  }
}

export function getOneQuiz(req, res){
  console.log(req.params.id)
  Quiz.findOne({
  where:{id:req.params.id}
  }).then(result=>{
    console.log('Найден тест : ',result)  
    res.status(200).json(result)
  })
}



export function deleteQuiz (req, res) {
  console.log('Пришёл запрос на удаление', req.params.id)   
   if (req.params.id) {
    Quiz.destroy({
      where:{
        id:req.params.id
      }
    }).then(result=>{
        if (result) {
          res.status(200).json({message:'ok'})
        }else {
          res.status(400).json({message:'объект не дайден'})
        }
    })
  }  
  
}

