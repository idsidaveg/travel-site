import React from 'react'
// return function below may look like html but it's not, it's called JSX
// web browsers are confused by JSX code on it's own
// babel will look at this - we need to download another tool - this will interpret for webpack
function MyAmazingComponent(){
    return (
        <div>
            <h1 className="section-title section-title--blue">This is my Amazing React Component</h1>
            <p>React is great!!!</p>
        </div>
    )
};

export default MyAmazingComponent;