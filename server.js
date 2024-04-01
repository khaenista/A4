/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name:  _Fatima Musharaf Khan_ Student ID: _158450221_   Date: _16th March_

********************************************************************************/

const express = require("express");
const path = require('path');
const legoData = require("./modules/legoSets");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

legoData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error initializing LEGO data:", error);
    });

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => {
                res.render("sets", { sets: sets });
            })
            .catch(error => {
                console.error("Error getting sets by theme:", error);
                res.status(404).render('404');
            });
    } else {
        legoData.getAllSets()
            .then(sets => {
                res.render("sets", { sets: sets });
            })
            .catch(error => {
                console.error("Error getting all sets:", error);
                res.status(404).render('404');
            });
    }
});

app.get("/lego/sets/:setNum", (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then(set => {
            res.render("set", { set: set });
        })
        .catch(error => {
            console.error("Error getting set by num:", error);
            res.status(404).render('404');
        });
});

app.use((req, res) => {
    res.status(404).render('404');
});
