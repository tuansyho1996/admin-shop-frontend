import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { createProduct } from "../services/service.product";
import { getImageByName } from "../services/service.media";
const ModalAddProductsAllCategories = (props) => {
    const primaryColors = ['#4682B4', '#722F37', '#2C3E50', '#2F4F4F', '#2E4E3F', '#505050'];
    const lightColors = ['#F7E7CE', '#ffffff', '#B0E0E6', '#C4C3D0', '#D3D3D3', '#E5E4E2'];
    const darkColors = ['#2A3439', '#2F4F4F', '#353839', '#000000'];
    const { isOpen, onClose, setProducts, products } = props;
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [colectionsColors, setColectionsColors] = useState(primaryColors);
    const [mainCategory, setMainCategory] = useState('');
    const handleAddProducts = async () => {
        const keysReplace = [
            { name_category: 'hoodie', slug_category: 'hoodie', type: `All-Over Print Unisex Pullover Hoodie _ 310GSM Cotton` },
            { name_category: 'Zip Hoodie', slug_category: 'zip-hoodie', type: `All-Over Print Unisex Pullover Hoodie With Zipper Closure _ 310GSM Cotton` },
            { name_category: 'Sweatshirt', slug_category: 'sweatshirt', type: `All-Over Print Unisex Boat Neckline Sweatshirt With Chest Pocket _ 310GSM Cotton` },
            { name_category: 'Hooded Vest', slug_category: 'hooded-vest', type: `All-Over Print Unisex Hooded Vest _ 310GSM Cotton` },
            { name_category: `Men's T-shirt`, slug_category: `men's-t-shirt`, type: `All-Over Print Men's O-Neck T-Shirt _ 190GSM Cotton` },
            { name_category: `Women's T-shirt`, slug_category: `women's-t-shirt`, type: `All-Over Print Women's Round Neck T-Shirt _ 190GSM Cotton` },
            { name_category: 'Pant', slug_category: 'pant', type: `All-Over Print Unisex Pants _ 310GSM Cotton` },
            { name_category: 'Short Pant', slug_category: 'short-pant', type: `All-Over Print Unisex Short Pants _ 310GSM Cotton` },
        ];

        const FormProducts = await Promise.all(keysReplace.map(async (key) => {
            const regexTitle = new RegExp('hoodie', 'gi');
            const replacedTitle = Title.replace(regexTitle, key.name_category);
            const replacedDescription = Description.replace(regexTitle, key.name_category);
            const resImages = await getImageByName(key.type, colectionsColors.length + 1);
            console.log('resImages', resImages.metadata);
            if (!resImages || !Array.isArray(resImages.metadata)) {
                console.warn(`No images found for type ${key.type}`);
            }
            const imagesMain = resImages.metadata.slice(0, 2);
            const imagesColor = resImages.metadata.filter(img => !img.media_name.includes(' back'));

            const form = {
                product_name: replacedTitle,
                product_description: replacedDescription,
                product_list_categories: [key.slug_category, mainCategory],
                product_colors: colectionsColors,
                product_images: imagesMain.map(img => img.media_path),
                product_color_images: imagesColor.map(img => img.media_path),
            };

            switch (key.slug_category) {
                case 'hoodie':
                    form.product_price = 49.99;
                    form.product_price_eth = 0.018515;
                    break;
                case 'zip-hoodie':
                    form.product_price = 51.99;
                    form.product_price_eth = 0.019256;
                    break;
                case 'hooded-vest':
                case 'sweatshirt':
                    form.product_price = 46.99;
                    form.product_price_eth = 0.017404;
                    break;
                case 'pant':
                    form.product_price = 44.99;
                    form.product_price_eth = 0.016663;
                    break;
                case 'short-pant':
                    form.product_price = 39.99;
                    form.product_price_eth = 0.014999;
                    break;
                case `men's-t-shirt`:
                case `women's-t-shirt`:
                    form.product_price = 25.99;
                    form.product_price_eth = 0.009626;
                    break;
                default:
                    alert('Please select a category or set a price for the product');
                    return null; // bỏ qua
            }
            return form;
        }));

        // Xóa null nếu có (do invalid category)
        const cleanedForms = FormProducts.filter(form => form.product_color_images && form.product_color_images.length > 0);
        console.log('FormProducts', cleanedForms);

        const results = await Promise.all(
            cleanedForms.map(async (form) => {
                const res = await createProduct(form);
                return res.status === 201 ? form : null;
            })
        );

        // Lọc ra các sản phẩm tạo thành công
        const successfulForms = results.filter((form) => form !== null);

        if (successfulForms.length > 0) {
            // Cập nhật state an toàn
            setProducts((prev) => [...successfulForms, ...prev]);
            console.log('Products created successfully:', successfulForms);
            onClose();
            setTitle('');
            setDescription('');
        }

    }
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Add Products for All Categories</DialogTitle>
            <DialogContent>
                <p>This modal will allow you to add products for all categories.</p>
                <TextField
                    label="Product Title"
                    name="product_Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    value={Title}
                />
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Product Description"
                    rows="4"
                    style={{ resize: 'none' }}
                    label="Product Description"
                    name="product_Description"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    value={Description}
                />
                <label>Choose Collection Colors</label>
                <div className={`flex flex-wrap gap-2 mb-4 `}>
                    <Button sx={{ border: colectionsColors[0] === primaryColors[0] ? '2px solid #000' : '' }} variant="contained" color="primary" onClick={() => setColectionsColors(primaryColors)}>Primary colors</Button>
                    <Button sx={{ border: colectionsColors[0] === lightColors[0] ? '2px solid #000' : '' }} variant="contained" color="secondary" onClick={() => setColectionsColors(lightColors)}>Light colors</Button>
                    <Button sx={{ border: colectionsColors[0] === darkColors[0] ? '2px solid #000' : '' }} variant="contained" color="success" onClick={() => { setColectionsColors(darkColors) }}>Dark colors</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        sx={{ border: mainCategory === 'og-crypto-series-honoring-the-pioneers-of-blockchain' ? '2px solid #000' : '' }}
                        variant="contained"
                        color="primary"
                        onClick={() => setMainCategory('og-crypto-series-honoring-the-pioneers-of-blockchain')}
                    >OG Crypto Series</Button>
                    <Button
                        sx={{ border: mainCategory === 'defi-culture-wear-the-protocols-that-power-web3' ? '2px solid #000' : '' }}
                        variant="contained"
                        color="secondary"
                        onClick={() => setMainCategory('defi-culture-wear-the-protocols-that-power-web3')}
                    >DeFi Culture</Button>
                    <Button
                        sx={{ border: mainCategory === 'meme-coins-for-the-culture-for-the-chaos' ? '2px solid #000' : '' }}
                        variant="contained"
                        color="success"
                        onClick={() => setMainCategory('meme-coins-for-the-culture-for-the-chaos')}
                    >
                        Meme Coins – For the Culture, For the Chaos
                    </Button>
                </div>
                {/* Add your form or content here */}
            </DialogContent>
            <Button
                onClick={handleAddProducts}
                variant="contained"
                color="primary"
                sx={{ margin: '10px' }}
            >Create</Button>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ModalAddProductsAllCategories;