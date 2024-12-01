const Sequence = require('../models/sequence');

class SequenceGenerator {
  constructor() {
    this.maxDocumentId = 0;
    this.maxMessageId = 0;
    this.maxContactId = 0;
    this.sequenceId = null;
  }
  
  async initialize() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (sequence) {
        this.sequenceId = sequence._id;
        this.maxDocumentId = sequence.maxDocumentId;
        this.maxMessageId = sequence.maxMessageId;
        this.maxContactId = sequence.maxContactId;
      } else {
        throw new Error('Sequence document not found');
      }
    } catch (error) {
      console.error('Initialization error:', error);
      throw error;
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    if (!this.sequenceId) {
      await this.initialize();
    }

    switch (collectionType) {
      case 'documents':
        this.maxDocumentId++;
        updateObject = { maxDocumentId: this.maxDocumentId };
        nextId = this.maxDocumentId;
        break;
      case 'messages':
        this.maxMessageId++;
        updateObject = { maxMessageId: this.maxMessageId };
        nextId = this.maxMessageId;
        break;
      case 'contacts':
        this.maxContactId++;
        updateObject = { maxContactId: this.maxContactId };
        nextId = this.maxContactId;
        break;
      default:
        throw new Error('Invalid collection type');
    }

    try {
      await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec();
      return nextId;
    } catch (error) {
      console.error('nextId error:', error);
      throw error;
    }
  }
}

module.exports = new SequenceGenerator();