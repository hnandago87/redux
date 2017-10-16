import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class BackToPost extends Component{
    render(){
        return(        
            <Link to={{ pathname: '/'}}><span className="glyphicon glyphicon-chevron-left"></span></Link>
        )
    }
}
export default BackToPost