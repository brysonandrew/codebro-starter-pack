import * as React from 'react';

interface IColumnHeadingProps {
    heading: string;
    index: number;
    pic: string;
    isSortReversed: boolean;
    onSortByColumn: (index: number, isChecked: boolean) => void;
    showArrow: boolean;
}

interface IColumnHeadingState {
    isChecked: boolean;
}

export class ColumnHeading extends React.Component<IColumnHeadingProps, IColumnHeadingState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isChecked: false
        }
    }

    handleChange(event, sortIndex) {
        this.setState({
            isChecked: event.target.checked
        });
        this.props.onSortByColumn(sortIndex, event.target.checked);
    }

    public render(): JSX.Element {
        const {heading, index} = this.props;
        return (
            <th>
                {(heading!=="") &&
                <label>
                    <input
                        onChange={(e) => this.handleChange(e, index)}
                        type="checkbox"
                        checked={this.state.isChecked}
                    />
                    {heading}
                </label>}
            </th>
        );
    }
}
