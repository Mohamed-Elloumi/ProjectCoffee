const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Config
const dbPath = path.resolve(__dirname, '../models/coffee.db');
const supabaseUrl = 'https://cazxekbsirbsegiixvyr.supabase.co';
const supabaseKey = 'sb_secret_KuagDIU182oxdx95tFkE8A_pFoxHukF';
const supabase = createClient(supabaseUrl, supabaseKey);

const db = new sqlite3.Database(dbPath);

async function sync() {
    console.log('🚀 Starting Supabase Sync...');

    db.all("SELECT * FROM products", async (err, rows) => {
        if (err) {
            console.error('❌ Error reading SQLite:', err.message);
            return;
        }

        console.log(`📦 Found ${rows.length} products in SQLite.`);

        for (const row of rows) {
            const { id, ...data } = row;
            // Map 0/1 to boolean if needed, but Supabase can handle 0/1 for int
            const { error } = await supabase
                .from('products')
                .upsert({
                    title: data.title,
                    subtitle: data.subtitle,
                    price: data.price,
                    category: data.category,
                    image: data.image,
                    isspecial: !!data.isSpecial // Using lowercase to match Postgres
                });

            if (error) {
                console.error(`❌ Error syncing ${row.title}:`, error.message);
            } else {
                console.log(`✅ Synced: ${row.title}`);
            }
        }

        console.log('✨ Sync complete!');
        process.exit(0);
    });
}

sync();
