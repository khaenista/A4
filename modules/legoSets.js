//this will import the setData.json file which contains LEGO sets data
const setData = require("../data/setData");
//this will Import the themeData.json file which has theme data
const themeData = require("../data/themeData");

//iniatialize the empty array to store LEGO sets
let sets = [];

//this function will intialize LEGO data
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            //this is the setData array to map through and add the theme name to each set
            sets = setData.map(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                return { ...set, theme: theme.name };
            });
            console.log("LEGO data initialized");
            resolve();
        } catch (error) {
            console.error("Error initializing LEGO data:", error);
            reject(error);
        }
    });
}
//thi function to get all LEGOsets
function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("Sets array is empty");
        }
    });
}

//this functions wil get a LEGO set by its number of sets
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
       //this is to filter the sets
        const set = sets.find(set => set.set_num === setNum);
        if (set) {
            resolve(set);
        } else {
            reject("Set not found");
        }
    });
}

//this function will get LEGO sets by theme
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const filteredSets = sets.filter(set =>
            set.theme.toLowerCase().includes(theme.toLowerCase())
        );
        if (filteredSets.length > 0) {
            resolve(filteredSets);
        } else {
            reject("No sets found for the provided theme");
        }
    });
}

//this will help export the functions
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
