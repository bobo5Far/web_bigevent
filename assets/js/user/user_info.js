$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称的长度必须是1~6个字符之间!'
            }
        }
    })
    initUserInfo()

 function initUserInfo(){
     $.ajax({
        method: "get",
         url: "/my/userinfo",
         success: function (res) {
             if(res.status !==0){
                 return layer.msg('获取用户信息失败')
             }
             form.val('forUserInfo',res.data)
         }
     });
 }


 $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()  
 })

//  监听表单的提交事件
 $('.layui-form').on('submit',function(e){
     e.preventDefault()
     $.ajax({
         method:'post',
         url:'/my/userinfo',
         data:$(this).serialize(),
         success:function(res){
             if(res.status !==0){
                 return layer.msg('更新用户失败')
             }
             layer.msg('更新用户信息成功')
             // 调用父页面中的方法，重新渲染头像和用户
             window.parent.getUserInfo()
         }
     })
 })

})