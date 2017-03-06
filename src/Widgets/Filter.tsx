import * as React from 'react';

interface IFilterProps {
    heading: string;
    total: number;
    index: number;
    onFilterByCheckbox: (filterIndex: number, isChecked: boolean) => void;
}

interface IFilterState {
    isChecked: boolean;
}

export class Filter extends React.Component<IFilterProps, IFilterState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isChecked: false
        }
    }

    handleChange(e, i) {
        this.setState({
            isChecked: e.target.checked
        });
        this.props.onFilterByCheckbox(i, e.target.checked);
    }

    render(): JSX.Element {
        const { heading, total, index } = this.props;
        const { isChecked } = this.state;

        let style = {
            filter: {
                position: "relative",
                display: "inline-block",
                verticalAlign: "top",
                margin: "20px 100px",
                fontSize: 20,
                color: isChecked
                    ? "#212121"
                    : "#2979FF",
                cursor: "pointer",
                zIndex: isChecked
                    ? 2
                    : 0
            },
            filter__background: {
                position: "absolute",
                top: isChecked
                    ?  "65%"
                    : 0,
                left: isChecked
                    ?  "50%"
                    : 0,
                width: 120,
                height: 120,
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "50%",
                transform: isChecked
                    ? "scale(1) translate(-50%, -50%)"
                    : "scale(0) translate(-50%, -50%)",
                transition: "all 0.2s"
            }
        };

        return (
            <label style={ style.filter }>
                <input
                    checked={this.state.isChecked}
                    onChange={(e) => this.handleChange(e, index)}
                    type="checkbox"
                />
                <div>{heading}</div>
                <div>{total}</div>
                <div style={ style.filter__background }></div>
            </label>
        );
    }
}
