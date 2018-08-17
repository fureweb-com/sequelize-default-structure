# 기초 구조
┌─config
│  ├─connection
│  │ ├─development.js
│  │ ├─production.js
│  │ └─staging.js
│  └─sequelize.js
├─models
│   ├─Label.js
│   └─Memo.js
├─.babelrc
├─index.js
└─main.js

# 주요 파일 설명

### config/sequelize.js
  현재 노드 환경에 따라 알맞은 Sequelize 객체를 생성하기 위한 파일로, models 내 객체에서 해당 sequelize 인스턴스를 주입받아 define한 결과를 사용할 곳에 돌려주는 구조로 사용된다.

```js
import Sequelize from 'sequelize'

let sequelize = undefined

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    sequelize = require('./connection/production').default
    break
  case 'stage':
  case 'staging':
    sequelize = require('./connection/staging').default
    break
  case 'dev':
  case 'development':
  default:
    sequelize = require('./connection/development').default
    break
}

export default new Sequelize(...sequelize)
```


### config/connection/development.js
  환경에 따라 동적으로 데이터베이스 설정을 가져올 수 있도록 저장한 파일

```js
const database = 'db_sequelize_test'
const username = 'root'
const password = ''
const options = {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  timezone: 'Asia/Seoul',
  pool: {
    max: 5,
    min: 0, 
    acquire: 30000,
    idle: 10000
  }
}

export default [database, username, password, options]
```


### models/Memo.js
  sequelize 객체를 통해 각자의 모델을 정의한 결과를 돌려주도록 작성된 파일

```js
import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

export default sequelize.define('Memo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
```


### .babelrc

```js
{ "presets": ["es2015"] }
```



### index.js

```js
require('babel-register')
require('babel-polyfill')
require('./main.js')
```


### main.js : 실행 예시 파일

```js
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
  const memoList = await getMemoList()
  const firstMemo = await getMemoById(1)

  console.log(memoList.length)
  console.log(firstMemo.dataValues)
})()
```