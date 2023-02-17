import Property from '../models/property.model.js';

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({});

        return res.status(200).json(properties);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getFeatured = async (req, res) => {
    try {
        const featuredProperties = await Property
            .find({ featured: true })
            .populate('currentOwner', '-password');

        return res.status(200).json(featuredProperties);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllFromSpecificType = async (req, res) => {
    const type = req.query;

    try {
        if (type) {
            const properties = await Property
                .find(type)
                .populate('currentOwner', '-password');

            return res.status(200).json(properties);
        } else {
            res.status(404).json({ msg: 'No such type of property found!' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getCountOfTypes = async (req, res) => {
    try {
        const beachType = await Property.countDocuments({ type: 'beach' });
        const mountainType = await Property.countDocuments({ type: 'mountain' });
        const villageType = await Property.countDocuments({ type: 'village' });

        return res.status(200).json({
            beach: beachType,
            mountain: mountainType,
            village: villageType,
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password');

        if (!property) {
            throw new Error('No such property with that id!');
        } else {
            return res.status(200).json(property);
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const createProperty = async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id });

        return res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error('You are not allowed to update other people properties!');
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, 
            { new: true }
        );

        return res.status(200).json(updatedProperty);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error('You are not allowed to delete this property!');
        } else {
            await Property.findByIdAndDelete(req.params.id);
            
            return res.status(200).json({ msg: 'Property successfully deleted!' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
