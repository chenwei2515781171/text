const Base=require('./base.js');
module.exports = class extends Base {
    async indexAction(){
        let userinfo=await this.session('userinfo');
        console.log(userinfo);
        this.assign('userinfo',userinfo);
        return this.display();
    }
    // 修改密码
    async requireAction(){
        if(this.isPost){
            let username=this.post('username');
            let password=this.post('password');
            console.log(password);
            let data=await this.model('thinkjsplus_user').where({username:username}).find();
            if(password==data.password){
                return this.fail(406,'修改密码与原密码相同！')
            }
            let res=await this.model('thinkjsplus_user').where({username:username}).update({password:password});
            if(res){
                await this.session(null); 
                return this.redirect('/index/index');
            }else{
                return this.fail(405,"更改失败！")
            }
        }
    }
}