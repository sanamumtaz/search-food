import React from "react";
import {connect} from "react-redux";
import {resultToggle, valToggle} from "../actions";
import {Grid,} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const style = {
    root: {
        paddingTop: "10px"
    },
    GridItem: {
        backgroundColor: "white",
        borderRadius: "50px"
    },
    Searchicon: {
        paddingLeft: "70px",
        paddingRight: "30px",
        verticalAlign: "middle"
    },
    InputField: {
        marginLeft: "20px",
        outline: "0",
        borderWidth: "0 0 2px",
        borderColor: "black",
        fontFamily: "Arial",
        fontSize: "18px"
    },
    SearchButton: {
        position: "middle"
    }
};

class Searchbar extends React.Component {

    handleOnChange = event => {
        this.props.valToggle(event.target.value);
    };

    handleSearch = () => {
        this.makeApiCall(this.props.searchValue);
    };

    makeApiCall = searchInput => {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.props.resultToggle(jsonData.meals);
            });
    };

    render() {
        return (
            <div style={{paddingTop:"10px"}}>
                <Grid container spacing={2} justify="center" style={style.root}>
                    <Grid item xl={12} lg={4} sm={12} xs={10} style={style.GridItem}>
                        <SearchIcon style={style.Searchicon}/>
                        <input placeholder="Search for dishes..." type="text" style={style.InputField} onChange={event => this.handleOnChange(event)}
                               value={this.props.searchValue}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => {this.handleSearch()}}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <br/>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {searchResults: state.searchResults, searchValue: state.searchValue};
};

export default connect(
    mapStateToProps,
    {resultToggle: resultToggle, valToggle: valToggle}
)(Searchbar);
