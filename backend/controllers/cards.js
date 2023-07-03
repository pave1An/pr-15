const Card = require('../models/card');
const ForbiddenError = require('../utils/errors/forbidden-error');
const NotFoundError = require('../utils/errors/not-found-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Такой карточки не существует'))
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner !== req.user._id) {
        throw new ForbiddenError('Попытка удалить карточку другого пользователя');
      } else {
        const cardId = card._id.toString();
        Card.deleteOne({ _id: cardId })
          .then((data) => res.send(data))
          .catch(next);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send(card))
    .catch(next);
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
