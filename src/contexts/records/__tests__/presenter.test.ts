import { Presenter, CollectionPresenter } from '../presenter';

describe('XPresenter', () => {
  describe('#render', () => {
    describe('for required fields', () => {
      const title = 'Mnimio';

      it('renders as is under the `record` key', () => {
        const presenter = new Presenter({ title });

        expect(presenter.render()).toEqual({
          record: {
            title,
          },
        });
      });
    });
  });
});

describe('CollectionPresenter', () => {
  describe('#render', () => {
    it('returns a total', () => {
      const presenter = new CollectionPresenter([{ id: 1, title: 'foo' }]);

      expect(presenter.render().total).toEqual(1);
    });

    it('returns the rendered collection', () => {
      const presenter = new CollectionPresenter([{ id: 1, title: 'foo' }]);

      expect(presenter.render().collection).toEqual([{ id: 1, title: 'foo' }]);
    });
  });
});
