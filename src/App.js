import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/lib/Image';
import './App.css';
import { RingLoader } from 'react-spinners';
import child from './child.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Top100RecentCampers: [],
      Top100AlltimeCampers: [],
      ButtonName: 'Top100Recent',
      loading: true
    };
    this.ToggleBack = this.ToggleBack.bind(this);
  }

  componentWillMount(){//run this equation before render
    axios.all([this.getRecentCamper(), this.getAlltimeCamper()])
       .then(axios.spread((Top100RecentCampers, Top100AlltimeCampers) => {
          console.log(Top100RecentCampers.data);
          this.setState({
            Top100RecentCampers: Top100RecentCampers.data,
            Top100AlltimeCampers: Top100AlltimeCampers.data });
       }));
  }

  getRecentCamper(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  getAlltimeCamper(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  ToggleBack(){
    if(this.state.ButtonName === "Top100Recent"){
       this.setState({
         ButtonName: "Top100Alltime"
       });
       console.log(this.state.Top100RecentCampers);
    }else{
      this.setState({
        ButtonName: "Top100Recent"
      });
    }
  }

  render() {
    if(this.state.Top100RecentCampers.length === 0 && this.state.Top100AlltimeCampers.length === 0){
      return <div className="helo"><RingLoader
                color={'#123abd'}
                loading={this.state.loading}
                //width='800'
                //height='100'
                />
             </div>
    }
    return (
      <div className = "container">
        <div className="App">LeaderBoard</div>
        <br />
        <button className="btn btn-primary" onClick={this.ToggleBack}>{this.state.ButtonName}</button>
        <br />
        <table className = "table table-hover">
          <thead>
            <tr>
              <td><strong>Rank #</strong></td>
              <td><strong>Campers</strong></td>
              <td><strong>Top 100 Campers for the past 30 Days</strong></td>
              <td><strong>Top 100 Campers for All Time</strong></td>
            </tr>
          </thead>
          <tbody>
            {this.state.ButtonName === 'Top100Recent' && this.state.Top100RecentCampers.map((data, index)=>(
               <tr key={index}>
                 <td>{index+1}</td>
                 <td>
                   <a href={`https://www.freecodecamp.org/${data.username}`} ><Image src={data.img} className='imageHeight'/> {data.username}</a>
                 </td>
                 <td>{data.recent}</td>
                 <td>{data.alltime}</td>
               </tr>
            ))}
            {this.state.ButtonName === 'Top100Alltime' && this.state.Top100AlltimeCampers.map((data, index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <a href={`https://www.freecodecamp.org/${data.username}`}><Image src={data.img} className='imageHeight'/>{data.username}</a>
                </td>
                <td>{data.recent}</td>
                <td>{data.alltime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
