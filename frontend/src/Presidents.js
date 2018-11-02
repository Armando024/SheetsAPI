import React, { Component } from 'react';
import { Container, Row,Table,Button, ButtonGroup,Col  } from 'reactstrap';
import './App.css';

class Presidents extends Component {
  constructor(props){
    super(props);
    this.state={
        data:[{}] 
    }; 
    this.sortByNameAscending=this.sortByNameAscending.bind(this);
    this.sortByNameDescending=this.sortByNameDescending.bind(this);
    this.getOriginal=this.getOriginal.bind(this);
  }
  componentDidMount(){//gets orinal sheet
    this.getOriginal();
  }
  getOriginal(e){
    fetch("/pres")
    .then(res => res.json())
    .then(res =>this.setState((state)=>{ return {data:JSON.parse(res)} }));
  }
    
  sortByNameAscending(e){//get it ascending
    fetch("/pres/sort")
    .then(res => res.json())
    .then(res =>this.setState((state)=>{ return {data:JSON.parse(res)} }));
  }
  
  sortByNameDescending(e){//get it in descending
    fetch("/pres/sortDes")
    .then(res => res.json())
    .then(res =>this.setState((state)=>{ return {data:JSON.parse(res)} }));
  }
  
  render() {
    return (
        <Container>
            <Row>
               <Col md="12"  className="text-center text-sm-center text-md-center mt-2 pt-2 mb-1 pb-1">
                    <ButtonGroup>
                        <Button color="primary" onClick={this.getOriginal}>Original</Button>
                        <Button color="primary" onClick={this.sortByNameAscending}>Ascending</Button>
                        <Button color="primary" onClick={this.sortByNameDescending}>Descending</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row xs="12" md="12" >
                <Table  dark striped bordered hover>
                    <thead>
                        <tr>
                            <th>President</th>
                            <th>Birthday</th>
                            <th>Birthplace</th>
                            <th>Deathday</th>
                            <th>Deathplace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(item => <tr> <th>{item[0]}</th> <th>{item[1]}</th><th>{item[2]}</th><th>{item[3]}</th><th>{item[4]}</th></tr> ) }
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
  }
}

export default Presidents;

