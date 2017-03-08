import React from 'react'



export default class Layout extends React.Component{
  constructor(props){
    super(props)

  }

  render(){

    return(
      <main>
        <header>

          <nav>

          </nav>

        </header>


        <div className='content'>
          {this.props.children}
        </div>

      </main>
    )
  }
}
