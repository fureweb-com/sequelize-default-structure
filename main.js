import _ from 'lodash'
import moment from 'moment'

import Memo from './models/Memo.js'
import Label from './models/Label.js'

moment.locale('ko')

const getMemoList = async __ => {
  return _(await Memo.findAll()).map(memo => {
    const {id, title, body} = memo.dataValues
    const createdAt = +moment(memo.dataValues.createdAt)
    
    return {id, title, body, createdAt}
  }).value()
}

const getMemoById = async id => {
  return await Memo.findById(id)
}

(async __ => {
  const list = await getMemoList()
  const firstMemo = await getMemoById(1)
  console.log(list)
  console.log(firstMemo.dataValues)
})()
