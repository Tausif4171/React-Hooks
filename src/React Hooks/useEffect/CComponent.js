import React, { Component } from 'react';

class CComponent extends Component {
    state ={
        message:"Class based Component",
        time: new Date().toString()
    }

    componentDidMount(){
        // console.log("I am from componentDidMount")
        this.interval = setInterval(this.showDate,1000)
    }
    
    componentDidUpdate(){
        // console.log("I am from componentDidUpdate")
    }

    componentWillUnmount(){
        // console.log("I am from componentWillUnmount")
        clearInterval(this.interval)
    }

    showDate=()=>{
        this.setState({time: new Date().toString()})
    }

    render() {
        return (
            <div>
                <h4>{this.state.message}</h4>
                <h4>{this.state.time}</h4>
            </div>
        );
    }
}

export default CComponent;