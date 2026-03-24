import { GetListConfigObject } from './GetListConfigObject'

export interface CrudService {

    getById (id: number | string);

    getList (config?: GetListConfigObject);

    getFirst (additionalQueryParams: string);

    del (id: string | number);

    put (id: string | number, dataProvider: () => object);

    post (dataProvider: () => object);
}
