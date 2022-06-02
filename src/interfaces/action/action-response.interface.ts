import { RecordJSON } from '../record'
import { NoticeMessage } from '../../hoc/with-notice'

/**
 * Base response for all actions
 * @memberof Action
 * @alias ActionResponse
 */
export type ActionResponse = {
  /**
   * Notice message which should be presented to the end user after showing the action
   */
  notice?: NoticeMessage;
  /**
   * redirect path
   */
  redirectUrl?: string;
  /**
   * Any other custom parameter
   */
  [key: string]: any;
}

/**
 * Required response of a Record action. Extends {@link ActionResponse}
 *
 * @memberof Action
 * @alias RecordActionResponse
 */
export type RecordActionResponse = ActionResponse & {
  /**
   * Record object.
   */
  record: RecordJSON;
}

/**
 * Required response of a Record action. Extends {@link ActionResponse}
 *
 * @memberof Action
 * @alias RecordActionResponse
 */
export type BulkActionResponse = ActionResponse & {
  /**
   * Array of RecordJSON objects.
   */
  records: Array<RecordJSON>;
}

/**
 * Response returned by List action
 * @memberof module:ListAction
 * @alias ListAction
 */
export type ListActionResponse = ActionResponse & {
  /**
   * Paginated collection of records
   */
  records: Array<RecordJSON>;
  /**
   * Pagination metadata
   */
  meta: {
    page: number;
    perPage: number;
    direction: 'asc' | 'desc';
    sortBy: string;
    total: number;
  };
}
