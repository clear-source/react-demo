import axios from 'axios';

/**
 * 插件axios GET POST请求
 */
class Http {

    /**
     * axiosPost Post请求模式
     * @param {*} url 地址
     * @param {*} params 参数
     */
    axiosPost(url,params){
        return new Promise( (resolve,reject) => {
            axios.post("API/CodeIgniter/index.php/v2/"+url,params)
                .then( (response) => {
                    resolve(response);
                })
                .catch( (error) => {
                    //返回错误请求的原因
                    reject(error.response);
                });
        });
    }

    /**
     * axiosGet Get请求模式
     * @param {*} url 请求地址
     * @param {*} params 参数
     */
    axiosGet(url,params){
        return new Promise( (resolve,reject) => {
            axios.get("API/CodeIgniter/index.php/v2/"+url,params)
              .then( (response) => {
                resolve(response);
              })
              .catch( (error) => {
                  //返回错误请求的原因
                  reject(error.response);
              });
        });
    }
}

const http=new Http();


export default http;