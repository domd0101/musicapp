import React, {Component} from 'react'
import './app.css'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:'',
      info:'',
      name:'',
      weather:'',
      temp:''
    }
  }

  search() {
    const FETCH_URL = `http://api.openweathermap.org/data/2.5/weather?zip=${  this.state.query},us&APPID=061f24cf3cde2f60644a8240302983f2`
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then((res)=> res.json())
    .then((json)=>{
      this.setState({info:json});
      console.log('location',this.state.info);
      this.setState({name:this.state.info.name})
      this.setState({temp:(Number(this.state.info.main.temp)*(9/5)-459.67).toFixed(2)})
      this.setState({weather:this.state.info.weather[0].main})
    })
  }


  render(){
    return(
      <section className='app'>
        <div className='app-title'>Weather React App</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='search an zip...'
              value={this.state.query}
              onChange={event => {this.setState({query:event.target.value})}}
              onKeyPress={event => {
              if(event.key === 'Enter'){
                this.search()
              }
            }}
            />
          <InputGroup.Addon onClick={()=> this.search()}>
            <Glyphicon glyph='search'></Glyphicon>
          </InputGroup.Addon>
         </InputGroup>
        </FormGroup>
        <div className='profile'>
          <div>City: {this.state.name}</div>
          <div>Weather: {this.state.weather}</div>
          <div>Temp: {this.state.temp}</div>
        </div>



      </section>
    )
  }

}

export default App
