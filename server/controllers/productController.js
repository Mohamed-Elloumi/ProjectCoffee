const db = require('../models/database');

exports.getAllProducts = (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.getProductById = (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(row);
    });
};

exports.createProduct = (req, res) => {
    const { title, subtitle, price, category, isSpecial } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `INSERT INTO products (title, subtitle, price, category, image, isSpecial) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [title, subtitle, price, category, image, isSpecial || 0], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: "Product created successfully" });
    });
};

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const { title, subtitle, price, category, isSpecial } = req.body;

    let query = `UPDATE products SET title = ?, subtitle = ?, price = ?, category = ?, isSpecial = ?`;
    let params = [title, subtitle, price, category, isSpecial];

    if (req.file) {
        query += `, image = ?`;
        params.push(req.file.filename);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Product updated successfully" });
    });
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Product deleted successfully" });
    });
};
