const Router = require('@koa/router');
const placeService = require('../service/place');

const getAllPlaces = async (ctx) => {
	ctx.body = await placeService.getAll();
};

const createPlace = async (ctx) => {
	const newPlace = await placeService.create(ctx.request.body);
	ctx.body = newPlace;
	ctx.status = 201;
};

const getPlaceById = async (ctx) => {
	ctx.body = await placeService.getById(ctx.params.id);
};

const updatePlace = async (ctx) => {
	ctx.body = await placeService.updateById(ctx.params.id, ctx.request.body);
};

const deletePlace = async (ctx) => {
	await placeService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/places',
	});

	router.get('/', getAllPlaces);
	router.post('/', createPlace);
	router.get('/:id', getPlaceById);
	router.put('/:id', updatePlace);
	router.delete('/:id', deletePlace);

	app.use(router.routes()).use(router.allowedMethods());
};
