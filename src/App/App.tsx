import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: Oxygen;
            src: url(/fonts/Oxygen/Oxygen-Regular.ttf);
        }

        * {
            margin: 0; 
            padding: 0;
            font-family: Oxygen, 'arial', sans-serif;
            -webkit-appearance: none 
        }
        
        body {
            background: #eeeeee;
        }

        button, input, a {
            background: none;
            border: none;
            outline: none;
            text-decoration: none;
        }
        
        button, a {
            cursor: pointer;
        }
        
        p {
            margin: 2vh 0;
        }
        
        code {
            background: #212121;
            font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
            color: #66F8B6;
            border-radius: 6px;
            padding: 4px;
        }
        
        ul li {
            /*list-style-position: inside;*/
            list-style-type: none;
        }
    `
});

export class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
