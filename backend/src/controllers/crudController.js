import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';

const buildSearchQuery = (fields, search) => {
  if (!search || !fields.length) {
    return {};
  }

  return {
    $or: fields.map((field) => ({ [field]: { $regex: search, $options: 'i' } }))
  };
};

export const createCrudController = (Model, options = {}) => {
  const { searchFields = [], publicFilter = {} } = options;

  return {
    list: asyncHandler(async (request, response) => {
      const { search, page = 1, limit = 20, sort = '-createdAt' } = request.query;
      const query = {
        ...publicFilter,
        ...buildSearchQuery(searchFields, search)
      };

      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Model.find(query).sort(sort).skip(skip).limit(Number(limit)).lean(),
        Model.countDocuments(query)
      ]);

      response.json({
        items,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit) || 1)
      });
    }),

    getById: asyncHandler(async (request, response) => {
      const item = await Model.findById(request.params.id).lean();

      if (!item) {
        throw new HttpError(404, 'Item not found');
      }

      response.json(item);
    }),

    create: asyncHandler(async (request, response) => {
      const item = await Model.create(request.body);
      response.status(201).json(item);
    }),

    update: asyncHandler(async (request, response) => {
      const item = await Model.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });

      if (!item) {
        throw new HttpError(404, 'Item not found');
      }

      response.json(item);
    }),

    remove: asyncHandler(async (request, response) => {
      const item = await Model.findByIdAndDelete(request.params.id);

      if (!item) {
        throw new HttpError(404, 'Item not found');
      }

      response.status(204).send();
    })
  };
};
