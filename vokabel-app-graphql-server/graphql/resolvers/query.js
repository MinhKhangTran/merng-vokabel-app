module.exports = {
  Query: {
    vokabeln: async (parent, args, { model }) => {
      return await model.Vokabel.find({});
    },
    vokabel: async (parent, { id }, { model }) => {
      return await model.Vokabel.findOne({ _id: id });
    },
    favorite: async (parent, { marked }, { model }) => {
      return await model.Vokabel.find({ marked: true });
    }
  }
};
