import * as React from 'react';

interface ISearchBarProps {
    onChange: (event: Event) => void;
}

export class SearchBar extends React.Component<ISearchBarProps, any> {

    handleChange(e){
        this.props.onChange(e.target.value.substr(0, 20));
    }

    public render(): JSX.Element {
        let styles = {
            searchBar: {
                display: "inline-block",
                width: "80vw"
            },
            searchBar__input: {
                background: "rgba(0, 0, 0, 0.66)",
                borderRadius: 8,
                width: "100%",
                padding: 8,
                fontSize: 20,
                border: "2px solid #2979FF",
                color: "#2979FF"
            }
        };
        return (
            <div style={ styles.searchBar }>
                <input
                    style={ styles.searchBar__input }
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    placeholder="Search Albums..."/>
            </div>
        );
    }
}
