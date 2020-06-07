<template>
    <div class="container">
        <label>
            <input type="text" v-model="userName" placeholder="请输入昵称"><br>
        </label>
        <div class="row">
            <input type="number" v-model='code' class="code" @input="getCode">
            <img :src='imgSrc' alt="">

        </div>
        <button @click="register">一键注册</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "regist",
        data() {
            return {
                // 用户名
                userName: '',
                // 验证码图片地址
                imgSrc: '',
                // 验证码
                code: '',
                // 验证码id
                codeId: 0,
            }
        },
        mounted() {
            this.initGetVerificationCode()
        },
        methods: {
            // 获取验证码
            initGetVerificationCode() {
                axios.get('http://192.168.1.3:14001/v1/gdraw/openapi/vcode/get')
                    .then( response =>{
                        const {code:stateCode, data} = response.data;
                        console.log(response.data);
                        if (stateCode === 200) {
                            this.imgSrc = data.b64s
                            this.codeId = data.id
                        }
                    })
            },
            // 验证码
            getCode() {
                const regular = /\d/
                if (!this.code.test(regular)) {
                    alert('请输入正确的验证码')
                }
                console.log(this.code)
            },
            // 注册
            register(){
                if (!this.userName) {
                    alert('请输入用户名')
                    return;
                } else if (!this.code) {
                    alert('请输入验证码')
                    return
                }
                axios.post('http://192.168.1.3:14001/v1/gdraw/openapi/user/regist',{
                    "nickname": this.userName,
                    "vcode_id": this.codeId,
                    "vcode_answer": this.code
                }).then(response =>{
                    const data = response.data
                    console.log('response',data)
                    sessionStorage.setItem('userinfo', JSON.stringify(data))
                    this.$router.push({
                        path: '/home'
                    });
                })
            }
        }
    }
</script>

<style scoped >
    /*.row{*/
    /*    img{*/
    /*        width: 100px;*/

    /*    }*/
    /*}*/
</style>