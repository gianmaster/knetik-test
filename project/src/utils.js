import moment from 'moment'

export const api = 'https://recruitment-test-api.devsandbox.knetikcloud.com/devices'

export const formatDate = (date, format = 'YYYY-MM-DD HH:mma') => {
  return moment(date).format(format)
}
