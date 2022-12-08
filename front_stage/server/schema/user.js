// 导入定义验证规则的包
const joi=require('@hapi/joi')

// 定义用户名和密码的验证规则
const nickname=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/)
const phone=joi.string().max(11).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_schema={
    body:{
        nickname,
        password,
        phone
    },
}
exports.login_schema={
    body:{
        password,
        phone
    },
}

// 验证规则对象 - 重置密码
exports.update_password_schema = {  
    body: {    
        // 使用 password 这个规则，验证 req.body.oldPwd 的值，旧密码必须符合密码的验证规则   
        oldPwd: password,    
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值    
        // 解读：    
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致    
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值    
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则    
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),  
    },
}
