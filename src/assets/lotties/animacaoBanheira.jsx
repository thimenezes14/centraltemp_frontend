import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './banheira.json';

class AnimacaoBanheira extends Component {


  render(props){

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div>
        <Lottie options={defaultOptions}
              height={200}
              width={200}
              style={
                  {
                      padding: '0',
                      margin: '-40px auto',
                      marginTop: '-70px'
                  }
              }
        />
      </div>
    )
  }
}

export default AnimacaoBanheira;