
import Test from '../../../models/Test'


export default {
    async testAll(ctx){
        const test = await Test.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      })
      ctx.body = test
    },

    async create(ctx){
        const {test} = ctx.request.body
        // console.log(test);
        const right_answer = []
        test.question.map((q, qi)=>{
          q.answers.map((a,ai)=>{
            if(a.right || q.kind === "withInput"){
              return right_answer.push({question : qi, rightAnswer:a.answer})
             }
          })
        })
    
        await Test.create({
          test_json:test,
          right_answer: right_answer,
          passed: false
        })
        
        ctx.body = 'Test has created.'
      },
      async testById(ctx){
        const {id} = ctx.params
        const test = await Test.findOne({where:{id:id}})
        
    
        ctx.body=test // {testById:'hz'}
      },
    
      async testRight(ctx){ // code  from sequelize repo
        const mMap = new Map();
        
        let student_answ = ctx.request.body.answers;
        let {right_answer} = await Test.findOne({attributes:['right_answer']})
        let res = []
        
        student_answ.map((el,i)=>{
          mMap.set(right_answer[i],el)
        })
    
        for (var [key, value] of mMap) {
          res.push(key === value)
        }
        
        await Test.update({passed:true}, {where:{right_answer:right_answer}})
        ctx.body = [...res]
      },
}