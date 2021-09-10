/// ----------------------------------------------
/// Kotkan suurimmat työnantajat Tammikuussa 2010
/// TyonantajatList -komponentti
/// Paul Kallio 15.02.2021
/// for Meritta Bra Oy Ab
/// ----------------------------------------------
import React, {useState} from 'react'
import {Table, Jumbotron, ButtonGroup, Image, Button, Form, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowUp from '../pics/Arrow-Up.png'
import ArrowDown from '../pics/Arrow-Down.png'
const sortOrder = {
  UNORDERED:   0,
  NAME_UP:     1,
  NAME_DOWN:   2,
  AMOUNT_UP:   3,
  AMOUNT_DOWN: 4
}

const sizeFilter = {
  ALL:         false,
  OVER_500:    true
}

const TyonantajatList = (props) => {

  const [lajittelu, setLajittelu] = useState(sortOrder.UNORDERED);
  const [nimiFiltteri, setNimiFiltteri] = useState('');
  const [checked500, setChecked500] = useState(sizeFilter.ALL);

    function doSort(a, b) {
      switch(lajittelu) {
        case sortOrder.NAME_UP:
          return a.nimi < b.nimi

        case sortOrder.NAME_DOWN:
          return a.nimi > b.nimi

        case sortOrder.AMOUNT_UP:
          return a.maara < b.maara

        case sortOrder.AMOUNT_DOWN:
          return a.maara > b.maara

        default:
          return 0
      }
    }

    function doFilter(filter) {
                    
        return function(yritys) {

          if(!checked500) {
            return true
          } 

          if(yritys.maara  === "undefined") {
              return true;
          }

          return yritys.maara >= 500
      }
    }

    function doNameFilter(filter) {
                    
        return function(yritys) {

          if(yritys.nimi  === "undefined") {
              return true;
          }

          if(nimiFiltteri  === "undefined") {
              return true;
          }

          if(nimiFiltteri.length <= 0) {
              return true;
          }

          return (yritys.nimi.toUpperCase().indexOf(nimiFiltteri.toUpperCase()) > -1)
      }
    }

    const tyonantajat = props.tyonantajat
    const yritykset = tyonantajat.filter(doFilter()).filter(doNameFilter()).sort((a,b) => doSort(a,b)).map(yritys => {
      return (
        <tr><td>{yritys.nimi}</td><td>{yritys.maara}</td></tr>
      )
    })

    const nameUp =      () => setLajittelu(sortOrder.NAME_UP)
    const nameDown =    () => setLajittelu(sortOrder.NAME_DOWN)
    const amountUp =    () => setLajittelu(sortOrder.AMOUNT_UP)
    const amountDown =  () => setLajittelu(sortOrder.AMOUNT_DOWN)

    const size500 =  () => setChecked500(checked500 ? sizeFilter.ALL : sizeFilter.OVER_500)

    return (
      <>
      <Jumbotron>
        <h1>Kotkan suurimmat työnantajat Tammikuussa 2010</h1>
      </Jumbotron>
      <Form>
        <Form.Row className='align-items-center d-flex p-2'>
          <Col xs="0.1">
          </Col>
          <Col xs="0.5">
            <Form.Label> 
              Koko: </Form.Label>
          </Col>
          <Col xs="1">
            <Button
              className="mb-1"
              type='button'
              id="yrityskoko" 
              variant='outline-info'
              value={checked500 ? '500 Suurinta' : 'Kaikki Yritykset'} 
              onClick={size500}
              onChanged={size500}> 
              {checked500 ? '500' : 'Kaikki'}      
            </Button>
          </Col>
          <Col xs="0.5">
            <Form.Label>Haku: </Form.Label>
          </Col>
          <Col xs="2">
            <Form.Control 
              type="input" 
              className="mb-1"
              id="yritysnimi" 
              placeholder='Yritys'
              value={nimiFiltteri} 
              onChange={(e) => setNimiFiltteri(e.target.value)}/>
          </Col>
        </Form.Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr><th>
            <span>Nimi </span>
            <ButtonGroup>
              <Button 
                variant="outline-light" 
                onClick={nameUp}
                size='sm'>
                <Image src={ArrowUp} />
              </Button>
              <Button 
                variant="outline-light" 
                onClick={nameDown}
                size='sm'>
                <Image src={ArrowDown} />
              </Button>
            </ButtonGroup>
            </th>
            <th>
            <span>Työntekijöitä </span>
            <ButtonGroup>
              <Button 
                variant="outline-light" 
                onClick={amountUp}
                size='sm'>
                <Image src={ArrowUp} />
              </Button>
              <Button 
                variant="outline-light" 
                onClick={amountDown}
                size='sm'>
                <Image src={ArrowDown} />
              </Button>
            </ButtonGroup>              
            </th>
          </tr>
        </thead>
          <tbody>
          {
            yritykset
          }
          </tbody>
      </Table>
      </>
    )
  }


export default (TyonantajatList)