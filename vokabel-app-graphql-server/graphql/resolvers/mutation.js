module.exports = {
  Mutation: {
    createVokabel: async (parent, args, { model }) => {
      return await model.Vokabel.create({
        german: args.german,
        korean: args.korean
      });
    },
    deleteVokabel: async (parent, { id }, { model }) => {
      const vokabel = model.Vokabel.findOne({ _id: id });
      try {
        await vokabel.remove();
        return true;
      } catch (error) {
        return false;
      }
    },
    updateVokabel: async (parent, { id, german, korean }, { model }) => {
      return await model.Vokabel.findOneAndUpdate(
        {
          _id: id
        },
        { $set: { german, korean } },
        { new: true }
      );
    },
    toggleMark: async (parent, { id, marked }, { model }) => {
      let newMarked = true;
      if (marked) {
        newMarked = !marked;
      }
      return await model.Vokabel.findOneAndUpdate(
        {
          _id: id
        },
        { $set: { marked: newMarked } },
        { new: true }
      );
    }
  }
};
