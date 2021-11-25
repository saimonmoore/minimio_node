// import Service from './service';
import {
  baseHandler,
  // filterParams,
  // allowedParams
} from '../baseController';
import { BadRequestError } from '../../errors';
import { CollectionPresenter, Presenter } from './presenter';

// const indexGetParams = (req: any) => {
//   const { rid } = req.query;

//   return {
//     creator_id: rid,
//   };
// };

export const index = baseHandler((_req: any, res: any, next: any) => {
  // const whereParams = indexGetParams(req);

  try {
    const feeds = [];
    const response = new CollectionPresenter(feeds).render();

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export const showGetParams = (req: any) => {
  const {
    params: { id },
    query: { rid },
  } = req;
  const parsedId = parseInt(id);
  const parsedRid = parseInt(rid);

  if (isNaN(parsedId) || isNaN(parsedRid)) {
    throw new BadRequestError();
  }

  return {
    id: parsedId,
    rid: parsedRid,
  };
};

export const show = baseHandler((_req: any, res: any, next: any) => {
  try {
    // const { id, rid } = showGetParams(req);
    const feed = { id: 1, title: 'mnimio' };
    const response = new Presenter(feed).render();

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export const create = baseHandler((_req: any, res: any, next: any) => {
  try {
    // const {
    //   body: { feedData },
    //   query: { rid },
    // } = req;

    // const params = {
    //   ...filterParams(feedData, allowedParams('feed', req)),
    //   creator_id: parseInt(rid),
    // };

    // const feed = await Service.create(params);
    const feed = {};
    const response = new Presenter(feed).render();
    res.status(201).json(response);
  } catch (unexpectedError) {
    next(unexpectedError);
  }
});
