import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams } from "../../../../data/models";
import { HelloHeading } from "./HelloHeading";

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    docScroll?: number
    savedParams?: IParams
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    docScroll?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {}

export class Hello extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {};
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            hello: {
                display: "table",
                height: "100%",
                width: "100%"
            },
            hello__inner: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100%",
                width: "100%"
            }
        } as any;

        return (
            <div style={ styles.hello }>
                <div style={ styles.hello__inner }>
                    <HelloHeading
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export const HelloFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Hello);
