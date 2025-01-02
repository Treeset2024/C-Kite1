// const mongoose = require('mongoose');

// const createGenericController = (Model) => {
//   return {
//     // 1. Create a single document
//     create: async (req, res) => {
//       try {
//         const newDocument = new Model(req.body);
//         const savedDocument = await newDocument.save();
//         res.status(201).json(savedDocument);
//       } catch (error) {
//         res.status(400).json({
//           message: 'Error creating document',
//           error: error.message
//         });
//       }
//     },

//     // 2. Get all documents with advanced filtering, sorting, and pagination
//     getAll: async (req, res) => {
//       try {
//         const { 
//           page = 1, 
//           limit = 30, 
//           sort = '-createdAt', 
//           search,
//           ...filters 
//         } = req.query;

//         // Construct query based on provided filters
//         const query = {};

//         // Advanced search across multiple fields
//         if (search) {
//           query.$or = [
//             { question: { $regex: search, $options: 'i' } },
//             { hint: { $regex: search, $options: 'i' } },
//             { answerDescription: { $regex: search, $options: 'i' } }
//           ];
//         }

//         // Add additional filters
//         Object.keys(filters).forEach(key => {
//           if (Array.isArray(filters[key])) {
//             query[key] = { $in: filters[key] };
//           } else {
//             query[key] = { $regex: filters[key], $options: 'i' };
//           }
//         });

//         const options = {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           sort,
//           select: '-__v' // Exclude version key
//         };

//         const result = await Model.paginate(query, options);

//         res.json({
//           total: result.totalDocs,
//           totalPages: result.totalPages,
//           currentPage: result.page,
//           documents: result.docs
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error fetching documents',
//           error: error.message
//         });
//       }
//     },

//     // 3. Get a single document by custom ID with optional population
//     getById: async (req, res) => {
//       try {
//         const { id } = req.params; // Custom ID from the request params
//         const { populate } = req.query;
//         let query = Model.findOne({ id }); // Query by custom id field
        
//         // Optional population of referenced fields
//         if (populate) {
//           const populateFields = populate.split(',');
//           populateFields.forEach(field => {
//             query = query.populate(field.trim());
//           });
//         }

//         const document = await query;

//         if (!document) {
//           return res.status(404).json({ message: 'Document not found' });
//         }

//         res.json(document);
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error fetching document',
//           error: error.message
//         });
//       }
//     },

//     // 4. Update a document with validation and partial updates
//     update: async (req, res) => {
//       try {
//         const { id } = req.params; // Custom ID from the request params
//         const updateData = req.body;

//         // Prevent updating certain fields
//         const forbiddenFields = ['_id', 'createdAt'];
//         forbiddenFields.forEach(field => delete updateData[field]);

//         const updatedDocument = await Model.findOneAndUpdate(
//           { id }, // Find by the custom id
//           updateData,
//           {
//             new: true, // Return the modified document
//             runValidators: true, // Run model validations
//             context: 'query' // Important for updating nested documents
//           }
//         );

//         if (!updatedDocument) {
//           return res.status(404).json({ message: 'Document not found' });
//         }

//         res.json(updatedDocument);
//       } catch (error) {
//         res.status(400).json({
//           message: 'Error updating document',
//           error: error.message
//         });
//       }
//     },

//     // 5. Partial update (PATCH) for specific fields
//     partialUpdate: async (req, res) => {
//       try {
//         const { id } = req.params; // Custom ID from the request params
//         const updateData = req.body;

//         // Prevent updating certain fields
//         const forbiddenFields = ['_id', 'createdAt'];
//         forbiddenFields.forEach(field => delete updateData[field]);

//         const updatedDocument = await Model.findOneAndUpdate(
//           { id }, // Find by the custom id
//           { $set: updateData },
//           {
//             new: true,
//             runValidators: true
//           }
//         );

//         if (!updatedDocument) {
//           return res.status(404).json({ message: 'Document not found' });
//         }

//         res.json(updatedDocument);
//       } catch (error) {
//         res.status(400).json({
//           message: 'Error partially updating document',
//           error: error.message
//         });
//       }
//     },

//     // 6. Delete a document
//     delete: async (req, res) => {
//       try {
//         const { id } = req.params; // Custom ID from the request params
//         const deletedDocument = await Model.findOneAndDelete({ id }); // Find by the custom id

//         if (!deletedDocument) {
//           return res.status(404).json({ message: 'Document not found' });
//         }

//         res.json({
//           message: 'Document successfully deleted',
//           deletedDocument
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error deleting document',
//           error: error.message
//         });
//       }
//     },

//     // 7. Bulk create documents with enhanced error handling
//     bulkCreate: async (req, res) => {
//       try {
//         const documents = req.body;
//         const createdDocuments = await Model.insertMany(documents, {
//           ordered: false, // Continue inserting even if some documents fail
//           rawResult: true
//         });

//         res.status(201).json({
//           message: 'Bulk documents created successfully',
//           count: createdDocuments.insertedCount,
//           documents: createdDocuments.insertedDocs || createdDocuments
//         });
//       } catch (error) {
//         if (error.writeErrors) {
//           res.status(206).json({
//             message: 'Partial document creation',
//             error: error.writeErrors.map(e => ({
//               index: e.index,
//               code: e.code,
//               errmsg: e.errmsg
//             })),
//             successfulCount: error.nInserted
//           });
//         } else {
//           res.status(400).json({
//             message: 'Error in bulk document creation',
//             error: error.message
//           });
//         }
//       }
//     },

//     // 8. Bulk delete documents
//     bulkDelete: async (req, res) => {
//       try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//           return res.status(400).json({ message: 'Invalid or empty list of IDs' });
//         }

//         const deleteResult = await Model.deleteMany({ id: { $in: ids } }); // Use custom id field for deletion

//         res.json({
//           message: 'Bulk delete successful',
//           deletedCount: deleteResult.deletedCount
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error in bulk deletion',
//           error: error.message
//         });
//       }
//     },

//     // 9. Advanced search with aggregation
//     advancedSearch: async (req, res) => {
//       try {
//         const { match = {}, group, sort, limit = 10 } = req.body;

//         // Base aggregation pipeline
//         const pipeline = [
//           { $match: match },
//           ...(group ? [{ $group: group }] : []),
//           ...(sort ? [{ $sort: sort }] : []),
//           { $limit: parseInt(limit) }
//         ];

//         const results = await Model.aggregate(pipeline);

//         res.json({
//           total: results.length,
//           results
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error in advanced search',
//           error: error.message
//         });
//       }
//     }
//   };
// };

// // Generic Router Generator with Additional Routes
// const createGenericRouter = (Model, routeName) => {
//   const router = require('express').Router();
//   const controller = createGenericController(Model);

//   // Define routes with HTTP methods
//   router.post(`/${routeName}`, controller.create);
//   router.get(`/${routeName}`, controller.getAll);
//   router.get(`/${routeName}/:id`, controller.getById);
//   router.put(`/${routeName}/:id`, controller.update);
//   router.patch(`/${routeName}/:id`, controller.partialUpdate);
//   router.delete(`/${routeName}/:id`, controller.delete);

//   // Bulk operations
//   router.post(`/${routeName}/bulk`, controller.bulkCreate);
//   router.delete(`/${routeName}/bulk`, controller.bulkDelete);

//   // Advanced search
//   router.post(`/${routeName}/search`, controller.advancedSearch);

//   return router;
// };

// module.exports = {
//   createGenericController,
//   createGenericRouter
// };



const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Ensure this is installed

const createGenericController = (Model) => {
  return {
    // 1. Create a single document
    create: async (req, res) => {
      try {
        const newDocument = new Model(req.body);
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
      } catch (error) {
        res.status(400).json({
          message: 'Error creating document',
          error: error.message
        });
      }
    },

    // 2. Get all documents with advanced filtering, sorting, and pagination
    getAll: async (req, res) => {
      try {
        const { 
          page = 1, 
          limit = 30, 
          sort = '-createdAt', 
          search,
          ...filters 
        } = req.query;

        const query = {};

        // Advanced search across multiple fields
        if (search) {
          query.$or = [
            { question: { $regex: search, $options: 'i' } },
            { hint: { $regex: search, $options: 'i' } },
            { answerDescription: { $regex: search, $options: 'i' } }
          ];
        }

        Object.keys(filters).forEach(key => {
          if (Array.isArray(filters[key])) {
            query[key] = { $in: filters[key] };
          } else {
            query[key] = { $regex: filters[key], $options: 'i' };
          }
        });

        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          sort,
          select: '-__v' // Exclude version key
        };

        const result = await Model.paginate(query, options);
        const questions = result.docs;
        const shuffledQuestions = questions.sort(() => 0.5 - Math.random()); // Shuffle questions randomly

        res.json({
          total: result.totalDocs,
          totalPages: result.totalPages,
          currentPage: result.page,
          documents: shuffledQuestions
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching documents',
          error: error.message
        });
      }
    },

    // 3. Get a single document by custom ID with optional population
    getById: async (req, res) => {
      try {
        const { id } = req.params;
        const { populate } = req.query;
        let query = Model.findOne({ id });

        if (populate) {
          const populateFields = populate.split(',');
          populateFields.forEach(field => {
            query = query.populate(field.trim());
          });
        }

        const document = await query;

        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching document',
          error: error.message
        });
      }
    },

    // 4. Update a document
    update: async (req, res) => {
      try {
        const { id } = req.params;
        const updateData = req.body;

        // Prevent updating certain fields
        const forbiddenFields = ['_id', 'createdAt'];
        forbiddenFields.forEach(field => delete updateData[field]);

        const updatedDocument = await Model.findOneAndUpdate(
          { id },
          updateData,
          { 
            new: true, 
            runValidators: true 
          }
        );

        if (!updatedDocument) {
          return res.status(404).json({ message: 'Document not found' });
        }

        res.json(updatedDocument);
      } catch (error) {
        res.status(400).json({
          message: 'Error updating document',
          error: error.message
        });
      }
    },

    // 5. Partial update (PATCH) for specific fields
    partialUpdate: async (req, res) => {
      try {
        const { id } = req.params;
        const updateData = req.body;

        // Prevent updating certain fields
        const forbiddenFields = ['_id', 'createdAt'];
        forbiddenFields.forEach(field => delete updateData[field]);

        const updatedDocument = await Model.findOneAndUpdate(
          { id },
          { $set: updateData },
          { new: true, runValidators: true }
        );

        if (!updatedDocument) {
          return res.status(404).json({ message: 'Document not found' });
        }

        res.json(updatedDocument);
      } catch (error) {
        res.status(400).json({
          message: 'Error partially updating document',
          error: error.message
        });
      }
    },

    // 6. Delete a document
    delete: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedDocument = await Model.findOneAndDelete({ id });

        if (!deletedDocument) {
          return res.status(404).json({ message: 'Document not found' });
        }

        res.json({
          message: 'Document successfully deleted',
          deletedDocument
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error deleting document',
          error: error.message
        });
      }
    },

    // 7. Bulk create documents
    bulkCreate: async (req, res) => {
      try {
        const documents = await Model.insertMany(req.body);
        res.status(201).json(documents);
      } catch (error) {
        res.status(400).json({
          message: 'Error creating documents',
          error: error.message
        });
      }
    },

    // 8. Bulk delete documents
    bulkDelete: async (req, res) => {
      try {
        const { ids } = req.body; // Expected format: { ids: ['id1', 'id2', 'id3'] }
        const result = await Model.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'No documents found to delete' });
        }

        res.json({
          message: `${result.deletedCount} document(s) successfully deleted`
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error deleting documents',
          error: error.message
        });
      }
    },

    // 9. Advanced search
    advancedSearch: async (req, res) => {
      try {
        const { query } = req.body;
        const result = await Model.find(query); // Use the provided query directly

        res.json(result);
      } catch (error) {
        res.status(500).json({
          message: 'Error performing advanced search',
          error: error.message
        });
      }
    }
  };
};

// Generic Router Generator with Additional Routes
const createGenericRouter = (Model, routeName) => {
  const router = require('express').Router();
  const controller = createGenericController(Model);

  router.post(`/${routeName}`, controller.create);
  router.get(`/${routeName}`, controller.getAll);
  router.get(`/${routeName}/:id`, controller.getById);
  router.put(`/${routeName}/:id`, controller.update); // Now works
  router.patch(`/${routeName}/:id`, controller.partialUpdate); // Now works
  router.delete(`/${routeName}/:id`, controller.delete); // Now works

  router.post(`/${routeName}/bulk`, controller.bulkCreate); // Now works
  router.delete(`/${routeName}/bulk`, controller.bulkDelete); // Now works

  router.post(`/${routeName}/search`, controller.advancedSearch); // Now works

  return router;
};

module.exports = {
  createGenericController,
  createGenericRouter
};

