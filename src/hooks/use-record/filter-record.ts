//import { RecordJSON } from '../../interfaces'
import { RecordJSON } from '@adminjs/common/interfaces'
//import { flat } from '../../utils_/flat'
import { flat } from '@adminjs/common'
import { UseRecordOptions } from './use-record.type'

export const filterRecordParams = function<T extends RecordJSON> (
  record: T,
  options: UseRecordOptions = {},
): T {
  if (options.includeParams && record) {
    return {
      ...record,
      params: flat.selectParams(record.params || {}, options.includeParams),
    }
  }
  return record
}

export const isPropertyPermitted = (propertyName, options: UseRecordOptions = {}): boolean => {
  const { includeParams } = options
  if (includeParams) {
    const parts = flat.pathToParts(propertyName, { skipArrayIndexes: true })
    return parts.some(part => includeParams.includes(part))
  }
  return true
}
