const supabase = require('../models/supabase');

exports.getAllProducts = async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
};

exports.getProductById = async (req, res) => {
    const id = req.params.id;
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(error.code === 'PGRST116' ? 404 : 500).json({ error: error.message });
    }
    res.json(data);
};

exports.createProduct = async (req, res) => {
    const { title, subtitle, price, category, isSpecial, imageUrl } = req.body;

    // Use imageUrl if provided, otherwise check if a file was uploaded (local test only)
    let image = imageUrl || (req.file ? req.file.filename : null);

    const { data, error } = await supabase
        .from('products')
        .insert([
            { title, subtitle, price, category, image, isspecial: isSpecial === '1' || isSpecial === 1 }
        ])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: data[0].id, message: "Product created successfully" });
};


exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const { title, subtitle, price, category, isSpecial, imageUrl } = req.body;

    const updateData = {
        title,
        subtitle,
        price,
        category,
        isspecial: isSpecial === '1' || isSpecial === 1
    };

    if (imageUrl) {
        updateData.image = imageUrl;
    } else if (req.file) {
        updateData.image = req.file.filename;
    }


    const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Product updated successfully" });
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Product deleted successfully" });
};
