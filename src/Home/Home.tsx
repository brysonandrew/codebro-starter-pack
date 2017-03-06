import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { AsyncGet } from '../redux/utils/async_get';
import { IDictionary, IAlbum, IFilters, IColumns } from '../models';
import { statFilters } from '../data/StatFilters';
import { statColumns } from '../data/StatColumns';
import { IStoreState } from '../redux/reducers/main_reducer';
import { fetchAll, changeFilter, changeSearch, changeSort } from './homeActionCreators';
import { Filter } from '../Widgets/Filter';
import { ColumnHeading } from '../Widgets/ColumnHeading';
import { Dropdown } from '../Widgets/Dropdown';
import { SearchBar } from '../Widgets/SearchBar';
import { bands } from '../data/Genres';


interface IProperties {
    stats: AsyncGet<IAlbum[]>,
    filters: IFilters[],
    sortByColumnIndex: number,
    columns: IColumns[],
    searchBarTyped: string
}

interface ICallbacks {
    onPageLoad: () => void;
    onFilterByCheckbox: (number, boolean) => void;
    onSortByColumn: (number, boolean) => void;
    onFilterBySearch: (string) => void;
}

interface IProps extends IProperties, ICallbacks {

}

interface IState extends IProperties, ICallbacks {

}

export class MainPage extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onPageLoad();
    }

    handleChange(searchText) {
        this.props.onFilterBySearch(searchText);
    }

    filterStats(stats){

      let filteredStats = stats;

//filter by searchbar
        if(this.props.searchBarTyped !== "") {
            filteredStats = filteredStats.filter((info) => info.name.toLowerCase().indexOf(this.props.searchBarTyped) >= 0)
        }
//filter by checkbox
        statFilters.forEach((filter, index) => {
            if (this.props.filters[index].active === true) {
                filteredStats = filteredStats.filter(filter.filterFunction)
            }
        });
//sorting users
        if (this.props.columns[this.props.sortByColumnIndex].isSortReversed) {
            filteredStats = Immutable.List(filteredStats)
                .sortBy(statColumns[this.props.sortByColumnIndex].sortFunction).reverse();
        } else {
            filteredStats = Immutable.List(filteredStats)
                .sortBy(statColumns[this.props.sortByColumnIndex].sortFunction);
        }

        return filteredStats;
    }

    renderUsersFilter() {
        return AsyncGet.render(this.props.stats, {
            fetched: (albums: IAlbum[]) => (
                <div>
                    {statFilters.map((info, index) =>
                     <Filter key={index}
                        index={index}
                        heading={info.heading}
                        total={albums.filter(info.filterFunction).length}
                        onFilterByCheckbox={this.props.onFilterByCheckbox}
                      />
                  )}
                </div>
            )
        });
    }

    renderColumns() {
        return  <thead>
                    <tr>
                    {statColumns.map((info, index) =>
                        <ColumnHeading
                            key={index}
                            heading={info.heading}
                            index={index}
                            pic={info.pic}
                            isSortReversed={info.isSortReversed}
                            onSortByColumn={this.props.onSortByColumn}
                            showArrow={(this.props.sortByColumnIndex===index)}
                        />
                    )}
                    </tr>
                </thead>
    }

    renderRows() {
        return AsyncGet.render(this.props.stats, {
            fetched: (albums: IAlbum[]) => {
                return  <tbody> {
                        this.filterStats(albums)
                            .map((album, index) => (
                            <tr key={index}>
                                <td style={{width: "20%"}}>
                                {(album.images[0].url)
                                    ?   <img style={{width: "40%", height: "auto"}} src={album.images[0].url} />
                                    :   null}
                                </td>
                                <td style={{width: "20%"}}>
                                    {album.artists[0].name}
                                </td>
                                <td style={{width: "20%"}}>
                                    {album.name}
                                </td>
                                <td style={{width: "20%"}}>
                                    {album.album_type}
                                </td>
                                <td style={{width: "20%"}}>
                                    <Dropdown/>
                                </td>
                            </tr>
                            )
                        )}
                        </tbody>
            }
        })
    }

    renderUsers() {
        return  <table className="pz-admin-users__table table table-bordered table-striped table-hover table-responsive text-center">
                    {this.renderColumns()}
                    {this.renderRows()}
                </table>
    }

    render(): JSX.Element {

        let styles = {
            home: {
                textAlign: "center"
            },
            home__heading: {
                marginTop: 20,
                display: "inline-block",
                textAlign: "center"
            }
        };

        return (
        <div style={ styles.home }>
            <div style={ styles.home__heading }>
                <h1>Hello World</h1>
                {this.renderUsersFilter()}
                <SearchBar onChange={this.handleChange.bind(this)} />
            </div>
            {this.renderUsers()}
        </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        stats: state.subStore.stats,
        filters: state.subStore.filters,
        sortByColumnIndex: state.subStore.sortByColumnIndex,
        searchBarTyped: state.subStore.searchBarTyped,
        columns: state.subStore.columns
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onPageLoad: () => {
            bands.map(stat =>
                dispatch(fetchAll(stat))
            )
        },
        onFilterByCheckbox: (filterIndex, isActive) => {
            dispatch(changeFilter(filterIndex, isActive));
        },
        onFilterBySearch: (searchText) => {
            dispatch(changeSearch(searchText));
        },
        onSortByColumn: (sortIndex, isSortReversed) => {
            dispatch(changeSort(sortIndex, isSortReversed));
        }
    }
}

export let MainPageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MainPage);
