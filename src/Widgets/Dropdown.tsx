import * as React from 'react';

interface IDropdownState {
    isOpen: boolean
}

export class Dropdown extends React.Component<any, IDropdownState> {

    dropDownOptions = [
        "View profile",
        "View concerts",
        "View friends",
    ];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isOpen: false
        }
    }

    handleButtonClick() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleClick(option) {
        alert(`function for ${option} has not yet been created...in short "hello world!"`)
    }

    public render(): JSX.Element {

        let styles = {
            dropdown: {
                fontSize: 14
            },
            dropdown__heading: {
                fontSize: 14,
                padding: 4,
                border: "2px solid #212121",
            },
            dropdown__caret: {
                margin: 4,
                width: 8,
                height: 8,
                borderTop: "2px solid #212121",
                borderLeft: "2px solid #212121",
                transform: "rotate(225deg)",
            },
            dropdown__option: {
                opacity: this.state.isOpen
                    ? 1
                    : 0,
                height: this.state.isOpen
                    ? 16
                    : 0,
                transition: "all 200ms"
            }
        };

        return (
            <div style={ styles.dropdown }>
                <button type="button"
                        id="menu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onClick={() => this.handleButtonClick()}>
                    <div style={ styles.dropdown__heading }>
                        Actions
                    </div>
                   {this.state.isOpen
                        ?   null
                        :   <div style={ styles.dropdown__caret }/>}
                </button>
                <ul className="dropdown-menu" aria-labelledby="menu1">
                {this.dropDownOptions.map((option, i) =>
                    <li key={i}
                        style={ Object.assign({},
                                styles.dropdown__option,
                                {transitionDelay: `${i}00ms`}) }>
                        <a onClick={() => this.handleClick(option)} href="#">{option}</a>
                    </li>)}
                </ul>
            </div>
        );
    }
}
