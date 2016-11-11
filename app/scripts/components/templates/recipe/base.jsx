var React = require('react');
var Base = require('../base.jsx').BaseLayout;

function RecipeLayout(props){
  return (

    <Base>
      <div className="col-md-3">
        {props.left}
      </div>

      <div className="col-md-9">
        {props.right}
      </div>
    </Base>

  )
}

module.exports = {
  RecipeLayout: RecipeLayout
}
