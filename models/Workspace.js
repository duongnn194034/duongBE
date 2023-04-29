const sql = require('../repository/Db.js');

const Workspace = function(name) {
    this.name = name;
}

Workspace.create = (workspace, result) => {
    sql.query("INSERT INTO Workspace SET ?", workspace, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, name: workspace.name});
    })
}

Workspace.findById = (id, result) => {
    sql.query(`SELECT * FROM Workspace WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
    })
}

Workspace.updateById = (id, workspace, result) => {
    sql.query(`UPDATE Workspace SET name = '${workspace.name}' WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Workspace.deleteById = (id, result) => {
    sql.query(`DELETE FROM Workspace WHERE id = ${id}`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }
        result(null);
    })
}

module.exports = Workspace;