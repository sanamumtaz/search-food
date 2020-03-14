import React from "react";
import {connect} from "react-redux";
import {resultToggle, valToggle} from "../actions";
import pusheen from './pusheen-the-cat.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid,} from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const style = {
    resultHeading: {
        paddingTop: "10px",
        paddingBottom: "10px",
        fontSize:"22px",
        color:"white",
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: "140px",
    },
    dialogueTitleStyle:{
        backgroundColor: "crimson",
        color:"white"
    },
    mealDetails: {
        padding: "20px",
        fontSize: "20px",
        color:"white",
        backgroundColor: "indianred"
    }
};

function SimpleDialog(props) {
    const { onClose, selectedMeal, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title" style={style.dialogueTitleStyle}><b>{selectedMeal.strMeal}</b></DialogTitle>
            <Typography style={style.mealDetails}>&#127860; Category: {selectedMeal.strCategory}</Typography>
            <Typography style={style.mealDetails}>&#127860; Cuisine: {selectedMeal.strArea}</Typography>
            <Typography style={style.mealDetails}>
                &#127860; <a href={selectedMeal.strYoutube} style={{color:"white"}} >YouTube Tutorial</a>
            </Typography>
        </Dialog>
    );
}

class Results extends React.Component {

    state = {
        open: false,
        selectedMeal: [],
    };

    handleClickOpen = (meal) => {
        this.setState({open: true});
        this.setState({selectedMeal: meal});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        console.log(this.props.searchResults);
        return (
            <div>
                {this.props.searchResults ? (
                    <Grid container spacing={2} justify="center">
                        <Grid item lg={12} sm={12} xs={12}>
                            <Typography style={style.resultHeading} align="center"><i>RESULTS</i></Typography>
                        </Grid>
                        {this.props.searchResults.map((meal, index) => (
                            <Grid item lg={3} sm={6} xs={6} key={index}>
                                <Card style={style.root} >
                                    <CardActionArea onClick={() => {this.handleClickOpen(meal)}}>
                                        <CardMedia
                                            style={style.media}
                                            image={meal.strMealThumb}
                                            title={meal.strMeal}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {meal.strMeal}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div>
                        <img src={pusheen} height="200px" width="200px" alt=""/>
                        <p style={{color:"white", fontFamily:"Arial"}}>Try searching for a dish.</p>
                    </div>

                )}
                <SimpleDialog selectedMeal={this.state.selectedMeal} open={this.state.open} onClose={this.handleClose} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {searchResults: state.searchResults};
};

export default connect(
    mapStateToProps,
    {resultToggle: resultToggle, valToggle: valToggle}
)(Results);
