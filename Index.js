// console.log("ssc")
const conn = require("./Connection")

const express = require('express');
const app = express();
const port = 8888; // તમે પોર્ટ નંબર બદલી શકો છો.


const bodyparser = require('body-parser')
app.use(bodyparser.json())


// Define a simple route 
app.get('/', (req, res) => {
    res.send('Hello , I AM SSC');
});


app.post('/postdata', (req, res) => {

    const existingUser = new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM reg WHERE email = ?",
            [email],
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            }
        );
    });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const data = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        Creted_At: new Date(),
        Last_login: null,
    })

    conn.query('INSERT INTO reg SET ?', data, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("data posted successfully")
        }
    })




});


app.get('/getdata', (req, res) => {
    conn.query("SELECT * FROM  reg", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.json({
                success: 1,
                Massage: "DATA GET SUCCESSFULLY",
                Data: result
            })
        }
    })
})



app.patch('/updateData/:id', (req, res) => {
    const data = [
        req.body.name,
        req.body.email,
        req.params.id
    ]
    conn.query("UPDATE reg SET name = ? , email = ?  WHERE id = ? ", data, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({
                Massage: " Error  Occur"
            })
        } else {
            return res.json({
                success: 1,
                Massage: "Data Upadated Successfully",
            })
        }
    })
})




app.delete('/deleteData/:id', (req, res) => {
    const id = req.params.id

    conn.query("DELETE FROM reg WHERE id = ? ", id, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({
                Massage: " Error Occure"
            })
        } else {
            return res.json({
                success: 1,
                Massage: "DATA Deleted Successfully",
            })
        }
    })
});









app.post("/login", (req, res) => {

    const data = req.body.email
    conn.query("SELECT * FROM reg WHERE email = ? ", data, (error, result) => {

        if (error) {
            console.error("Error finding user :  ", error)
            return res.send("Error finding user");
        }

        if (result.length === 0) {
            return res.send("user not found");
        }

        const user = result[0];
        if (req.body.password !== user.password) {
            return res.send("Invalid Credentiala")
        }



        conn.query(
            "UPDATE register SET Last_Login = ? WHERE id = ?",
            [new Date(), user.ID],
            (error, results) => {
                if (error) {
                    console.error("Error updating last login time: ", error);
                    return;
                }
                console.log("Last login time updated");
            }
        );


        res.status(200).json({ message: "Login successful" });



        // else {
        //     return res.send("user login successfully")
        // }
    }
    )
})







// Start the server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});



