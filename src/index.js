import React from 'react';
import ReactDOM from 'react-dom';

import CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';

import * as doc from 'doc/*.md';

class Component extends React.PureComponent {
    render() {
        var parser = new CommonMark.Parser();
        var renderer = new ReactRenderer();

        debugger;
        
        var ast = parser.parse(doc);
        var result = renderer.render(ast);

        return (
            <div>{result}</div>
        );
    }
}

ReactDOM.render(<Component />, document.getElementById('root'));
