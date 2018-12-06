import React, { Component } from 'react';
import Http from '../http/http';
import Time from '../time/Time';

import Table from '../components/table/Table';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataList:[]
         };
    }
    //请求数据方法
    resultList(curr,search){
        let url='terminaluserinfo';
        let params={
            MemberID:localStorage.getItem("userName"),
            Page:curr,
            Search:search,
            inDate:Time.YMDD(),
            inTime:Time.HMS()
        }
        Http.axiosPost(url,params).then(result=>{
            this.setState({
                dataList:result.data
            })
        },error=>{
            console.log(error)
        });
    }
    componentDidMount(){
        this.resultList(1,"");
        
    }
    render() {
        console.log(this.state.dataList);
        return (
            <div>
              <Table data={this.state.dataList}/>  
            </div>
        );
    }
}

export default Home;