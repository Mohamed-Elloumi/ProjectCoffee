const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'coffee.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS products`);
            db.run(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                subtitle TEXT,
                price TEXT NOT NULL,
                category TEXT NOT NULL,
                subcategory TEXT,
                image TEXT,
                isSpecial INTEGER DEFAULT 0
            )`, (err) => {
                if (err) {
                    console.error('Error creating table', err.message);
                } else {
                    const menu = {
                        "restaurant": {
                            "id": "midway-cafe-lounge",
                            "name": "Midway Café Lounge",
                            "currency": "TND"
                        },
                        "categories": [
                            {
                                "id": "breakfast",
                                "name": "Petit Déjeuner",
                                "items": [
                                    { "name": "Petit déjeuner Express", "price": "6 TND", "includes": "Café, Croissant, Jus, Eau 0.5L" },
                                    { "name": "Petit déjeuner Kid’s", "price": "10 TND", "includes": "Chocolat, Céréales, Mini pancake, Yaourt, Jus, Œuf, Eau 0.5L" },
                                    { "name": "Petit déjeuner Bio", "price": "12 TND", "includes": "Café/Thé, Jus frais, Salade italienne/fruits, Ricotta, Miel, Gaufre Nutella, Fruits secs, Eau 0.5L" },
                                    { "name": "Petit déjeuner Salé", "price": "12 TND", "includes": "Café, Jus, Omelette, Croissant salé, Mayonnaise, Olives, Salade italienne, Charcuterie, Eau 0.5L" },
                                    { "name": "Petit déjeuner Continental", "price": "13 TND", "includes": "Café, Yaourt, Jus, Croissant, Pain de mie, Beurre, Confiture, Omelette, Mini crêpe, Eau 0.5L" },
                                    { "name": "Petit déjeuner Midway", "price": "16 TND", "includes": "Café, Jus, Yaourt, Viennoiserie, Ricotta, Miel, Pancake Nutella, Fruits secs, Omelette, Charcuterie, Salade fruits, Eau 0.5L" }
                                ]
                            },
                            {
                                "id": "viennoiserie",
                                "name": "Viennoiserie",
                                "items": [
                                    { "name": "Croissant", "price": "3 TND" },
                                    { "name": "Croissant aux amandes", "price": "4 TND" },
                                    { "name": "Mousse au chocolat", "price": "5 TND" },
                                    { "name": "Gâteaux", "price": "6 TND" },
                                    { "name": "Fondant chocolat", "price": "6 TND" },
                                    { "name": "Cheese cake", "price": "7.5 TND" }
                                ]
                            },
                            {
                                "id": "hot-drinks",
                                "name": "Cafés & Boissons Chaudes",
                                "subcategories": [
                                    { "name": "Café Machine", "items": [{ "name": "Express / Américain", "price": "2.5 TND" }, { "name": "Cappuccino", "price": "3 TND" }] },
                                    { "name": "Café Lavazza", "items": [{ "name": "Express", "price": "3 TND" }, { "name": "Cappuccino", "price": "3.5 TND" }] },
                                    { "name": "Café Nespresso", "items": [{ "name": "Express", "price": "4 TND" }, { "name": "Cappuccino", "price": "4.3 TND" }] }
                                ]
                            },
                            {
                                "id": "juices",
                                "name": "Jus & Boissons Fraîches",
                                "items": [
                                    { "name": "Jus d’orange", "price": "4.5 TND" },
                                    { "name": "Citronade", "price": "5 TND" },
                                    { "name": "Jus de fraise", "price": "7 TND" },
                                    { "name": "Citronade glacée", "price": "7.5 TND" }
                                ]
                            },
                            {
                                "id": "smoothies",
                                "name": "Smoothies",
                                "items": [
                                    { "name": "Cocoshell", "price": "8.5 TND" },
                                    { "name": "Pina Colada", "price": "9 TND" },
                                    { "name": "Tropical Land", "price": "9 TND" }
                                ]
                            },
                            {
                                "id": "crepes-sweet",
                                "name": "Crêpes Sucrées",
                                "items": [
                                    { "name": "Nutella", "price": "8 TND" },
                                    { "name": "White Sensation", "price": "9 TND" },
                                    { "name": "Nutella & Fruits secs", "price": "9.5 TND" },
                                    { "name": "Spécial Midway", "price": "12 TND" }
                                ]
                            },
                            {
                                "id": "savory-food",
                                "name": "Cuisine Salée",
                                "subcategories": [
                                    { "name": "Crêpes Salées", "items": [{ "name": "Salami Fromage", "price": "6.5 TND" }, { "name": "Hot Italy", "price": "8.5 TND" }] },
                                    { "name": "Pâtes", "items": [{ "name": "Carbonara", "price": "10 TND" }, { "name": "Bolognaise", "price": "10.5 TND" }] }
                                ]
                            },
                            {
                                "id": "shisha",
                                "name": "Chicha",
                                "items": [
                                    { "name": "Chicha Fakher", "price": "8 TND" },
                                    { "name": "Chicha Adalya", "price": "10 TND" },
                                    { "name": "Midway Complet", "price": "15 TND" }
                                ]
                            }
                        ]
                    };

                    const stmt = db.prepare("INSERT INTO products (title, subtitle, price, category, subcategory, image, isSpecial) VALUES (?, ?, ?, ?, ?, ?, ?)");

                    const getItemImage = (catId, itemName) => {
                        const name = itemName.toLowerCase();

                        // Priority mappings for specific items (Granular Library)
                        if (name.includes('croissant aux amandes')) return "https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('croissant')) return "croissant.png";
                        if (name.includes('mousse au chocolat')) return "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('fondant')) return "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('cheese cake')) return "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('gâteaux')) return "gateau.jpg";

                        // Coffee Varieties
                        if (name.includes('cappuccino')) return "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('latte')) return "https://images.unsplash.com/photo-1593476108051-a20bf5954746?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('mocha')) return "https://images.unsplash.com/photo-1634913564795-7820a4c56340?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('express')) return "espresso.png";

                        // Juices
                        if (name.includes('orange')) return "juice.png";
                        if (name.includes('citronade')) return "https://images.unsplash.com/photo-1523472721958-978152f4d69b?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('fraise')) return "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('pêche')) return "https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('kiwi')) return "https://images.unsplash.com/photo-1585052245554-bc5665a92671?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('mangue')) return "https://images.unsplash.com/photo-1623065422902-30a2ad44924b?q=80&w=1000&auto=format&fit=crop";

                        // Smoothies
                        if (name.includes('pina colada')) return "pina colada.jpg";
                        if (name.includes('fruits rouges') || name.includes('ruby red')) return "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=1000&auto=format&fit=crop";

                        // Food
                        if (name.includes('carbonara')) return "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('pâtes') || name.includes('bolognaise')) return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop";
                        if (name.includes('spécial midway')) return "crepes special midway.jpg";
                        if (name.includes('nutella & fruits secs')) return "crepes fruits.jpg";
                        if (name.includes('nutella')) return "crepes banane.jpg";
                        if (name.includes('crêpes sucrées')) return "crepesucré.jpg";
                        if (name.includes('crêpes salées')) return "https://images.unsplash.com/photo-1515152864197-251f92e37996?q=80&w=1000&auto=format&fit=crop";

                        // Others
                        if (name.includes('midway complet')) return "chichamidway.jpg";
                        if (name.includes('shisha') || name.includes('chicha')) return "chicha.jpg";
                        if (name.includes('petit déjeuner')) return "breakfast.png";
                        if (name.includes('banana split')) return "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop";

                        // Fallback category mappings
                        const catMapping = {
                            "breakfast": "breakfast.png",
                            "viennoiserie": "croissant.png",
                            "hot-drinks": "espresso.png",
                            "juices": "juice.png",
                            "smoothies": "pina colada.jpg",
                            "crepes-sweet": "crepesucré.jpg",
                            "savory-food": "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop",
                            "desserts": "gateau.jpg",
                            "shisha": "chicha.jpg"
                        };
                        return catMapping[catId] || "espresso.png";
                    };

                    menu.categories.forEach(cat => {
                        if (cat.items) {
                            cat.items.forEach(item => {
                                const itemImg = getItemImage(cat.id, item.name);
                                stmt.run(item.name, item.includes || "", item.price, cat.name, "", itemImg, cat.id === "breakfast" ? 1 : 0);
                            });
                        }
                        if (cat.subcategories) {
                            cat.subcategories.forEach(sub => {
                                sub.items.forEach(item => {
                                    const itemImg = getItemImage(cat.id, item.name);
                                    stmt.run(item.name, "", item.price, cat.name, sub.name, itemImg, 0);
                                });
                            });
                        }
                    });
                    stmt.finalize();
                }
            });
        });
    }
});

module.exports = db;
