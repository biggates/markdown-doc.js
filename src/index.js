import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.PureComponent {
    render() {
        return (
            <div>Hello Parcel</div>
        );
    }
}

ReactDOM.render(<Component />, document.getElementById('root'));
