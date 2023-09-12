import express from 'express';
const router = express.Router();

import userApi from './apis/user.api';
router.use('/users', userApi);

import authApi from './apis/auth.api';
router.use('/auth', authApi);

import categoryApi from './apis/category.api';
router.use('/categories', categoryApi);

import productApi from './apis/product.api';
router.use('/products', productApi);

import collectionApi from './apis/collection.api';
router.use('/collections', collectionApi);

import purchaseApi from './apis/purchase.api';
router.use('/purchase', purchaseApi);

import searchApi from './apis/search.api';
router.use('/search', searchApi);

export default router;