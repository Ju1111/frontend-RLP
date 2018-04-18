//Dependencies
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


//MaterialUI
  //Components
    import TextField from 'material-ui/TextField'
    import RaisedButton from 'material-ui/RaisedButton'
    import Paper from 'material-ui/Paper';
    import Divider from 'material-ui/Divider';
    import Business from 'material-ui/svg-icons/communication/business'
  //Colors


//Actions
  import {getDeliveries} from '../actions/deliveries'
  import {addOrder, addOrderNewAPI} from '../actions/orders'
  import {getCurrentUser} from '../actions/users'

//Components
  import OrderInfo from '../components/orders/OrderInfo'
  import OrderAdressForm from '../components/orders/OrderAdressForm'
  import OrderRemarkForm from '../components/orders/OrderRemarkForm'
  import OrderAfleverInfo from '../components/orders/OrderAfleverInfo'
  import NavBar from '../components/NavBar'

class OrderCreator extends PureComponent {
  state = {
  }

  handleChange = (type, state) => {
    this.setState({
      [type]: state
    })
  }

  handleSubmit = () => {
    this.orderInfo.onClick()
    this.orderAdressForm.onClick()
    setTimeout(_ => this.orderAdressForm.onClick(), 10)
    this.orderRemarkForm.onClick()
    this.orderAfleverInfo.onClick()
    setTimeout(_ => console.log(this.state), 20)
    setTimeout(_ => console.log(new Date()), 20)
    setTimeout(_ => this.props.addOrder(
      {
        orderNumber: this.props.bonnummer,
        shortDescription: this.state.OrderRemarkForm.KorteOmschrijving,
        description: this.state.OrderRemarkForm.Opdrachtomschrijving,
        amount: this.state.OrderRemarkForm.Aantal,
        deliveryDate: this.state.OrderAfleverInfo.LeverDatum || null,
        paymentType: 'cash',
        deliveryId: this.state.OrderAfleverInfo.DeliveryType.id,
        companyId: this.props.user.companyId,
      },{
        addresses: [{}]
      }
    ), 20)
    // this.props.history.push('./flexcion/orders')

    // setTimeout(_ => this.props.addOrderNewAPI(
    // {
    //   "amount": this.state.OrderRemarkForm.Aantal,
    //   "billing_addr_id": null,
    //   "billing_address_line_1": "",
    //   "billing_city": "",
    //   "billing_equals_company": "Y",
    //   "billing_postcode": "",
    //   "company_addr_id": null,
    //   "company_address_line_1": this.state.OrderAdres.BezoekAdres.Adres1,
    //   "company_city": "Hilversum",
    //   "company_postcode": this.state.OrderAdres.BezoekAdres.Postcode,
    //   "cust_code": "CUST0003",
    //   "cust_id": 8,
    //   "deliver_addr_id": null,
    //   "deliver_address_line_1": "",
    //   "deliver_city": "",
    //   "deliver_date": "",
    //   "deliver_equals_company": "Y",
    //   "deliver_postcode": "",
    //   "deliver_type": 'POSTNL',
    //   "description": this.state.OrderRemarkForm.Opdrachtomschrijving,
    //   "order_date": null,
    //   "ordr_code": "",
    //   "ordr_id": null,
    //   "ordr_rv": null,
    //   "payment_type": "contant",
    //   "price": null,
    //   "reln_id": null,
    //   "rv": null,
    //   "short_description": this.state.OrderRemarkForm.KorteOmschrijving,
    //   "usr_id": null
    // }), 20)
  }

  componentWillMount() {
    const { currentUser, deliveryTypes } = this.props
    this.props.getCurrentUser()
    if(!deliveryTypes){
      this.props.getDeliveries()
    }
  }

	render() {
    const {handleChange} = this
    const {authenticated} = this.props

    // if(authenticated) return (
    //   <Redirect to="/" />
    // )

		return (
      <div>
      <NavBar/>
      <div
        style={{
          float: 'left',
          position: 'relative',
          top: 55,
          textAlign: 'center',
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        <Paper
          style={{
            float: 'left',
            height: '100%',
            width: '100%',
          }}
        >
          <OrderInfo onChange={handleChange} onRef={ref => (this.orderInfo = ref)}/>
          <OrderAdressForm onChange={handleChange} onRef={ref => (this.orderAdressForm = ref)}/>
          <OrderRemarkForm onChange={handleChange} onRef={ref => (this.orderRemarkForm = ref)}/>
          <OrderAfleverInfo onChange={handleChange} onRef={ref => (this.orderAfleverInfo = ref)}/>
          <br/>
          <div style={{
            width: '100%',
          }}>
            <RaisedButton
              style={{
                position: 'relative',
                float: 'left',
                width: '90%',
                marginLeft: 50,
                marginBottom: 15,
              }}
              onClick={_ => this.handleSubmit()}
            >
            Verstuur Order
            </RaisedButton>
          </div>
        </Paper>
      </div>
      </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    currentUser: state.currentUser,
    authenticated: state.currentUser !== null,
    deliveries: state.deliveries,
    user: state.user,
    bonnummer: state.bonnummer.orderNumber
	}
}

export default connect(mapStateToProps, {addOrder, addOrderNewAPI, getCurrentUser, getDeliveries})(OrderCreator)
