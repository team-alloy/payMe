import React from 'react'
import { Image } from 'semantic-ui-react';
export default () => {
  return (
    <div>
        <h1 style={{'textAlign': 'center'}}>Meet the team!</h1>
        <br/>
        <div style={{'margin': 'auto', 'maxWidth': '600px'}}>
          <div style={{'display': 'inline-block'}}>
            <Image style={{'display': 'inline-block', 'padding': '10px 10px', 'borderRadius' : '60px'}} src='/images/erwin.jpeg' size='small' rounded />
            <br/>
            <p style={{'textAlign' : 'center'}}>Erwin Carrasquilla</p>
          </div>
          <div style={{'display': 'inline-block'}}>
            <Image style={{'display': 'inline-block', 'padding': '10px 10px', 'borderRadius' : '60px'}} src='/images/mealear.jpeg' size='small' rounded />
            <br/>
            <p style={{'textAlign' : 'center'}}>Mealear Khiev</p>
          </div>
          <div style={{'display': 'inline-block'}}>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px', 'borderRadius' : '60px'}} src='/images/kenny.png' size='small' rounded />
            <br/>
            <p style={{'textAlign' : 'center'}}>Kenny Le</p>
          </div>
          <div style={{'display': 'inline-block'}}>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px', 'borderRadius' : '60px'}} src='/images/donny.png' size='small' rounded />
            <br/>
            <p style={{'textAlign' : 'center'}}>Donny de Rojas</p>
          </div>
        </div>
        <br/>
        <div style={{'margin': 'auto', 'maxWidth': '600px'}}>
        The purpose of this app is to help others get out of the negotiation blues. As our journey began we noticed that the only reason negotiation is not practiced at every job interview is because it is not practiced in general. We collect user provided data to provide current users of our app with information that comes from the others in your respective field. This data can help you see if you are about to accept a job that may not be offering what you deserve. We also provide a space for user to practice their negotiating with others.
        </div>
        <br/>
        <h2 style={{'textAlign': 'center'}}>Our tech stack</h2>
        <br/>
        <div  style={{'margin': 'auto', 'maxWidth': '600px'}}>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/react.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/reactRouter.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/redux.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/semanticuireact.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/materialui.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/snyk.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/travisci.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/coveralls.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/express.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/jest.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/knex.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/mysql.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/nodejs.png" size="small"/>
          <Image style={{'display': 'inline-block', 'padding': '10px 10px'}} src="/images/twilio.png" size="small"/>
        </div>
    </div>
  )
}
